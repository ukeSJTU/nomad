"use client";

import {
  DatePriceSelector,
  type DatePriceSelectorProps,
} from "@nomad/ui/components/flights/search";
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
  from: string;
  to: string;
  departureDate: string;
  returnDate?: string;
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
  const [prices, setPrices] = useState<DatePriceSelectorProps["prices"]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentCenterDate, setCurrentCenterDate] = useState(departureDate);

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
        setPrices(result.map(mapPriceToViewModel));
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

  const mapPriceToViewModel = (price: QuickDatePrice) => ({
    date: price.date,
    returnDate: price.returnDate,
    formattedReturnDate:
      price.returnDate != null
        ? `返 ${new Date(price.returnDate).getMonth() + 1}/${new Date(price.returnDate).getDate()}`
        : undefined,
    lowestPrice: price.lowestPrice,
    selected: price.date === departureDate,
    formattedDate: formatDateWithWeekday(new Date(price.date)),
    formattedPrice:
      price.lowestPrice !== null
        ? formatCurrency(Math.round(price.lowestPrice))
        : "无",
  });

  const handleSelectDate = (date: string) => {
    startTransition(() => {
      const params = new URLSearchParams();
      params.set("tripType", tripType);
      params.set("from", from);
      params.set("to", to);
      params.set("departDate", date);
      if (tripType === "round-trip" && returnDate) {
        params.set("returnDate", returnDate);
      }
      params.set("class", classType?.toLowerCase() || "any");

      router.push(`/flights/search?${params.toString()}`);
    });
  };

  const handlePrevRange = () => {
    const currentDate = new Date(currentCenterDate);
    currentDate.setDate(currentDate.getDate() - 7);
    setCurrentCenterDate(dateToLocalDateString(currentDate));
  };

  const handleNextRange = () => {
    const currentDate = new Date(currentCenterDate);
    currentDate.setDate(currentDate.getDate() + 7);
    setCurrentCenterDate(dateToLocalDateString(currentDate));
  };

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

  return (
    <DatePriceSelector
      canNext={canGoNext()}
      canPrev={canGoPrev()}
      isPending={isPending}
      loading={isLoading}
      onNextRange={handleNextRange}
      onPrevRange={handlePrevRange}
      onSelect={handleSelectDate}
      prices={prices}
      tripType={tripType}
    />
  );
}
