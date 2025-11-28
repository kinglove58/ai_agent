"use client";

import { useTRPC } from "@/app/trpc/client";
import { DataTable } from "@/components/data-table";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import { columns } from "../component/columns";
import { EmptySpace } from "@/components/EmptySpace";
import UseMeetingsFilters from "../../hooks/UseMeetingsFilters";
import DataPagination from "@/components/DataPagination";
import { useRouter } from "next/navigation";

const MeetingsView = () => {
  const trpc = useTRPC();
  const router = useRouter();
  const [filter, setFilter] = UseMeetingsFilters();
  const { data } = useSuspenseQuery(
    trpc.meetings.getMany.queryOptions({
      ...filter,
    })
  );

  return (
    <div className="flex-1 pb-4 px-4 md:px-4 flex flex-col gap-y-4">
      {data.items.length === 0 ? (
        <EmptySpace
          title="No Meetings Found"
          description="You have not created any meetings yet. Click the button above to create your first meeting."
        />
      ) : (
        <>
          <DataTable
            data={data.items}
            columns={columns}
            onRowClick={(row) => router.push(`/meetings/${row.id}`)}
          />
          <DataPagination
            page={filter.page}
            totalPages={data.totalPages}
            onPageChange={(page) => setFilter({ page })}
          />
        </>
      )}
    </div>
  );
};

export default MeetingsView;
