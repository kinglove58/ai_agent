import {
  useQueryStates,
  parseAsString,
  parseAsInteger,
  parseAsStringEnum,
} from "nuqs";
import { DEFAULT_PAGE } from "@/app/constants";
import { MeetingStatus } from "../types";

const UseMeetingsFilters = () => {
  return useQueryStates({
    search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
    page: parseAsInteger
      .withDefault(DEFAULT_PAGE)
      .withOptions({ clearOnDefault: true }),
    status: parseAsStringEnum(Object.values(MeetingStatus)),
    agentId: parseAsString
      .withDefault("")
      .withOptions({ clearOnDefault: true }),
  });
};

export default UseMeetingsFilters;
