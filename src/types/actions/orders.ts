import { z } from "zod";

/**
 * Server Action Result Types for Orders
 *
 * These types define the return values from order-related Server Actions
 */

/**
 * Base action result type
 */
export type ActionResult<T = void> =
  | {
      success: true;
      data: T;
      error?: undefined;
      fieldErrors?: undefined;
    }
  | {
      success: false;
      error: string;
      data?: undefined;
      fieldErrors?: Record<string, string[]>;
    };

/**
 * Create Order Action Result
 */
export const createOrderDataSchema = z.object({
  orderId: z.uuid(),
  orderNumber: z.string(),
  paymentDeadline: z.string().datetime(),
});

export type CreateOrderData = z.infer<typeof createOrderDataSchema>;
export type CreateOrderResult = ActionResult<CreateOrderData>;

/**
 * Update Order Ancillary Action Result
 */
export const updateOrderAncillaryDataSchema = z.object({
  orderId: z.uuid(),
  totalAmount: z.string(),
});

export type UpdateOrderAncillaryData = z.infer<
  typeof updateOrderAncillaryDataSchema
>;
export type UpdateOrderAncillaryResult = ActionResult<UpdateOrderAncillaryData>;

/**
 * Order with full details (from queries)
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

export type OrderDetails = z.infer<typeof orderDetailsSchema>;

/**
 * Delete Order Action Result
 */
export type DeleteOrderResult = ActionResult<void>;

/**
 * Order List Item (simplified for order list page)
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

export type OrderListItem = z.infer<typeof orderListItemSchema>;
