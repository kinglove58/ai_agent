"use client";

import { authClient } from "@/app/lib/auth-client";
import { LoadingState } from "@/components/LoadingState";
import { ChatUi } from "./ChatUi";

interface props {
  meetingId: string;
  meetingName: string;
  agentId: string;
}

export const ChatProvider = ({ meetingId, meetingName, agentId }: props) => {
  const { data, isPending } = authClient.useSession();

  if (isPending || !data?.user) {
    return (
      <LoadingState
        title="Loading"
        description="please wait while we load the chat"
      />
    );
  }
  return (
    <ChatUi
      meetingId={meetingId}
      meetingName={meetingName}
      agentId={agentId}
      userId={data.user.id}
      userName={data.user.name}
      userImage={data.user.image ?? ""}
    />
  );
};
