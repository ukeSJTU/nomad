// ============================================================
// Flight Search Types
// ============================================================

export type CityData = {
  iataCode: string;
  name: string;
  timezone: string;
  pinyinFirstLetter: string | null;
  continent: string | null;
  isPopular: boolean;
  displayOrder: number;
};

export type SearchFormData = {
  tripType: "one-way" | "round-trip";
  departureCity: CityData | null;
  arrivalCity: CityData | null;
  departureDate: Date | undefined;
  returnDate: Date | undefined;
  seatClass: string;
};

export type SearchFormProps = {
  tripType: "one-way" | "round-trip";
  departureCity: CityData | null;
  arrivalCity: CityData | null;
  departureDate: Date | null;
  returnDate: Date | null;
  seatClass: string;
  cities: CityData[];
  showSearchButton?: boolean;
  onTripTypeChange: (tripType: "one-way" | "round-trip") => void;
  onDepartureCityChange: (city: CityData | null) => void;
  onArrivalCityChange: (city: CityData | null) => void;
  onDepartureDateChange: (date: Date | null) => void;
  onReturnDateChange: (date: Date | null) => void;
  onSeatClassChange: (seatClass: string) => void;
  onSwap: () => void;
  onSearch?: () => void;
};

export type FlightSearchHeaderProps = {
  tripType: "one-way" | "round-trip";
  departureCity: CityData;
  arrivalCity: CityData;
  formattedDepartureDate: string;
  formattedReturnDate?: string;
  formattedLastUpdateTime: string;
  activeTab?: "outbound" | "return";
  onTabChange?: (tab: "outbound" | "return") => void;
  text: {
    oneWay: string;
    tabSelectOutbound: string;
    tabSelectReturn: string;
    lastUpdate: string;
    priceFluctuationNotice: string;
  };
  roundTripSteps: {
    outbound: number;
    return: number;
  };
};

// ============================================================
// Search History Types
// ============================================================

export type SearchHistoryRecord = {
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
};

export type SearchHistoryCardProps = {
  record: SearchHistoryRecord;
  formattedPrice: string; // e.g., "1,234"
  priceStatus: {
    label: string;
    colorClass: string;
  } | null;
  formattedDate: string; // e.g., "2025-10-30 周四" or "10-30 去  11-02 回"
  onClick: () => void;
};

export type SearchHistorySectionProps = {
  searchHistory: SearchHistoryRecord[];
  formatPrice: (price: string) => string;
  formatDate: (
    date: string,
    tripType: "one-way" | "round-trip",
    returnDate?: string | null
  ) => string;
  getPriceStatus: (
    lowestPriceAtSearch: string | null,
    currentLowestPrice: string | null
  ) => { label: string; colorClass: string } | null;
  onHistoryClick: (record: SearchHistoryRecord) => void;
  onClearHistory: () => void;
  isClearing: boolean;
};
