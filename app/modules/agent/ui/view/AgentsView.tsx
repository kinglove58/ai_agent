"use client";
import { useTRPC } from "@/app/trpc/client";
import { useQuery } from "@tanstack/react-query";

export const AgentsView = () => {
  const trpc = useTRPC();
  const { data, isLoading, isError } = useQuery(
    trpc.agents.getMany.queryOptions()
  );
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading agents</div>;
  return (
    <div className="flex flex-col gap-y-4 p-4">
      {JSON.stringify(data, null, 2)}
    </div>
  );
};
