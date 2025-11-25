"use client";

import { useTRPC } from "@/app/trpc/client";
import { ErrorState } from "@/components/ErrorState";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CallProvide } from "../components/CallProvide";

interface Props {
  meetingId: string;
}
export const CallView = ({ meetingId }: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );

  if (data.status === "completed") {
    return (
      <div className="flex h-screen items-center justify-center">
        <ErrorState
          title="Meeting has ended"
          description="you can no longer join the meeting"
        />
      </div>
    );
  }

  return <CallProvide meetingId={meetingId} meetingName={data.name} />;
};
