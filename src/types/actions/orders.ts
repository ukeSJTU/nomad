import { z } from "zod";

import type { ActionResult } from "@/types/common";

/**
 * Server Action Result Types for Orders
 *
 * This file contains Zod validation schemas and TypeScript types for order-related
 * Server Actions in Next.js. All schemas are compatible with Zod v4.
 *
 * Server Actions are async functions that run on the server and can be called from
 * client or server components. These types define the standardized return values.
 *
 * Naming conventions:
 * - Schemas: camelCase ending with "Schema" (e.g., createOrderDataSchema)
 * - Types: PascalCase (e.g., CreateOrderData, CreateOrderResult)
 *
 * Note: These schemas align with the orders table and related tables in the database schema.
 */

// ============================================================================
// Create Order Action
// ============================================================================

/**
 * Create order action result data schema
 *
 * Defines the data returned when an order is successfully created.
 *
 * @property orderId - UUID of the newly created order
 * @property orderNumber - Human-readable order number (e.g., "ORD-20240101-001")
 * @property paymentDeadline - ISO datetime string for payment deadline
 */
export const createOrderDataSchema = z.object({
  orderId: z.uuid(),
  orderNumber: z.string(),
  paymentDeadline: z.string().datetime(),
});

/**
 * Inferred TypeScript types for create order action
 */
export type CreateOrderData = z.infer<typeof createOrderDataSchema>;
export type CreateOrderResult = ActionResult<CreateOrderData>;

// ============================================================================
// Update Order Ancillary Action
// ============================================================================

/**
 * Update order ancillary action result data schema
 *
 * Defines the data returned when order ancillary services are updated.
 * Ancillary services include extras like baggage, meals, seat selection, etc.
 *
 * @property orderId - UUID of the updated order
 * @property totalAmount - New total amount as a decimal string (e.g., "1234.56")
 */
export const updateOrderAncillaryDataSchema = z.object({
  orderId: z.uuid(),
  totalAmount: z.string(),
});

/**
 * Inferred TypeScript types for update order ancillary action
 */
export type UpdateOrderAncillaryData = z.infer<
  typeof updateOrderAncillaryDataSchema
>;
export type UpdateOrderAncillaryResult = ActionResult<UpdateOrderAncillaryData>;

// ============================================================================
// Delete Order Action
// ============================================================================

/**
 * Delete order action result type
 *
 * Used for soft-deleting an order. Returns void on success.
 */
export type DeleteOrderResult = ActionResult<void>;

// ============================================================================
// Order Details Schema (Query Result)
// ============================================================================

/**
 * Order details schema with full nested data
 *
 * Represents a complete order with all related data including passengers,
 * flights, airlines, and seat classes. Used for order detail pages.
 *
 * This schema matches the structure returned by database queries that join
 * multiple tables (orders, passengers, flights, airlines, seat_classes).
 *
 * @property id - Order UUID
 * @property orderNumber - Human-readable order number
 * @property userId - User who created the order
 * @property outboundFlightSeatClassId - UUID of outbound flight seat class
 * @property inboundFlightSeatClassId - UUID of inbound flight seat class (null for one-way)
 * @property status - Order status (PENDING_PAYMENT/CONFIRMED/CANCELLED/REFUNDED)
 * @property paymentDeadline - Payment deadline as Date object
 * @property passengerCount - Number of passengers
 * @property contactPhone - Contact phone number (optional)
 * @property contactEmail - Contact email address (optional)
 * @property pricePerTicket - Price per ticket as decimal string
 * @property baseAmount - Base amount as decimal string
 * @property ancillaryAmount - Ancillary services amount as decimal string
 * @property totalAmount - Total amount as decimal string
 * @property ancillaryDetails - Array of ancillary service descriptions (optional)
 * @property deletedAt - Soft delete timestamp (null if not deleted)
 * @property createdAt - Order creation timestamp
 * @property updatedAt - Last update timestamp
 * @property passengers - Array of passenger objects
 * @property outboundFlight - Outbound flight with airline and seat class details
 */
