import { MeetingForm } from "@/components/MeetingsForm";
import { ResponsiveDialog } from "@/components/ResponsiveDialog";
import React, { useState } from "react";
import { MeetingsGetOne } from "../../types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: MeetingsGetOne;
}

export const UpdateMeetingsDialog = ({
  open,
  onOpenChange,
  initialValues,
}: Props) => {
  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      title=" Update Meeting"
      description="Fill the form to update the meeting"
    >
      <MeetingForm
        initialValues={initialValues}
        onSuccess={() => {
          onOpenChange(false);
        }}
        onCancel={() => {
          onOpenChange(false);
        }}
      />
    </ResponsiveDialog>
  );
};
