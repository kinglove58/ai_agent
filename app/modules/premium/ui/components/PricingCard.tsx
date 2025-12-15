import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { CircleCheckIcon } from "lucide-react";

// Constants
const DEFAULT_CURRENCY = "USD";
const SEPARATOR_OPACITY = "opacity-10";

// Style Variants
const pricingCardVariants = cva("rounded-lg p-4 py-6 w-full", {
  variants: {
    variant: {
      default: "bg-white text-black",
      highlighted: "bg-gradient-to-br from-[#093C23] to-[#051B16] text-white",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const iconVariants = cva("size-5", {
  variants: {
    variant: {
      default: "fill-primary text-white",
      highlighted: "fill-white text-black",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const secondaryTextVariants = cva("text-neutral-700", {
  variants: {
    variant: {
      default: "text-neutral-700",
      highlighted: "text-neutral-300",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const badgeVariants = cva("text-black text-xs font-normal p-1", {
  variants: {
    variant: {
      default: "bg-primary/20",
      highlighted: "bg-[#FB7970]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

// Types
interface Props extends VariantProps<typeof pricingCardVariants> {
  badge?: string | null;
  price: string;
  features: string[];
  title: string;
  description?: string | null;
  priceSuffix: string;
  className?: string;
  buttonText: string;
  onClick: () => void;
  currency?: string;
}

// Utility Functions
const formatCurrency = (price: string, currency: string = DEFAULT_CURRENCY) => {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(Number(price));
};

// Sub-Components
const PricingCardHeader = ({
  title,
  badge,
  description,
  variant,
}: {
  title: string;
  badge?: string | null;
  description?: string | null;
  variant: "default" | "highlighted" | null | undefined;
}) => (
  <div className="flex flex-col gap-y-2">
    <div className="flex items-center gap-x-2">
      <h6 className="font-medium text-xl">{title}</h6>
      {badge && (
        <Badge className={cn(badgeVariants({ variant }))}>{badge}</Badge>
      )}
    </div>
    {description && (
      <p className={cn("text-xs", secondaryTextVariants({ variant }))}>
        {description}
      </p>
    )}
  </div>
);

const PricingCardPrice = ({
  price,
  priceSuffix,
  variant,
  currency,
}: {
  price: string;
  priceSuffix: string;
  variant: "default" | "highlighted" | null | undefined;
  currency?: string;
}) => (
  <div className="flex shrink-0 gap-x-0.5 items-end">
    <h4 className="font-medium text-3xl">{formatCurrency(price, currency)}</h4>
    <span className={cn(secondaryTextVariants({ variant }))}>
      {priceSuffix}
    </span>
  </div>
);

const PricingCardFeatures = ({
  features,
  variant,
}: {
  features: string[];
  variant: "default" | "highlighted" | null | undefined;
}) => (
  <div className="flex flex-col gap-y-2 mt-6">
    <p className="uppercase font-medium">Features</p>
    <ul
      className={cn(
        "flex flex-col gap-y-2.5",
        secondaryTextVariants({ variant })
      )}
    >
      {features.map((feature) => (
        <li key={feature} className="flex items-center gap-x-2.5">
          <CircleCheckIcon className={cn(iconVariants({ variant }))} />
          {feature}
        </li>
      ))}
    </ul>
  </div>
);

// Main Component
export const PricingCard = ({
  badge,
  price,
  features,
  title,
  description,
  priceSuffix,
  className,
  buttonText,
  onClick,
  variant,
  currency,
}: Props) => {
  return (
    <div className={cn(pricingCardVariants({ variant }), className, "border")}>
      <div className="flex items-end justify-between gap-x-4">
        <PricingCardHeader
          title={title}
          badge={badge}
          description={description}
          variant={variant}
        />
        <PricingCardPrice
          price={price}
          priceSuffix={priceSuffix}
          variant={variant}
          currency={currency}
        />
      </div>

      <div className="py-6">
        <Separator className={cn(SEPARATOR_OPACITY, "text-[#5D6B68]")} />
      </div>

      <Button
        variant={variant === "highlighted" ? "default" : "outline"}
        onClick={onClick}
        className="w-full"
        size="lg"
      >
        {buttonText}
      </Button>

      <PricingCardFeatures features={features} variant={variant} />
    </div>
  );
};
