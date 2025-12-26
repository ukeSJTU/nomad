/**
 * Flight price calculation utilities
 *
 * Utilities for calculating prices from flight search results
 */

import type {
  FlightSearchResult,
  RoundTripFlightSearchResult,
} from "@/types/dto";

/**
 * Calculate the lowest price from one-way flight results
 *
 * @param flights - Array of one-way flight search results
 * @returns Lowest price or undefined if no flights
 */
export function calculateLowestPriceOneWay(
  flights: FlightSearchResult[] | undefined
): number | undefined {
  if (!flights || flights.length === 0) {
    return undefined;
  }

  const prices = flights.flatMap(f =>
    f.seatClasses.map(sc => parseFloat(sc.price))
  );

  return prices.length > 0 ? Math.min(...prices) : undefined;
}

/**
 * Calculate the lowest price from round-trip flight results
 *
 * @param flights - Round-trip flight search results
 * @returns Lowest price or undefined if no flights
 */
export function calculateLowestPriceRoundTrip(
  flights: RoundTripFlightSearchResult | undefined
): number | undefined {
  if (!flights) {
    return undefined;
  }

  const outboundPrices = flights.outbound.flatMap(f =>
    f.seatClasses.map(sc => parseFloat(sc.price))
  );

  const inboundPrices = flights.inbound.flatMap(f =>
    f.seatClasses.map(sc => parseFloat(sc.price))
  );

  const allPrices = [...outboundPrices, ...inboundPrices];

  return allPrices.length > 0 ? Math.min(...allPrices) : undefined;
}

/**
 * Calculate the lowest price from flight results (handles both one-way and round-trip)
 *
 * @param flights - Flight search results (one-way or round-trip)
 * @returns Lowest price or undefined if no flights
 */
export function calculateLowestPrice(
  flights: FlightSearchResult[] | RoundTripFlightSearchResult | undefined
): number | undefined {
  if (!flights) {
    return undefined;
  }

  if (Array.isArray(flights)) {
    return calculateLowestPriceOneWay(flights);
  }

  return calculateLowestPriceRoundTrip(flights);
}
