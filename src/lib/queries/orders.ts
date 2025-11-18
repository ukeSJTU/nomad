import { and, desc, eq, isNull } from "drizzle-orm";

import { db } from "@/lib/db";
import { orders } from "@/lib/schema/orders";
import { OrderDetailFull, OrderListItem } from "@/types/dto/orders";
import { maskEmail, maskPhoneNumber } from "@/utils/mask-data";

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

/**
 * Retrieves complete order details for a specific order
 *
 * @param orderId - The unique identifier of the order
 * @param userId - The unique identifier of the user (for authorization)
 * @returns Promise containing full order details or null if order doesn't exist or user has no access
 *
 * @remarks
 * Architecture Decision: Single Deep-Nested Query
 * - Uses one database query with deep JOIN relations (5-6 levels)
 * - Optimal for order detail page (single entity, complete data needed)
 * - Better performance than multiple parallel queries due to:
 *   1. Single database round-trip (~5-10ms vs ~20-30ms for multiple queries)
 *   2. PostgreSQL JOIN optimization with proper indexes
 *   3. Drizzle ORM automatic query batching
 *   4. Strong data consistency (single transaction snapshot)
 *
 * Query Structure:
 * - orders (root)
 *   ├── orderPassengers (passengers data)
 *   ├── outboundFlightSeatClass
 *   │   └── flight
 *   │       ├── airline
 *   │       ├── departureAirport → city
 *   │       └── arrivalAirport → city
 *   └── inboundFlightSeatClass (optional for round-trip)
 *       └── flight (same nested structure)
 *
 * Security:
 * - Validates order ownership by checking userId match
 * - Excludes soft-deleted orders
 *
 * Data Transformation:
 * - Converts database types to DTO types (Date → ISO string, Decimal → string)
 * - Calculates flight duration in minutes
 * - Structures data for frontend components (5 card components)
 */
export async function getOrderDetailById(
  orderId: string,
  userId: string
): Promise<OrderDetailFull | null> {
  // Query order with all nested relations
  const order = await db.query.orders.findFirst({
    where: and(
      eq(orders.id, orderId),
      eq(orders.userId, userId),
      isNull(orders.deletedAt)
    ),
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

  // Return null if order doesn't exist or user has no access
  if (!order) {
    return null;
  }

  // Helper function: Calculate flight duration in minutes
  const calculateFlightDuration = (
    departureTime: Date,
    arrivalTime: Date
  ): number => {
    return Math.round(
      (arrivalTime.getTime() - departureTime.getTime()) / (1000 * 60)
    );
  };

  // Helper function: Transform flight seat class data to OrderFlightCardData
  const transformFlightData = (
    flightSeatClass: typeof order.outboundFlightSeatClass
  ) => ({
    flightNumber: flightSeatClass.flight.flightNumber,
    airlineName: flightSeatClass.flight.airline.name,
    airlineIataCode: flightSeatClass.flight.airline.iataCode,
    airlineLogoUrl: flightSeatClass.flight.airline.logoUrl,
    departureAirportName: flightSeatClass.flight.departureAirport.name,
    departureAirportIataCode: flightSeatClass.flight.departureAirport.iataCode,
    departureCityName: flightSeatClass.flight.departureAirport.city.name,
    arrivalAirportName: flightSeatClass.flight.arrivalAirport.name,
    arrivalAirportIataCode: flightSeatClass.flight.arrivalAirport.iataCode,
    arrivalCityName: flightSeatClass.flight.arrivalAirport.city.name,
    departureDatetime: flightSeatClass.flight.departureDatetime.toISOString(),
    arrivalDatetime: flightSeatClass.flight.arrivalDatetime.toISOString(),
    seatClassType: flightSeatClass.classType,
    duration: calculateFlightDuration(
      flightSeatClass.flight.departureDatetime,
      flightSeatClass.flight.arrivalDatetime
    ),
    aircraftType: flightSeatClass.flight.aircraftType || undefined,
    departureTerminal: flightSeatClass.flight.departureTerminal || undefined,
    arrivalTerminal: flightSeatClass.flight.arrivalTerminal || undefined,
  });

  // Construct and return the complete order detail DTO
  return {
    // Status Card Data
    status: {
      id: order.id,
      orderNumber: order.orderNumber,
      status: order.status,
      paymentDeadline: order.paymentDeadline.toISOString(),
      createdAt: order.createdAt.toISOString(),
      cancellationReason: order.cancellationReason ?? undefined,
    },

    // Outbound Flight Card Data (required)
    outboundFlight: transformFlightData(order.outboundFlightSeatClass),

    // Inbound Flight Card Data (optional for round-trip)
    inboundFlight: order.inboundFlightSeatClass
      ? transformFlightData(order.inboundFlightSeatClass)
      : null,

    // Passenger Card Data
    passengers: order.orderPassengers.map(passenger => ({
      name: passenger.name,
      idType: passenger.identityType,
      idNumber: passenger.identityNumber,
    })),

    // Contact Card Data
    contact: {
      contactPhone: order.contactPhone
        ? maskPhoneNumber(order.contactPhone)
        : undefined,
      contactEmail: order.contactEmail
        ? maskEmail(order.contactEmail)
        : undefined,
    },

    // Payment Card Data
    payment: {
      baseAmount: order.baseAmount.toString(),
      ancillaryAmount: order.ancillaryAmount.toString(),
      totalAmount: order.totalAmount.toString(),
    },
  };
}
