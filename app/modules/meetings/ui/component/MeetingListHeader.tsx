"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { NewMeetingsDialogu } from "./NewMeetingDialogu";
import { useState } from "react";

const MeetingListHeader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <>
      <NewMeetingsDialogu open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className="py-4 px-4 flex flex-col md:px-8 gap-y-4">
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-xl">My Meetings</h5>
          <Button className="text-black" onClick={() => setIsDialogOpen(true)}>
            <PlusIcon />
            Create New Meeting
          </Button>
        </div>
        <div className="flex gap-x-2 items-center p-1">TODO: fillter</div>
      </div>
    </>
  );
};

export default MeetingListHeader;
