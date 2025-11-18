import { and, desc, eq, isNull } from "drizzle-orm";

import { db } from "@/lib/db";
import { orders } from "@/lib/schema/orders";
import { OrderListItem } from "@/types/dto/orders";

/**
 * Retrieves all orders for a specific user
 *
 * @param userId - The unique identifier of the user
 * @returns Promise containing an array of order list items with full flight and passenger details
 *
 * @remarks
 * - Excludes soft-deleted orders (deletedAt IS NULL)
 * - Orders are sorted by creation date in descending order (newest first)
 * - Includes nested relations: passengers, flights, airlines, airports, and cities
 * - This is the single source of truth for order data; filtering happens on the client side
 */
export async function getAllOrdersByUserId(
  userId: string
): Promise<OrderListItem[]> {
  const result = await db.query.orders.findMany({
    where: and(eq(orders.userId, userId), isNull(orders.deletedAt)),
    orderBy: [desc(orders.createdAt)],
    with: {
      orderPassengers: true,
      outboundFlightSeatClass: {
        with: {
          flight: {
            with: {
              airline: true,
              departureAirport: {
                with: {
                  city: true,
                },
              },
              arrivalAirport: {
                with: {
                  city: true,
                },
              },
            },
          },
        },
      },
      inboundFlightSeatClass: {
        with: {
          flight: {
            with: {
              airline: true,
              departureAirport: {
                with: {
                  city: true,
                },
              },
              arrivalAirport: {
                with: {
                  city: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return result.map(order => ({
    id: order.id,
    orderNumber: order.orderNumber,
    status: order.status,
    createdAt: order.createdAt.toISOString(), // Convert Date to ISO string for serialization
    totalAmount: order.totalAmount.toString(), // Convert Decimal to string for JSON compatibility
    passengerCount: order.orderPassengers.length,
    outboundFlight: {
      flightNumber: order.outboundFlightSeatClass.flight.flightNumber,
      airlineName: order.outboundFlightSeatClass.flight.airline.name,
      airlineIataCode: order.outboundFlightSeatClass.flight.airline.iataCode,
      airlineLogoUrl: order.outboundFlightSeatClass.flight.airline.logoUrl,
      departureAirportName:
        order.outboundFlightSeatClass.flight.departureAirport.name,
      departureAirportIataCode:
        order.outboundFlightSeatClass.flight.departureAirport.iataCode,
      departureCityName:
        order.outboundFlightSeatClass.flight.departureAirport.city.name,
      arrivalAirportName:
        order.outboundFlightSeatClass.flight.arrivalAirport.name,
      arrivalAirportIataCode:
        order.outboundFlightSeatClass.flight.arrivalAirport.iataCode,
      arrivalCityName:
        order.outboundFlightSeatClass.flight.arrivalAirport.city.name,
      departureDatetime:
        order.outboundFlightSeatClass.flight.departureDatetime.toISOString(),
      arrivalDatetime:
        order.outboundFlightSeatClass.flight.arrivalDatetime.toISOString(),
      seatClassType: order.outboundFlightSeatClass.classType,
    },
    inboundFlight: order.inboundFlightSeatClass
      ? {
          flightNumber: order.inboundFlightSeatClass.flight.flightNumber,
          airlineName: order.inboundFlightSeatClass.flight.airline.name,
          airlineIataCode: order.inboundFlightSeatClass.flight.airline.iataCode,
          airlineLogoUrl: order.inboundFlightSeatClass.flight.airline.logoUrl,
          departureAirportName:
            order.inboundFlightSeatClass.flight.departureAirport.name,
          departureAirportIataCode:
            order.inboundFlightSeatClass.flight.departureAirport.iataCode,
          departureCityName:
            order.inboundFlightSeatClass.flight.departureAirport.city.name,
          arrivalAirportName:
            order.inboundFlightSeatClass.flight.arrivalAirport.name,
          arrivalAirportIataCode:
            order.inboundFlightSeatClass.flight.arrivalAirport.iataCode,
          arrivalCityName:
            order.inboundFlightSeatClass.flight.arrivalAirport.city.name,
          departureDatetime:
            order.inboundFlightSeatClass.flight.departureDatetime.toISOString(),
          arrivalDatetime:
            order.inboundFlightSeatClass.flight.arrivalDatetime.toISOString(),
          seatClassType: order.inboundFlightSeatClass.classType,
        }
      : null,
    passengerNames: order.orderPassengers.map(p => p.name),
  }));
}
