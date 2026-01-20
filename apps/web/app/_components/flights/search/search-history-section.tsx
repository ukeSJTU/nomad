"use client";

import { SearchHistorySection } from "@ukesjtu/nomad-ui/components/flights/search";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { clearSearchHistoryAction } from "@/app/_actions";
import {
  compareCurrency,
  formatCurrencyWithoutSymbol,
  getWeekdayLabel,
  parseCurrency,
} from "@/lib/format";
import type { SearchHistoryRecord } from "@/types/dto";

interface FlightSearchHistorySectionProps {
  searchHistory: SearchHistoryRecord[];
}

export function FlightSearchHistorySection({
  searchHistory,
}: FlightSearchHistorySectionProps) {
  const router = useRouter();
  const [isClearing, setIsClearing] = useState(false);

  const handleClearHistory = async () => {
    setIsClearing(true);
    try {
      const result = await clearSearchHistoryAction();

      if (result.success) {
        toast.success(result.message);
        router.refresh(); // Refresh to update the search history display
      } else {
        toast.error(result.message);
      }
    } catch (_error) {
      toast.error("清空搜索历史失败，请稍后重试");
    } finally {
      setIsClearing(false);
    }
  };

  // Format price
  const formatPrice = (price: string) => {
    return formatCurrencyWithoutSymbol(Math.round(parseCurrency(price).value));
  };

  // Format date based on trip type
  const formatDate = (
    date: string,
    tripType: "one-way" | "round-trip",
    returnDate?: string | null
  ) => {
    if (tripType === "one-way") {
      const d = new Date(date);
      const weekday = getWeekdayLabel(d);
      return `${date} ${weekday}`;
    } else {
      const [, month, day] = date.split("-");
      const departure = `${month}-${day} 去`;

      if (returnDate) {
        const [, retMonth, retDay] = returnDate.split("-");
        const ret = `${retMonth}-${retDay} 回`;
        return `${departure}  ${ret}`;
      }

      return departure;
    }
  };

  // Calculate price status
  const getPriceStatus = (
    lowestPriceAtSearch: string | null,
    currentLowestPrice: string | null
  ) => {
    if (
      !lowestPriceAtSearch ||
      !currentLowestPrice ||
      lowestPriceAtSearch === "0" ||
      currentLowestPrice === "0"
    ) {
      return null;
    }

    const original = parseCurrency(lowestPriceAtSearch);
    const current = parseCurrency(currentLowestPrice);
    const comparison = compareCurrency(current, original);

    if (comparison < 0) {
      return { label: "已降价", colorClass: "bg-green-100 text-green-700" };
    } else if (comparison > 0) {
      return { label: "已涨价", colorClass: "bg-red-100 text-red-700" };
    } else {
      return { label: "价格稳定", colorClass: "bg-gray-100 text-gray-600" };
    }
  };

  // Handle history click - navigate to search page
  const handleHistoryClick = (record: SearchHistoryRecord) => {
    const params = new URLSearchParams();
    params.set("tripType", record.tripType);
    params.set("from", record.departureCityIata);
    params.set("to", record.arrivalCityIata);
    params.set("departDate", record.departureDate);
    if (record.returnDate) {
      params.set("returnDate", record.returnDate);
    }
    params.set("class", record.seatClass);

    router.push(`/flights/search?${params.toString()}`);
  };

  return (
    <SearchHistorySection
      searchHistory={searchHistory}
      formatPrice={formatPrice}
      formatDate={formatDate}
      getPriceStatus={getPriceStatus}
      onHistoryClick={handleHistoryClick}
      onClearHistory={handleClearHistory}
      isClearing={isClearing}
    />
  );
}
