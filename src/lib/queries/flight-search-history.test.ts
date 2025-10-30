import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock the database module
vi.mock("@/lib/db", () => ({
  db: {
    select: vi.fn(),
  },
}));

// Import after mocking
import { db } from "@/lib/db";

import { getRecentSearchHistory } from "./flight-search-history";

describe("Flight Search History Queries", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getRecentSearchHistory", () => {
    it("should return search history records for a user", async () => {
      const mockUserId = "user-123";
      const mockSearchHistory = [
        {
          id: "search-1",
          departureCityIata: "SHA",
          departureCityName: "上海",
          arrivalCityIata: "BJS",
          arrivalCityName: "北京",
          tripType: "one-way",
          departureDate: "2025-11-01",
          returnDate: null,
          seatClass: "economy",
          lowestPriceAtSearch: "1234.56",
          currentLowestPrice: "1200.00",
          searchCount: 3,
          lastSearchedAt: new Date("2025-10-30T10:00:00Z"),
        },
        {
          id: "search-2",
          departureCityIata: "BJS",
          departureCityName: "北京",
          arrivalCityIata: "CAN",
          arrivalCityName: "广州",
          tripType: "round-trip",
          departureDate: "2025-11-15",
          returnDate: "2025-11-20",
          seatClass: "business",
          lowestPriceAtSearch: "3456.78",
          currentLowestPrice: "3500.00",
          searchCount: 1,
          lastSearchedAt: new Date("2025-10-29T15:30:00Z"),
        },
      ];

      const mockQuery = {
        from: vi.fn().mockReturnThis(),
        where: vi.fn().mockReturnThis(),
        orderBy: vi.fn().mockReturnThis(),
        limit: vi.fn().mockResolvedValue(mockSearchHistory),
      };

      vi.mocked(db.select).mockReturnValue(mockQuery as any);

      const result = await getRecentSearchHistory(mockUserId, 10);

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe("search-1");
      expect(result[0].tripType).toBe("one-way");
      expect(result[1].id).toBe("search-2");
      expect(result[1].tripType).toBe("round-trip");
      expect(mockQuery.limit).toHaveBeenCalledWith(10);
    });

    it("should use default limit of 10 when not specified", async () => {
      const mockUserId = "user-123";

      const mockQuery = {
        from: vi.fn().mockReturnThis(),
        where: vi.fn().mockReturnThis(),
        orderBy: vi.fn().mockReturnThis(),
        limit: vi.fn().mockResolvedValue([]),
      };

      vi.mocked(db.select).mockReturnValue(mockQuery as any);

      await getRecentSearchHistory(mockUserId);

      expect(mockQuery.limit).toHaveBeenCalledWith(10);
    });

    it("should respect custom limit parameter", async () => {
      const mockUserId = "user-123";
      const customLimit = 5;

      const mockQuery = {
        from: vi.fn().mockReturnThis(),
        where: vi.fn().mockReturnThis(),
        orderBy: vi.fn().mockReturnThis(),
        limit: vi.fn().mockResolvedValue([]),
      };

      vi.mocked(db.select).mockReturnValue(mockQuery as any);

      await getRecentSearchHistory(mockUserId, customLimit);

      expect(mockQuery.limit).toHaveBeenCalledWith(customLimit);
    });

    it("should return empty array when user has no search history", async () => {
      const mockUserId = "user-with-no-history";

      const mockQuery = {
        from: vi.fn().mockReturnThis(),
        where: vi.fn().mockReturnThis(),
        orderBy: vi.fn().mockReturnThis(),
        limit: vi.fn().mockResolvedValue([]),
      };

      vi.mocked(db.select).mockReturnValue(mockQuery as any);

      const result = await getRecentSearchHistory(mockUserId);

      expect(result).toEqual([]);
    });

    it("should handle null values correctly", async () => {
      const mockUserId = "user-123";
      const mockSearchHistory = [
        {
          id: "search-1",
          departureCityIata: "SHA",
          departureCityName: "上海",
          arrivalCityIata: "BJS",
          arrivalCityName: "北京",
          tripType: "one-way",
          departureDate: "2025-11-01",
          returnDate: null, // One-way trip has no return date
          seatClass: "economy",
          lowestPriceAtSearch: null, // Price might not be available
          currentLowestPrice: null,
          searchCount: 1,
          lastSearchedAt: new Date("2025-10-30T10:00:00Z"),
        },
      ];

      const mockQuery = {
        from: vi.fn().mockReturnThis(),
        where: vi.fn().mockReturnThis(),
        orderBy: vi.fn().mockReturnThis(),
        limit: vi.fn().mockResolvedValue(mockSearchHistory),
      };

      vi.mocked(db.select).mockReturnValue(mockQuery as any);

      const result = await getRecentSearchHistory(mockUserId);

      expect(result[0].returnDate).toBeNull();
      expect(result[0].lowestPriceAtSearch).toBeNull();
      expect(result[0].currentLowestPrice).toBeNull();
    });
  });
});
