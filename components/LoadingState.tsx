import { Loader2Icon } from "lucide-react";

interface LoadingStateProps {
  title: string;
  description: string;
}
export const LoadingState = ({ title, description }: LoadingStateProps) => {
  return (
    <div className="flex py-4 px-8 items-center justify-center">
      <div className="gap-y-6 flex flex-col bg-background shadow-sm rounded-lg items-center justify-center p-10">
        <Loader2Icon className="size-4 animate-spin text-primary" />
        <div className="flex flex-col gap-y-2 text-center">
          <h6 className="text-lg font-medium">{title}</h6>
          <p className="text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};
