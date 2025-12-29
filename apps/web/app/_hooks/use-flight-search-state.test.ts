import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { FlightSearchResult } from "@/types/dto";

import { useFlightSearchState } from "./use-flight-search-state";

/**
 * @requirement REQ-F02
 * @requirement REQ-F03
 */
describe("useFlightSearchState", () => {
  // Mock flight search results
  const mockFlights: FlightSearchResult[] = [
    {
      id: "flight-1",
      flightNumber: "CA123",
      airline: {
        id: "airline-1",
        iataCode: "CA",
        name: "Air China",
        logoUrl: null,
      },
      departure: {
        airport: {
          id: "airport-pek",
          iataCode: "PEK",
          name: "Beijing Capital International Airport",
        },
        city: {
          id: "city-beijing",
          iataCode: "BJS",
          name: "Beijing",
          timezone: "Asia/Shanghai",
        },
        terminal: "T3",
        datetime: "2025-11-23T08:00:00Z",
      },
      arrival: {
        airport: {
          id: "airport-pvg",
          iataCode: "PVG",
          name: "Shanghai Pudong International Airport",
        },
        city: {
          id: "city-shanghai",
          iataCode: "SHA",
          name: "Shanghai",
          timezone: "Asia/Shanghai",
        },
        terminal: "T2",
        datetime: "2025-11-23T10:30:00Z",
      },
      aircraftType: "Boeing 737",
      seatClasses: [
        {
          id: "ca123-economy-1",
          classType: "ECONOMY",
          totalSeats: 150,
          availableSeats: 30,
          price: "500.00",
        },
        {
          id: "ca123-business-1",
          classType: "BUSINESS",
          totalSeats: 20,
          availableSeats: 10,
          price: "1500.00",
        },
      ],
      lowestPrice: 500,
      lowestPriceClassType: "ECONOMY",
    },
    {
      id: "flight-2",
      flightNumber: "MU456",
      airline: {
        id: "airline-2",
        iataCode: "MU",
        name: "China Eastern",
        logoUrl: null,
      },
      departure: {
        airport: {
          id: "airport-pek",
          iataCode: "PEK",
          name: "Beijing Capital International Airport",
        },
        city: {
          id: "city-beijing",
          iataCode: "BJS",
          name: "Beijing",
          timezone: "Asia/Shanghai",
        },
        terminal: "T2",
        datetime: "2025-11-23T14:00:00Z",
      },
      arrival: {
        airport: {
          id: "airport-pvg",
          iataCode: "PVG",
          name: "Shanghai Pudong International Airport",
        },
        city: {
          id: "city-shanghai",
          iataCode: "SHA",
          name: "Shanghai",
          timezone: "Asia/Shanghai",
        },
        terminal: "T1",
        datetime: "2025-11-23T16:30:00Z",
      },
      aircraftType: "Airbus A320",
      seatClasses: [
        {
          id: "mu456-economy-1",
          classType: "ECONOMY",
          totalSeats: 140,
          availableSeats: 25,
          price: "450.00",
        },
      ],
      lowestPrice: 450,
      lowestPriceClassType: "ECONOMY",
    },
  ];

  describe("Initial State", () => {
    it("should initialize with default values", () => {
      const { result } = renderHook(() => useFlightSearchState());

      expect(result.current.filteredFlights).toEqual([]);
      expect(result.current.activeRoundTripTab).toBe("outbound");
      expect(result.current.selectedOutboundSeatClassId).toBeNull();
      expect(result.current.lastUpdateTime).toBeInstanceOf(Date);
    });

    it("should initialize with custom initial filtered flights", () => {
      const { result } = renderHook(() =>
        useFlightSearchState({
          initialFilteredFlights: mockFlights,
        })
      );

      expect(result.current.filteredFlights).toEqual(mockFlights);
      expect(result.current.activeRoundTripTab).toBe("outbound");
    });

    it("should initialize with custom active tab", () => {
      const { result } = renderHook(() =>
        useFlightSearchState({
          initialActiveTab: "return",
        })
      );

      expect(result.current.filteredFlights).toEqual([]);
      expect(result.current.activeRoundTripTab).toBe("return");
    });

    it("should initialize with both custom values", () => {
      const { result } = renderHook(() =>
        useFlightSearchState({
          initialFilteredFlights: mockFlights,
          initialActiveTab: "return",
        })
      );

      expect(result.current.filteredFlights).toEqual(mockFlights);
      expect(result.current.activeRoundTripTab).toBe("return");
    });
  });

  describe("setFilteredFlights", () => {
    it("should update filtered flights", () => {
      const { result } = renderHook(() => useFlightSearchState());

      act(() => {
        result.current.setFilteredFlights(mockFlights);
      });

      expect(result.current.filteredFlights).toEqual(mockFlights);
    });

    it("should replace existing filtered flights", () => {
      const { result } = renderHook(() =>
        useFlightSearchState({
          initialFilteredFlights: mockFlights,
        })
      );

      const newFlights = [mockFlights[0]];

      act(() => {
        result.current.setFilteredFlights(newFlights);
      });

      expect(result.current.filteredFlights).toEqual(newFlights);
      expect(result.current.filteredFlights).toHaveLength(1);
    });

    it("should clear filtered flights with empty array", () => {
      const { result } = renderHook(() =>
        useFlightSearchState({
          initialFilteredFlights: mockFlights,
        })
      );

      act(() => {
        result.current.setFilteredFlights([]);
      });

      expect(result.current.filteredFlights).toEqual([]);
    });
  });

  describe("updateLastUpdateTime", () => {
    it("should update last update time to current time", () => {
      const { result } = renderHook(() => useFlightSearchState());
      const initialTime = result.current.lastUpdateTime;

      // Wait a bit to ensure time difference
      setTimeout(() => {}, 10);

      act(() => {
        result.current.updateLastUpdateTime();
      });

      expect(result.current.lastUpdateTime).toBeInstanceOf(Date);
      expect(result.current.lastUpdateTime.getTime()).toBeGreaterThanOrEqual(
        initialTime.getTime()
      );
    });

    it("should update time multiple times", () => {
      const { result } = renderHook(() => useFlightSearchState());
      const initialTime = result.current.lastUpdateTime;

      act(() => {
        result.current.updateLastUpdateTime();
      });

      const secondTime = result.current.lastUpdateTime;
      expect(secondTime.getTime()).toBeGreaterThanOrEqual(
        initialTime.getTime()
      );

      act(() => {
        result.current.updateLastUpdateTime();
      });

      const thirdTime = result.current.lastUpdateTime;
      expect(thirdTime.getTime()).toBeGreaterThanOrEqual(secondTime.getTime());
    });
  });

  describe("setActiveRoundTripTab", () => {
    it("should change active tab to return", () => {
      const { result } = renderHook(() => useFlightSearchState());

      expect(result.current.activeRoundTripTab).toBe("outbound");

      act(() => {
        result.current.setActiveRoundTripTab("return");
      });

      expect(result.current.activeRoundTripTab).toBe("return");
    });

    it("should change active tab to outbound", () => {
      const { result } = renderHook(() =>
        useFlightSearchState({
          initialActiveTab: "return",
        })
      );

      expect(result.current.activeRoundTripTab).toBe("return");

      act(() => {
        result.current.setActiveRoundTripTab("outbound");
      });

      expect(result.current.activeRoundTripTab).toBe("outbound");
    });

    it("should allow toggling between tabs", () => {
      const { result } = renderHook(() => useFlightSearchState());

      act(() => {
        result.current.setActiveRoundTripTab("return");
      });

      expect(result.current.activeRoundTripTab).toBe("return");

      act(() => {
        result.current.setActiveRoundTripTab("outbound");
      });

      expect(result.current.activeRoundTripTab).toBe("outbound");

      act(() => {
        result.current.setActiveRoundTripTab("return");
      });

      expect(result.current.activeRoundTripTab).toBe("return");
    });
  });

  describe("selectOutboundFlight", () => {
    it("should set selected outbound seat class ID", () => {
      const { result } = renderHook(() => useFlightSearchState());

      expect(result.current.selectedOutboundSeatClassId).toBeNull();

      act(() => {
        result.current.selectOutboundFlight("ca123-economy-1");
      });

      expect(result.current.selectedOutboundSeatClassId).toBe(
        "ca123-economy-1"
      );
    });

    it("should automatically switch to return tab", () => {
      const { result } = renderHook(() => useFlightSearchState());

      expect(result.current.activeRoundTripTab).toBe("outbound");

      act(() => {
        result.current.selectOutboundFlight("ca123-economy-1");
      });

      expect(result.current.activeRoundTripTab).toBe("return");
    });

    it("should update both seat class ID and tab in one action", () => {
      const { result } = renderHook(() => useFlightSearchState());

      expect(result.current.selectedOutboundSeatClassId).toBeNull();
      expect(result.current.activeRoundTripTab).toBe("outbound");

      act(() => {
        result.current.selectOutboundFlight("mu456-economy-1");
      });

      expect(result.current.selectedOutboundSeatClassId).toBe(
        "mu456-economy-1"
      );
      expect(result.current.activeRoundTripTab).toBe("return");
    });

    it("should allow selecting different outbound flights", () => {
      const { result } = renderHook(() => useFlightSearchState());

      act(() => {
        result.current.selectOutboundFlight("ca123-economy-1");
      });

      expect(result.current.selectedOutboundSeatClassId).toBe(
        "ca123-economy-1"
      );

      act(() => {
        result.current.selectOutboundFlight("ca123-business-1");
      });

      expect(result.current.selectedOutboundSeatClassId).toBe(
        "ca123-business-1"
      );
      expect(result.current.activeRoundTripTab).toBe("return");
    });
  });

  describe("reset", () => {
    it("should reset all state to initial values", () => {
      const { result } = renderHook(() => useFlightSearchState());

      // Set some state
      act(() => {
        result.current.setFilteredFlights(mockFlights);
        result.current.selectOutboundFlight("ca123-economy-1");
      });

      expect(result.current.filteredFlights).toEqual(mockFlights);
      expect(result.current.selectedOutboundSeatClassId).toBe(
        "ca123-economy-1"
      );
      expect(result.current.activeRoundTripTab).toBe("return");

      const timeBeforeReset = result.current.lastUpdateTime;

      // Reset
      act(() => {
        result.current.reset();
      });

      expect(result.current.filteredFlights).toEqual([]);
      expect(result.current.selectedOutboundSeatClassId).toBeNull();
      expect(result.current.activeRoundTripTab).toBe("outbound");
      expect(result.current.lastUpdateTime.getTime()).toBeGreaterThanOrEqual(
        timeBeforeReset.getTime()
      );
    });

    it("should reset from custom initial state", () => {
      const { result } = renderHook(() =>
        useFlightSearchState({
          initialFilteredFlights: mockFlights,
          initialActiveTab: "return",
        })
      );

      // Modify state
      act(() => {
        result.current.selectOutboundFlight("ca123-business-1");
        result.current.setFilteredFlights([mockFlights[0]]);
      });

      expect(result.current.selectedOutboundSeatClassId).toBe(
        "ca123-business-1"
      );

      // Reset should go to default state, not initial props
      act(() => {
        result.current.reset();
      });

      expect(result.current.filteredFlights).toEqual([]);
      expect(result.current.selectedOutboundSeatClassId).toBeNull();
      expect(result.current.activeRoundTripTab).toBe("outbound");
    });

    it("should update last update time on reset", () => {
      const { result } = renderHook(() => useFlightSearchState());
      const initialTime = result.current.lastUpdateTime;

      act(() => {
        result.current.setFilteredFlights(mockFlights);
      });

      // Wait a bit
      setTimeout(() => {}, 10);

      act(() => {
        result.current.reset();
      });

      expect(result.current.lastUpdateTime).toBeInstanceOf(Date);
      expect(result.current.lastUpdateTime.getTime()).toBeGreaterThanOrEqual(
        initialTime.getTime()
      );
    });
  });

  describe("Complex Workflows", () => {
    it("should handle complete round-trip selection workflow", () => {
      const { result } = renderHook(() =>
        useFlightSearchState({
          initialFilteredFlights: mockFlights,
        })
      );

      // Start with outbound tab
      expect(result.current.activeRoundTripTab).toBe("outbound");
      expect(result.current.filteredFlights).toEqual(mockFlights);

      // Select outbound flight
      act(() => {
        result.current.selectOutboundFlight("ca123-economy-1");
      });

      // Should switch to return tab
      expect(result.current.activeRoundTripTab).toBe("return");
      expect(result.current.selectedOutboundSeatClassId).toBe(
        "ca123-economy-1"
      );

      // Go back to outbound to change selection
      act(() => {
        result.current.setActiveRoundTripTab("outbound");
      });

      expect(result.current.activeRoundTripTab).toBe("outbound");
      expect(result.current.selectedOutboundSeatClassId).toBe(
        "ca123-economy-1"
      );

      // Select different outbound flight
      act(() => {
        result.current.selectOutboundFlight("mu456-economy-1");
      });

      expect(result.current.activeRoundTripTab).toBe("return");
      expect(result.current.selectedOutboundSeatClassId).toBe(
        "mu456-economy-1"
      );
    });

    it("should handle filter updates with selection state", () => {
      const { result } = renderHook(() => useFlightSearchState());

      // Set initial flights
      act(() => {
        result.current.setFilteredFlights(mockFlights);
      });

      expect(result.current.filteredFlights).toHaveLength(2);

      // Select outbound flight
      act(() => {
        result.current.selectOutboundFlight("ca123-economy-1");
      });

      // Filter flights (e.g., user applied a filter)
      act(() => {
        result.current.setFilteredFlights([mockFlights[1]]);
      });

      // Selection should persist
      expect(result.current.filteredFlights).toHaveLength(1);
      expect(result.current.selectedOutboundSeatClassId).toBe(
        "ca123-economy-1"
      );
      expect(result.current.activeRoundTripTab).toBe("return");
    });

    it("should handle multiple state updates in sequence", () => {
      const { result } = renderHook(() => useFlightSearchState());

      act(() => {
        result.current.setFilteredFlights(mockFlights);
        result.current.updateLastUpdateTime();
      });

      const firstUpdateTime = result.current.lastUpdateTime;

      act(() => {
        result.current.selectOutboundFlight("ca123-economy-1");
      });

      expect(result.current.activeRoundTripTab).toBe("return");

      act(() => {
        result.current.setActiveRoundTripTab("outbound");
        result.current.updateLastUpdateTime();
      });

      expect(result.current.lastUpdateTime.getTime()).toBeGreaterThanOrEqual(
        firstUpdateTime.getTime()
      );
      expect(result.current.activeRoundTripTab).toBe("outbound");

      act(() => {
        result.current.reset();
      });

      expect(result.current.filteredFlights).toEqual([]);
      expect(result.current.selectedOutboundSeatClassId).toBeNull();
      expect(result.current.activeRoundTripTab).toBe("outbound");
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty seat class ID string", () => {
      const { result } = renderHook(() => useFlightSearchState());

      act(() => {
        result.current.selectOutboundFlight("");
      });

      expect(result.current.selectedOutboundSeatClassId).toBe("");
      expect(result.current.activeRoundTripTab).toBe("return");
    });

    it("should handle very long seat class ID", () => {
      const { result } = renderHook(() => useFlightSearchState());
      const longId = "a".repeat(1000);

      act(() => {
        result.current.selectOutboundFlight(longId);
      });

      expect(result.current.selectedOutboundSeatClassId).toBe(longId);
    });

    it("should handle large flight arrays", () => {
      const { result } = renderHook(() => useFlightSearchState());
      const largeFlightArray = Array.from({ length: 100 }, (_, i) => ({
        ...mockFlights[0],
        flight_number: `FL${i}`,
      }));

      act(() => {
        result.current.setFilteredFlights(largeFlightArray);
      });

      expect(result.current.filteredFlights).toHaveLength(100);
    });

    it("should maintain stable function references", () => {
      const { result, rerender } = renderHook(() => useFlightSearchState());

      const firstSetFilteredFlights = result.current.setFilteredFlights;
      const firstUpdateLastUpdateTime = result.current.updateLastUpdateTime;
      const firstSetActiveRoundTripTab = result.current.setActiveRoundTripTab;
      const firstSelectOutboundFlight = result.current.selectOutboundFlight;
      const firstReset = result.current.reset;

      rerender();

      // Functions should be stable across rerenders
      expect(result.current.setFilteredFlights).toBe(firstSetFilteredFlights);
      expect(result.current.updateLastUpdateTime).toBe(
        firstUpdateLastUpdateTime
      );
      expect(result.current.setActiveRoundTripTab).toBe(
        firstSetActiveRoundTripTab
      );
      expect(result.current.selectOutboundFlight).toBe(
        firstSelectOutboundFlight
      );
      expect(result.current.reset).toBe(firstReset);
    });
  });
});
