import type { InferInsertModel } from "drizzle-orm";
import { Factory } from "fishery";

import type { orders } from "@/lib/schema/orders";

/**
 * Order type for factory
 */
type Order = InferInsertModel<typeof orders>;

/**
 * Factory for creating test orders
 *
 * Usage:
 * - orderFactory.build() - Create an order object (not inserted to DB)
 * - orderFactory.build({ userId: 'user-123' }) - Override specific fields
 */
export const orderFactory = Factory.define<Order>(({ sequence }) => {
  const now = new Date();
  const paymentDeadline = new Date(now.getTime() + 15 * 60 * 1000); // 15 minutes from now

  return {
    orderNumber: `NMD${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, "0")}${now.getDate().toString().padStart(2, "0")}${sequence.toString().padStart(4, "0")}`,
    userId: `user-${sequence}`, // Should be overridden
    outboundFlightSeatClassId: `seat-class-${sequence}`, // Should be overridden
    inboundFlightSeatClassId: null, // One-way by default
    status: "PENDING_PAYMENT",
    paymentDeadline,
    passengerCount: 1,
    contactPhone: "13800138000",
    contactEmail: null,
    pricePerTicket: "500.00",
    baseAmount: "500.00",
    ancillaryDetails: null,
    ancillaryAmount: "0.00",
    totalAmount: "500.00",
    deletedAt: null,
    createdAt: now,
    updatedAt: now,
  };
});

/**
 * Factory for creating confirmed orders
 */
export const confirmedOrderFactory = orderFactory.params({
  status: "CONFIRMED",
});

/**
 * Factory for creating cancelled orders
 */
export const cancelledOrderFactory = orderFactory.params({
  status: "CANCELLED",
});

/**
 * Factory for creating expired orders (payment deadline passed)
 */
export const expiredOrderFactory = orderFactory.params({
  status: "PENDING_PAYMENT",
  paymentDeadline: new Date(Date.now() - 1 * 60 * 1000), // 1 minute ago
});

/**
 * Factory for creating round-trip orders
 */
export const roundTripOrderFactory = orderFactory.params({
  inboundFlightSeatClassId: "inbound-seat-class-id", // Should be overridden
  passengerCount: 1,
  pricePerTicket: "1000.00", // Double price for round-trip
  baseAmount: "1000.00",
  totalAmount: "1000.00",
});

/**
 * Factory for creating orders with multiple passengers
 */
export const multiPassengerOrderFactory = orderFactory.params({
  passengerCount: 3,
  baseAmount: "1500.00", // 500 * 3
  totalAmount: "1500.00",
});

/**
 * Factory for creating orders with ancillary services
 */
export const orderWithAncillaryFactory = orderFactory.params({
  ancillaryDetails: ["INSURANCE_BASIC", "AIRPORT_TRANSFER"],
  ancillaryAmount: "150.00",
  totalAmount: "650.00", // 500 + 150
});
