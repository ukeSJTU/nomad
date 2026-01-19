// ============================================================
// User Order Types
// ============================================================

export type OrderStatus =
  | "PENDING_PAYMENT"
  | "CONFIRMED"
  | "CANCELLED"
  | "REFUNDED";

export type OrderFlightInfo = {
  flightNumber: string;
  airlineName: string;
  airlineIataCode: string;
  airlineLogoUrl: string | null;
  departureAirportName: string;
  departureAirportIataCode: string;
  departureCityName: string;
  arrivalAirportName: string;
  arrivalAirportIataCode: string;
  arrivalCityName: string;
  departureDatetime: string; // ISO string
  arrivalDatetime: string; // ISO string
  seatClassType: string; // ECONOMY, BUSINESS, FIRST
};

export type OrderListItem = {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  createdAt: string; // ISO string
  totalAmount: string; // Decimal string
  passengerCount: number;
  outboundFlight: OrderFlightInfo;
  inboundFlight: OrderFlightInfo | null;
  passengerNames: string[];
};
