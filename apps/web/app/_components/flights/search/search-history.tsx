"use client";

import { SearchHistoryCard } from "@nomad/ui/components/flights/search";
import { useRouter } from "next/navigation";
import {
  compareCurrency,
  formatCurrencyWithoutSymbol,
  getWeekdayLabel,
  parseCurrency,
} from "@/lib/format";
import type { SearchHistoryRecord } from "@/types/dto";

interface FlightSearchHistoryCardProps {
  record: SearchHistoryRecord;
  /** Optional click handler for Storybook or custom behavior */
  onClick?: () => void;
}

export function FlightSearchHistoryCard({
  record,
  onClick,
}: FlightSearchHistoryCardProps) {
  const router = useRouter();

  // Calculate price change status using currency.js for precision
  const getPriceStatus = () => {
    if (
      !record.lowestPriceAtSearch ||
      !record.currentLowestPrice ||
      record.lowestPriceAtSearch === "0" ||
      record.currentLowestPrice === "0"
    ) {
      return null;
    }

    const original = parseCurrency(record.lowestPriceAtSearch);
    const current = parseCurrency(record.currentLowestPrice);
    const comparison = compareCurrency(current, original);

    if (comparison < 0) {
      return { label: "已降价", colorClass: "bg-green-100 text-green-700" };
    } else if (comparison > 0) {
      return { label: "已涨价", colorClass: "bg-red-100 text-red-700" };
    } else {
      return { label: "价格稳定", colorClass: "bg-gray-100 text-gray-600" };
    }
  };

  const priceStatus = getPriceStatus();

  // Format date for one-way: "2025-10-30 周四"
  const formatOneWayDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const weekday = getWeekdayLabel(date);
    return `${dateStr} ${weekday}`;
  };

  // Format date for round-trip: "10-30 去" or "11-02 回"
  const formatRoundTripDate = (
    dateStr: string,
    type: "departure" | "return"
  ) => {
    const [, month, day] = dateStr.split("-");
    const label = type === "departure" ? "去" : "回";
    return `${month}-${day} ${label}`;
  };

  // Format date based on trip type
  const formatDate = () => {
    if (record.tripType === "one-way") {
      return formatOneWayDate(record.departureDate);
    } else {
      const departure = formatRoundTripDate(record.departureDate, "departure");
      const returnPart = record.returnDate
        ? formatRoundTripDate(record.returnDate, "return")
        : "";
      return `${departure}  ${returnPart}`;
    }
  };

  // Format price
  const formatPrice = (price: string) => {
    return formatCurrencyWithoutSymbol(Math.round(parseCurrency(price).value));
  };

  // Handle card click - navigate to search page
  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }

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

  const formattedPrice = formatPrice(record.currentLowestPrice || "0");
  const formattedDate = formatDate();

  return (
    <SearchHistoryCard
      record={record}
      formattedPrice={formattedPrice}
      priceStatus={priceStatus}
      formattedDate={formattedDate}
      onClick={handleClick}
    />
  );
}
