import { Suspense } from "react";

import { getAllCities } from "@/lib/queries/cities";

import { FlightSearchPageClient } from "./page.client";

export default async function FlightSearchPage() {
  // Fetch city data on the server
  const cities = await getAllCities();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FlightSearchPageClient cities={cities} />
    </Suspense>
  );
}
