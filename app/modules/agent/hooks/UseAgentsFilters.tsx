import { useQueryStates, parseAsString, parseAsInteger } from "nuqs";
import { DEFAULT_PAGE } from "@/app/constants";

const UseAgentsFilters = () => {
  return useQueryStates({
    search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
    page: parseAsInteger
      .withDefault(DEFAULT_PAGE)
      .withOptions({ clearOnDefault: true }),
  });
};

export default UseAgentsFilters;
