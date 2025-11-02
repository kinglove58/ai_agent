"use client";
import { columns } from "@/app/modules/dashboard/ui/component/columns";
import { DataTable } from "@/app/modules/dashboard/ui/component/data-table";
import { useTRPC } from "@/app/trpc/client";
import { EmptySpace } from "@/components/EmptySpace";
import { ErrorState } from "@/components/ErrorState";
import { LoadingState } from "@/components/LoadingState";
import { useSuspenseQuery } from "@tanstack/react-query";
import UseAgentsFilters from "../../hooks/UseAgentsFilters";
import DataPagination from "@/components/DataPagination";

export const AgentsView = () => {
  const [filters, setFilters] = UseAgentsFilters();
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions({
      ...filters,
    })
  );
  return (
    <div className="flex flex-col gap-y-4 p-4 flex-1 md:p-8">
      <DataTable data={data.items} columns={columns} />
      {data.totalPages > 1 && (
        <DataPagination
          page={filters.page}
          totalPages={data.totalPages}
          onPageChange={(newPage) => setFilters({ page: newPage })}
        />
      )}
      {data.items.length === 0 && (
        <EmptySpace
          title="No Agents Found"
          description="You have not created any agents yet. Click the button above to create your first agent."
        />
      )}
    </div>
  );
};

export const AgentsViewLoading = () => {
  return (
    <LoadingState
      title="Loading Agents"
      description="Please wait while we load the agents."
    />
  );
};

export const AgentsViewError = () => {
  return (
    <ErrorState
      title="Error Loading Agents"
      description="There was an error loading the agents. Please try again later."
    />
  );
};
