import { auth } from "@/app/lib/auth";
import {
  AgentsView,
  AgentsViewError,
  AgentsViewLoading,
} from "@/app/modules/agent/ui/view/AgentsView";
import AgentListHeader from "@/app/modules/dashboard/ui/component/AgentListHeader";
import { getQueryClient, trpc } from "@/app/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { redirect } from "next/dist/client/components/navigation";
import { headers } from "next/headers";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/sign-in");
  }
  const queryClient = await getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());
  return (
    <>
      <AgentListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<AgentsViewLoading />}>
          <ErrorBoundary fallback={<AgentsViewError />}>
            <AgentsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default page;
