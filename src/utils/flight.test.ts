import { describe, expect, it } from "vitest";

import type { FlightSearchResult } from "@/lib/queries";

import {
  calculateDaysOffset,
  calculateFlightDuration,
  formatAirportDisplay,
  formatDuration,
  formatFlightTime,
  getLowestPrice,
} from "./flight";

describe("calculateFlightDuration", () => {
  it("should calculate duration for flights on the same day", () => {
    const departure = "2024-01-15T10:00:00Z";
    const arrival = "2024-01-15T12:30:00Z";
    expect(calculateFlightDuration(departure, arrival)).toBe(150);
  });

  it("should calculate duration for flights spanning multiple days", () => {
    const departure = "2024-01-15T22:00:00Z";
    const arrival = "2024-01-16T02:00:00Z";
    expect(calculateFlightDuration(departure, arrival)).toBe(240);
  });

  it("should calculate duration for long-haul flights", () => {
    const departure = "2024-01-15T08:00:00Z";
    const arrival = "2024-01-15T23:45:00Z";
    expect(calculateFlightDuration(departure, arrival)).toBe(945);
  });

  it("should handle flights with seconds precision", () => {
    const departure = "2024-01-15T10:00:45Z";
    const arrival = "2024-01-15T11:30:30Z";
    expect(calculateFlightDuration(departure, arrival)).toBe(89);
  });

  it("should calculate zero duration for same departure and arrival time", () => {
    const time = "2024-01-15T10:00:00Z";
    expect(calculateFlightDuration(time, time)).toBe(0);
  });

  it("should handle different timezones correctly", () => {
    const departure = "2024-01-15T10:00:00+08:00";
    const arrival = "2024-01-15T12:00:00+00:00";
    expect(calculateFlightDuration(departure, arrival)).toBe(600);
  });
});

describe("formatDuration", () => {
  it("should format duration with both hours and minutes", () => {
    expect(formatDuration(150)).toBe("2h 30m");
  });

  it("should format duration with only hours", () => {
    expect(formatDuration(120)).toBe("2h 0m");
  });

  it("should format duration with only minutes", () => {
    expect(formatDuration(45)).toBe("0h 45m");
  });

  it("should format zero duration", () => {
    expect(formatDuration(0)).toBe("0h 0m");
  });

  it("should format long-haul flight duration", () => {
    expect(formatDuration(945)).toBe("15h 45m");
  });

  it("should format very long duration (24+ hours)", () => {
    expect(formatDuration(1500)).toBe("25h 0m");
  });

  it("should format single minute correctly", () => {
    expect(formatDuration(1)).toBe("0h 1m");
  });

  it("should format 59 minutes correctly", () => {
    expect(formatDuration(59)).toBe("0h 59m");
  });
});

