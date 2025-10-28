import { Suspense } from "react";

import { getAllCities } from "@/lib/queries/cities";

import { FlightSearchPageClient } from "./page.client";

export default async function FlightSearchPage() {
  // 在服务端获取城市数据
  const cities = await getAllCities();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FlightSearchPageClient cities={cities} />
    </Suspense>
  );
}
