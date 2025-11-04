interface Props {
  params: Promise<{ agentId: string }>;
}
import AgentIdView, {
  AgentIdsViewError,
  AgentsIdViewLoading,
} from "@/app/modules/agent/ui/view/AgentIdView";
import { getQueryClient, trpc } from "@/app/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const Page = async ({ params }: Props) => {
  const { agentId } = await params;

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(
    trpc.agents.getOne.queryOptions({
      id: agentId,
    })
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<AgentsIdViewLoading />}>
        <ErrorBoundary fallback={<AgentIdsViewError />}>
          <AgentIdView agentId={agentId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;
