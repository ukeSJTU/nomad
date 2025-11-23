import { headers } from "next/headers";
import { Suspense } from "react";

import { auth } from "@/lib/auth";
import { getAllCities, getRecentSearchHistory } from "@/lib/queries";

import FlightsLoading from "./loading";
import { FlightsPageClient } from "./page.client";

export const dynamic = "force-dynamic";

export default async function FlightsPage() {
  // Fetch city data on the server
  const cities = await getAllCities();

  // Fetch search history for logged-in users
  const headersList = await headers();
  const session = await auth.api.getSession({ headers: headersList });
  const searchHistory = session?.user?.id
    ? await getRecentSearchHistory(session.user.id, 6)
    : [];

  // Pass data to Client Component via props
  // Wrap in Suspense because FlightsPageClient uses useSearchParams
  return (
    <Suspense fallback={<FlightsLoading />}>
      <FlightsPageClient cities={cities} searchHistory={searchHistory} />
    </Suspense>
  );
}
