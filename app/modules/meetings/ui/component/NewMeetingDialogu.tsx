import { MeetingForm } from "@/components/MeetingsForm";
import { ResponsiveDialog } from "@/components/ResponsiveDialog";
import { useRouter } from "next/navigation";
import React from "react";

interface NewMeetingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewMeetingsDialog = ({
  open,
  onOpenChange,
}: NewMeetingsDialogProps) => {
  const router = useRouter();
  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Create New Meeting"
      description="Fill the form to create a new meeting"
    >
      <MeetingForm
        onSuccess={(id) => {
          onOpenChange(false);
          router.push(`/meetings/${id}`);
        }}
        onCancel={() => {
          onOpenChange(false);
        }}
      />
    </ResponsiveDialog>
  );
};
