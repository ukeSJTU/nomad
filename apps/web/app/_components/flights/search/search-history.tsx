"use client";

import { Badge } from "@nomad/ui/components/primitives/badge";
import { Card } from "@nomad/ui/components/primitives/card";
import { cn } from "@nomad/ui/lib/utils";
import { ArrowLeftRight, ArrowRight } from "lucide-react";
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

  return (
    <Card
      className="p-4 hover:shadow-lg transition-shadow cursor-pointer max-w-2xl"
      onClick={handleClick}
    >
      <div className="flex items-start justify-between gap-4">
        {/* Left section - Route and Date */}
        <div className="flex-1 space-y-2">
          {/* Route */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-lg font-semibold whitespace-nowrap">
              {record.departureCityName}
            </span>
            {record.tripType === "round-trip" ? (
              <ArrowLeftRight className="h-4 w-4 text-gray-400 shrink-0" />
            ) : (
              <ArrowRight className="h-4 w-4 text-gray-400 shrink-0" />
            )}
            <span className="text-lg font-semibold whitespace-nowrap">
              {record.arrivalCityName}
            </span>
          </div>

          {/* Date Info */}
          <div className="text-sm text-gray-500 whitespace-nowrap">
            {record.tripType === "one-way" ? (
              // One-way: "2025-10-30 周四"
              <span>{formatOneWayDate(record.departureDate)}</span>
            ) : (
              // Round-trip: "10-30 去  11-02 回"
              <span>
                {formatRoundTripDate(record.departureDate, "departure")}
                {"  "}
                {record.returnDate &&
                  formatRoundTripDate(record.returnDate, "return")}
              </span>
            )}
          </div>
        </div>

        {/* Right section - Price */}
        {record.currentLowestPrice && record.currentLowestPrice !== "0" && (
          <div className="text-right space-y-1 shrink-0">
            <div className="text-xl font-bold text-orange-500">
              ¥
              {formatCurrencyWithoutSymbol(
                Math.round(parseCurrency(record.currentLowestPrice).value)
              )}
              <span className="text-xs font-normal text-gray-500 ml-1">起</span>
            </div>
            {priceStatus && (
              <Badge
                variant="secondary"
                className={cn(
                  "text-xs hover:bg-gray-100",
                  priceStatus.colorClass
                )}
              >
                {priceStatus.label}
              </Badge>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
