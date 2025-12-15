import { useTRPC } from "@/app/trpc/client";
import {
  CommandResponsiveDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useState } from "react";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const DashboardCommand = ({ open, setOpen }: Props) => {
  const router = useRouter();
  const trpc = useTRPC();
  const [search, setSearch] = useState("");
  const meetings = useQuery(
    trpc.meetings.getMany.queryOptions({
      search,
      pageSize: 100,
    })
  );
  const agents = useQuery(
    trpc.agents.getMany.queryOptions({
      search,
      pageSize: 100,
    })
  );

  return (
    <CommandResponsiveDialog
      shouldFilter={false}
      open={open}
      onOpenChange={setOpen}
    >
      <CommandInput
        value={search}
        onValueChange={(value) => setSearch(value)}
        placeholder="search your agent here"
      />
      <CommandList>
        <CommandGroup heading="Meetings">
          {" "}
          <CommandEmpty>No agents found</CommandEmpty>
        </CommandGroup>

        <CommandItem>Test</CommandItem>
      </CommandList>
    </CommandResponsiveDialog>
  );
};

export default DashboardCommand;
