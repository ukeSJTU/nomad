"use client";

import { useRouter } from "next/navigation";

import { UnderConstruction } from "@/components/common";
import {
  SearchForm,
  type SearchFormData,
} from "@/components/flights/search-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { CityData } from "@/lib/queries/cities";

interface FlightsPageClientProps {
  cities: CityData[];
}

export function FlightsPageClient({ cities }: FlightsPageClientProps) {
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
      <Card>
        <CardHeader>
          <CardTitle>搜索历史</CardTitle>
          <CardDescription>您最近的搜索记录</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Skeleton placeholders for search history */}
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-8" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-3 w-32" />
                </div>
                <Skeleton className="h-9 w-20" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
