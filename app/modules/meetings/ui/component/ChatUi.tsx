import { useTRPC } from "@/app/trpc/client";
import { LoadingState } from "@/components/LoadingState";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Channel as StreamChannel, Event } from "stream-chat";
import {
  Channel,
  Chat,
  MessageInput,
  MessageList,
  useCreateChatClient,
  Window,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";

interface props {
  meetingId: string;
  meetingName: string;
  agentId: string;
  userId: string;
  userName: string;
  userImage: string | undefined;
}

export const ChatUi = ({
  meetingId,
  meetingName,
  agentId,
  userId,
  userName,
  userImage,
}: props) => {
  const trpc = useTRPC();
  const { mutateAsync: generateChatToken } = useMutation(
    trpc.meetings.generateChatToken.mutationOptions()
  );

  const [channel, setChannel] = useState<StreamChannel>();
  const [isAiResponding, setIsAiResponding] = useState(false);
  const client = useCreateChatClient({
    apiKey: process.env.NEXT_PUBLIC_STREAM_CHAT_API_KEY!,
    tokenOrProvider: generateChatToken,
    userData: {
      id: userId,
      name: userName,
      image: userImage,
    },
  });
  useEffect(() => {
    if (!client) return;
    const channel = client.channel("messaging", meetingId, {
      members: [userId],
    });
    setChannel(channel);
  }, [client, meetingId, meetingName, userId]);

  useEffect(() => {
    if (!channel) {
      setIsAiResponding(false);
      return;
    }

    const setInitialState = () => {
      const lastMeaningfulMessage = [...channel.state.messages]
        .filter((message) => message.text && message.text.trim() !== "")
        .pop();
      setIsAiResponding(lastMeaningfulMessage?.user?.id === userId);
    };

    setInitialState();

    const handleNewMessage = (event: Event) => {
      const authorId = event.message?.user?.id;
      if (!authorId) return;
      if (authorId === userId) {
        setIsAiResponding(true);
      } else if (authorId === agentId) {
        setIsAiResponding(false);
      }
    };

    channel.on("message.new", handleNewMessage);
    return () => {
      channel.off("message.new", handleNewMessage);
    };
  }, [channel, agentId, userId]);

  if (!client) {
    return (
      <LoadingState
        title="Loading..."
        description="This may take a few seconds"
      />
    );
  }
  return (
    <div className="bg-white rounded-lg border overflow-hidden">
      <Chat client={client}>
        <Channel channel={channel}>
          <Window>
            <div className="flex-1 overflow-y-auto max-h-[calc(100vh-23rem)] border-b">
              <MessageList />
            </div>
            {isAiResponding && (
              <div
                className="flex items-center gap-x-3 px-4 py-3 border-b text-sm text-muted-foreground"
                aria-live="polite"
              >
                <span>AI is typing</span>
                <div className="flex gap-x-1" aria-hidden="true">
                  <span className="h-2 w-2 rounded-full bg-primary/80 animate-bounce [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 rounded-full bg-primary/80 animate-bounce [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 rounded-full bg-primary/80 animate-bounce" />
                </div>
              </div>
            )}
            <MessageInput />
          </Window>
        </Channel>
      </Chat>
    </div>
  );
};
