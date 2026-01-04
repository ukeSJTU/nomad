"use client";

import { Button } from "@nomad/ui/components/primitives/button";
import { Skeleton } from "@nomad/ui/components/primitives/skeleton";
import { cn } from "@nomad/ui/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ============================================================
// Types
// ============================================================

type PriceItem = {
  date: string;
  returnDate?: string;
  formattedReturnDate?: string;
  lowestPrice: number | null;
  selected?: boolean;
  formattedDate: string;
  formattedPrice: string;
};

export type DatePriceSelectorProps = {
  prices: PriceItem[];
  loading: boolean;
  isPending?: boolean;
  canPrev: boolean;
  canNext: boolean;
  tripType: "one-way" | "round-trip";
  onPrevRange: () => void;
  onNextRange: () => void;
  onSelect: (date: string) => void;
};

// ============================================================
// Component
// ============================================================

export function DatePriceSelector({
  prices,
  loading,
  isPending = false,
  canPrev,
  canNext,
  tripType,
  onPrevRange,
  onNextRange,
  onSelect,
}: DatePriceSelectorProps) {
  if (loading) {
    return (
      <div className="flex items-center gap-4 pb-2">
        <Skeleton className="h-8 w-8 shrink-0 rounded" />
        <div className="flex flex-1 items-center justify-around gap-1.5">
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className="min-w-0 max-w-32 flex-1">
              <Skeleton className="h-16 w-full rounded-lg" />
            </div>
          ))}
        </div>
        <Skeleton className="h-8 w-8 shrink-0 rounded" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 pb-2">
      <Button
        aria-label="Previous range"
        className="h-8 w-8 shrink-0"
        disabled={!canPrev || isPending}
        onClick={onPrevRange}
        size="icon"
        variant="outline"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className="flex flex-1 items-center justify-around gap-1.5">
        {prices.map((price, index) => {
          const isSelected = price.selected;
          const isAvailable = price.lowestPrice !== null;

          return (
            <div key={price.date} className="relative min-w-0 max-w-32 flex-1">
              <button
                className={cn(
                  "flex h-16 w-full flex-col items-center justify-center rounded-lg border-2 transition-all",
                  "hover:shadow-md disabled:cursor-not-allowed",
                  isSelected
                    ? "border-primary bg-primary/10 font-semibold"
                    : "border-border bg-background hover:border-primary/50",
                  !isAvailable && "bg-muted opacity-50"
                )}
                disabled={!isAvailable || isPending}
                onClick={() => onSelect(price.date)}
              >
                <div className="text-xs text-muted-foreground">
                  {price.formattedDate}
                </div>

                {tripType === "round-trip" && price.returnDate && (
                  <div className="mt-0.5 text-xs text-muted-foreground">
                    {price.formattedReturnDate ?? price.returnDate}
                  </div>
                )}

                <div className="mt-0.5 text-sm font-medium">
                  {isAvailable ? (
                    <span className="font-bold text-orange-500">
                      {price.formattedPrice}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">无</span>
                  )}
                </div>
              </button>

              {index < prices.length - 1 && (
                <div className="absolute right-0 top-0 h-full w-px bg-border" />
              )}
            </div>
          );
        })}
      </div>

      <Button
        aria-label="Next range"
        className="h-8 w-8 shrink-0"
        disabled={!canNext || isPending}
        onClick={onNextRange}
        size="icon"
        variant="outline"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
