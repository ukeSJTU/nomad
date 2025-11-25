/**
 * Flight search URL parameter utilities
 *
 * Utilities for building and parsing flight search URLs
 */

import type { SearchFormData } from "@/components/flights/search";
import { dateToLocalDateString } from "@/lib/date";

/**
 * Build flight search URL from form data
 *
 * @param data - Search form data
 * @returns Flight search URL with query parameters
 */
export function buildFlightSearchUrl(data: SearchFormData): string {
  const params = new URLSearchParams();

  params.set("tripType", data.tripType);
  params.set("from", data.departureCity!.iataCode);
  params.set("to", data.arrivalCity!.iataCode);
  params.set("departDate", dateToLocalDateString(data.departureDate!));

  if (data.returnDate && data.tripType === "round-trip") {
    params.set("returnDate", dateToLocalDateString(data.returnDate));
  }

  params.set("class", data.seatClass);

  return `/flights/search?${params.toString()}`;
}
