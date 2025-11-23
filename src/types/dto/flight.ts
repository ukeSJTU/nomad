/**
 * Flight-related Data Transfer Object (DTO) types
 *
 * Type definitions for flight search results, seat classes, and related data structures
 */

/**
 * Seat class information for a flight
 */
type SeatClass = {
  id: string;
  classType: "ECONOMY" | "BUSINESS" | "FIRST";
  totalSeats: number;
  availableSeats: number;
  price: string;
};

/**
 * Flight search result for a single flight
 */
export type FlightSearchResult = {
  id: string;
  flightNumber: string;
  airline: {
    id: string;
    iataCode: string;
    name: string;
    logoUrl: string | null;
  };
  departure: {
    airport: {
      id: string;
      iataCode: string;
      name: string;
    };
    city: {
      id: string;
      iataCode: string;
      name: string;
      timezone: string;
    };
    terminal: string | null;
    datetime: string;
  };
  arrival: {
    airport: {
      id: string;
      iataCode: string;
      name: string;
    };
    city: {
      id: string;
      iataCode: string;
      name: string;
      timezone: string;
    };
    terminal: string | null;
    datetime: string;
  };
  aircraftType: string | null;
  seatClasses: SeatClass[];
  // Fields for "any seat class" search feature
  lowestPrice: number; // Lowest price across all seat classes (numeric type for easy sorting)
  lowestPriceClassType: "ECONOMY" | "BUSINESS" | "FIRST"; // Seat class type with the lowest price
};

/**
 * Round-trip flight search results containing outbound and inbound flights
 */
export type RoundTripFlightSearchResult = {
  outbound: FlightSearchResult[];
  inbound: FlightSearchResult[];
};
