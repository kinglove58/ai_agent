"use client";

import { useTRPC } from "@/app/trpc/client";
import { ErrorState } from "@/components/ErrorState";
import { LoadingState } from "@/components/LoadingState";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import MeetingsIdViewHeader from "./MeetingIdViewHeader";
import { useRouter } from "next/navigation";
import { useConfirm } from "@/app/modules/agent/hooks/UseConfirm";
import { useState } from "react";
import { UpdateMeetingsDialog } from "../component/UpdateMeetingDialogu copy";

interface Props {
  meetingId: string;
}

export const MeetingIdView = ({ meetingId }: Props) => {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Are you sure?",
    "The following action will remove this meeting"
  );
  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );

  const removeMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
        // TODO: validating free tier
        router.push("/meetings");
      },
    })
  );
  const [updatMeetingDialoguOpen, setUpdatMeetingDialoguOpen] = useState(false);
  const handleRemoveMeeting = async () => {
    const ok = await confirmRemove();

    if (!ok) return;

    await removeMeeting.mutateAsync({ id: meetingId });
  };
  return (
    <>
      <RemoveConfirmation />
      <UpdateMeetingsDialog
        open={updatMeetingDialoguOpen}
        onOpenChange={setUpdatMeetingDialoguOpen}
        initialValues={data}
      />
      <div className="flex flex-col gap-y-4 py-4 px-4 flex-1 md:px-8">
        <MeetingsIdViewHeader
          meetingId={meetingId}
          meetingName={data.name}
          onEdit={() => {
            setUpdatMeetingDialoguOpen(true);
          }}
          onRemove={handleRemoveMeeting}
        />
        {JSON.stringify(data, null, 2)}
      </div>
    </>
  );
};

export const MeetingIdViewLoading = () => {
  return (
    <LoadingState
      title="Loading Meeting"
      description="This may take a few seconds"
    />
  );
};
export const MeetingIdViewError = () => {
  return (
    <ErrorState
      title="Meeting Error"
      description="Error Please try again later"
    />
  );
};
