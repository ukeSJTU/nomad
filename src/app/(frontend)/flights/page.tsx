import { getAllCities } from "@/lib/queries/cities";

import { FlightsPageClient } from "./page.client";

export default async function FlightsPage() {
  // 在服务端获取城市数据
  const cities = await getAllCities();

  // 传递给 Client Component
  return <FlightsPageClient cities={cities} />;
}
