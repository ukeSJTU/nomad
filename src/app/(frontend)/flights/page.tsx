import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { type CityData, getAllCities } from "@/lib/queries/cities";
import {
  getRecentSearchHistory,
  type SearchHistoryRecord,
} from "@/lib/queries/flight-search-history";

import { FlightsPageClient } from "./page.client";

export default async function FlightsPage({
  searchParams,
}: {
  searchParams: { tab?: string };
}) {
  const tab = searchParams?.tab ?? "domestic";
  const isDomestic = tab === "domestic";

  // Fetch city data on the server (only for domestic tab)
  const cities: CityData[] = isDomestic ? await getAllCities() : [];

  // Fetch search history for logged-in users (only for domestic tab)
  let searchHistory: SearchHistoryRecord[] = [];
  if (isDomestic) {
    const headersList = await headers();
    const session = await auth.api.getSession({ headers: headersList });
    searchHistory = session?.user?.id
      ? await getRecentSearchHistory(session.user.id, 6)
      : [];
  }

  // Pass data to Client Component via props
  return <FlightsPageClient cities={cities} searchHistory={searchHistory} />;
}
