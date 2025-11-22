import { EmptySpace } from "@/components/EmptySpace";

const ProcessingState = () => {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-5 gap-y-5 rounded-lg bg-white">
      <EmptySpace
        title="Not Started yet"
        description="Once you start the meeting, the summary will appear here"
        image="/upcoming.svg"
      />
    </div>
  );
};

export default ProcessingState;
