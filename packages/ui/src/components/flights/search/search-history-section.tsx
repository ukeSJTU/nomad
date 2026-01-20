"use client";

import { Button } from "@ukesjtu/nomad-ui/components/primitives/button";
import { Trash2 } from "lucide-react";

import { SearchHistoryCard } from "./search-history-card";
import type { SearchHistorySectionProps } from "./types";

export { type SearchHistorySectionProps } from "./types";

export function SearchHistorySection({
  searchHistory,
  formatPrice,
  formatDate,
  getPriceStatus,
  onHistoryClick,
  onClearHistory,
  isClearing,
}: SearchHistorySectionProps) {
  return (
    <>
      {/* Search History Section */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">你搜索过的机票</h2>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-muted-foreground hover:text-foreground"
          onClick={onClearHistory}
          disabled={isClearing || searchHistory.length === 0}
        >
          <Trash2 className="h-4 w-4" />
          {isClearing ? "清空中..." : "清空历史"}
        </Button>
      </div>
      {searchHistory.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>暂无搜索历史</p>
          <p className="text-sm mt-2">
            开始搜索航班后，您的搜索记录将显示在这里
          </p>
        </div>
      ) : (
        <div className="relative">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {searchHistory.map(record => {
              const formattedPrice = formatPrice(
                record.currentLowestPrice || "0"
              );
              const priceStatus = getPriceStatus(
                record.lowestPriceAtSearch,
                record.currentLowestPrice
              );
              const formattedDate = formatDate(
                record.departureDate,
                record.tripType,
                record.returnDate
              );

              return (
                <div key={record.id} className="shrink-0">
                  <SearchHistoryCard
                    record={record}
                    formattedPrice={formattedPrice}
                    priceStatus={priceStatus}
                    formattedDate={formattedDate}
                    onClick={() => onHistoryClick(record)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
