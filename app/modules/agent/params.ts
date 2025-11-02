import { DEFAULT_PAGE } from "@/app/constants";
import { createLoader, parseAsInteger, parseAsString } from "nuqs/server";

export const filterSearchParam = {
  search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
  page: parseAsInteger
    .withDefault(DEFAULT_PAGE)
    .withOptions({ clearOnDefault: true }),
};

export const loadSearchParam = createLoader(filterSearchParam);
