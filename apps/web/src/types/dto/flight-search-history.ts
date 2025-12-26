/**
 * Search history record type for display
 */
export interface SearchHistoryRecord {
  id: string;
  departureCityIata: string;
  departureCityName: string;
  arrivalCityIata: string;
  arrivalCityName: string;
  tripType: "one-way" | "round-trip";
  departureDate: string; // YYYY-MM-DD format
  returnDate: string | null; // YYYY-MM-DD format (null for one-way)
  seatClass: string;
  lowestPriceAtSearch: string | null; // Decimal string (e.g., "1234.56")
  currentLowestPrice: string | null; // Decimal string (e.g., "1234.56")
  lastSearchedAt: Date;
}
