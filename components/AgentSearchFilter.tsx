import UseAgentsFilters from "@/app/modules/agent/hooks/UseAgentsFilters";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";

const AgentSearchFilter = () => {
  const [filters, setFilters] = UseAgentsFilters();
  return (
    <div className="relative">
      <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground cursor-pointer" />
      <Input
        className="h-8 bg-white w-[200px] pl-8"
        placeholder="Filter by name"
        value={filters.search}
        onChange={(e) => setFilters({ search: e.target.value })}
      />
    </div>
  );
};

export default AgentSearchFilter;
