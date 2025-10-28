"use client";

import { useRouter } from "next/navigation";

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

export default function FlightsPage() {
  const router = useRouter();

  const handleSearch = (data: SearchFormData) => {
    // 构建搜索参数
    const params = new URLSearchParams();
    params.set("tripType", data.tripType);
    params.set("from", data.departureCity);
    params.set("to", data.arrivalCity);
    if (data.departureDate) {
      params.set("departDate", data.departureDate.toISOString().split("T")[0]);
    }
    if (data.returnDate && data.tripType === "round-trip") {
      params.set("returnDate", data.returnDate.toISOString().split("T")[0]);
    }
    params.set("class", data.seatClass);

    // 跳转到搜索结果页面
    router.push(`/flights/search?${params.toString()}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Page Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">机票搜索</h1>
        <p className="text-muted-foreground">搜索并预订您的理想航班</p>
      </div>

      {/* Search Form Card */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>搜索航班</CardTitle>
          <CardDescription>请填写您的出行信息</CardDescription>
        </CardHeader>
        <CardContent>
          <SearchForm showSearchButton onSearch={handleSearch} />
        </CardContent>
      </Card>

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
