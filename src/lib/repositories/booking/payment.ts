/**
 * Booking payment page queries
 *
 * Queries for order payment details and user balance
 * used in the payment processing page
 */

import { and, eq } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import { z } from "zod";

import { db } from "@/db";
import {
  airlines,
  airports,
  flights,
  flightSeatClasses,
  orderPassengers,
  orders,
} from "@/db/schema";
import type { PaymentPageOrder } from "@/types/dto";

/**
 * Zod schema for validating ancillaryDetails from database
 * ancillaryDetails should be an array of service codes or null
 */
const ancillaryDetailsSchema = z.array(z.string()).nullable();

/**
 * Get order by ID with all related data for payment page
 */
export async function getOrderForPayment(
  orderId: string,
  userId: string
): Promise<PaymentPageOrder | null> {
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

  // Get inbound flight details if exists
  let inboundFlightData = null;
  if (orderData.order.inboundFlightSeatClassId) {
    const [inbound] = await db
      .select({
        seatClass: flightSeatClasses,
        flight: flights,
        airline: airlines,
      })
      .from(flightSeatClasses)
      .innerJoin(flights, eq(flightSeatClasses.flightId, flights.id))
      .innerJoin(airlines, eq(flights.airlineId, airlines.id))
      .where(
        eq(flightSeatClasses.id, orderData.order.inboundFlightSeatClassId)
      );

    if (inbound) {
      const [inboundDepartureAirport] = await db
        .select({
          id: airports.id,
          name: airports.name,
          iataCode: airports.iataCode,
          cityId: airports.cityId,
        })
        .from(airports)
        .where(eq(airports.id, inbound.flight.departureAirportId));

      const [inboundArrivalAirport] = await db
        .select({
          id: airports.id,
          name: airports.name,
          iataCode: airports.iataCode,
          cityId: airports.cityId,
        })
        .from(airports)
        .where(eq(airports.id, inbound.flight.arrivalAirportId));

      inboundFlightData = {
        id: inbound.flight.id,
        flightNumber: inbound.flight.flightNumber,
        airlineId: inbound.flight.airlineId,
        departureAirportId: inbound.flight.departureAirportId,
        arrivalAirportId: inbound.flight.arrivalAirportId,
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
        departureAirport: inboundDepartureAirport,
        arrivalAirport: inboundArrivalAirport,
        seatClass: {
          id: inbound.seatClass.id,
          flightId: inbound.seatClass.flightId,
          classType: inbound.seatClass.classType as
            | "ECONOMY"
            | "BUSINESS"
            | "FIRST",
          price: inbound.seatClass.price,
          availableSeats: inbound.seatClass.availableSeats,
          totalSeats: inbound.seatClass.totalSeats,
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
    outboundFlightSeatClassId: orderData.order.outboundFlightSeatClassId,
    inboundFlightSeatClassId: orderData.order.inboundFlightSeatClassId,
    status: orderData.order.status,
    paymentDeadline: orderData.order.paymentDeadline,
    passengerCount: orderData.order.passengerCount,
    contactPhone: orderData.order.contactPhone,
    contactEmail: orderData.order.contactEmail,
    pricePerTicket: orderData.order.pricePerTicket,
    baseAmount: orderData.order.baseAmount,
    ancillaryAmount: orderData.order.ancillaryAmount,
    totalAmount: orderData.order.totalAmount,
    ancillaryDetails: parsedAncillaryDetails.success
      ? parsedAncillaryDetails.data
      : null,
    deletedAt: orderData.order.deletedAt,
    createdAt: orderData.order.createdAt,
    updatedAt: orderData.order.updatedAt,
    passengers: passengers.map(p => ({
      id: p.id,
      orderId: p.orderId,
      name: p.name,
      identityType: p.identityType,
      identityNumber: p.identityNumber,
      phone: p.phone,
      createdAt: p.createdAt,
    })),
    outboundFlight: {
      id: orderData.outboundFlight.id,
      flightNumber: orderData.outboundFlight.flightNumber,
      airlineId: orderData.outboundFlight.airlineId,
      departureAirportId: orderData.outboundFlight.departureAirportId,
      arrivalAirportId: orderData.outboundFlight.arrivalAirportId,
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
        cityId: orderData.outboundDepartureAirport.cityId,
      },
      arrivalAirport: {
        id: orderData.outboundArrivalAirport.id,
        name: orderData.outboundArrivalAirport.name,
        iataCode: orderData.outboundArrivalAirport.iataCode,
        cityId: orderData.outboundArrivalAirport.cityId,
      },
      seatClass: {
        id: orderData.outboundSeatClass.id,
        flightId: orderData.outboundSeatClass.flightId,
        classType: orderData.outboundSeatClass.classType as
          | "ECONOMY"
          | "BUSINESS"
          | "FIRST",
        price: orderData.outboundSeatClass.price,
        availableSeats: orderData.outboundSeatClass.availableSeats,
        totalSeats: orderData.outboundSeatClass.totalSeats,
      },
    },
    inboundFlight: inboundFlightData,
  };
}
