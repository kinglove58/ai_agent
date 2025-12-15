"use client";

import { authClient } from "@/app/lib/auth-client";
import { useTRPC } from "@/app/trpc/client";
import { ErrorState } from "@/components/ErrorState";
import { LoadingState } from "@/components/LoadingState";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PricingCard } from "../components/PricingCard";

export const UpgradeViewLoading = () => {
  return (
    <LoadingState title="loading" description="This may take a few seconds" />
  );
};

export const UpgradeViewError = () => {
  return (
    <ErrorState
      title="Something went wrong"
      description="Please try again later"
    />
  );
};
export const UpgradeView = () => {
  const trpc = useTRPC();
  const { data: products } = useSuspenseQuery(
    trpc.premium.getProduct.queryOptions()
  );
  const { data: currentSubscription } = useSuspenseQuery(
    trpc.premium.getCurrentSubscription.queryOptions()
  );
  return (
    <div className="py-4 px-4 md:px-8 flex flex-1 flex-col gap-y-10">
      <div className="flex flex-1 flex-col items-center mt-4 gap-y-10">
        <h5 className="font-medium text-2xl md:text-3xl">
          You are on the{" "}
          <span className="font-semibold text-primary">
            {currentSubscription?.name ?? "Free"}
          </span>{" "}
          Plan
        </h5>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((product) => {
            const isCurrentProduct = currentSubscription?.id === product.id;
            const isPremium = !!currentSubscription;

            let buttonText = "Upgrade";
            let onClick = () => authClient.checkout({ products: [product.id] });

            if (isCurrentProduct) {
              buttonText = "Manage Subscription";
              onClick = () => authClient.customer.portal();
            } else if (isPremium) {
              buttonText = "Switch Plan";
              onClick = () => authClient.customer.portal();
            }
            return (
              <PricingCard
                key={product.id}
                buttonText={buttonText}
                onClick={onClick}
                title={product.name}
                variant={
                  product.metadata?.variant === "highlighted"
                    ? "highlighted"
                    : "default"
                }
                price={
                  product.prices[0].amountType === "fixed"
                    ? (product.prices[0].priceAmount / 100).toFixed(2)
                    : "0"
                }
                description={product.description}
                priceSuffix={`/${product.prices[0].recurringInterval}`}
                features={product.benefits.map(
                  (benefit) => benefit.description
                )}
                badge={product.metadata?.badge as string | null}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
