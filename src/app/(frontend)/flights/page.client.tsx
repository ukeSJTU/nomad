"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { UnderConstruction } from "@/components/common";
import {
  SearchForm,
  type SearchFormData,
} from "@/components/flights/search-form";
import { FlightSearchHistoryCard } from "@/components/flights/search-history";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { CityData } from "@/lib/queries/cities";
import type { SearchHistoryRecord } from "@/lib/queries/flight-search-history";

interface FlightsPageClientProps {
  cities: CityData[];
  searchHistory: SearchHistoryRecord[];
}

export function FlightsPageClient({
  cities,
  searchHistory,
}: FlightsPageClientProps) {
  const router = useRouter();

  const handleSearch = (data: SearchFormData) => {
    // Build search parameters
    const params = new URLSearchParams();
    params.set("tripType", data.tripType);
    if (data.departureCity) {
      params.set("from", data.departureCity.iataCode);
    }
    if (data.arrivalCity) {
      params.set("to", data.arrivalCity.iataCode);
    }
    if (data.departureDate) {
      params.set("departDate", data.departureDate.toISOString().split("T")[0]);
    }
    if (data.returnDate && data.tripType === "round-trip") {
      params.set("returnDate", data.returnDate.toISOString().split("T")[0]);
    }
    params.set("class", data.seatClass);

    // Navigate to search results page
    router.push(`/flights/search?${params.toString()}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-8xl">
      {/* Search Form Card */}

      <Tabs defaultValue="domestic">
        <TabsList className="w-full h-12 grid grid-cols-6">
          <TabsTrigger value="domestic">国内、国际/中国港澳台</TabsTrigger>
          <TabsTrigger value="special">特价机票</TabsTrigger>
          <TabsTrigger value="status">航班动态</TabsTrigger>
          <TabsTrigger value="seat">在线选座</TabsTrigger>
          <TabsTrigger value="refund">退票改签</TabsTrigger>
          <TabsTrigger value="more">更多服务</TabsTrigger>
        </TabsList>

        <TabsContent value="domestic">
          <SearchForm
            showSearchButton
            onSearch={handleSearch}
            cities={cities}
          />
        </TabsContent>

        <TabsContent value="special">
          <UnderConstruction
            title="未实现"
            description="特价机票功能不在项目实现范围内"
          />
        </TabsContent>

        <TabsContent value="status">
          <UnderConstruction
            title="未实现"
            description="航班动态功能不在项目实现范围内"
          />
        </TabsContent>

        <TabsContent value="seat">
          <UnderConstruction
            title="未实现"
            description="在线选座功能不在项目实现范围内"
          />
        </TabsContent>

        <TabsContent value="refund">
          <UnderConstruction
            title="未实现"
            description="退票改签功能不在项目实现范围内"
          />
        </TabsContent>

        <TabsContent value="more">
          <UnderConstruction
            title="未实现"
            description="更多服务功能不在项目实现范围内"
          />
        </TabsContent>
      </Tabs>

      {/* Search History Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Label>你搜索过的机票</Label>
          <Button
            variant="link"
            size="lg"
            className="gap-2"
            onClick={() => {
              // TODO: Implement clear history logic
              console.log("Clear search history");
            }}
          >
            <Trash2 className="h-4 w-4" />
            清空历史
          </Button>
        </div>
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
    </div>
  );
}
