import { AgentGetOne } from "@/app/modules/agent/types";
import { AgentForm } from "@/components/AgentsForm";
import { ResponsiveDialog } from "@/components/ResponsiveDialog";
import React from "react";

interface UpdateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: AgentGetOne;
}

export const UpdateAgentsDialog = ({
  open,
  onOpenChange,
  initialValues,
}: UpdateDialogProps) => {
  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Edit Agent"
      description="Edit the agent details"
    >
      <AgentForm
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
