"use client";

import { Button } from "@nomad/ui/components/button";
import { Skeleton } from "@nomad/ui/components/skeleton";
import { cn } from "@nomad/ui/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { getQuickDatePrices } from "@/app/_actions/quick-date-prices";
import { createClientLogger } from "@/infra/logging/client-logger";
import {
  dateToLocalDateString,
  formatCurrency,
  formatDateWithWeekday,
} from "@/lib/format";
import { type QuickDatePrice } from "@/types/dto";

const logger = createClientLogger({ module: "quick-date-selector" });

interface QuickDateSelectorProps {
  from: string; // Departure city IATA code
  to: string; // Arrival city IATA code
  departureDate: string; // Current selected departure date (YYYY-MM-DD)
  returnDate?: string; // Current selected return date for round-trip (YYYY-MM-DD)
  tripType: "one-way" | "round-trip";
  classType?: "ECONOMY" | "BUSINESS" | "FIRST";
}

export function QuickDateSelector({
  from,
  to,
  departureDate,
  returnDate,
  tripType,
  classType,
}: QuickDateSelectorProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [prices, setPrices] = useState<QuickDatePrice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentCenterDate, setCurrentCenterDate] = useState(departureDate);

  // Fetch prices when component mounts or when parameters change
  useEffect(() => {
    const fetchPrices = async () => {
      setIsLoading(true);
      try {
        const result = await getQuickDatePrices({
          from,
          to,
          departureDate: currentCenterDate,
          returnDate,
          tripType,
          classType,
        });
        setPrices(result);
      } catch (error) {
        logger.error(
          { err: error, from, to, departureDate: currentCenterDate },
          "Failed to fetch quick date prices"
        );
        setPrices([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrices();
  }, [from, to, currentCenterDate, returnDate, tripType, classType]);

  // Handle clicking on a date item
  const handleDateClick = (price: QuickDatePrice) => {
    if (price.lowestPrice === null) {
      // No flights available for this date
      return;
    }

    // Build new search URL with the selected date
    const params = new URLSearchParams();
    params.set("tripType", tripType);
    params.set("from", from);
    params.set("to", to);
    params.set("departDate", price.date);
    if (tripType === "round-trip" && price.returnDate) {
      params.set("returnDate", price.returnDate);
    }
    params.set("class", classType?.toLowerCase() || "any");

    // Navigate to new search
    startTransition(() => {
      router.push(`/flights/search?${params.toString()}`);
    });
  };

  // Handle navigation arrows
  const handlePrevWeek = () => {
    const currentDate = new Date(currentCenterDate);
    currentDate.setDate(currentDate.getDate() - 7);
    setCurrentCenterDate(dateToLocalDateString(currentDate));
  };

  const handleNextWeek = () => {
    const currentDate = new Date(currentCenterDate);
    currentDate.setDate(currentDate.getDate() + 7);
    setCurrentCenterDate(dateToLocalDateString(currentDate));
  };

  // Check if we can navigate (based on booking window)
  const canGoPrev = () => {
    if (prices.length === 0) return false;
    const firstDate = new Date(prices[0].date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return firstDate > today;
  };

  const canGoNext = () => {
    if (prices.length === 0) return false;
    const lastDate = new Date(prices[prices.length - 1].date);
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 365);
    return lastDate < maxDate;
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-4 pb-2">
        <Skeleton className="h-8 w-8 shrink-0 rounded" />
        <div className="flex items-center gap-1.5 flex-1 justify-around">
          {[1, 2, 3, 4, 5, 6, 7].map(i => (
            <div key={i} className="flex-1 min-w-0 max-w-32">
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
      {/* Left Arrow */}
      <Button
        variant="outline"
        size="icon"
        className="shrink-0 h-8 w-8"
        onClick={handlePrevWeek}
        disabled={!canGoPrev() || isPending}
        aria-label="Previous week"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* Date Items */}
      <div className="flex items-center gap-1.5 flex-1 justify-around">
        {prices.map((price, index) => {
          const isSelected = price.date === departureDate;
          const isAvailable = price.lowestPrice !== null;

          return (
            <div key={price.date} className="flex-1 min-w-0 max-w-32">
              <button
                onClick={() => handleDateClick(price)}
                disabled={!isAvailable || isPending}
                className={cn(
                  "flex flex-col items-center justify-center",
                  "w-full h-16 rounded-lg border-2 transition-all",
                  "hover:shadow-md disabled:cursor-not-allowed",
                  isSelected
                    ? "border-primary bg-primary/10 font-semibold"
                    : "border-border bg-background hover:border-primary/50",
                  !isAvailable && "opacity-50 bg-muted"
                )}
              >
                {/* Date */}
                <div className="text-xs text-muted-foreground">
                  {formatDateWithWeekday(new Date(price.date))}
                </div>

                {/* Return date for round-trip */}
                {tripType === "round-trip" && price.returnDate && (
                  <div className="text-xs text-muted-foreground mt-0.5">
                    返 {new Date(price.returnDate).getMonth() + 1}/
                    {new Date(price.returnDate).getDate()}
                  </div>
                )}

                {/* Price */}
                <div className="text-sm font-medium mt-0.5">
                  {isAvailable ? (
                    <span className="font-bold text-orange-500">
                      {formatCurrency(Math.round(price.lowestPrice ?? 0))}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">无</span>
                  )}
                </div>
              </button>

              {/* Vertical separator (except for last item) */}
              {index < prices.length - 1 && (
                <div className="absolute top-0 right-0 h-full w-px bg-border" />
              )}
            </div>
          );
        })}
      </div>

      {/* Right Arrow */}
      <Button
        variant="outline"
        size="icon"
        className="shrink-0 h-8 w-8"
        onClick={handleNextWeek}
        disabled={!canGoNext() || isPending}
        aria-label="Next week"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
