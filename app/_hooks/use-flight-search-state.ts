/**
 * Flight Search State Hook
 *
 * Custom hook to manage flight search state including filters, tabs, and selections
 */

"use client";

import { useCallback, useState } from "react";

import type { FlightSearchResult } from "@/types/dto";

interface UseFlightSearchStateProps {
  /**
   * Initial filtered flights
   */
  initialFilteredFlights?: FlightSearchResult[];

  /**
   * Initial active tab for round-trip
   */
  initialActiveTab?: "outbound" | "return";
}

interface UseFlightSearchStateReturn {
  /**
   * Last update time
   */
  lastUpdateTime: Date;

  /**
   * Filtered flights (after applying filters)
   */
  filteredFlights: FlightSearchResult[];

  /**
   * Active round-trip tab (outbound or return)
   */
  activeRoundTripTab: "outbound" | "return";

  /**
   * Selected outbound seat class ID for round-trip
   */
  selectedOutboundSeatClassId: string | null;

  /**
   * Update filtered flights
   */
  setFilteredFlights: (flights: FlightSearchResult[]) => void;

  /**
   * Update last update time
   */
  updateLastUpdateTime: () => void;

  /**
   * Change active round-trip tab
   */
  setActiveRoundTripTab: (tab: "outbound" | "return") => void;

  /**
   * Select outbound flight and switch to return tab
   */
  selectOutboundFlight: (seatClassId: string) => void;

  /**
   * Reset all state
   */
  reset: () => void;
}

/**
 * Custom hook for managing flight search state
 *
 * Encapsulates all state management for flight search results including:
 * - Filtered flights
 * - Active tab for round-trip
 * - Selected outbound flight
 * - Last update time
 *
 * @param props - Hook configuration
 * @returns State and state update functions
 */
export function useFlightSearchState({
  initialFilteredFlights = [],
  initialActiveTab = "outbound",
}: UseFlightSearchStateProps = {}): UseFlightSearchStateReturn {
  const [lastUpdateTime, setLastUpdateTime] = useState<Date>(new Date());
  const [filteredFlights, setFilteredFlights] = useState<FlightSearchResult[]>(
    initialFilteredFlights
  );
  const [activeRoundTripTab, setActiveRoundTripTab] = useState<
    "outbound" | "return"
  >(initialActiveTab);
  const [selectedOutboundSeatClassId, setSelectedOutboundSeatClassId] =
    useState<string | null>(null);

  const updateLastUpdateTime = useCallback(() => {
    setLastUpdateTime(new Date());
  }, []);

  const selectOutboundFlight = useCallback((seatClassId: string) => {
    setSelectedOutboundSeatClassId(seatClassId);
    setActiveRoundTripTab("return");
  }, []);

  const reset = useCallback(() => {
    setFilteredFlights([]);
    setActiveRoundTripTab("outbound");
    setSelectedOutboundSeatClassId(null);
    setLastUpdateTime(new Date());
  }, []);

  return {
    lastUpdateTime,
    filteredFlights,
    activeRoundTripTab,
    selectedOutboundSeatClassId,
    setFilteredFlights,
    updateLastUpdateTime,
    setActiveRoundTripTab,
    selectOutboundFlight,
    reset,
  };
}
