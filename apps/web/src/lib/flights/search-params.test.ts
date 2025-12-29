import { describe, expect, it } from "vitest";

import type { SearchFormData } from "@/components/flights/search";
import type { CityData } from "@/types/dto";

import { buildFlightSearchUrl } from "./search-params";

const shanghai: CityData = {
  iataCode: "SHA",
  name: "Shanghai",
  timezone: "Asia/Shanghai",
  pinyinFirstLetter: "S",
  continent: "Asia",
  isPopular: true,
  displayOrder: 1,
};

const beijing: CityData = {
  iataCode: "PEK",
  name: "Beijing",
  timezone: "Asia/Shanghai",
  pinyinFirstLetter: "B",
  continent: "Asia",
  isPopular: true,
  displayOrder: 2,
};

const baseFormData: Omit<SearchFormData, "tripType" | "returnDate"> = {
  departureCity: shanghai,
  arrivalCity: beijing,
  departureDate: new Date(2025, 0, 1),
  seatClass: "economy",
};

/**
 * @requirement REQ-F01
 */
describe("buildFlightSearchUrl", () => {
  /**
   * @requirement REQ-F01
   * @scenario 场景2
   */
  it("builds a round-trip search URL with return date", () => {
    const data: SearchFormData = {
      ...baseFormData,
      tripType: "round-trip",
      returnDate: new Date(2025, 0, 10),
    };

    const url = buildFlightSearchUrl(data);

    expect(url).toBe(
      "/flights/search?tripType=round-trip&from=SHA&to=PEK&departDate=2025-01-01&returnDate=2025-01-10&class=economy"
    );
  });

  /**
   * @requirement REQ-F01
   * @scenario 场景1
   */
  it("omits return date for one-way trips even if provided", () => {
    const data: SearchFormData = {
      ...baseFormData,
      tripType: "one-way",
      returnDate: new Date(2025, 0, 10),
    };

    const url = buildFlightSearchUrl(data);

    expect(url).toBe(
      "/flights/search?tripType=one-way&from=SHA&to=PEK&departDate=2025-01-01&class=economy"
    );
    expect(url).not.toContain("returnDate");
  });
});
