/**
 * Booking ancillary page queries
 *
 * Queries for order details with ancillary services
 * used in the ancillary services selection page
 */

import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/lib/db";
import {
  airlines,
  flights,
  flightSeatClasses,
  orderPassengers,
  orders,
} from "@/lib/schema";
import type { AncillaryPageOrder } from "@/types/dto";

/**
 * Zod schema for validating ancillaryDetails from database
 * ancillaryDetails should be an array of service codes or null
 */
const ancillaryDetailsSchema = z.array(z.string()).nullable();

/**
 * Get order by ID with all related data for ancillary services page
 */
export async function getOrderForAncillary(
  orderId: string,
  userId: string
): Promise<AncillaryPageOrder | null> {
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
