import { Suspense } from "react";

import { getFlightsLandingDataAction } from "@/actions/flights";

import FlightsLoading from "./loading";
import { FlightsPageClient } from "./page.client";

export const dynamic = "force-dynamic";

export default async function FlightsPage() {
  const { cities, searchHistory } = await getFlightsLandingDataAction();

  // Pass data to Client Component via props
  // Wrap in Suspense because FlightsPageClient uses useSearchParams
  return (
    <Suspense fallback={<FlightsLoading />}>
      <FlightsPageClient cities={cities} searchHistory={searchHistory} />
    </Suspense>
  );
}
