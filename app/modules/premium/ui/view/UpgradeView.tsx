"use client";

import { authClient } from "@/app/lib/auth-client";
import { useTRPC } from "@/app/trpc/client";
import { ErrorState } from "@/components/ErrorState";
import { LoadingState } from "@/components/LoadingState";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PricingCard } from "../components/PricingCard";

// Types
type Product = any; // Replace with proper type from your schema
type Subscription = any; // Replace with proper type from your schema

type ButtonConfig = {
  text: string;
  onClick: () => void | Promise<void>;
};

// Utility functions
const formatPrice = (price: any): string => {
  if (price.amountType === "fixed") {
    return (price.priceAmount / 100).toFixed(2);
  }
  return "0";
};

const getPriceSuffix = (recurringInterval: string): string => {
  return `/${recurringInterval}`;
};

const getCardVariant = (metadata?: any): "highlighted" | "default" => {
  return metadata?.variant === "highlighted" ? "highlighted" : "default";
};

const getBadge = (metadata?: any): string | null => {
  return (metadata?.badge as string) ?? null;
};

// Business logic
const getButtonConfig = (
  product: Product,
  currentSubscription: Subscription | null
): ButtonConfig => {
  const isCurrentProduct = currentSubscription?.id === product.id;
  const isPremium = !!currentSubscription;

  if (isCurrentProduct) {
    return {
      text: "Manage Subscription",
      onClick: async () => {
        try {
          const response = await fetch("/api/portal", {
            method: "POST",
          });

          const result = await response.json();
          console.log("Portal result:", result);

          if (response.ok && result.url) {
            window.location.href = result.url;
          } else {
            console.error("Portal failed:", result);
            alert(`Failed to open portal: ${result.error || "Unknown error"}`);
          }
        } catch (error) {
          console.error("Failed to open customer portal:", error);
          alert("Failed to open customer portal. Please try again.");
        }
      },
    };
  }

  if (isPremium) {
    return {
      text: "Switch Plan",
      onClick: async () => {
        try {
          const response = await fetch("/api/portal", {
            method: "POST",
          });

          const result = await response.json();
          console.log("Portal result:", result);

          if (response.ok && result.url) {
            window.location.href = result.url;
          } else {
            console.error("Portal failed:", result);
            alert(`Failed to open portal: ${result.error || "Unknown error"}`);
          }
        } catch (error) {
          console.error("Failed to open customer portal:", error);
          alert("Failed to open customer portal. Please try again.");
        }
      },
    };
  }

  return {
    text: "Upgrade",
    onClick: async () => {
      try {
        console.log("Attempting checkout with product:", product.id);
        console.log("Price ID:", product.prices[0].id);

        // Call our custom checkout API
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productPriceId: product.prices[0].id,
          }),
        });

        const result = await response.json();
        console.log("Checkout result:", result);

        if (response.ok && result.url) {
          // Redirect to Polar checkout page
          window.location.href = result.url;
        } else {
          console.error("Checkout failed:", result);
          alert(
            `Failed to initiate checkout: ${result.error || "Unknown error"}`
          );
        }
      } catch (error) {
        console.error("Checkout failed:", error);
        alert("Failed to initiate checkout. Please try again.");
      }
    },
  };
};

// Sub-components
const PlanHeader = ({ planName }: { planName: string }) => (
  <h5 className="font-medium text-2xl md:text-3xl">
    You are on the{" "}
    <span className="font-semibold text-primary">{planName}</span> Plan
  </h5>
);

const PricingGrid = ({
  products,
  currentSubscription,
}: {
  products: Product[];
  currentSubscription: Subscription | null;
}) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {products.map((product) => {
      const buttonConfig = getButtonConfig(product, currentSubscription);
      const price = product.prices[0];

      return (
        <PricingCard
          key={product.id}
          buttonText={buttonConfig.text}
          onClick={buttonConfig.onClick}
          title={product.name}
          variant={getCardVariant(product.metadata)}
          price={formatPrice(price)}
          description={product.description}
          priceSuffix={getPriceSuffix(price.recurringInterval)}
          features={product.benefits.map((benefit: any) => benefit.description)}
          badge={getBadge(product.metadata)}
        />
      );
    })}
  </div>
);

// Loading and Error states
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

// Main component
export const UpgradeView = () => {
  const trpc = useTRPC();

  const { data: products } = useSuspenseQuery(
    trpc.premium.getProduct.queryOptions()
  );

  const { data: currentSubscription } = useSuspenseQuery(
    trpc.premium.getCurrentSubscription.queryOptions()
  );

  const planName = currentSubscription?.name ?? "Free";

  return (
    <div className="py-4 px-4 md:px-8 flex flex-1 flex-col gap-y-10">
      <div className="flex flex-1 flex-col items-center mt-4 gap-y-10">
        <PlanHeader planName={planName} />
        <PricingGrid
          products={products}
          currentSubscription={currentSubscription}
        />
      </div>
    </div>
  );
};
