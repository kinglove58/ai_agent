import { db } from "@/app/db";
import { agents, meetings } from "@/app/db/schema";
import { StreamVideo } from "@/app/lib/streamVideo";
import {
  CallSessionParticipantLeftEvent,
  CallSessionStartedEvent,
} from "@stream-io/node-sdk";
import { and, eq, not } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

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
          not(eq(meetings.status, "cancelled")),
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
  }

  return NextResponse.json({ status: 200 });
}
