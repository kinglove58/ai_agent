import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { CircleCheckIcon } from "lucide-react";

const PricingCardVariants = cva("rounded-lg p-4 py-6 w-full", {
  variants: {
    variant: {
      default: "bg-white text-black",
      highlighted: "bg-linear-to-br from-[#093C23] to-[#051B16] text-white ",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const PricingCardIconVariants = cva("size-5", {
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
const PricingCardSecondaryTextVariants = cva("text-neutral-700", {
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

const PricingCardBadgeVariants = cva("text-black text-xs font-normal p-1", {
  variants: {
    variant: {
      default: "bg-primary/20",
      highlighted: "bg-[#FB797]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface Props extends VariantProps<typeof PricingCardVariants> {
  badge?: string | null;
  price: string;
  features: string[];
  title: string;
  description?: string | null;
  priceSuffix: string;
  className?: string;
  buttonText: string;
  onClick: () => void;
}

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
}: Props) => {
  return (
    <div className={cn(PricingCardVariants({ variant }), className, "border")}>
      <div className="flex items-end justify-between gap-x-4">
        <div className="flex flex-col gap-y-2">
          <div className="flex items-center gap-x-2">
            <h6 className="font-medium text-xl">{title} </h6>
            {badge ? (
              <Badge className={cn(PricingCardBadgeVariants({ variant }))}>
                {badge}{" "}
              </Badge>
            ) : null}
          </div>
          <p
            className={cn(
              "text-xs",
              PricingCardSecondaryTextVariants({ variant })
            )}
          >
            {description}
          </p>
        </div>
        <div className="flex shrink-0 gap-x-0.5 items-end">
          <h4 className="font-medium text-3xl">
            {Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
            }).format(Number(price))}
          </h4>
          <span className={cn(PricingCardSecondaryTextVariants({ variant }))}>
            {priceSuffix}
          </span>
        </div>
      </div>
      <div className="py-6">
        <Separator className="opacity-10 text-[#5D6B68]" />
      </div>
      <Button
        variant={variant === "highlighted" ? "default" : "outline"}
        onClick={onClick}
        className="w-full"
        size="lg"
      >
        {buttonText}
      </Button>
      <div className="flex flex-col gap-y-2 mt-6">
        <p className="uppercase font-medium">Features</p>
        <ul
          className={cn(
            "flex flex-col gap-y-2.5",
            PricingCardSecondaryTextVariants({ variant })
          )}
        >
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-x-2.5">
              <CircleCheckIcon
                className={cn(PricingCardIconVariants({ variant }))}
              />{" "}
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
