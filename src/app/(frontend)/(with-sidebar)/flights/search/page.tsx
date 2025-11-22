import { redirect } from "next/navigation";
import { Suspense } from "react";
import { z } from "zod";

import { recordSearchHistoryAction } from "@/lib/actions/flight-search-history";
import {
  FlightSearchResult,
  RoundTripFlightSearchResult,
  searchOneWayFlights,
  searchRoundTripFlights,
} from "@/lib/queries";
import { getAllCities } from "@/lib/queries/cities";

import { FlightSearchPageClient } from "./page.client";

/**
 * Zod schema for validating seat class from URL params
 */
const seatClassSchema = z.enum(["any", "economy", "business", "first"]);

/**
 * Zod schema for validating uppercase seat class type
 */
const upperSeatClassSchema = z.enum(["ECONOMY", "BUSINESS", "FIRST"]);

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

  // Validate and parse seat class from URL params
  const parsedSeatClass = seatClassSchema.safeParse(params.class || "any");
  const seatClass = parsedSeatClass.success ? parsedSeatClass.data : "any";

  // Handle cabin class type
  // If class is "any", pass undefined to backend to get all seat classes
  let classType: "ECONOMY" | "BUSINESS" | "FIRST" | undefined;
  if (seatClass !== "any") {
    const upperClass = upperSeatClassSchema.safeParse(seatClass.toUpperCase());
    classType = upperClass.success ? upperClass.data : undefined;
  }

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

      // Record search history (fire-and-forget, non-blocking)
      recordSearchHistoryAction({
        departureCityIata: params.from,
        arrivalCityIata: params.to,
        departureDate: params.departDate,
        tripType: "one-way",
        seatClass, // Already validated above
        lowestPrice:
          Array.isArray(flights) && flights.length > 0
            ? Math.min(
                ...flights.flatMap(f =>
                  f.seatClasses.map(sc => parseFloat(sc.price))
                )
              )
            : undefined,
      }).catch(error => {
        console.error("Failed to record search history:", error);
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

      // Record search history (fire-and-forget, non-blocking)
      recordSearchHistoryAction({
        departureCityIata: params.from,
        arrivalCityIata: params.to,
        departureDate: params.departDate,
        returnDate: params.returnDate,
        tripType: "round-trip",
        seatClass, // Already validated above
        lowestPrice:
          flights && "outbound" in flights
            ? Math.min(
                ...flights.outbound.flatMap(f =>
                  f.seatClasses.map(sc => parseFloat(sc.price))
                ),
                ...flights.inbound.flatMap(f =>
                  f.seatClasses.map(sc => parseFloat(sc.price))
                )
              )
            : undefined,
      }).catch(error => {
        console.error("Failed to record search history:", error);
      });
    } else {
      // Default to one-way
      flights = await searchOneWayFlights({
        from: params.from,
        to: params.to,
        departureDate: params.departDate,
        classType,
      });

      // Record search history (fire-and-forget, non-blocking)
      recordSearchHistoryAction({
        departureCityIata: params.from,
        arrivalCityIata: params.to,
        departureDate: params.departDate,
        tripType: "one-way",
        seatClass: (params.class || "any") as
          | "any"
          | "economy"
          | "business"
          | "first",
        lowestPrice:
          Array.isArray(flights) && flights.length > 0
            ? Math.min(
                ...flights.flatMap(f =>
                  f.seatClasses.map(sc => parseFloat(sc.price))
                )
              )
            : undefined,
      }).catch(error => {
        console.error("Failed to record search history:", error);
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
