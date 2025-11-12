import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/lib/db";
import { airlines } from "@/lib/schema/airlines";
import { flightSeatClasses } from "@/lib/schema/flight-seat-classes";
import { flights } from "@/lib/schema/flights";
import { orderPassengers, orders } from "@/lib/schema/orders";

/**
 * Zod schema for validating ancillaryDetails from database
 * ancillaryDetails should be an array of service codes or null
 */
const ancillaryDetailsSchema = z.array(z.string()).nullable();

/**
 * Order with full details for ancillary page
 */
export type OrderWithDetails = {
  id: string;
  orderNumber: string;
  userId: string;
  outboundFlightSeatClassId: string;
  inboundFlightSeatClassId: string | null;
  status: "PENDING_PAYMENT" | "CONFIRMED" | "CANCELLED" | "REFUNDED";
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
  passengers: Array<{
    id: string;
    orderId: string;
    name: string;
    identityType: "passport" | "id_card" | "other";
    identityNumber: string;
    phone: string | null;
    createdAt: Date;
  }>;
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
    airline: {
      id: string;
      name: string;
      iataCode: string;
      logoUrl: string | null;
      isDeleted: boolean;
      createdAt: Date;
      updatedAt: Date;
    };
    seatClass: {
      id: string;
      flightId: string;
      classType: "ECONOMY" | "BUSINESS" | "FIRST";
      price: string;
      availableSeats: number;
      totalSeats: number;
      isDeleted: boolean;
      createdAt: Date;
      updatedAt: Date;
    };
  };
};

/**
 * Get order by ID with all related data
 */
export async function getOrderById(
  orderId: string,
  userId: string
): Promise<OrderWithDetails | null> {
  const [order] = await db
    .select({
      order: orders,
      outboundSeatClass: flightSeatClasses,
      outboundFlight: flights,
      outboundAirline: airlines,
    })
    .from(orders)
    .innerJoin(
      flightSeatClasses,
      eq(orders.outboundFlightSeatClassId, flightSeatClasses.id)
    )
    .innerJoin(flights, eq(flightSeatClasses.flightId, flights.id))
    .innerJoin(airlines, eq(flights.airlineId, airlines.id))
    .where(and(eq(orders.id, orderId), eq(orders.userId, userId)));

  if (!order) {
    return null;
  }

  // Get passengers
  const passengers = await db
    .select()
    .from(orderPassengers)
    .where(eq(orderPassengers.orderId, orderId));

  // Safely parse ancillaryDetails using Zod
  const parsedAncillaryDetails = ancillaryDetailsSchema.safeParse(
    order.order.ancillaryDetails
  );

  // If parsing fails, log the error and use null as fallback
  if (!parsedAncillaryDetails.success) {
    console.error(
      "Failed to parse ancillaryDetails for order:",
      orderId,
      parsedAncillaryDetails.error
    );
  }

  return {
    ...order.order,
    ancillaryDetails: parsedAncillaryDetails.success
      ? parsedAncillaryDetails.data
      : null,
    passengers,
    outboundFlight: {
      ...order.outboundFlight,
      airline: order.outboundAirline,
      seatClass: {
        ...order.outboundSeatClass,
        classType: order.outboundSeatClass.classType as
          | "ECONOMY"
          | "BUSINESS"
          | "FIRST",
      },
    },
  };
}
