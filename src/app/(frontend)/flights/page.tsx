import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { getAllCities } from "@/lib/queries/cities";
import { getRecentSearchHistory } from "@/lib/queries/flight-search-history";

import { FlightsPageClient } from "./page.client";

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
  return <FlightsPageClient cities={cities} searchHistory={searchHistory} />;
}
