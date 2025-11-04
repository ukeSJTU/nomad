import { and, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { airlines } from "@/lib/schema/airlines";
import { flightSeatClasses } from "@/lib/schema/flight-seat-classes";
import { flights } from "@/lib/schema/flights";
import { orderPassengers, orders } from "@/lib/schema/orders";

/**
 * Get order by ID with all related data
 */
export async function getOrderById(orderId: string, userId: string) {
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

  return {
    ...order.order,
    passengers,
    outboundFlight: {
      ...order.outboundFlight,
      airline: order.outboundAirline,
      seatClass: order.outboundSeatClass,
    },
  };
}
