"use client";

import { useRouter } from "next/navigation";

import {
  FlightSearchHistorySection,
  SearchForm,
  type SearchFormData,
} from "@/components/flights/search";
import { buildFlightSearchUrl } from "@/lib/flights/search-params";
import type { CityData, SearchHistoryRecord } from "@/types/dto";

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
    // Build search URL using shared utility
    const searchUrl = buildFlightSearchUrl(data);

    // Navigate to search results page
    router.push(searchUrl);
  };

  return (
    <div className="space-y-8">
      {/* Search Form Card */}
      <div className="bg-card rounded-b-xl shadow-sm border border-t-0 p-6 md:p-8 relative">
        <SearchForm showSearchButton onSearch={handleSearch} cities={cities} />
      </div>

      {/* Search History Section */}
      <FlightSearchHistorySection searchHistory={searchHistory} />
    </div>
  );
}
