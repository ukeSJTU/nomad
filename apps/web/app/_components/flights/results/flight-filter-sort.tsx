"use client";

import {
  FlightFilterSort as FlightFilterSortUI,
  type FlightFilters,
  type SeatClassType,
  type SortOption,
  type TimeRange,
} from "@nomad/ui/components/flights/results/flight-filter-sort";
import { useMemo, useState } from "react";
import type { FlightSearchResult } from "@/types/dto";

interface FlightFilterSortProps {
  flights: FlightSearchResult[];
  onFilteredFlightsChange: (flights: FlightSearchResult[]) => void;
  /** Initial seat classes to filter by (for linking with search form) */
  initialSeatClasses?: SeatClassType[];
}

export function FlightFilterSort({
  flights,
  onFilteredFlightsChange,
  initialSeatClasses = [],
}: FlightFilterSortProps) {
  const [sortOption, setSortOption] = useState<SortOption>("price-asc");
  const [filters, setFilters] = useState<FlightFilters>({
    airlines: [],
    seatClasses: initialSeatClasses,
    departureTimeRanges: [],
    arrivalTimeRanges: [],
  });

  // Extract unique airlines from flights
  const airlines = useMemo(() => {
    const airlineMap = new Map<
      string,
      { id: string; name: string; iataCode: string }
    >();
    flights.forEach(flight => {
      if (!airlineMap.has(flight.airline.id)) {
        airlineMap.set(flight.airline.id, {
          id: flight.airline.id,
          name: flight.airline.name,
          iataCode: flight.airline.iataCode,
        });
      }
    });
    return Array.from(airlineMap.values());
  }, [flights]);

  // Helper function to check if time is in range
  const isTimeInRange = (datetime: string, range: TimeRange): boolean => {
    const date = new Date(datetime);
    const hour = date.getHours();

    switch (range) {
      case "0-6":
        return hour >= 0 && hour < 6;
      case "6-12":
        return hour >= 6 && hour < 12;
      case "12-18":
        return hour >= 12 && hour < 18;
      case "18-24":
        return hour >= 18 && hour < 24;
      default:
        return false;
    }
  };

  // Filter and sort flights
  const filteredAndSortedFlights = useMemo(() => {
    // Apply filters
    let filtered = flights;

    // Filter by airlines
    if (filters.airlines.length > 0) {
      filtered = filtered.filter(flight =>
        filters.airlines.includes(flight.airline.id)
      );
    }

    // Filter by seat classes
    if (filters.seatClasses.length > 0) {
      filtered = filtered.filter(flight =>
        flight.seatClasses.some(seatClass =>
          filters.seatClasses.includes(seatClass.classType)
        )
      );
    }

    // Filter by departure time ranges
    if (filters.departureTimeRanges.length > 0) {
      filtered = filtered.filter(flight =>
        filters.departureTimeRanges.some(range =>
          isTimeInRange(flight.departure.datetime, range)
        )
      );
    }

    // Filter by arrival time ranges
    if (filters.arrivalTimeRanges.length > 0) {
      filtered = filtered.filter(flight =>
        filters.arrivalTimeRanges.some(range =>
          isTimeInRange(flight.arrival.datetime, range)
        )
      );
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortOption) {
        case "price-asc":
          return a.lowestPrice - b.lowestPrice;
        case "price-desc":
          return b.lowestPrice - a.lowestPrice;
        case "duration-asc": {
          const durationA =
            new Date(a.arrival.datetime).getTime() -
            new Date(a.departure.datetime).getTime();
          const durationB =
            new Date(b.arrival.datetime).getTime() -
            new Date(b.departure.datetime).getTime();
          return durationA - durationB;
        }
        case "duration-desc": {
          const durationA =
            new Date(a.arrival.datetime).getTime() -
            new Date(a.departure.datetime).getTime();
          const durationB =
            new Date(b.arrival.datetime).getTime() -
            new Date(b.departure.datetime).getTime();
          return durationB - durationA;
        }
        case "departure-asc":
          return (
            new Date(a.departure.datetime).getTime() -
            new Date(b.departure.datetime).getTime()
          );
        case "departure-desc":
          return (
            new Date(b.departure.datetime).getTime() -
            new Date(a.departure.datetime).getTime()
          );
        default:
          return 0;
      }
    });

    return sorted;
  }, [flights, filters, sortOption]);

  // Update parent component when filtered flights change
  useMemo(() => {
    onFilteredFlightsChange(filteredAndSortedFlights);
  }, [filteredAndSortedFlights, onFilteredFlightsChange]);

  return (
    <FlightFilterSortUI
      filters={filters}
      sortOption={sortOption}
      airlines={airlines}
      onFiltersChange={setFilters}
      onSortChange={setSortOption}
    />
  );
}

export type { FlightFilters, SeatClassType, SortOption, TimeRange };
