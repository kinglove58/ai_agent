import { auth } from "@/app/lib/auth";
import { loadSearchParam } from "@/app/modules/meetings/params";
import MeetingListHeader from "@/app/modules/meetings/ui/component/MeetingListHeader";
import MeetingsView from "@/app/modules/meetings/ui/views/MeetingsView";
import { getQueryClient, trpc } from "@/app/trpc/server";
import { ErrorState } from "@/components/ErrorState";
import { LoadingState } from "@/components/LoadingState";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SearchParams } from "nuqs";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
  searchParams: Promise<SearchParams>;
}

const MeetingPage = async ({ searchParams }: Props) => {
  const filters = await loadSearchParam(searchParams);
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/sign-in");
  }
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.meetings.getMany.queryOptions({
      ...filters,
    })
  );
  return (
    <>
      <MeetingListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<MeetingsViewLoading />}>
          <ErrorBoundary fallback={<MeetingsViewError />}>
            <MeetingsView />
          </ErrorBoundary>{" "}
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default MeetingPage;

const MeetingsViewLoading = () => {
  return (
    <LoadingState
      title="Loading Meetings"
      description="Please wait while we load the meetings."
    />
  );
};

const MeetingsViewError = () => {
  return (
    <ErrorState
      title="Error Loading Meetings"
      description="There was an error loading the meetings. Please try again later."
    />
  );
};
