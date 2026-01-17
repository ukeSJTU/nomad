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
