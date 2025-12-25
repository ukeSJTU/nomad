import { FlightSeatClass, OrderPassenger, OrderStatus } from "@/types/db";

export interface CreateOrderPayload {
  orderId: string;
  orderNumber: string;
  paymentDeadline: string;
}

export interface UpdateOrderAncillaryPayload {
  orderId: string;
  totalAmount: string;
}

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

export interface OrderStatusCardData {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  paymentDeadline: string; // ISO string
  createdAt: string;
  cancellationReason?: string;
}

export interface OrderFlightCardData extends OrderFlightInfo {
  duration: number; // Flight duration, in minutes
  aircraftType?: string;
  departureTerminal?: string;
  arrivalTerminal?: string;
}

export type OrderPassengerCardData = Array<{
  name: string;
  idType: OrderPassenger["identityType"];
  idNumber: string;
}>;

export interface OrderContactCardData {
  contactPhone?: string;
  contactEmail?: string;
}

export interface OrderPaymentCardData {
  // Flight pricing
  outboundFlight: {
    depatureCityName: string;
    arrivalCityName: string;
    unitPrice: string;
    passengerCount: number;
  };
  inboundFlight?: {
    depatureCityName: string;
    arrivalCityName: string;
    unitPrice: string;
    passengerCount: number;
  };

  // Ancillary services
  ancillaryServices: Array<{
    name: string;
    code: string;
    unitPrice: string;
    quantity: number;
  }>;

  createdAt: string; // ISO string
  baseAmount: string;
  ancillaryAmount: string;
  totalAmount: string;
}

export interface OrderDetailFull {
  status: OrderStatusCardData;
  outboundFlight: OrderFlightCardData;
  inboundFlight: OrderFlightCardData | null;
  passengers: OrderPassengerCardData;
  contact: OrderContactCardData;
  payment: OrderPaymentCardData;
}
