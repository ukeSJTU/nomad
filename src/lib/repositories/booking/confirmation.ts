/**
 * Booking confirmation page queries
 *
 * Queries for order confirmation details with payment information
 * used in the booking confirmation page
 */

import { and, eq } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import { z } from "zod";

import { db } from "@/lib/db";
import {
  airlines,
  airports,
  flights,
  flightSeatClasses,
  orderPassengers,
  orders,
  payments,
} from "@/lib/schema";
import type { ConfirmationPageOrder } from "@/types/dto";

/**
 * Zod schema for validating ancillaryDetails from database
 * ancillaryDetails should be an array of service codes or null
 */
const ancillaryDetailsSchema = z.array(z.string()).nullable();

/**
 * Get order confirmation details by order ID
 * Includes full order information, flights, passengers, and payment details
 */
export async function getOrderConfirmation(
  orderId: string,
  userId: string
): Promise<ConfirmationPageOrder | null> {
  // Create aliases for airports table to join multiple times
  const outboundDepartureAirport = alias(
    airports,
    "outbound_departure_airport"
  );
  const outboundArrivalAirport = alias(airports, "outbound_arrival_airport");

  // Get order with outbound flight details
  const [orderData] = await db
    .select({
      order: orders,
      outboundSeatClass: flightSeatClasses,
      outboundFlight: flights,
      outboundAirline: airlines,
      outboundDepartureAirport,
      outboundArrivalAirport,
    })
    .from(orders)
    .innerJoin(
      flightSeatClasses,
      eq(orders.outboundFlightSeatClassId, flightSeatClasses.id)
    )
    .innerJoin(flights, eq(flightSeatClasses.flightId, flights.id))
    .innerJoin(airlines, eq(flights.airlineId, airlines.id))
    .innerJoin(
      outboundDepartureAirport,
      eq(flights.departureAirportId, outboundDepartureAirport.id)
    )
    .innerJoin(
      outboundArrivalAirport,
      eq(flights.arrivalAirportId, outboundArrivalAirport.id)
    )
    .where(and(eq(orders.id, orderId), eq(orders.userId, userId)));

  if (!orderData) {
    return null;
  }

  // Get passengers
  const passengers = await db
    .select()
    .from(orderPassengers)
    .where(eq(orderPassengers.orderId, orderId));

  // Get payment information
  const [paymentData] = await db
    .select()
    .from(payments)
    .where(eq(payments.orderId, orderId));

  // Get inbound flight details if exists
  let inboundFlightData = null;
  if (orderData.order.inboundFlightSeatClassId) {
    const inboundDepartureAirport = alias(
      airports,
      "inbound_departure_airport"
    );
    const inboundArrivalAirport = alias(airports, "inbound_arrival_airport");

    const [inbound] = await db
      .select({
        seatClass: flightSeatClasses,
        flight: flights,
        airline: airlines,
        departureAirport: inboundDepartureAirport,
        arrivalAirport: inboundArrivalAirport,
      })
      .from(flightSeatClasses)
      .innerJoin(flights, eq(flightSeatClasses.flightId, flights.id))
      .innerJoin(airlines, eq(flights.airlineId, airlines.id))
      .innerJoin(
        inboundDepartureAirport,
        eq(flights.departureAirportId, inboundDepartureAirport.id)
      )
      .innerJoin(
        inboundArrivalAirport,
        eq(flights.arrivalAirportId, inboundArrivalAirport.id)
      )
      .where(
        eq(flightSeatClasses.id, orderData.order.inboundFlightSeatClassId)
      );

    if (inbound) {
      inboundFlightData = {
        id: inbound.flight.id,
        flightNumber: inbound.flight.flightNumber,
        departureDatetime: inbound.flight.departureDatetime,
        arrivalDatetime: inbound.flight.arrivalDatetime,
        departureTerminal: inbound.flight.departureTerminal,
        arrivalTerminal: inbound.flight.arrivalTerminal,
        aircraftType: inbound.flight.aircraftType,
        airline: {
          id: inbound.airline.id,
          name: inbound.airline.name,
          iataCode: inbound.airline.iataCode,
          logoUrl: inbound.airline.logoUrl,
        },
        departureAirport: {
          id: inbound.departureAirport.id,
          name: inbound.departureAirport.name,
          iataCode: inbound.departureAirport.iataCode,
        },
        arrivalAirport: {
          id: inbound.arrivalAirport.id,
          name: inbound.arrivalAirport.name,
          iataCode: inbound.arrivalAirport.iataCode,
        },
        seatClass: {
          id: inbound.seatClass.id,
          classType: inbound.seatClass.classType as
            | "economy"
            | "business"
            | "first",
        },
      };
    }
  }

  // Safely parse ancillaryDetails using Zod
  const parsedAncillaryDetails = ancillaryDetailsSchema.safeParse(
    orderData.order.ancillaryDetails
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
    id: orderData.order.id,
    orderNumber: orderData.order.orderNumber,
    userId: orderData.order.userId,
    status: orderData.order.status,
    passengerCount: orderData.order.passengerCount,
    contactPhone: orderData.order.contactPhone,
    contactEmail: orderData.order.contactEmail,
    baseAmount: orderData.order.baseAmount,
    ancillaryAmount: orderData.order.ancillaryAmount,
    totalAmount: orderData.order.totalAmount,
    ancillaryDetails: parsedAncillaryDetails.success
      ? parsedAncillaryDetails.data
      : null,
    createdAt: orderData.order.createdAt,
    passengers: passengers.map(p => ({
      id: p.id,
      name: p.name,
      identityType: p.identityType,
      identityNumber: p.identityNumber,
    })),
    outboundFlight: {
      id: orderData.outboundFlight.id,
      flightNumber: orderData.outboundFlight.flightNumber,
      departureDatetime: orderData.outboundFlight.departureDatetime,
      arrivalDatetime: orderData.outboundFlight.arrivalDatetime,
      departureTerminal: orderData.outboundFlight.departureTerminal,
      arrivalTerminal: orderData.outboundFlight.arrivalTerminal,
      aircraftType: orderData.outboundFlight.aircraftType,
      airline: {
        id: orderData.outboundAirline.id,
        name: orderData.outboundAirline.name,
        iataCode: orderData.outboundAirline.iataCode,
        logoUrl: orderData.outboundAirline.logoUrl,
      },
      departureAirport: {
        id: orderData.outboundDepartureAirport.id,
        name: orderData.outboundDepartureAirport.name,
        iataCode: orderData.outboundDepartureAirport.iataCode,
      },
      arrivalAirport: {
        id: orderData.outboundArrivalAirport.id,
        name: orderData.outboundArrivalAirport.name,
        iataCode: orderData.outboundArrivalAirport.iataCode,
      },
      seatClass: {
        id: orderData.outboundSeatClass.id,
        classType: orderData.outboundSeatClass.classType as
          | "economy"
          | "business"
          | "first",
      },
    },
    inboundFlight: inboundFlightData,
    payment: paymentData
      ? {
          id: paymentData.id,
          amount: paymentData.amount,
          method: paymentData.method,
          status: paymentData.status,
          transactionId: paymentData.transactionId,
          createdAt: paymentData.createdAt,
        }
      : null,
  };
}