export const orderDetailsSchema = z.object({
  id: z.uuid(),
  orderNumber: z.string(),
  userId: z.string(),
  outboundFlightSeatClassId: z.uuid(),
  inboundFlightSeatClassId: z.uuid().nullable(),
  status: z.enum(["PENDING_PAYMENT", "CONFIRMED", "CANCELLED", "REFUNDED"]),
  paymentDeadline: z.date(),
  passengerCount: z.number().int().positive(),
  contactPhone: z.string().nullable(),
  contactEmail: z.string().nullable(),
  pricePerTicket: z.string(),
  baseAmount: z.string(),
  ancillaryAmount: z.string(),
  totalAmount: z.string(),
  ancillaryDetails: z.array(z.string()).nullable(),
  deletedAt: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  passengers: z.array(
    z.object({
      id: z.uuid(),
      orderId: z.uuid(),
      name: z.string(),
      identityType: z.enum(["passport", "id_card", "other"]),
      identityNumber: z.string(),
      phone: z.string().nullable(),
      createdAt: z.date(),
    })
  ),
  outboundFlight: z.object({
    id: z.uuid(),
    flightNumber: z.string(),
    airlineId: z.uuid(),
    departureAirportId: z.uuid(),
    arrivalAirportId: z.uuid(),
    departureDatetime: z.date(),
    arrivalDatetime: z.date(),
    departureTerminal: z.string().nullable(),
    arrivalTerminal: z.string().nullable(),
    aircraftType: z.string().nullable(),
    isDeleted: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
    airline: z.object({
      id: z.uuid(),
      name: z.string(),
      iataCode: z.string(),
      logoUrl: z.string().nullable(),
      isDeleted: z.boolean(),
      createdAt: z.date(),
      updatedAt: z.date(),
    }),
    seatClass: z.object({
      id: z.uuid(),
      flightId: z.uuid(),
      classType: z.enum(["ECONOMY", "BUSINESS", "FIRST"]),
      price: z.string(),
      availableSeats: z.number().int().nonnegative(),
      totalSeats: z.number().int().positive(),
      isDeleted: z.boolean(),
      createdAt: z.date(),
      updatedAt: z.date(),
    }),
  }),
});

/**
 * Inferred TypeScript type for order details
 */
export type OrderDetails = z.infer<typeof orderDetailsSchema>;

// ============================================================================
// Order List Item Schema (Query Result)
// ============================================================================

/**
 * Order list item schema (simplified for order list page)
 *
 * Represents a simplified order object for displaying in order lists.
 * Contains denormalized flight and airline data for efficient rendering
 * without additional queries.
 *
 * This schema uses ISO datetime strings instead of Date objects for easier
 * serialization in Server Components and API responses.
 *
 * @property id - Order UUID as string
 * @property orderNumber - Human-readable order number
 * @property status - Order status (PENDING_PAYMENT/CONFIRMED/CANCELLED/REFUNDED)
 * @property createdAt - Order creation timestamp as ISO datetime string
 * @property totalAmount - Total amount as decimal string
 * @property passengerCount - Number of passengers
 * @property outboundFlight - Denormalized outbound flight data
 * @property inboundFlight - Denormalized inbound flight data (null for one-way trips)
 * @property passengerNames - Array of passenger names for quick display
 */
export const orderListItemSchema = z.object({
  id: z.string().uuid(),
  orderNumber: z.string(),
  status: z.enum(["PENDING_PAYMENT", "CONFIRMED", "CANCELLED", "REFUNDED"]),
  createdAt: z.string().datetime(),
  totalAmount: z.string(),
  passengerCount: z.number().int().positive(),
  outboundFlight: z.object({
    flightNumber: z.string(),
    airlineName: z.string(),
    airlineIataCode: z.string(),
    airlineLogoUrl: z.string().nullable(),
    departureAirportName: z.string(),
    departureAirportIataCode: z.string(),
    departureCityName: z.string(),
    arrivalAirportName: z.string(),
    arrivalAirportIataCode: z.string(),
    arrivalCityName: z.string(),
    departureDatetime: z.string().datetime(),
    arrivalDatetime: z.string().datetime(),
    seatClassType: z.string(),
  }),
  inboundFlight: z
    .object({
      flightNumber: z.string(),
      airlineName: z.string(),
      airlineIataCode: z.string(),
      airlineLogoUrl: z.string().nullable(),
      departureAirportName: z.string(),
      departureAirportIataCode: z.string(),
      departureCityName: z.string(),
      arrivalAirportName: z.string(),
      arrivalAirportIataCode: z.string(),
      arrivalCityName: z.string(),
      departureDatetime: z.string().datetime(),
      arrivalDatetime: z.string().datetime(),
      seatClassType: z.string(),
    })
    .nullable(),
  passengerNames: z.array(z.string()),
});

/**
 * Inferred TypeScript type for order list item
 */
export type OrderListItem = z.infer<typeof orderListItemSchema>;