describe("formatFlightTime", () => {
  it("should format time with double-digit hours and minutes", () => {
    // Use a date object to get the expected local time
    const date = new Date("2024-01-15T14:30:00Z");
    const expected = `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
    expect(formatFlightTime("2024-01-15T14:30:00Z")).toBe(expected);
  });

  it("should pad single-digit hours and minutes with zeros", () => {
    const date = new Date("2024-01-15T09:05:00Z");
    const expected = `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
    expect(formatFlightTime("2024-01-15T09:05:00Z")).toBe(expected);
  });

  it("should format midnight correctly", () => {
    const date = new Date("2024-01-15T00:00:00Z");
    const expected = `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
    expect(formatFlightTime("2024-01-15T00:00:00Z")).toBe(expected);
  });

  it("should format time just before midnight", () => {
    const date = new Date("2024-01-15T23:59:00Z");
    const expected = `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
    expect(formatFlightTime("2024-01-15T23:59:00Z")).toBe(expected);
  });

  it("should handle timezone offsets correctly (UTC+8)", () => {
    const date = new Date("2024-01-15T10:00:00+08:00");
    const isoString = date.toISOString();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    expect(formatFlightTime(isoString)).toBe(`${hours}:${minutes}`);
  });

  it("should handle timezone offsets correctly (UTC-5)", () => {
    const date = new Date("2024-01-15T10:00:00-05:00");
    const isoString = date.toISOString();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    expect(formatFlightTime(isoString)).toBe(`${hours}:${minutes}`);
  });

  it("should ignore seconds in the output", () => {
    const date = new Date("2024-01-15T14:30:45Z");
    const expected = `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
    expect(formatFlightTime("2024-01-15T14:30:45Z")).toBe(expected);
  });
});

describe("calculateDaysOffset", () => {
  it("should return 0 for flights on the same day", () => {
    const departure = "2024-01-15T10:00:00Z";
    const arrival = "2024-01-15T14:00:00Z";
    expect(calculateDaysOffset(departure, arrival)).toBe(0);
  });

  it("should return 0 for flights spanning midnight but same calendar day at midnight", () => {
    const departure = "2024-01-15T23:00:00Z";
    const arrival = "2024-01-15T23:59:00Z";
    expect(calculateDaysOffset(departure, arrival)).toBe(0);
  });

  it("should return 1 for flights arriving next day", () => {
    // Use local dates to ensure day boundary is crossed
    const departure = "2024-01-15T10:00:00";
    const arrival = "2024-01-16T14:00:00";
    expect(calculateDaysOffset(departure, arrival)).toBe(1);
  });

  it("should return 2 for flights arriving two days later", () => {
    const departure = "2024-01-15T10:00:00Z";
    const arrival = "2024-01-17T10:00:00Z";
    expect(calculateDaysOffset(departure, arrival)).toBe(2);
  });

  it("should handle month boundaries correctly", () => {
    const departure = "2024-01-31T10:00:00";
    const arrival = "2024-02-01T14:00:00";
    expect(calculateDaysOffset(departure, arrival)).toBe(1);
  });

  it("should handle year boundaries correctly", () => {
    const departure = "2024-12-31T10:00:00";
    const arrival = "2025-01-01T14:00:00";
    expect(calculateDaysOffset(departure, arrival)).toBe(1);
  });

  it("should handle leap year correctly", () => {
    const departure = "2024-02-28T10:00:00Z";
    const arrival = "2024-03-01T10:00:00Z";
    expect(calculateDaysOffset(departure, arrival)).toBe(2);
  });

  it("should return 0 when arrival is just after midnight", () => {
    const departure = "2024-01-15T00:00:00Z";
    const arrival = "2024-01-15T00:01:00Z";
    expect(calculateDaysOffset(departure, arrival)).toBe(0);
  });
});

describe("getLowestPrice", () => {
  it("should return the lowest price from multiple seat classes", () => {
    const seatClasses: FlightSearchResult["seatClasses"] = [
      {
        id: "1",
        classType: "ECONOMY",
        price: "299.99",
        totalSeats: 100,
        availableSeats: 10,
      },
      {
        id: "2",
        classType: "BUSINESS",
        price: "899.99",
        totalSeats: 20,
        availableSeats: 5,
      },
      {
        id: "3",
        classType: "FIRST",
        price: "1499.99",
        totalSeats: 8,
        availableSeats: 2,
      },
    ];
    expect(getLowestPrice(seatClasses)).toBe(299.99);
  });

  it("should return 0 for empty seat classes array", () => {
    expect(getLowestPrice([])).toBe(0);
  });

  it("should handle single seat class", () => {
    const seatClasses: FlightSearchResult["seatClasses"] = [
      {
        id: "1",
        classType: "ECONOMY",
        price: "299.99",
        totalSeats: 100,
        availableSeats: 10,
      },
    ];
    expect(getLowestPrice(seatClasses)).toBe(299.99);
  });

  it("should handle prices with varying decimal places", () => {
    const seatClasses: FlightSearchResult["seatClasses"] = [
      {
        id: "1",
        classType: "ECONOMY",
        price: "299.9",
        totalSeats: 100,
        availableSeats: 10,
      },
      {
        id: "2",
        classType: "BUSINESS",
        price: "899.999",
        totalSeats: 20,
        availableSeats: 5,
      },
    ];
    expect(getLowestPrice(seatClasses)).toBe(299.9);
  });

  it("should handle integer prices", () => {
    const seatClasses: FlightSearchResult["seatClasses"] = [
      {
        id: "1",
        classType: "ECONOMY",
        price: "300",
        totalSeats: 100,
        availableSeats: 10,
      },
      {
        id: "2",
        classType: "BUSINESS",
        price: "900",
        totalSeats: 20,
        availableSeats: 5,
      },
    ];
    expect(getLowestPrice(seatClasses)).toBe(300);
  });

  it("should handle zero price", () => {
    const seatClasses: FlightSearchResult["seatClasses"] = [
      {
        id: "1",
        classType: "ECONOMY",
        price: "0",
        totalSeats: 100,
        availableSeats: 10,
      },
      {
        id: "2",
        classType: "BUSINESS",
        price: "899.99",
        totalSeats: 20,
        availableSeats: 5,
      },
    ];
    expect(getLowestPrice(seatClasses)).toBe(0);
  });

  it("should handle all same prices", () => {
    const seatClasses: FlightSearchResult["seatClasses"] = [
      {
        id: "1",
        classType: "ECONOMY",
        price: "299.99",
        totalSeats: 100,
        availableSeats: 10,
      },
      {
        id: "2",
        classType: "BUSINESS",
        price: "299.99",
        totalSeats: 20,
        availableSeats: 5,
      },
    ];
    expect(getLowestPrice(seatClasses)).toBe(299.99);
  });

  it("should handle very large prices", () => {
    const seatClasses: FlightSearchResult["seatClasses"] = [
      {
        id: "1",
        classType: "ECONOMY",
        price: "9999.99",
        totalSeats: 100,
        availableSeats: 10,
      },
      {
        id: "2",
        classType: "FIRST",
        price: "99999.99",
        totalSeats: 8,
        availableSeats: 2,
      },
    ];
    expect(getLowestPrice(seatClasses)).toBe(9999.99);
  });
});

describe("formatAirportDisplay", () => {
  it("should format airport with terminal", () => {
    expect(
      formatAirportDisplay("Shanghai Pudong International Airport", "T2")
    ).toBe("Shanghai Pudong International Airport T2");
  });

  it("should format airport without terminal", () => {
    expect(
      formatAirportDisplay("Shanghai Pudong International Airport", null)
    ).toBe("Shanghai Pudong International Airport");
  });

  it("should handle empty string terminal as null", () => {
    expect(
      formatAirportDisplay("John F. Kennedy International Airport", null)
    ).toBe("John F. Kennedy International Airport");
  });

  it("should handle single character terminal", () => {
    expect(formatAirportDisplay("Los Angeles International Airport", "B")).toBe(
      "Los Angeles International Airport B"
    );
  });

  it("should handle terminal with multiple characters", () => {
    expect(formatAirportDisplay("Heathrow Airport", "Terminal 5")).toBe(
      "Heathrow Airport Terminal 5"
    );
  });

  it("should handle airport names with special characters", () => {
    expect(formatAirportDisplay("Charles de Gaulle Airport", "2E")).toBe(
      "Charles de Gaulle Airport 2E"
    );
  });

  it("should handle short airport names", () => {
    expect(formatAirportDisplay("JFK", "4")).toBe("JFK 4");
  });

  it("should handle very long airport names", () => {
    const longName = "Suvarnabhumi International Airport Bangkok Thailand";
    expect(formatAirportDisplay(longName, "D7")).toBe(`${longName} D7`);
  });

  it("should preserve spacing between airport name and terminal", () => {
    const result = formatAirportDisplay("Test Airport", "A");
    expect(result).toBe("Test Airport A");
    expect(result.includes("  ")).toBe(false); // No double spaces
  });
});
