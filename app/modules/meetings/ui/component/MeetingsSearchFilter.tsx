import { Input } from "@/components/ui/input";
import UseMeetingsFilters from "../../hooks/UseMeetingsFilters";
import { SearchIcon } from "lucide-react";

const MeetingsSearchFilter = () => {
  const [filters, setFilters] = UseMeetingsFilters();
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

export default MeetingsSearchFilter;
