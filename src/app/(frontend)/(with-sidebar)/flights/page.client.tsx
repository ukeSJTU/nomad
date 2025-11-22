"use client";

import { useRouter } from "next/navigation";

import {
  FlightSearchHistorySection,
  SearchForm,
  type SearchFormData,
} from "@/components/flights/search";
import type { CityData, SearchHistoryRecord } from "@/lib/queries";
import { dateToLocalDateString } from "@/utils/date";

interface FlightsPageClientProps {
  cities: CityData[];
  searchHistory: SearchHistoryRecord[];
}

export function FlightsPageClient({
  cities,
  searchHistory,
}: FlightsPageClientProps) {
  const router = useRouter();

  const handleSearch = (data: SearchFormData) => {
    // Build search parameters
    const params = new URLSearchParams();
    params.set("tripType", data.tripType);
    if (data.departureCity) {
      params.set("from", data.departureCity.iataCode);
    }
    if (data.arrivalCity) {
      params.set("to", data.arrivalCity.iataCode);
    }
    if (data.departureDate) {
      params.set("departDate", dateToLocalDateString(data.departureDate));
    }
    if (data.returnDate && data.tripType === "round-trip") {
      params.set("returnDate", dateToLocalDateString(data.returnDate));
    }
    params.set("class", data.seatClass);

    // Navigate to search results page
    router.push(`/flights/search?${params.toString()}`);
  };

  return (
    <>
      {/* Search Form */}
      <SearchForm showSearchButton onSearch={handleSearch} cities={cities} />

      {/* Search History Section */}
      <FlightSearchHistorySection searchHistory={searchHistory} />
    </>
  );
}
