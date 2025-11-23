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
