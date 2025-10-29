"use client";

import { Calendar, Clock, Filter, SortAsc } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { FlightCardSkeleton } from "@/components/flights/flight-card-skeleton";
import {
  SearchForm,
  type SearchFormData,
} from "@/components/flights/search-form";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { CityData } from "@/lib/queries/cities";
import { formatDateWithWeekday, formatTime } from "@/utils/date";

interface FlightSearchPageClientProps {
  cities: CityData[];
}

export function FlightSearchPageClient({
  cities,
}: FlightSearchPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [lastUpdateTime, setLastUpdateTime] = useState<Date>(new Date());

  // Parse and validate URL parameters
  const parsedParams = useMemo(() => {
    const tripType = searchParams.get("tripType");
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const departDate = searchParams.get("departDate");
    const returnDate = searchParams.get("returnDate");
    const seatClass = searchParams.get("class");

    // Validate required params
    if (!tripType || !from || !to || !departDate || !seatClass) {
      return null;
    }

    // Find matching cities
    const departureCity = cities.find(city => city.iataCode === from);
    const arrivalCity = cities.find(city => city.iataCode === to);

    if (!departureCity || !arrivalCity) {
      return null;
    }

    return {
      tripType: tripType as "one-way" | "round-trip",
      departureCity,
      arrivalCity,
      departureDate: new Date(departDate),
      returnDate: returnDate ? new Date(returnDate) : undefined,
      seatClass,
    };
  }, [searchParams, cities]);

  // Redirect to /flights if params are invalid
  useEffect(() => {
    if (!parsedParams) {
      router.replace("/flights");
    }
  }, [parsedParams, router]);

  useEffect(() => {
    // Update last refresh time when search params change
    if (parsedParams) {
      setLastUpdateTime(new Date());
    }
  }, [searchParams, parsedParams]);

  // Handle form changes (auto-search)
  const handleFormChange = (data: SearchFormData) => {
    // The SearchForm component already validates required fields before calling onChange
    // So we can safely build the URL here
    const params = new URLSearchParams();
    params.set("tripType", data.tripType);
    params.set("from", data.departureCity!.iataCode);
    params.set("to", data.arrivalCity!.iataCode);
    params.set("departDate", data.departureDate!.toISOString().split("T")[0]);
    if (data.returnDate && data.tripType === "round-trip") {
      params.set("returnDate", data.returnDate.toISOString().split("T")[0]);
    }
    params.set("class", data.seatClass);

    const newUrl = `/flights/search?${params.toString()}`;
    const currentUrl = `/flights/search?${searchParams.toString()}`;

    // Only navigate if the URL actually changed
    if (newUrl !== currentUrl) {
      router.push(newUrl);
    }
  };

  // If params are invalid, show nothing (will redirect)
  if (!parsedParams) {
    return null;
  }

  // Get display values from parsed params
  const {
    tripType,
    departureCity,
    arrivalCity,
    departureDate,
    returnDate,
    seatClass,
  } = parsedParams;

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* 1. Search Form (filled with URL params, no search button) */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <SearchForm
            showSearchButton={false}
            cities={cities}
            initialValues={{
              tripType,
              departureCity,
              arrivalCity,
              departureDate,
              returnDate,
              seatClass,
            }}
            onChange={handleFormChange}
          />
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
        {/* Left: Trip Info */}
        {tripType === "one-way" ? (
          // One-way trip: Enhanced text display with hierarchy
          <div className="flex items-baseline gap-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              单程
            </span>
            <span className="text-lg font-semibold text-foreground">
              {departureCity.name}
            </span>
            <span className="text-base text-muted-foreground">→</span>
            <span className="text-lg font-semibold text-foreground">
              {arrivalCity.name}
            </span>
            <Separator orientation="vertical" className="h-5" />
            <span className="text-sm font-medium text-muted-foreground">
              {formatDateWithWeekday(departureDate)}
            </span>
          </div>
        ) : (
          // Round-trip: Tabs for outbound and return with enhanced styling
          <Tabs defaultValue="outbound" className="w-auto">
            <TabsList className="h-auto">
              <TabsTrigger
                value="outbound"
                className="flex-col items-start py-2 px-3"
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    1
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-wide opacity-70">
                    选择去程
                  </span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-sm font-semibold">
                    {departureCity.name}
                  </span>
                  <span className="text-xs opacity-60">→</span>
                  <span className="text-sm font-semibold">
                    {arrivalCity.name}
                  </span>
                  <span className="text-xs font-medium opacity-70 ml-1">
                    {formatDateWithWeekday(departureDate)}
                  </span>
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="return"
                className="flex-col items-start py-2 px-3"
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    2
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-wide opacity-70">
                    选择返程
                  </span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-sm font-semibold">
                    {arrivalCity.name}
                  </span>
                  <span className="text-xs opacity-60">→</span>
                  <span className="text-sm font-semibold">
                    {departureCity.name}
                  </span>
                  <span className="text-xs font-medium opacity-70 ml-1">
                    {returnDate && formatDateWithWeekday(returnDate)}
                  </span>
                </div>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        )}

        {/* Right: Last Update Time with Tooltip */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-2 text-sm text-muted-foreground cursor-help hover:text-foreground transition-colors">
              <Clock className="h-4 w-4" />
              <div className="flex flex-col items-end">
                <span className="text-[10px] uppercase tracking-wide opacity-60">
                  最近更新
                </span>
                <span className="text-sm font-mono font-semibold">
                  {formatTime(lastUpdateTime)}
                </span>
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>机票价格变动频繁，搜索结果有效期15min。</p>
          </TooltipContent>
        </Tooltip>
      </div>

      {/* 4. Search Toolbar (Filtering and Sorting) - Sticky */}
      <div className="sticky top-0 z-10 bg-background pb-6">
        <Card>
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
      </div>

      {/* 5. Search Results Cards */}
      <div className="space-y-4">
        {/* Skeleton placeholders for flight results */}
        {[1, 2, 3, 4, 5].map(i => (
          <FlightCardSkeleton key={i} />
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
