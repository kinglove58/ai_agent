import { EmptySpace } from "@/components/EmptySpace";
import { Button } from "@/components/ui/button";
import { BanIcon, VideoIcon } from "lucide-react";
import Link from "next/link";

interface Props {
  meetingId: string;
  iscancelling: boolean;
  onCancelMeeting: () => void;
}

const UpcomingState = ({ meetingId, iscancelling, onCancelMeeting }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-5 gap-y-5 rounded-lg bg-white">
      <EmptySpace
        title="Not Started yet"
        description="Once you start the meeting, the summary will appear here"
        image="/upcoming.svg"
      />
      <div className="flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2 w-full">
        <Button
          variant="secondary"
          disabled={iscancelling}
          onClick={onCancelMeeting}
          className="w-full lg:w-auto"
        >
          <BanIcon />
          Cancel Meeting
        </Button>
        <Button disabled={iscancelling} asChild className="w-full lg:w-auto">
          <Link href={`/call/${meetingId}`}>
            <VideoIcon />
            Start Meeting
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default UpcomingState;
