import { useTRPC } from "@/app/trpc/client";
import UseMeetingsFilters from "../../hooks/UseMeetingsFilters";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CommandSelect } from "@/components/CommandSelect";
import GenerateAvatar from "@/components/generateImage";

export const AgentIdFilter = () => {
  const [filters, setFilters] = UseMeetingsFilters();

  const trpc = useTRPC();

  const [agentsSearch, setAgentSearch] = useState("");
  const { data } = useQuery(
    trpc.agents.getMany.queryOptions({
      pageSize: 100,
      search: agentsSearch,
    })
  );

  return (
    <CommandSelect
      placeholder="select agent"
      onSearch={setAgentSearch}
      onSelect={(value) => setFilters({ agentId: value })}
      value={filters.agentId ?? ""}
      className="h-9"
      options={(data?.items ?? []).map((agent) => ({
        id: agent.id,
        value: agent.id,
        children: (
          <div className="flex items-center gap-x-2">
            <GenerateAvatar
              seed={agent.name}
              variant="botttsNeutral"
              className="size-4"
            />
            {agent.name}
          </div>
        ),
      }))}
    />
  );
};
