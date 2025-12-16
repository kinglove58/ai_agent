import { OpenAI } from "openai";
import { db } from "@/app/db";
import { agents, meetingAiResponses, meetings } from "@/app/db/schema";
import { inngest } from "@/app/inngest/client";
import { StreamVideo } from "@/app/lib/streamVideo";
import {
  CallEndedEvent,
  CallRecordingReadyEvent,
  CallSessionParticipantLeftEvent,
  CallSessionStartedEvent,
  CallTranscriptionReadyEvent,
  MessageNewEvent,
} from "@stream-io/node-sdk";
import { and, eq, not } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { streamChat } from "@/app/lib/stream-chat";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { GenerateAvatarUri } from "@/app/lib/avatar";

const openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

function verifySignatureWithSDK(body: string, signature: string): boolean {
  return StreamVideo.verifyWebhook(body, signature);
}

export async function POST(req: NextRequest) {
  const signature = req.headers.get("x-signature");
  const apiKey = req.headers.get("x-api-key");

  if (!signature || !apiKey) {
    return NextResponse.json(
      { error: "Missing signature or apiKey" },
      { status: 400 }
    );
  }

  const body = await req.text();

  if (!verifySignatureWithSDK(body, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(body) as Record<string, unknown>;
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid JSON payload" },
      { status: 400 }
    );
  }

  const eventType = (payload as Record<string, unknown>)?.type;

  if (eventType === "call.session_started") {
    const event = payload as CallSessionStartedEvent;
    const meetingId = event.call.custom?.meetingId;

    if (!meetingId) {
      return NextResponse.json(
        { error: "Missing meetingId in call custom data" },
        { status: 400 }
      );
    }

    const [existingMeetings] = await db
      .select()
      .from(meetings)
      .where(
        and(
          eq(meetings.id, meetingId),
          not(eq(meetings.status, "completed")),
          not(eq(meetings.status, "active")),
          not(eq(meetings.status, "processing"))
        )
      );
    if (!existingMeetings) {
      return NextResponse.json(
        { error: "Meeting not found or already completed/cancelled" },
        { status: 404 }
      );
    }

    await db
      .update(meetings)
      .set({ status: "active", startedAt: new Date() })
      .where(eq(meetings.id, existingMeetings.id));

    const [existingAgent] = await db
      .select()
      .from(agents)
      .where(eq(agents.id, existingMeetings.agentId));
    if (!existingAgent) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }
    const call = StreamVideo.video.call("default", meetingId);
    const realtimeClient = await StreamVideo.video.connectOpenAi({
      call,
      openAiApiKey: process.env.OPENAI_API_KEY!,
      agentUserId: existingAgent.id,
    });

    realtimeClient.updateSession({ instructions: existingAgent.instruction });
  } else if (eventType === "call.session_participation_left") {
    const event = payload as CallSessionParticipantLeftEvent;
    const meetingId = event.call_cid.split(":")[1];
    if (!meetingId) {
      return NextResponse.json(
        { error: "Missing meetingId in call cid" },
        { status: 400 }
      );
    }
    const call = StreamVideo.video.call("default", meetingId);
    await call.end();
  } else if (eventType === "call.session_ended") {
    const event = payload as CallEndedEvent;
    const meetingId = event.call.custom?.meetingId;
    if (!meetingId) {
      return NextResponse.json(
        { error: "Missing meetingId in call custom data" },
        { status: 400 }
      );
    }
    await db
      .update(meetings)
      .set({ status: "processing", endedAt: new Date() })
      .where(and(eq(meetings.id, meetingId), eq(meetings.status, "active")));
  } else if (eventType === "call.transcription_ready") {
    const event = payload as CallTranscriptionReadyEvent;
    const meetingId = event.call_cid.split(":")[1];

    const [updatedMeeting] = await db
      .update(meetings)
      .set({
        transcriptUrl: event.call_transcription.url,
      })
      .where(eq(meetings.id, meetingId))
      .returning();

    if (!updatedMeeting) {
      return NextResponse.json({ error: "Meeting not found" }, { status: 404 });
    }

    await inngest.send({
      name: "meetings/processing",
      data: {
        meetingId: updatedMeeting.id,
        transcriptUrl: updatedMeeting.transcriptUrl,
      },
    });
  } else if (eventType === "call.recording_ready") {
    const event = payload as CallRecordingReadyEvent;
    const meetingId = event.call_cid.split(":")[1];

    const [updatedMeeting] = await db
      .update(meetings)
      .set({
        recordingUrl: event.call_recording.url,
      })
      .where(eq(meetings.id, meetingId))
      .returning();

    if (updatedMeeting) {
      console.log(
        `[Stream] Recording ready for meeting ${meetingId}: ${event.call_recording.url}`
      );
    }
  } else if (eventType === "message.new") {
    const event = payload as MessageNewEvent;
    const userId = event.user?.id;
    const text = event.message?.text;
    const messageId = event.message?.id;
    const channelId = event.channel_id;

    if (!userId || !text || !channelId || !messageId) {
      return NextResponse.json(
        {
          error:
            "Missing userId, text, messageId, or channelId in message.new event",
        },
        { status: 400 }
      );
    }
    const [existingMeetings] = await db
      .select()
      .from(meetings)
      .where(and(eq(meetings.id, channelId), eq(meetings.status, "completed")));
    if (!existingMeetings) {
      return NextResponse.json(
        { error: "Meeting not found or not completed" },
        { status: 404 }
      );
    }
    const [existingAgent] = await db
      .select()
      .from(agents)
      .where(eq(agents.id, existingMeetings.agentId));
    if (!existingAgent) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }
    if (userId !== existingAgent.id) {
      const STALE_RESPONSE_WINDOW_MS = 2 * 60 * 1000; // 2 minutes
      let responseTrackerId: string | undefined;
      const [existingResponseRecord] = await db
        .select({
          id: meetingAiResponses.id,
          responseMessageId: meetingAiResponses.responseMessageId,
          updatedAt: meetingAiResponses.updatedAt,
        })
        .from(meetingAiResponses)
        .where(eq(meetingAiResponses.userMessageId, messageId));

      let staleRecordRemoved = false;
      if (existingResponseRecord) {
        const isWaitingForResponse = !existingResponseRecord.responseMessageId;
        const isStale = existingResponseRecord.updatedAt
          ? Date.now() - existingResponseRecord.updatedAt.getTime() >
            STALE_RESPONSE_WINDOW_MS
          : false;

        if (isWaitingForResponse && isStale) {
          await db
            .delete(meetingAiResponses)
            .where(eq(meetingAiResponses.id, existingResponseRecord.id));
          staleRecordRemoved = true;
        } else {
          return NextResponse.json({ status: 200 });
        }
      }

      if (existingResponseRecord && !staleRecordRemoved) {
        responseTrackerId = existingResponseRecord.id;
      }

      if (!responseTrackerId) {
        const insertedRows = await db
          .insert(meetingAiResponses)
          .values({
            meetingId: channelId,
            userMessageId: messageId,
          })
          .onConflictDoNothing({ target: meetingAiResponses.userMessageId })
          .returning({ id: meetingAiResponses.id });

        if (!insertedRows.length) {
          return NextResponse.json({ status: 200 });
        }

        responseTrackerId = insertedRows[0].id;
      }

      if (!responseTrackerId) {
        return NextResponse.json({ status: 200 });
      }

      const instructions = `You are an AI assistant helping the user revisit a recently completed meeting.
      Below is a summary of the meeting, generated from the transcript:
      ${existingMeetings.summary}
      The following are your original instructions from the live meeting assistant. Please continue to follow these behavioral guidelines as you assist the user:
      ${existingAgent.instruction}
      The user may ask questions about the meeting, request clarifications, or ask for follow-up actions.
      Always base your responses on the meeting summary above.
      You also have access to the recent conversation history between you and the user. Use the context of previous messages to provide relevant, coherent, and helpful responses. If the user's question refers to something discussed earlier, make sure to take that into account and maintain continuity in the conversation.
      If the summary does not contain enough information to answer a question, politely let the user know.
      Be concise, helpful, and focus on providing accurate information from the meeting and the ongoing conversation.`;

      const channel = streamChat.channel("messaging", channelId);
      await channel.watch();

      const alreadyResponded = channel.state.messages.some((message) => {
        if (message.user?.id !== existingAgent.id) {
          return false;
        }
        const aiResponseTo = (
          message as typeof message & {
            ai_response_to?: string;
          }
        ).ai_response_to;
        return aiResponseTo === messageId;
      });

      if (alreadyResponded) {
        return NextResponse.json({ status: 200 });
      }

      const previousMessages = channel.state.messages
        .slice(-5)
        .filter((mesg) => mesg.text && mesg.text.trim() !== "")
        .map<ChatCompletionMessageParam>((message) => ({
          role: message.user?.id === existingAgent.id ? "assistant" : "user",
          content: message.text || "",
        }));
      const GPTResponse = await openaiClient.chat.completions.create({
        messages: [
          { role: "system", content: instructions },
          ...previousMessages,
          { role: "user", content: text },
        ],
        model: "gpt-4o",
      });
      const GPTResponseText = GPTResponse.choices[0].message.content;
      if (!GPTResponseText) {
        return NextResponse.json(
          {
            error: "No response generated from OpenAI",
          },
          { status: 400 }
        );
      }
      const avatarUrl = GenerateAvatarUri({
        seed: existingAgent.name,
        variant: "botttsNeutral",
      });
      streamChat.upsertUser({
        id: existingAgent.id,
        name: existingAgent.name,
        image: avatarUrl,
      });
      try {
        const sentMessage = await channel.sendMessage({
          text: GPTResponseText,
          ai_response_to: messageId,
          user: {
            id: existingAgent.id,
            name: existingAgent.name,
            image: avatarUrl,
          },
        } as any);

        await db
          .update(meetingAiResponses)
          .set({
            responseMessageId: sentMessage.message?.id ?? null,
            updatedAt: new Date(),
          })
          .where(eq(meetingAiResponses.id, responseTrackerId));
      } catch (error) {
        await db
          .delete(meetingAiResponses)
          .where(eq(meetingAiResponses.id, responseTrackerId));
        throw error;
      }
    }
  }

  return NextResponse.json({ status: 200 });
}
