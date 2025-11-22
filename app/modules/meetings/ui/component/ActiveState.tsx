import { EmptySpace } from "@/components/EmptySpace";
import { Button } from "@/components/ui/button";
import { VideoIcon } from "lucide-react";
import Link from "next/link";

interface Props {
  meetingId: string;
}

const ActiveState = ({ meetingId }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-5 gap-y-5 rounded-lg bg-white">
      <EmptySpace
        title="Meeting is Active"
        description="Meeting end once everyone leaves the call"
        image="/upcoming.svg"
      />
      <div className="flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2 w-full">
        <Button asChild className="w-full lg:w-auto">
          <Link href={`/call/${meetingId}`}>
            <VideoIcon />
            Join Meeting
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ActiveState;
