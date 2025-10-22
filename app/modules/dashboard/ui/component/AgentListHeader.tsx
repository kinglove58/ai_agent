"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import React, { useState } from "react";
import { NewAgentsDialogu } from "./NewAgentsDialogu";

const AgentListHeader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <>
      <NewAgentsDialogu open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className="py-4 px-4 flex flex-col md:px-8 gap-y-4">
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-xl">Agents</h5>
          <Button className="text-black" onClick={() => setIsDialogOpen(true)}>
            <PlusIcon />
            Create New Agent
          </Button>
        </div>
      </div>
    </>
  );
};

export default AgentListHeader;
