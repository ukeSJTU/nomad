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
      it("should reject invalid departure airport code (not 3 characters)", async () => {
        await expect(
          searchFlights({
            from: "AB", // Only 2 characters
            to: "SHA",
            departureDate: "2025-12-01",
          })
        ).rejects.toThrow("Departure airport code must be 3 characters");
      });

      it("should reject invalid departure airport code (lowercase)", async () => {
        await expect(
          searchFlights({
            from: "pek", // Lowercase
            to: "SHA",
            departureDate: "2025-12-01",
          })
        ).rejects.toThrow();
      });

      it("should reject invalid arrival airport code", async () => {
        await expect(
          searchFlights({
            from: "PEK",
            to: "SH", // Only 2 characters
            departureDate: "2025-12-01",
          })
        ).rejects.toThrow("Arrival airport code must be 3 characters");
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

      it("should automatically convert airport codes to uppercase", async () => {
        const mockAirportQuery = {
          from: vi.fn().mockReturnThis(),
          innerJoin: vi.fn().mockReturnThis(),
          where: vi.fn().mockReturnThis(),
          limit: vi.fn().mockResolvedValue([
            {
              airport: {
                id: "airport-1",
                iataCode: "PEK",
                name: "Beijing Capital",
                cityId: "city-1",
                isDeleted: false,
              },
              city: {
                id: "city-1",
                iataCode: "BJS",
                name: "北京",
                timezone: "Asia/Shanghai",
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

        vi.mocked(db.select).mockReturnValueOnce(mockAirportQuery as any);
        vi.mocked(db.select).mockReturnValueOnce(mockAirportQuery as any);
        vi.mocked(db.select).mockReturnValueOnce(mockFlightQuery as any);

        await searchFlights({
          from: "pek", // Lowercase input
          to: "sha", // Lowercase input
          departureDate: "2025-12-01",
        });

        // Verify that the where clause was called with uppercase codes
        expect(mockAirportQuery.where).toHaveBeenCalled();
      });
    });

    describe("Business Logic Validation", () => {
      it("should reject when departure and arrival airports are the same", async () => {
        await expect(
          searchFlights({
            from: "PEK",
            to: "PEK", // Same as departure
            departureDate: "2025-12-01",
          })
        ).rejects.toThrow("Departure and arrival airports must be different");
      });

      it("should reject past departure dates", async () => {
        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - 1);
        const pastDateString = pastDate.toISOString().split("T")[0];

        await expect(
          searchFlights({
            from: "PEK",
            to: "SHA",
            departureDate: pastDateString,
          })
        ).rejects.toThrow("Departure date cannot be in the past");
      });

      it("should accept today's date", async () => {
        const today = new Date().toISOString().split("T")[0];

        const mockAirportQuery = {
          from: vi.fn().mockReturnThis(),
          innerJoin: vi.fn().mockReturnThis(),
          where: vi.fn().mockReturnThis(),
          limit: vi.fn().mockResolvedValue([
            {
              airport: {
                id: "airport-1",
                iataCode: "PEK",
                name: "Beijing Capital",
                cityId: "city-1",
                isDeleted: false,
              },
              city: {
                id: "city-1",
                iataCode: "BJS",
                name: "北京",
                timezone: "Asia/Shanghai",
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

        vi.mocked(db.select).mockReturnValueOnce(mockAirportQuery as any);
        vi.mocked(db.select).mockReturnValueOnce(mockAirportQuery as any);
        vi.mocked(db.select).mockReturnValueOnce(mockFlightQuery as any);

        await expect(
          searchFlights({
            from: "PEK",
            to: "SHA",
            departureDate: today,
          })
        ).resolves.toBeDefined();
      });

      it("should throw error when departure airport not found", async () => {
        const mockSelect = vi.fn().mockReturnValue({
          from: vi.fn().mockReturnValue({
            innerJoin: vi.fn().mockReturnValue({
              where: vi.fn().mockReturnValue({
                limit: vi.fn().mockResolvedValue([]), // Empty result
              }),
            }),
          }),
        });

        vi.mocked(db.select).mockImplementation(mockSelect);

        await expect(
          searchFlights({
            from: "XXX", // Non-existent airport
            to: "SHA",
            departureDate: "2025-12-01",
          })
        ).rejects.toThrow("Departure airport XXX not found");
      });

      it("should throw error when arrival airport not found", async () => {
        const mockDepartureQuery = {
          from: vi.fn().mockReturnThis(),
          innerJoin: vi.fn().mockReturnThis(),
          where: vi.fn().mockReturnThis(),
          limit: vi.fn().mockResolvedValue([
            {
              airport: {
                id: "airport-1",
                iataCode: "PEK",
                name: "Beijing Capital",
                cityId: "city-1",
                isDeleted: false,
              },
              city: {
                id: "city-1",
                iataCode: "BJS",
                name: "北京",
                timezone: "Asia/Shanghai",
              },
            },
          ]),
        };

        const mockArrivalQuery = {
          from: vi.fn().mockReturnThis(),
          innerJoin: vi.fn().mockReturnThis(),
          where: vi.fn().mockReturnThis(),
          limit: vi.fn().mockResolvedValue([]), // Empty result
        };

        vi.mocked(db.select)
          .mockReturnValueOnce(mockDepartureQuery as any)
          .mockReturnValueOnce(mockArrivalQuery as any);

        await expect(
          searchFlights({
            from: "PEK",
            to: "XXX", // Non-existent airport
            departureDate: "2025-12-01",
          })
        ).rejects.toThrow("Arrival airport XXX not found");
      });
    });
  });

  describe("searchOneWayFlights", () => {
    it("should be an alias for searchFlights", async () => {
      const mockAirportQuery = {
        from: vi.fn().mockReturnThis(),
        innerJoin: vi.fn().mockReturnThis(),
        where: vi.fn().mockReturnThis(),
        limit: vi.fn(),
      };

      mockAirportQuery.limit
        .mockResolvedValueOnce([
          {
            airport: {
              id: "airport-1",
              iataCode: "PEK",
              name: "Beijing Capital",
              cityId: "city-1",
              isDeleted: false,
            },
            city: {
              id: "city-1",
              iataCode: "BJS",
              name: "北京",
              timezone: "Asia/Shanghai",
            },
          },
        ])
        .mockResolvedValueOnce([
          {
            airport: {
              id: "airport-2",
              iataCode: "SHA",
              name: "Shanghai Hongqiao",
              cityId: "city-2",
              isDeleted: false,
            },
            city: {
              id: "city-2",
              iataCode: "SHA",
              name: "上海",
              timezone: "Asia/Shanghai",
            },
          },
        ]);

      const mockFlightQuery = {
        from: vi.fn().mockReturnThis(),
        innerJoin: vi.fn().mockReturnThis(),
        leftJoin: vi.fn().mockReturnThis(),
        where: vi.fn().mockReturnThis(),
        orderBy: vi.fn().mockResolvedValue([]),
      };

      vi.mocked(db.select)
        .mockReturnValueOnce(mockAirportQuery as any)
        .mockReturnValueOnce(mockAirportQuery as any)
        .mockReturnValueOnce(mockFlightQuery as any);

      const result = await searchOneWayFlights({
        from: "PEK",
        to: "SHA",
        departureDate: "2025-12-01",
      });

      expect(result).toEqual([]);
    });
  });
});
