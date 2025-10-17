import { AlertCircle } from "lucide-react";
import React from "react";

interface ErrorStateProps {
  title: string;
  description: string;
}
export const ErrorState = ({ title, description }: ErrorStateProps) => {
  return (
    <div className="flex py-4 px-8 items-center justify-center">
      <div className="gap-y-6 flex flex-col bg-background shadow-sm rounded-lg items-center justify-center p-10">
        <AlertCircle className="size-4 text-red-400" />
        <div className="flex flex-col gap-y-2 text-center">
          <h6 className="text-lg font-medium">{title}</h6>
          <p className="text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};
