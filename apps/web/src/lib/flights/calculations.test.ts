import { describe, expect, it } from "vitest";

import type {
  FlightSearchResult,
  RoundTripFlightSearchResult,
} from "@/types/dto";

import {
  calculateLowestPrice,
  calculateLowestPriceOneWay,
  calculateLowestPriceRoundTrip,
} from "./calculations";

function createFlight(id: string, prices: number[]): FlightSearchResult {
  return {
    id,
    flightNumber: `CA${id}`,
    airline: {
      id: `airline-${id}`,
      iataCode: "CA",
      name: "Test Airline",
      logoUrl: null,
    },
    departure: {
      airport: { id: "dep-airport", iataCode: "PEK", name: "Beijing" },
      city: {
        id: "dep-city",
        iataCode: "PEK",
        name: "Beijing",
        timezone: "Asia/Shanghai",
      },
      terminal: null,
      datetime: "2024-01-01T08:00:00Z",
    },
    arrival: {
      airport: { id: "arr-airport", iataCode: "SHA", name: "Shanghai" },
      city: {
        id: "arr-city",
        iataCode: "SHA",
        name: "Shanghai",
        timezone: "Asia/Shanghai",
      },
      terminal: null,
      datetime: "2024-01-01T10:00:00Z",
    },
    aircraftType: "A320",
    seatClasses: prices.map((price, index) => ({
      id: `${id}-${index}`,
      classType: index === 0 ? "ECONOMY" : "BUSINESS",
      totalSeats: 100,
      availableSeats: 10,
      price: price.toString(),
    })),
    lowestPrice: Math.min(...prices),
    lowestPriceClassType: "ECONOMY",
  };
}

describe("calculateLowestPriceOneWay", () => {
  it("returns the minimum seat class price across flights", () => {
    const flights = [
      createFlight("1", [399, 599]),
      createFlight("2", [299, 499]),
    ];
    expect(calculateLowestPriceOneWay(flights)).toBe(299);
  });

  it("returns undefined for empty input", () => {
    expect(calculateLowestPriceOneWay([])).toBeUndefined();
    expect(calculateLowestPriceOneWay(undefined)).toBeUndefined();
  });

  it("ignores flights with no seat classes", () => {
    const flights = [createFlight("1", []), createFlight("2", [800])];
    expect(calculateLowestPriceOneWay(flights)).toBe(800);
  });
});

describe("calculateLowestPriceRoundTrip", () => {
  it("returns the lowest price across outbound and inbound flights", () => {
    const flights: RoundTripFlightSearchResult = {
      outbound: [createFlight("1", [500, 700])],
      inbound: [createFlight("2", [450, 650])],
    };
    expect(calculateLowestPriceRoundTrip(flights)).toBe(450);
  });

  it("returns undefined when no flights are provided", () => {
    expect(calculateLowestPriceRoundTrip(undefined)).toBeUndefined();
  });

  it("handles empty seat classes gracefully", () => {
    const flights: RoundTripFlightSearchResult = {
      outbound: [createFlight("1", [])],
      inbound: [createFlight("2", [350])],
    };
    expect(calculateLowestPriceRoundTrip(flights)).toBe(350);
  });
});

describe("calculateLowestPrice", () => {
  it("delegates to one-way calculation for array input", () => {
    const flights = [createFlight("1", [420]), createFlight("2", [380])];
    expect(calculateLowestPrice(flights)).toBe(380);
  });

  it("delegates to round-trip calculation for round-trip input", () => {
    const flights: RoundTripFlightSearchResult = {
      outbound: [createFlight("1", [300])],
      inbound: [createFlight("2", [320])],
    };
    expect(calculateLowestPrice(flights)).toBe(300);
  });

  it("returns undefined for missing data", () => {
    expect(calculateLowestPrice(undefined)).toBeUndefined();
  });
});
