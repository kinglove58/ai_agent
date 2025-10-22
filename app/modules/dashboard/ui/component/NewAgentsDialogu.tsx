import { AgentForm } from "@/components/AgentsForm";
import { ResponsiveDialog } from "@/components/ResponsiveDialog";
import React from "react";

interface NewAgentsDialoguProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewAgentsDialogu = ({
  open,
  onOpenChange,
}: NewAgentsDialoguProps) => {
  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Create New Agent"
      description="Fill the form to create a new agent"
    >
      <AgentForm
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
