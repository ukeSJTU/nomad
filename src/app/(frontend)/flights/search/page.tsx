import { redirect } from "next/navigation";
import { Suspense } from "react";

import {
  FlightSearchResult,
  RoundTripFlightSearchResult,
  searchOneWayFlights,
  searchRoundTripFlights,
} from "@/lib/queries";
import { getAllCities } from "@/lib/queries/cities";

import { FlightSearchPageClient } from "./page.client";

interface FlightSearchParams {
  tripType?: string;
  from?: string;
  to?: string;
  departDate?: string;
  returnDate?: string; // Add if you handle round trips
  class?: string;
}

export default async function FlightSearchPage({
  searchParams,
}: {
  searchParams: Promise<FlightSearchParams>;
}) {
  const params = await searchParams;

  if (!params.from || !params.to || !params.departDate) {
    redirect("/flights");
  }

  // Handle cabin class type
  const classType = params.class?.toUpperCase() as
    | "ECONOMY"
    | "BUSINESS"
    | "FIRST"
    | undefined;

  let flights: FlightSearchResult[] | RoundTripFlightSearchResult | undefined;

  try {
    if (params.tripType === "one-way") {
      // One-way flight search
      flights = await searchOneWayFlights({
        from: params.from,
        to: params.to,
        departureDate: params.departDate,
        classType,
      });
    } else if (params.tripType === "round-trip") {
      // Round-trip flight search - validate return date
      if (!params.returnDate) {
        redirect("/flights");
      }

      flights = await searchRoundTripFlights({
        from: params.from,
        to: params.to,
        departureDate: params.departDate,
        returnDate: params.returnDate,
        classType,
      });
    } else {
      // Default to one-way
      flights = await searchOneWayFlights({
        from: params.from,
        to: params.to,
        departureDate: params.departDate,
        classType,
      });
    }
  } catch (error) {
    console.error(error);
  }

  // Fetch city data on the server
  const cities = await getAllCities();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FlightSearchPageClient
        cities={cities}
        flights={flights}
        tripType={params.tripType as "one-way" | "round-trip" | undefined}
      />
    </Suspense>
  );
}
