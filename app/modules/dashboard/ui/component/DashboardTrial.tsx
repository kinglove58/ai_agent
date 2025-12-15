import {
  MAX_FREE_AGENTS,
  MAX_FREE_MEETINGS,
} from "@/app/modules/premium/constant";
import { useTRPC } from "@/app/trpc/client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import { RocketIcon } from "lucide-react";
import Link from "next/link";

export const DashboardTrial = () => {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.premium.getFreeUsage.queryOptions());

  if (!data) return null;

  return (
    <div className="border border-border/10 rounded-lg w-full bg-white/5 flex flex-col gap-y-2">
      <div className="flex flex-col gap-y-4 p-3">
        <div className="flex items-center gap-2">
          <RocketIcon className="size-4 text-primary" />
          <p className="text-sm font-medium">free trial</p>
        </div>
        <div className="flex flex-col gap-y-2">
          <p className="text-XS">
            {data.agentsCount}/{MAX_FREE_AGENTS} Agents
          </p>
          <Progress value={(data.agentsCount / MAX_FREE_AGENTS) * 100} />
        </div>
        <div className="flex flex-col gap-y-2">
          <p className="text-XS">
            {data.meetingsCount}/{MAX_FREE_MEETINGS} Meetings
          </p>
          <Progress value={(data.meetingsCount / MAX_FREE_MEETINGS) * 100} />
        </div>
      </div>
      <Button
        asChild
        className="bg-transparent border border-border/10 rounded-t-none hover:bg-white/10 "
      >
        <Link href="/upgrades" className="w-full">
          Upgrade Account
        </Link>
      </Button>
    </div>
  );
};
