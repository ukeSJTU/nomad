/**
 * Booking flow Data Transfer Objects (DTOs)
 *
 * Frontend-optimized types for the flight booking flow across 4 pages:
 * - passengers: Passenger information collection
 * - ancillary: Add-on services selection
 * - payment: Payment processing
 * - confirmation: Booking confirmation display
 *
 * These types extend database types with denormalized data for UI efficiency.
 */

import type {
  DocumentType,
  FlightSeatClass,
  OrderPassenger,
  OrderStatus,
} from "@/types/database";

/**
 * Airline information included in booking responses
 */
export interface BookingAirlineInfo {
  id: string;
  name: string;
  iataCode: string;
  logoUrl: string | null;
}

/**
 * Airport information included in booking responses
 */
export interface BookingAirportInfo {
  id: string;
  name: string;
  iataCode: string;
  cityId?: string;
}

/**
 * City information for passenger forms
 */
export interface BookingCityInfo {
  id: string;
  iataCode: string;
  name: string;
  timezone: string;
}

/**
 * Saved passenger for quick selection in passenger form
 * Reuses DocumentType from database layer
 */
export interface SavedPassenger {
  id: string;
  name: string;
  documentType: DocumentType;
  documentNumber: string;
  phone: string | null;
}

/**
 * Passenger info within an order (extends OrderPassenger from database)
 * Used in payment and confirmation pages
 */
export type BookingOrderPassenger = Omit<OrderPassenger, "identityType"> & {
  identityType: DocumentType; // Renamed from database's identityType to match DocumentType
};

/**
 * Flight seat class with complete flight details for passenger page
 * Includes nested airport and city information for display
 */
export interface PassengerPageFlight {
  id: string;
  classType: FlightSeatClass["classType"];
  price: string;
  availableSeats: number;
  totalSeats: number;
  flight: {
    id: string;
    flightNumber: string;
    aircraftType: string | null;
    airline: BookingAirlineInfo;
    departure: {
      datetime: string; // ISO string
      terminal: string | null;
      airport: BookingAirportInfo;
      city: BookingCityInfo;
    };
    arrival: {
      datetime: string; // ISO string
      terminal: string | null;
      airport: BookingAirportInfo;
      city: BookingCityInfo;
    };
  };
}

/**
 * Complete flight details for payment page
 * Includes all flight, airline, airport, and seat class information
 */
export interface PaymentPageFlight {
  id: string;
  flightNumber: string;
  airlineId: string;
  departureAirportId: string;
  arrivalAirportId: string;
  departureDatetime: Date;
  arrivalDatetime: Date;
  departureTerminal: string | null;
  arrivalTerminal: string | null;
  aircraftType: string | null;
  airline: BookingAirlineInfo;
  departureAirport: BookingAirportInfo;
  arrivalAirport: BookingAirportInfo;
  seatClass: {
    id: string;
    flightId: string;
    classType: FlightSeatClass["classType"];
    price: string;
    availableSeats: number;
    totalSeats: number;
  };
}

/**
 * Simplified flight details for confirmation page
 * Minimal flight info needed for display
 */
export interface ConfirmationPageFlight {
  id: string;
  flightNumber: string;
  departureDatetime: Date;
  arrivalDatetime: Date;
  departureTerminal: string | null;
  arrivalTerminal: string | null;
  aircraftType: string | null;
  airline: BookingAirlineInfo;
  departureAirport: {
    id: string;
    name: string;
    iataCode: string;
  };
  arrivalAirport: {
    id: string;
    name: string;
    iataCode: string;
  };
  seatClass: {
    id: string;
    classType: "economy" | "business" | "first";
  };
}

/**
 * Order with full details for ancillary services page
 */
export interface AncillaryPageOrder {
  id: string;
  orderNumber: string;
  userId: string;
  outboundFlightSeatClassId: string;
  inboundFlightSeatClassId: string | null;
  status: OrderStatus;
  paymentDeadline: Date;
  passengerCount: number;
  contactPhone: string | null;
  contactEmail: string | null;
  pricePerTicket: string;
  baseAmount: string;
  ancillaryAmount: string;
  totalAmount: string;
  ancillaryDetails: string[] | null;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  passengers: BookingOrderPassenger[];
  outboundFlight: {
    id: string;
    flightNumber: string;
    airlineId: string;
    departureAirportId: string;
    arrivalAirportId: string;
    departureDatetime: Date;
    arrivalDatetime: Date;
    departureTerminal: string | null;
    arrivalTerminal: string | null;
    aircraftType: string | null;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    airline: BookingAirlineInfo & {
      isDeleted: boolean;
      createdAt: Date;
      updatedAt: Date;
    };
    seatClass: {
      id: string;
      flightId: string;
      classType: FlightSeatClass["classType"];
      price: string;
      availableSeats: number;
      totalSeats: number;
      isDeleted: boolean;
      createdAt: Date;
      updatedAt: Date;
    };
  };
}

/**
 * Order with full details for payment page
 * Includes complete flight and passenger information
 */
export interface PaymentPageOrder {
  id: string;
  orderNumber: string;
  userId: string;
  outboundFlightSeatClassId: string;
  inboundFlightSeatClassId: string | null;
  status: OrderStatus;
  paymentDeadline: Date;
  passengerCount: number;
  contactPhone: string | null;
  contactEmail: string | null;
  pricePerTicket: string;
  baseAmount: string;
  ancillaryAmount: string;
  totalAmount: string;
  ancillaryDetails: string[] | null;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  passengers: BookingOrderPassenger[];
  outboundFlight: PaymentPageFlight;
  inboundFlight: PaymentPageFlight | null;
}

/**
 * Order confirmation details with payment information
 * Shown after successful payment on confirmation page
 */
export interface ConfirmationPageOrder {
  id: string;
  orderNumber: string;
  userId: string;
  status: OrderStatus;
  passengerCount: number;
  contactPhone: string | null;
  contactEmail: string | null;
  baseAmount: string;
  ancillaryAmount: string;
  totalAmount: string;
  ancillaryDetails: string[] | null;
  createdAt: Date;
  passengers: Array<{
    id: string;
    name: string;
    identityType: DocumentType;
    identityNumber: string;
  }>;
  outboundFlight: ConfirmationPageFlight;
  inboundFlight: ConfirmationPageFlight | null;
  payment: {
    id: string;
    amount: string;
    method: string;
    status: "PENDING" | "SUCCESS" | "FAILED";
    transactionId: string | null;
    createdAt: Date;
  } | null;
}

// Re-export database types commonly used in booking flow
export type { DocumentType, OrderStatus } from "@/types/database";

// Additional type exports for component props
export type IdentityType = DocumentType;
export type SeatClassType = FlightSeatClass["classType"];
export type PaymentStatus = "PENDING" | "SUCCESS" | "FAILED";
