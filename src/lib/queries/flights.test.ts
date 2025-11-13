import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock the database module
vi.mock("@/lib/db", () => ({
  db: {
    select: vi.fn(),
  },
}));

// Import after mocking
import { db } from "@/lib/db";

import { searchFlights, searchOneWayFlights } from "./flights";

describe("Flight Search Queries", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("searchFlights", () => {
    describe("Parameter Validation", () => {
      it("should reject invalid departure city code (not 3 characters)", async () => {
        await expect(
          searchFlights({
            from: "AB", // Only 2 characters
            to: "SHA",
            departureDate: "2025-12-01",
          })
        ).rejects.toThrow("Departure city code must be 3 characters");
      });

      it("should reject invalid departure city code (lowercase)", async () => {
        await expect(
          searchFlights({
            from: "pek", // Lowercase
            to: "SHA",
            departureDate: "2025-12-01",
          })
        ).rejects.toThrow();
      });

      it("should reject invalid arrival city code", async () => {
        await expect(
          searchFlights({
            from: "BJS",
            to: "SH", // Only 2 characters
            departureDate: "2025-12-01",
          })
        ).rejects.toThrow("Arrival city code must be 3 characters");
      });

      it("should reject invalid date format", async () => {
        await expect(
          searchFlights({
            from: "PEK",
            to: "SHA",
            departureDate: "2025/12/01", // Wrong format
          })
        ).rejects.toThrow("Date must be in YYYY-MM-DD format");
      });

      it("should reject invalid class type", async () => {
        await expect(
          searchFlights({
            from: "PEK",
            to: "SHA",
            departureDate: "2025-12-01",
            classType: "PREMIUM" as any, // Invalid class type
          })
        ).rejects.toThrow();
      });

      it("should automatically convert city codes to uppercase", async () => {
        const mockCityQuery = {
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockReturnThis(),
          limit: vi.fn().mockResolvedValue([
            {
              city: {
                id: "city-1",
                iataCode: "BJS",
                name: "北京",
                timezone: "Asia/Shanghai",
              },
            },
          ]),
        };

        const mockAirportsQuery = {
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockResolvedValue([
            {
              airport: {
                id: "airport-1",
                iataCode: "PEK",
                name: "Beijing Capital",
                cityId: "city-1",
                isDeleted: false,
              },
            },
          ]),
        };

        const mockFlightQuery = {
          from: vi.fn().mockReturnThis(),
          innerJoin: vi.fn().mockReturnThis(),
          leftJoin: vi.fn().mockReturnThis(),
          where: vi.fn().mockReturnThis(),
          orderBy: vi.fn().mockResolvedValue([]),
        };

        // Mock sequence: departure city, arrival city, departure airports, arrival airports, flights
        vi.mocked(db.select)
          .mockReturnValueOnce(mockCityQuery as any) // departure city
          .mockReturnValueOnce(mockAirportsQuery as any) // departure airports
          .mockReturnValueOnce(mockCityQuery as any) // arrival city
          .mockReturnValueOnce(mockAirportsQuery as any) // arrival airports
          .mockReturnValueOnce(mockFlightQuery as any); // flights

        await searchFlights({
          from: "bjs", // Lowercase input
          to: "sha", // Lowercase input
          departureDate: "2025-12-01",
        });

        // Verify that the where clause was called
        expect(mockCityQuery.where).toHaveBeenCalled();
      });
    });

    describe("Business Logic Validation", () => {
      it("should reject when departure and arrival cities are the same", async () => {
        await expect(
          searchFlights({
            from: "BJS",
            to: "BJS", // Same as departure
            departureDate: "2025-12-01",
          })
        ).rejects.toThrow("Departure and arrival cities must be different");
      });

      it("should reject past departure dates", async () => {
        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - 2); // Use 2 days ago to avoid timezone issues
        const pastDateString = pastDate.toISOString().split("T")[0];

        // Mock departure city lookup
        const mockDepartureCityQuery = {
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockReturnThis(),
          limit: vi.fn().mockResolvedValue([
            {
              city: {
                id: "city-1",
                iataCode: "BJS",
                name: "北京",
                timezone: "Asia/Shanghai",
              },
            },
          ]),
        };

        const mockDepartureAirportsQuery = {
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockResolvedValue([
            {
              airport: {
                id: "airport-1",
                iataCode: "PEK",
                name: "Beijing Capital",
                cityId: "city-1",
                isDeleted: false,
              },
            },
          ]),
        };

        const mockArrivalCityQuery = {
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockReturnThis(),
          limit: vi.fn().mockResolvedValue([
            {
              city: {
                id: "city-2",
                iataCode: "SHA",
                name: "上海",
                timezone: "Asia/Shanghai",
              },
            },
          ]),
        };

        const mockArrivalAirportsQuery = {
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockResolvedValue([
            {
              airport: {
                id: "airport-2",
                iataCode: "PVG",
                name: "Pudong International",
                cityId: "city-2",
                isDeleted: false,
              },
            },
          ]),
        };

        // Mock all 4 queries: departure city, departure airports, arrival city, arrival airports
        vi.mocked(db.select)
          .mockReturnValueOnce(mockDepartureCityQuery as any)
          .mockReturnValueOnce(mockDepartureAirportsQuery as any)
          .mockReturnValueOnce(mockArrivalCityQuery as any)
          .mockReturnValueOnce(mockArrivalAirportsQuery as any);

        await expect(
          searchFlights({
            from: "BJS",
            to: "SHA",
            departureDate: pastDateString,
          })
        ).rejects.toThrow("Departure date cannot be in the past");
      });

      it("should accept today's date", async () => {
        // Use a date that's definitely today in the departure city's timezone
        // We'll use a date string that represents today in Asia/Shanghai timezone
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        const today = `${year}-${month}-${day}`;

        const mockCityQuery = {
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockReturnThis(),
          limit: vi.fn().mockResolvedValue([
            {
              city: {
                id: "city-1",
                iataCode: "BJS",
                name: "北京",
                timezone: "Asia/Shanghai",
              },
            },
          ]),
        };

        const mockAirportsQuery = {
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockResolvedValue([
            {
              airport: {
                id: "airport-1",
                iataCode: "PEK",
                name: "Beijing Capital",
                cityId: "city-1",
                isDeleted: false,
              },
            },
          ]),
        };

        const mockFlightQuery = {
          from: vi.fn().mockReturnThis(),
          innerJoin: vi.fn().mockReturnThis(),
          leftJoin: vi.fn().mockReturnThis(),
          where: vi.fn().mockReturnThis(),
          orderBy: vi.fn().mockResolvedValue([]),
        };

        // Mock sequence: departure city, departure airports, arrival city, arrival airports, flights
        vi.mocked(db.select)
          .mockReturnValueOnce(mockCityQuery as any)
          .mockReturnValueOnce(mockAirportsQuery as any)
          .mockReturnValueOnce(mockCityQuery as any)
          .mockReturnValueOnce(mockAirportsQuery as any)
          .mockReturnValueOnce(mockFlightQuery as any);

        await expect(
          searchFlights({
            from: "BJS",
            to: "SHA",
            departureDate: today,
          })
        ).resolves.toBeDefined();
      });

      it("should reject departure date exceeding one year from today", async () => {
        const futureDate = new Date();
        futureDate.setFullYear(futureDate.getFullYear() + 1);
        futureDate.setDate(futureDate.getDate() + 1); // One day more than one year
        const futureDateString = futureDate.toISOString().split("T")[0];

        // Mock departure city lookup
        const mockDepartureCityQuery = {
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockReturnThis(),
          limit: vi.fn().mockResolvedValue([
            {
              city: {
                id: "city-1",
                iataCode: "BJS",
                name: "北京",
                timezone: "Asia/Shanghai",
              },
            },
          ]),
        };

        const mockDepartureAirportsQuery = {
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockResolvedValue([
            {
              airport: {
                id: "airport-1",
                iataCode: "PEK",
                name: "Beijing Capital",
                cityId: "city-1",
                isDeleted: false,
              },
            },
          ]),
        };

        const mockArrivalCityQuery = {
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockReturnThis(),
          limit: vi.fn().mockResolvedValue([
            {
              city: {
                id: "city-2",
                iataCode: "SHA",
                name: "上海",
                timezone: "Asia/Shanghai",
              },
            },
          ]),
        };

        const mockArrivalAirportsQuery = {
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockResolvedValue([
            {
              airport: {
                id: "airport-2",
                iataCode: "PVG",
                name: "Pudong International",
                cityId: "city-2",
                isDeleted: false,
              },
            },
          ]),
        };

        // Mock all 4 queries: departure city, departure airports, arrival city, arrival airports
        // Date validation happens AFTER all these queries, so we need to mock all of them
        vi.mocked(db.select)
          .mockReturnValueOnce(mockDepartureCityQuery as any)
          .mockReturnValueOnce(mockDepartureAirportsQuery as any)
          .mockReturnValueOnce(mockArrivalCityQuery as any)
          .mockReturnValueOnce(mockArrivalAirportsQuery as any);

        await expect(
          searchFlights({
            from: "BJS",
            to: "SHA",
            departureDate: futureDateString,
          })
        ).rejects.toThrow("Departure date cannot exceed one year from today");
      });

      it("should throw error when departure city not found", async () => {
        // Mock departure city query to return empty result
        const mockCityQuery = {
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockReturnThis(),
          limit: vi.fn().mockResolvedValue([]), // Empty result - city not found
        };

        vi.mocked(db.select).mockReturnValueOnce(mockCityQuery as any);

        await expect(
          searchFlights({
            from: "XXX", // Non-existent city
            to: "SHA",
            departureDate: "2025-12-01",
          })
        ).rejects.toThrow("Departure city XXX not found");
      });

      it("should throw error when arrival city not found", async () => {
        const mockDepartureCityQuery = {
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockReturnThis(),
          limit: vi.fn().mockResolvedValue([
            {
              city: {
                id: "city-1",
                iataCode: "BJS",
                name: "北京",
                timezone: "Asia/Shanghai",
              },
            },
          ]),
        };

        const mockDepartureAirportsQuery = {
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockResolvedValue([
            {
              airport: {
                id: "airport-1",
                iataCode: "PEK",
                name: "Beijing Capital",
                cityId: "city-1",
                isDeleted: false,
              },
            },
          ]),
        };

        const mockArrivalCityQuery = {
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockReturnThis(),
          limit: vi.fn().mockResolvedValue([]), // Empty result
        };

        vi.mocked(db.select)
          .mockReturnValueOnce(mockDepartureCityQuery as any)
          .mockReturnValueOnce(mockDepartureAirportsQuery as any)
          .mockReturnValueOnce(mockArrivalCityQuery as any);

        await expect(
          searchFlights({
            from: "BJS",
            to: "XXX", // Non-existent city
            departureDate: "2025-12-01",
          })
        ).rejects.toThrow("Arrival city XXX not found");
      });
    });
  });

  describe("searchOneWayFlights", () => {
    it("should be an alias for searchFlights", async () => {
      const mockCityQuery = {
        from: vi.fn().mockReturnThis(),
        where: vi.fn().mockReturnThis(),
        limit: vi.fn().mockResolvedValue([
          {
            city: {
              id: "city-1",
              iataCode: "BJS",
              name: "北京",
              timezone: "Asia/Shanghai",
            },
          },
        ]),
      };

      const mockAirportsQuery = {
        from: vi.fn().mockReturnThis(),
        where: vi.fn().mockResolvedValue([
          {
            airport: {
              id: "airport-1",
              iataCode: "PEK",
              name: "Beijing Capital",
              cityId: "city-1",
              isDeleted: false,
            },
          },
        ]),
      };

      const mockFlightQuery = {
        from: vi.fn().mockReturnThis(),
        innerJoin: vi.fn().mockReturnThis(),
        leftJoin: vi.fn().mockReturnThis(),
        where: vi.fn().mockReturnThis(),
        orderBy: vi.fn().mockResolvedValue([]),
      };

      // Mock sequence: departure city, departure airports, arrival city, arrival airports, flights
      vi.mocked(db.select)
        .mockReturnValueOnce(mockCityQuery as any)
        .mockReturnValueOnce(mockAirportsQuery as any)
        .mockReturnValueOnce(mockCityQuery as any)
        .mockReturnValueOnce(mockAirportsQuery as any)
        .mockReturnValueOnce(mockFlightQuery as any);

      const result = await searchOneWayFlights({
        from: "BJS",
        to: "SHA",
        departureDate: "2025-12-01",
      });

      expect(result).toEqual([]);
    });
  });

  describe("Seat Class Filtering and Lowest Price Calculation", () => {
    describe("when classType is not specified", () => {
      it("should return all seat classes for each flight", async () => {
        const mockDepartureCityQuery = {
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockReturnThis(),
          limit: vi.fn().mockResolvedValue([
            {
              city: {
                id: "city-1",
                iataCode: "BJS",
                name: "北京",
                timezone: "Asia/Shanghai",
              },
            },
          ]),
        };

        const mockDepartureAirportsQuery = {
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockResolvedValue([
            {
              airport: {
                id: "airport-1",
                iataCode: "PEK",
                name: "Beijing Capital",
                cityId: "city-1",
                isDeleted: false,
              },
            },
          ]),
        };

        const mockArrivalCityQuery = {
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockReturnThis(),
          limit: vi.fn().mockResolvedValue([
            {
              city: {
                id: "city-2",
                iataCode: "SHA",
                name: "上海",
                timezone: "Asia/Shanghai",
              },
            },
          ]),
        };

        const mockArrivalAirportsQuery = {
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockResolvedValue([
            {
              airport: {
                id: "airport-2",
                iataCode: "PVG",
                name: "Shanghai Pudong",
                cityId: "city-2",
                isDeleted: false,
              },
            },
          ]),
        };

        const mockFlightQuery = {
          from: vi.fn().mockReturnThis(),
          innerJoin: vi.fn().mockReturnThis(),
          leftJoin: vi.fn().mockReturnThis(),
          where: vi.fn().mockReturnThis(),
          orderBy: vi.fn().mockResolvedValue([
            {
              flight: {
                id: "flight-1",
                flightNumber: "CA123",
                airlineId: "airline-1",
                departureAirportId: "airport-1",
                arrivalAirportId: "airport-2",
                departureDatetime: new Date("2025-12-01T10:00:00Z"),
                arrivalDatetime: new Date("2025-12-01T12:00:00Z"),
                departureTerminal: "T3",
                arrivalTerminal: "T2",
                aircraftType: "Boeing 737",
                isDeleted: false,
              },
              airline: {
                id: "airline-1",
                iataCode: "CA",
                name: "Air China",
                logoUrl: null,
              },
              departureAirport: {
                id: "airport-1",
                iataCode: "PEK",
                name: "Beijing Capital",
              },
              arrivalAirport: {
                id: "airport-2",
                iataCode: "PVG",
                name: "Shanghai Pudong",
              },
              seatClass: {
                id: "seat-1",
                flightId: "flight-1",
                classType: "ECONOMY",
                totalSeats: 100,
                availableSeats: 50,
                price: "650.00",
              },
            },
            {
              flight: {
                id: "flight-1",
                flightNumber: "CA123",
                airlineId: "airline-1",
                departureAirportId: "airport-1",
                arrivalAirportId: "airport-2",
                departureDatetime: new Date("2025-12-01T10:00:00Z"),
                arrivalDatetime: new Date("2025-12-01T12:00:00Z"),
                departureTerminal: "T3",
                arrivalTerminal: "T2",
                aircraftType: "Boeing 737",
                isDeleted: false,
              },
              airline: {
                id: "airline-1",
                iataCode: "CA",
                name: "Air China",
                logoUrl: null,
              },
              departureAirport: {
                id: "airport-1",
                iataCode: "PEK",
                name: "Beijing Capital",
              },
              arrivalAirport: {
                id: "airport-2",
                iataCode: "PVG",
                name: "Shanghai Pudong",
              },
              seatClass: {
                id: "seat-2",
                flightId: "flight-1",
                classType: "BUSINESS",
                totalSeats: 20,
                availableSeats: 10,
                price: "3230.00",
              },
            },
          ]),
        };

        vi.mocked(db.select)
          .mockReturnValueOnce(mockDepartureCityQuery as any)
          .mockReturnValueOnce(mockDepartureAirportsQuery as any)
          .mockReturnValueOnce(mockArrivalCityQuery as any)
          .mockReturnValueOnce(mockArrivalAirportsQuery as any)
          .mockReturnValueOnce(mockFlightQuery as any);

        const result = await searchFlights({
          from: "BJS",
          to: "SHA",
          departureDate: "2025-12-01",
          // classType not specified
        });

        expect(result).toHaveLength(1);
        expect(result[0].seatClasses).toHaveLength(2);
        expect(result[0].seatClasses[0].classType).toBe("ECONOMY");
        expect(result[0].seatClasses[1].classType).toBe("BUSINESS");
      });

      it("should calculate lowestPrice correctly", async () => {
        const mockDepartureCityQuery = {
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockReturnThis(),
          limit: vi.fn().mockResolvedValue([
            {
              city: {
                id: "city-1",
                iataCode: "BJS",
                name: "北京",
                timezone: "Asia/Shanghai",
              },
            },
          ]),
        };

        const mockDepartureAirportsQuery = {
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockResolvedValue([
            {
              airport: {
                id: "airport-1",
                iataCode: "PEK",
                name: "Beijing Capital",
                cityId: "city-1",
                isDeleted: false,
              },
            },
          ]),
        };

        const mockArrivalCityQuery = {
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockReturnThis(),
          limit: vi.fn().mockResolvedValue([
            {
              city: {
                id: "city-2",
                iataCode: "SHA",
                name: "上海",
                timezone: "Asia/Shanghai",
              },
            },
          ]),
        };

        const mockArrivalAirportsQuery = {
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockResolvedValue([
            {
              airport: {
                id: "airport-2",
                iataCode: "PVG",
                name: "Shanghai Pudong",
                cityId: "city-2",
                isDeleted: false,
              },
            },
          ]),
        };

        const mockFlightQuery = {
          from: vi.fn().mockReturnThis(),
          innerJoin: vi.fn().mockReturnThis(),
          leftJoin: vi.fn().mockReturnThis(),
          where: vi.fn().mockReturnThis(),
          orderBy: vi.fn().mockResolvedValue([
            {
              flight: {
                id: "flight-1",
                flightNumber: "CA123",
                airlineId: "airline-1",
                departureAirportId: "airport-1",
                arrivalAirportId: "airport-2",
                departureDatetime: new Date("2025-12-01T10:00:00Z"),
                arrivalDatetime: new Date("2025-12-01T12:00:00Z"),
                departureTerminal: "T3",
                arrivalTerminal: "T2",
                aircraftType: "Boeing 737",
                isDeleted: false,
              },
              airline: {
                id: "airline-1",
                iataCode: "CA",
                name: "Air China",
                logoUrl: null,
              },
              departureAirport: {
                id: "airport-1",
                iataCode: "PEK",
                name: "Beijing Capital",
              },
              arrivalAirport: {
                id: "airport-2",
                iataCode: "PVG",
                name: "Shanghai Pudong",
              },
              seatClass: {
                id: "seat-1",
                flightId: "flight-1",
                classType: "ECONOMY",
                totalSeats: 100,
                availableSeats: 50,
                price: "650.00",
              },
            },
            {
              flight: {
                id: "flight-1",
                flightNumber: "CA123",
                airlineId: "airline-1",
                departureAirportId: "airport-1",
                arrivalAirportId: "airport-2",
                departureDatetime: new Date("2025-12-01T10:00:00Z"),
                arrivalDatetime: new Date("2025-12-01T12:00:00Z"),
                departureTerminal: "T3",
                arrivalTerminal: "T2",
                aircraftType: "Boeing 737",
                isDeleted: false,
              },
              airline: {
                id: "airline-1",
                iataCode: "CA",
                name: "Air China",
                logoUrl: null,
              },
              departureAirport: {
                id: "airport-1",
                iataCode: "PEK",
                name: "Beijing Capital",
              },
              arrivalAirport: {
                id: "airport-2",
                iataCode: "PVG",
                name: "Shanghai Pudong",
              },
              seatClass: {
                id: "seat-2",
                flightId: "flight-1",
                classType: "BUSINESS",
                totalSeats: 20,
                availableSeats: 10,
                price: "3230.00",
              },
            },
          ]),
        };

        vi.mocked(db.select)
          .mockReturnValueOnce(mockDepartureCityQuery as any)
          .mockReturnValueOnce(mockDepartureAirportsQuery as any)
          .mockReturnValueOnce(mockArrivalCityQuery as any)
          .mockReturnValueOnce(mockArrivalAirportsQuery as any)
          .mockReturnValueOnce(mockFlightQuery as any);

        const result = await searchFlights({
          from: "BJS",
          to: "SHA",
          departureDate: "2025-12-01",
        });

        expect(result).toHaveLength(1);
        expect(result[0].lowestPrice).toBe(650);
        expect(result[0].lowestPriceClassType).toBe("ECONOMY");
      });

      it("should handle flights with only one seat class", async () => {
        const mockDepartureCityQuery = {
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockReturnThis(),
          limit: vi.fn().mockResolvedValue([
            {
              city: {
                id: "city-1",
                iataCode: "BJS",
                name: "北京",
                timezone: "Asia/Shanghai",
              },
            },
          ]),
        };

        const mockDepartureAirportsQuery = {
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockResolvedValue([
            {
              airport: {
                id: "airport-1",
                iataCode: "PEK",
                name: "Beijing Capital",
                cityId: "city-1",
                isDeleted: false,
              },
            },
          ]),
        };

        const mockArrivalCityQuery = {
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockReturnThis(),
          limit: vi.fn().mockResolvedValue([
            {
              city: {
                id: "city-2",
                iataCode: "SHA",
                name: "上海",
                timezone: "Asia/Shanghai",
              },
            },
          ]),
        };

        const mockArrivalAirportsQuery = {
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockResolvedValue([
            {
              airport: {
                id: "airport-2",
                iataCode: "PVG",
                name: "Shanghai Pudong",
                cityId: "city-2",
                isDeleted: false,
              },
            },
          ]),
        };

        const mockFlightQuery = {
          from: vi.fn().mockReturnThis(),
          innerJoin: vi.fn().mockReturnThis(),
          leftJoin: vi.fn().mockReturnThis(),
          where: vi.fn().mockReturnThis(),
          orderBy: vi.fn().mockResolvedValue([
            {
              flight: {
                id: "flight-1",
                flightNumber: "CA123",
                airlineId: "airline-1",
                departureAirportId: "airport-1",
                arrivalAirportId: "airport-2",
                departureDatetime: new Date("2025-12-01T10:00:00Z"),
                arrivalDatetime: new Date("2025-12-01T12:00:00Z"),
                departureTerminal: "T3",
                arrivalTerminal: "T2",
                aircraftType: "Boeing 737",
                isDeleted: false,
              },
              airline: {
                id: "airline-1",
                iataCode: "CA",
                name: "Air China",
                logoUrl: null,
              },
              departureAirport: {
                id: "airport-1",
                iataCode: "PEK",
                name: "Beijing Capital",
              },
              arrivalAirport: {
                id: "airport-2",
                iataCode: "PVG",
                name: "Shanghai Pudong",
              },
              seatClass: {
                id: "seat-1",
                flightId: "flight-1",
                classType: "ECONOMY",
                totalSeats: 100,
                availableSeats: 50,
                price: "800.00",
              },
            },
          ]),
        };

        vi.mocked(db.select)
          .mockReturnValueOnce(mockDepartureCityQuery as any)
          .mockReturnValueOnce(mockDepartureAirportsQuery as any)
          .mockReturnValueOnce(mockArrivalCityQuery as any)
          .mockReturnValueOnce(mockArrivalAirportsQuery as any)
          .mockReturnValueOnce(mockFlightQuery as any);

        const result = await searchFlights({
          from: "BJS",
          to: "SHA",
          departureDate: "2025-12-01",
        });

        expect(result).toHaveLength(1);
        expect(result[0].seatClasses).toHaveLength(1);
        expect(result[0].lowestPrice).toBe(800);
        expect(result[0].lowestPriceClassType).toBe("ECONOMY");
      });
    });

    describe("when classType is specified", () => {
      it("should return only the specified seat class (backward compatibility)", async () => {
        const mockDepartureCityQuery = {
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockReturnThis(),
          limit: vi.fn().mockResolvedValue([
            {
              city: {
                id: "city-1",
                iataCode: "BJS",
                name: "北京",
                timezone: "Asia/Shanghai",
              },
            },
          ]),
        };

        const mockDepartureAirportsQuery = {
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockResolvedValue([
            {
              airport: {
                id: "airport-1",
                iataCode: "PEK",
                name: "Beijing Capital",
                cityId: "city-1",
                isDeleted: false,
              },
            },
          ]),
        };

        const mockArrivalCityQuery = {
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockReturnThis(),
          limit: vi.fn().mockResolvedValue([
            {
              city: {
                id: "city-2",
                iataCode: "SHA",
                name: "上海",
                timezone: "Asia/Shanghai",
              },
            },
          ]),
        };

        const mockArrivalAirportsQuery = {
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockResolvedValue([
            {
              airport: {
                id: "airport-2",
                iataCode: "PVG",
                name: "Shanghai Pudong",
                cityId: "city-2",
                isDeleted: false,
              },
            },
          ]),
        };

        const mockFlightQuery = {
          from: vi.fn().mockReturnThis(),
          innerJoin: vi.fn().mockReturnThis(),
          leftJoin: vi.fn().mockReturnThis(),
          where: vi.fn().mockReturnThis(),
          orderBy: vi.fn().mockResolvedValue([
            {
              flight: {
                id: "flight-1",
                flightNumber: "CA123",
                airlineId: "airline-1",
                departureAirportId: "airport-1",
                arrivalAirportId: "airport-2",
                departureDatetime: new Date("2025-12-01T10:00:00Z"),
                arrivalDatetime: new Date("2025-12-01T12:00:00Z"),
                departureTerminal: "T3",
                arrivalTerminal: "T2",
                aircraftType: "Boeing 737",
                isDeleted: false,
              },
              airline: {
                id: "airline-1",
                iataCode: "CA",
                name: "Air China",
                logoUrl: null,
              },
              departureAirport: {
                id: "airport-1",
                iataCode: "PEK",
                name: "Beijing Capital",
              },
              arrivalAirport: {
                id: "airport-2",
                iataCode: "PVG",
                name: "Shanghai Pudong",
              },
              seatClass: {
                id: "seat-1",
                flightId: "flight-1",
                classType: "ECONOMY",
                totalSeats: 100,
                availableSeats: 50,
                price: "650.00",
              },
            },
          ]),
        };

        vi.mocked(db.select)
          .mockReturnValueOnce(mockDepartureCityQuery as any)
          .mockReturnValueOnce(mockDepartureAirportsQuery as any)
          .mockReturnValueOnce(mockArrivalCityQuery as any)
          .mockReturnValueOnce(mockArrivalAirportsQuery as any)
          .mockReturnValueOnce(mockFlightQuery as any);

        const result = await searchFlights({
          from: "BJS",
          to: "SHA",
          departureDate: "2025-12-01",
          classType: "ECONOMY",
        });

        expect(result).toHaveLength(1);
        expect(result[0].seatClasses).toHaveLength(1);
        expect(result[0].seatClasses[0].classType).toBe("ECONOMY");
        expect(result[0].lowestPrice).toBe(650);
        expect(result[0].lowestPriceClassType).toBe("ECONOMY");
      });
    });
  });
});
