"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";

import {
  FlightCardSkeleton,
  FlightFilterSort,
} from "@/components/flights/results";
import {
  FlightListOneWay,
  FlightListRoundTrip,
  FlightSearchHeader,
  QuickDateSelector,
  SearchForm,
  type SearchFormData,
} from "@/components/flights/search";
import { SEAT_CLASS_TYPE_MAP } from "@/constants/flights";
import { useFlightSearchState } from "@/hooks/useFlightSearchState";
import type {
  CityData,
  FlightSearchResult,
  RoundTripFlightSearchResult,
} from "@/types/dto";
import type { SeatClass, TripType } from "@/types/validations";
import { dateToLocalDateString } from "@/utils/date";
import { buildFlightSearchUrl } from "@/utils/flight-search-params";

interface FlightSearchPageClientProps {
  cities: CityData[];
  flights?: FlightSearchResult[] | RoundTripFlightSearchResult;
  tripType?: TripType;
}

export function FlightSearchPageClient({
  cities,
  flights,
}: FlightSearchPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    lastUpdateTime,
    filteredFlights,
    activeRoundTripTab,
    selectedOutboundSeatClassId,
    setFilteredFlights,
    updateLastUpdateTime,
    setActiveRoundTripTab,
    selectOutboundFlight,
  } = useFlightSearchState();

  // Parse and validate URL parameters
  const parsedParams = useMemo(() => {
    const tripType = searchParams.get("tripType");
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const departDate = searchParams.get("departDate");
    const returnDate = searchParams.get("returnDate");
    const seatClass = searchParams.get("class");

    // Validate required params
    if (!tripType || !from || !to || !departDate || !seatClass) {
      return null;
    }

    // Find matching cities
    const departureCity = cities.find(city => city.iataCode === from);
    const arrivalCity = cities.find(city => city.iataCode === to);

    if (!departureCity || !arrivalCity) {
      return null;
    }

    return {
      tripType: tripType as TripType,
      departureCity,
      arrivalCity,
      departureDate: new Date(departDate),
      returnDate: returnDate ? new Date(returnDate) : undefined,
      seatClass: seatClass as SeatClass,
    };
  }, [searchParams, cities]);

  // Calculate initial seat class filter based on URL parameter
  const initialSeatClassFilter = useMemo(() => {
    if (!parsedParams) {
      return [];
    }

    const { seatClass } = parsedParams;

    if (seatClass === "any") {
      return [];
    }

    const classType =
      SEAT_CLASS_TYPE_MAP[seatClass as keyof typeof SEAT_CLASS_TYPE_MAP];
    return classType ? [classType] : [];
  }, [parsedParams]);

  // Redirect to /flights if params are invalid
  useEffect(() => {
    if (!parsedParams) {
      router.replace("/flights");
    }
  }, [parsedParams, router]);

  // Update last refresh time when search params change
  useEffect(() => {
    if (parsedParams) {
      updateLastUpdateTime();
    }
  }, [searchParams, parsedParams, updateLastUpdateTime]);

  // Determine which flights to show for filtering
  const flightsForFilter = useMemo(() => {
    if (!flights) return [];

    if (Array.isArray(flights)) {
      return flights;
    }

    return activeRoundTripTab === "outbound"
      ? flights.outbound
      : flights.inbound;
  }, [flights, activeRoundTripTab]);

  // Check if we have any flights to display
  const hasFlights = flights
    ? Array.isArray(flights)
      ? flights.length > 0
      : flights.outbound.length > 0 || flights.inbound.length > 0
    : false;

  // Handle form changes (auto-search)
  const handleFormChange = (data: SearchFormData) => {
    const newUrl = buildFlightSearchUrl(data);
    const currentUrl = `/flights/search?${searchParams.toString()}`;

    // Only navigate if the URL actually changed
    if (newUrl !== currentUrl) {
      router.push(newUrl);
    }
  };

  // If params are invalid, show nothing (will redirect)
  if (!parsedParams) {
    return null;
  }

  // Get display values from parsed params
  const {
    tripType,
    departureCity,
    arrivalCity,
    departureDate,
    returnDate,
    seatClass,
  } = parsedParams;

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Search Form */}
      <div className="pb-6">
        <SearchForm
          showSearchButton={false}
          cities={cities}
          initialValues={{
            tripType,
            departureCity,
            arrivalCity,
            departureDate,
            returnDate,
            seatClass,
          }}
          onChange={handleFormChange}
        />
      </div>

      {/* Quick Date Selector */}
      <div className="items-center pb-2 w-full">
        <QuickDateSelector
          from={departureCity.iataCode}
          to={arrivalCity.iataCode}
          departureDate={dateToLocalDateString(departureDate)}
          returnDate={
            returnDate ? dateToLocalDateString(returnDate) : undefined
          }
          tripType={tripType}
          classType={
            seatClass === "any"
              ? undefined
              : SEAT_CLASS_TYPE_MAP[
                  seatClass as keyof typeof SEAT_CLASS_TYPE_MAP
                ]
          }
        />
      </div>

      {/* Search Header (Trip Info + Last Update Time) */}
      <FlightSearchHeader
        tripType={tripType}
        departureCity={departureCity}
        arrivalCity={arrivalCity}
        departureDate={departureDate}
        returnDate={returnDate}
        lastUpdateTime={lastUpdateTime}
        activeTab={activeRoundTripTab}
        onTabChange={setActiveRoundTripTab}
      />

      {/* Flight Filter and Sort Toolbar */}
      {hasFlights && (
        <FlightFilterSort
          flights={flightsForFilter}
          onFilteredFlightsChange={setFilteredFlights}
          initialSeatClasses={initialSeatClassFilter}
        />
      )}

      {/* Flight Search Results */}
      <div className="space-y-4">
        {!flights ? (
          // Loading state
          <>
            {[1, 2, 3, 4, 5].map(i => (
              <FlightCardSkeleton key={i} />
            ))}
          </>
        ) : Array.isArray(flights) ? (
          // One-way flights
          <FlightListOneWay flights={filteredFlights} seatClass={seatClass} />
        ) : (
          // Round-trip flights
          <FlightListRoundTrip
            flights={filteredFlights}
            activeTab={activeRoundTripTab}
            seatClass={seatClass}
            selectedOutboundSeatClassId={selectedOutboundSeatClassId}
            onOutboundSelect={selectOutboundFlight}
          />
        )}
      </div>
    </div>
  );
}
