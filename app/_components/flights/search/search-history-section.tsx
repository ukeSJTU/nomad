"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { clearSearchHistoryAction } from "@/app/_actions";
import { Button } from "@/components/ui/button";
import type { SearchHistoryRecord } from "@/types/dto";

import { FlightSearchHistoryCard } from "./search-history";

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

  return (
    <>
      {/* Search History Section */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">你搜索过的机票</h2>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-muted-foreground hover:text-foreground"
          onClick={handleClearHistory}
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
            {searchHistory.map(record => (
              <div key={record.id} className="shrink-0">
                <FlightSearchHistoryCard record={record} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
