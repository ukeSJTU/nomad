/**
 * City data type for city selector
 */
export interface CityData {
  iataCode: string;
  name: string;
  timezone: string;
  pinyinFirstLetter: string | null;
  continent: string | null;
  isPopular: boolean;
  displayOrder: number;
}

/**
 * Airport data type
 */
export interface AirportData {
  id: string;
  iataCode: string;
  name: string;
  cityId: string;
}

/**
 * City with airports for airport guide page
 */
export interface CityWithAirports {
  id: string;
  iataCode: string;
  name: string;
  isDomestic: boolean;
  isPopular: boolean;
  displayOrder: number;
  airports: AirportData[];
}
