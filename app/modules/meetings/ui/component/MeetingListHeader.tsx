"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";
import { useState } from "react";
import { NewMeetingsDialog } from "./NewMeetingDialogu";
import MeetingsSearchFilter from "./MeetingsSearchFilter";
import { StatusFilter } from "./StatusFilter";
import { AgentIdFilter } from "./AgentIdFilter";
import UseMeetingsFilters from "../../hooks/UseMeetingsFilters";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Scrollbar } from "@radix-ui/react-scroll-area";
import { DEFAULT_PAGE } from "@/app/constants";

const MeetingListHeader = () => {
  const [filter, setFilter] = UseMeetingsFilters();
  const isAnyFilterModified =
    !!filter.status || !!filter.agentId || !!filter.search;
  const clearFilters = () => {
    setFilter({
      status: null,
      agentId: "",
      search: "",
      page: DEFAULT_PAGE,
    });
  };
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <>
      <NewMeetingsDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className="py-4 px-4 flex flex-col md:px-8 gap-y-4">
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-xl">My Meetings</h5>
          <Button className="text-black" onClick={() => setIsDialogOpen(true)}>
            <PlusIcon />
            Create New Meeting
          </Button>
        </div>
        <ScrollArea>
          <div className="flex gap-x-2 items-center p-1">
            <MeetingsSearchFilter />
            <StatusFilter />
            <AgentIdFilter />
            {isAnyFilterModified && (
              <Button variant="outline" onClick={clearFilters}>
                <XCircleIcon className="size-4" /> clear
              </Button>
            )}
          </div>
          <Scrollbar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
};

export default MeetingListHeader;
