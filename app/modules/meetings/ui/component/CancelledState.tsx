import { EmptySpace } from "@/components/EmptySpace";
import { VideoIcon } from "lucide-react";
import Link from "next/link";

interface Props {
  meetingId: string;
}

const CancelledState = ({ meetingId }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-5 gap-y-5 rounded-lg bg-white">
      <EmptySpace
        title="Meeting is Cancelled"
        description="This meeting has been cancelled and is no longer active."
        image="/cancelled.svg"
      />
    </div>
  );
};

export default CancelledState;
