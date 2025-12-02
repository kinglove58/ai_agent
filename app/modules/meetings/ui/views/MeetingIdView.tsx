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
import UpcomingState from "../component/UpcomingState";
import ActiveState from "../component/ActiveState";
import CancelledState from "../component/CancelledState";
import ProcessingState from "../component/ProcessingState";
import { CompletedState } from "../component/CompletedState";
import { UpdateMeetingsDialog } from "../component/UpdateMeetingDialogu";

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
  const [updateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false);
  const handleRemoveMeeting = async () => {
    const ok = await confirmRemove();

    if (!ok) return;

    await removeMeeting.mutateAsync({ id: meetingId });
  };

  const isActive = data.status === "active";
  const isUpcoming = data.status === "upcoming";
  const isProcessing = data.status === "processing";
  const isCompleted = data.status === "completed";
  const isCancelled = data.status === "cancelled";

  return (
    <>
      <RemoveConfirmation />
      <UpdateMeetingsDialog
        open={updateMeetingDialogOpen}
        onOpenChange={setUpdateMeetingDialogOpen}
        initialValues={data}
      />
      <div className="flex flex-col gap-y-4 py-4 px-4 flex-1 md:px-8">
        <MeetingsIdViewHeader
          meetingId={meetingId}
          meetingName={data.name}
          onEdit={() => {
            setUpdateMeetingDialogOpen(true);
          }}
          onRemove={handleRemoveMeeting}
        />
        {isCancelled && <CancelledState meetingId={meetingId} />}
        {isActive && <ActiveState meetingId={meetingId} />}
        {isUpcoming && (
          <UpcomingState
            meetingId={meetingId}
            iscancelling={false}
            onCancelMeeting={() => {}}
          />
        )}
        {isProcessing && <ProcessingState />}
        {isCompleted && <CompletedState data={data} />}
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
