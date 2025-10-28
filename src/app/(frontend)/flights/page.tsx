import { getAllCities } from "@/lib/queries/cities";

import { FlightsPageClient } from "./page.client";

export default async function FlightsPage() {
  // Fetch city data on the server
  const cities = await getAllCities();

  // Pass data to Client Component via props
  return <FlightsPageClient cities={cities} />;
}
