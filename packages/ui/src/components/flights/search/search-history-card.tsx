"use client";

import { Badge } from "@nomad/ui/components/primitives/badge";
import { Card } from "@nomad/ui/components/primitives/card";
import { cn } from "@nomad/ui/lib/utils";
import { ArrowLeftRight, ArrowRight } from "lucide-react";

import type { SearchHistoryCardProps } from "./types";

export { type SearchHistoryCardProps } from "./types";

export function SearchHistoryCard({
  record,
  formattedPrice,
  priceStatus,
  formattedDate,
  onClick,
}: SearchHistoryCardProps) {
  return (
    <Card
      className="p-4 hover:shadow-lg transition-shadow cursor-pointer max-w-2xl"
      onClick={onClick}
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
            <span>{formattedDate}</span>
          </div>
        </div>

        {/* Right section - Price */}
        {record.currentLowestPrice && record.currentLowestPrice !== "0" && (
          <div className="text-right space-y-1 shrink-0">
            <div className="text-xl font-bold text-orange-500">
              ¥{formattedPrice}
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
