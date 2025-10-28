"use client";

import { ArrowRight, Calendar, Clock, Filter, SortAsc } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { SearchForm } from "@/components/flights/search-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import type { CityData } from "@/lib/queries/cities";

interface FlightSearchPageClientProps {
  cities: CityData[];
}

export function FlightSearchPageClient({
  cities,
}: FlightSearchPageClientProps) {
  const searchParams = useSearchParams();
  const [lastUpdateTime, setLastUpdateTime] = useState<Date>(new Date());

  useEffect(() => {
    // 模拟更新时间
    setLastUpdateTime(new Date());
  }, [searchParams]);

  // 从 URL 参数获取搜索信息
  const tripType = searchParams.get("tripType") || "one-way";
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";
  const departDate = searchParams.get("departDate") || "";
  const returnDate = searchParams.get("returnDate") || "";
  const seatClass = searchParams.get("class") || "economy";

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* 1. Search Form (filled with URL params, no search button) */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <SearchForm showSearchButton={false} cities={cities} />
        </CardContent>
      </Card>

      {/* 2. Quick Date Selector */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className="text-sm font-medium shrink-0">快速选择日期:</span>
            {/* Skeleton placeholders for date options */}
            {[1, 2, 3, 4, 5, 6, 7].map(i => (
              <Skeleton key={i} className="h-16 w-24 shrink-0" />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 3. Search Info + Last Update Time */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          <div className="font-medium">
            {from || "出发地"} <ArrowRight className="inline h-4 w-4 mx-1" />{" "}
            {to || "目的地"}
          </div>
          <Separator orientation="vertical" className="h-4" />
          <div className="text-muted-foreground">
            {departDate || "未选择日期"}
            {tripType === "round-trip" && returnDate && ` - ${returnDate}`}
          </div>
          <Separator orientation="vertical" className="h-4" />
          <div className="text-muted-foreground">
            {seatClass === "economy" && "经济舱"}
            {seatClass === "premium-economy" && "超级经济舱"}
            {seatClass === "business" && "商务舱"}
            {seatClass === "first" && "头等舱"}
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>更新于 {lastUpdateTime.toLocaleTimeString("zh-CN")}</span>
        </div>
      </div>

      {/* 4. Search Toolbar (Filtering and Sorting) */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              筛选
            </Button>
            <Button variant="outline" size="sm">
              <SortAsc className="h-4 w-4 mr-2" />
              排序
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex gap-2 flex-wrap">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-20" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 5. Search Results Cards */}
      <div className="space-y-4">
        {/* Skeleton placeholders for flight results */}
        {[1, 2, 3, 4, 5].map(i => (
          <Card key={i} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex-1 grid grid-cols-3 gap-4">
                  {/* Departure */}
                  <div className="space-y-1">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  {/* Duration */}
                  <div className="flex flex-col items-center space-y-1">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-1 w-full" />
                    <Skeleton className="h-3 w-12" />
                  </div>
                  {/* Arrival */}
                  <div className="space-y-1 text-right">
                    <Skeleton className="h-6 w-16 ml-auto" />
                    <Skeleton className="h-4 w-20 ml-auto" />
                  </div>
                </div>
                <div className="ml-8">
                  <Skeleton className="h-10 w-24" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results Message (hidden by default, shown when no results) */}
      {false && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>未找到航班</CardTitle>
            <CardDescription>
              抱歉,没有找到符合您搜索条件的航班。请尝试调整搜索条件。
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  );
}
