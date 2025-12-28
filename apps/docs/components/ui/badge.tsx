import type { AcceptanceStep, Priority } from "@nomad/requirements/types";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors whitespace-nowrap",
  {
    variants: {
      variant: {
        // Priority badges - using Tailwind's built-in colors with dark mode support
        "must-have":
          "bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300",
        "should-have":
          "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
        "could-have":
          "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300",
        "wont-have": "bg-fd-muted text-fd-muted-foreground",

        // Step type badges (BDD style)
        given:
          "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 uppercase",
        when: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 uppercase",
        then: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 uppercase",
        and: "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/30 dark:text-fuchsia-300 uppercase",
        but: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 uppercase",

        // Generic variants
        default: "bg-fd-secondary text-fd-secondary-foreground",
        outline: "border border-fd-border bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

// Helper functions for type conversion
export function getPriorityVariant(
  priority: Priority
): VariantProps<typeof badgeVariants>["variant"] {
  const variantMap: Record<
    Priority,
    VariantProps<typeof badgeVariants>["variant"]
  > = {
    "Must Have": "must-have",
    "Should Have": "should-have",
    "Could Have": "could-have",
    "Won't Have": "wont-have",
  };
  return variantMap[priority];
}

export function getStepVariant(
  stepType: AcceptanceStep["type"]
): VariantProps<typeof badgeVariants>["variant"] {
  return stepType; // Direct mapping
}

export { Badge, badgeVariants };
