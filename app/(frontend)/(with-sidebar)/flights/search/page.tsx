import { redirect } from "next/navigation";
import { Suspense } from "react";

import { getAllCities } from "@/lib/repositories";
import { searchFlightsWithHistory } from "@/lib/services";
import {
  type SeatClass,
  seatClassSchema,
  type TripType,
  tripTypeSchema,
  type UpperSeatClass,
  upperSeatClassSchema,
} from "@/types/validations";
import logger from "@/utils/logger";

import { FlightSearchPageClient } from "./page.client";

interface FlightSearchParams {
  tripType?: string;
  from?: string;
  to?: string;
  departDate?: string;
  returnDate?: string;
  class?: string;
}

export default async function FlightSearchPage({
  searchParams,
}: {
  searchParams: Promise<FlightSearchParams>;
}) {
  const params = await searchParams;

  // Validate required parameters
  if (!params.from || !params.to || !params.departDate) {
    redirect("/error?type=invalid_search_params");
  }

  // Validate and parse trip type
  const parsedTripType = tripTypeSchema.safeParse(params.tripType);
  const tripType: TripType = parsedTripType.success
    ? parsedTripType.data
    : "one-way";

  // Validate and parse seat class
  const parsedSeatClass = seatClassSchema.safeParse(params.class);
  const seatClass: SeatClass = parsedSeatClass.success
    ? parsedSeatClass.data
    : "any";

  // Convert seat class to uppercase API enum
  let classType: UpperSeatClass | undefined;
  if (seatClass !== "any") {
    const upperClass = upperSeatClassSchema.safeParse(seatClass.toUpperCase());
    classType = upperClass.success ? upperClass.data : undefined;
  }

  // Validate return date for round-trip
  if (tripType === "round-trip" && !params.returnDate) {
    redirect("/error?type=invalid_search_params");
  }

  // Parallel data fetching with error handling
  const [flights, cities] = await Promise.all([
    searchFlightsWithHistory({
      tripType,
      from: params.from,
      to: params.to,
      departureDate: params.departDate,
      returnDate: params.returnDate,
      seatClass,
      classType,
    }).catch(error => {
      logger.error({ err: error }, "Flight search failed in page component");
      return undefined;
    }),
    getAllCities(),
  ]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FlightSearchPageClient
        cities={cities}
        flights={flights}
        tripType={tripType}
      />
    </Suspense>
  );
}
