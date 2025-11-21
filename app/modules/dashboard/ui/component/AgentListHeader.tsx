"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";
import React, { useState } from "react";
import { NewAgentsDialogu } from "./NewAgentsDialogu";
import UseAgentsFilters from "@/app/modules/agent/hooks/UseAgentsFilters";
import AgentSearchFilter from "@/components/AgentSearchFilter";
import { DEFAULT_PAGE } from "@/app/constants";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const AgentListHeader = () => {
  const [filters, setFilters] = UseAgentsFilters();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isAnyFilterModified = !!filters.search;

  const onClearFilters = () => {
    setFilters({ search: "", page: DEFAULT_PAGE });
  };
  return (
    <>
      <NewAgentsDialogu open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className="py-4 px-4 flex flex-col md:px-8 gap-y-4">
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-xl">My Agents</h5>
          <Button className="text-black" onClick={() => setIsDialogOpen(true)}>
            <PlusIcon />
            Create New Agent
          </Button>
        </div>
        <ScrollArea>
        <div className="flex gap-x-2 items-center p-1">
          <AgentSearchFilter />
          {isAnyFilterModified && (
            <Button variant="outline" onClick={onClearFilters}>
              <XCircleIcon />
              clear
            </Button>
          )}
        </div>
        <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
};

export default AgentListHeader;
