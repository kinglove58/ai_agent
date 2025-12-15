import { auth } from "@/app/lib/auth";
import {
  UpgradeView,
  UpgradeViewError,
  UpgradeViewLoading,
} from "@/app/modules/premium/ui/view/UpgradeView";
import { getQueryClient, trpc } from "@/app/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/sign-in");
  }
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    trpc.premium.getCurrentSubscription.queryOptions()
  );
  await queryClient.prefetchQuery(trpc.premium.getProduct.queryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<UpgradeViewLoading />}>
        <ErrorBoundary fallback={<UpgradeViewError />}>
          <UpgradeView />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default page;
