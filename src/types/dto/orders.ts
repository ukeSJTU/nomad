import { FlightSeatClass, OrderStatus } from "@/types/database";

export interface OrderFlightInfo {
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
  seatClassType: FlightSeatClass["classType"];
}

export interface OrderListItem {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  createdAt: string; // ISO string
  totalAmount: string; // Decimal string
  passengerCount: number;
  outboundFlight: OrderFlightInfo;
  inboundFlight: OrderFlightInfo | null;
  passengerNames: string[];
}
