/**
 * Order Generator
 *
 * Generates realistic order data including:
 * - Orders (with proper flight seat class references)
 * - Order passengers (snapshots of passenger data)
 * - Payments (linked to orders)
 *
 * Ensures proper relationships and realistic data distribution.
 */

import { faker } from "@faker-js/faker";
import type { InferInsertModel } from "drizzle-orm";

import {
  type AncillaryService,
  availableAncillaryServices,
} from "@/db/schema/ancillary";
import { orderPassengers, orders, payments } from "@/db/schema/orders";

type OrderInsert = InferInsertModel<typeof orders>;
type OrderPassengerInsert = InferInsertModel<typeof orderPassengers>;
type PaymentInsert = InferInsertModel<typeof payments>;

export interface OrderGeneratorInput {
  userIds: string[]; // Available user IDs
  flightSeatClassIds: string[]; // Available flight seat class IDs
  futureFlightSeatClassIds: string[]; // Future flight seat class IDs (for future orders)
  pastFlightSeatClassIds: string[]; // Past flight seat class IDs (for traveled orders)
  passengersByUser: Map<
    string,
    Array<{
      name: string;
      identityType: "passport" | "id_card" | "other";
      identityNumber: string;
      phone: string | null;
    }>
  >; // Passenger data by user ID
  count: number; // Number of orders to generate
  seed?: number;
}

export interface OrderGeneratorOutput {
  orders: Omit<OrderInsert, "id" | "createdAt" | "updatedAt">[];
  orderPassengers: Omit<OrderPassengerInsert, "id" | "createdAt">[];
  payments: Omit<PaymentInsert, "id" | "createdAt">[];
  orderIdMap: Map<string, string>; // Maps temp order IDs to actual order IDs (for reference)
}

/**
 * Generate realistic orders with passengers and payments
 * Covers all order states: PENDING_PAYMENT, CONFIRMED, CANCELLED, REFUNDED
 * Includes both future flights (not traveled) and past flights (traveled)
 */
export function generateOrders(
  input: OrderGeneratorInput
): OrderGeneratorOutput {
  const {
    userIds,
    flightSeatClassIds,
    futureFlightSeatClassIds,
    pastFlightSeatClassIds,
    passengersByUser,
    count,
    seed,
  } = input;

  if (seed !== undefined) {
    faker.seed(seed);
  }

  const generatedOrders: Omit<OrderInsert, "id" | "createdAt" | "updatedAt">[] =
    [];
  const generatedOrderPassengers: Omit<
    OrderPassengerInsert,
    "id" | "createdAt"
  >[] = [];
  const generatedPayments: Omit<PaymentInsert, "id" | "createdAt">[] = [];
  const orderIdMap = new Map<string, string>();

  for (let i = 0; i < count; i++) {
    // Select random user
    const userId = faker.helpers.arrayElement(userIds);
    const userPassengers = passengersByUser.get(userId) || [];

    if (userPassengers.length === 0) continue; // Skip if user has no passengers

    // Select 1-3 passengers for this order
    const passengerCount = faker.number.int({
      min: 1,
      max: Math.min(3, userPassengers.length),
    });
    const selectedPassengers = faker.helpers.arrayElements(
      userPassengers,
      passengerCount
    );

    // Determine if this should be a "traveled" order (past flight)
    // 20% of CONFIRMED orders should be for past flights (already traveled)
    const isTraveled =
      faker.datatype.boolean({ probability: 0.2 }) &&
      pastFlightSeatClassIds.length > 0;

    // Select appropriate flight seat class pool based on whether order is traveled
    const availableSeatClassIds = isTraveled
      ? pastFlightSeatClassIds
      : futureFlightSeatClassIds.length > 0
        ? futureFlightSeatClassIds
        : flightSeatClassIds;

    // Select flight seat class (outbound)
    const outboundFlightSeatClassId = faker.helpers.arrayElement(
      availableSeatClassIds
    );

    // 30% chance of round-trip
    const isRoundTrip = faker.datatype.boolean({ probability: 0.3 });
    const inboundFlightSeatClassId = isRoundTrip
      ? faker.helpers.arrayElement(
          availableSeatClassIds.filter(id => id !== outboundFlightSeatClassId)
        )
      : null;

    // Generate pricing
    const pricePerTicket = faker.number.float({
      min: 300,
      max: 3000,
      fractionDigits: 2,
    });
    const baseAmount = pricePerTicket * passengerCount;

    // 40% chance of ancillary services
    const hasAncillary = faker.datatype.boolean({ probability: 0.4 });
    const selectedAncillary: AncillaryService[] = hasAncillary
      ? faker.helpers.arrayElements(
          availableAncillaryServices,
          faker.number.int({ min: 1, max: 3 })
        )
      : [];

    const ancillaryAmount =
      selectedAncillary.reduce((sum, service) => sum + service.price, 0) *
      passengerCount;
    const totalAmount = baseAmount + ancillaryAmount;

    // Generate order number: NMD + YYYYMMDD + 4-digit random
    const orderDate = faker.date.recent({ days: 30 });
    const dateStr = orderDate.toISOString().slice(0, 10).replace(/-/g, "");
    const randomSuffix = faker.string.numeric(4);
    const orderNumber = `NMD${dateStr}${randomSuffix}`;

    // Generate temp order ID for reference
    const tempOrderId = faker.string.uuid();

    // Order status distribution: 50% CONFIRMED, 25% PENDING_PAYMENT, 15% CANCELLED, 10% REFUNDED
    // This ensures all order states are represented in the seeded data
    const statusRoll = faker.number.float({ min: 0, max: 1 });
    const status =
      statusRoll < 0.5
        ? "CONFIRMED"
        : statusRoll < 0.75
          ? "PENDING_PAYMENT"
          : statusRoll < 0.9
            ? "CANCELLED"
            : "REFUNDED";

    // Payment deadline: 30 minutes from order creation for pending orders
    const paymentDeadline = new Date(orderDate.getTime() + 30 * 60 * 1000);

    // Contact information
    const contactPhone = faker.helpers.maybe(
      () =>
        `${faker.string.numeric(3)}-${faker.string.numeric(4)}-${faker.string.numeric(4)}`,
      { probability: 0.8 }
    );
    const contactEmail = faker.helpers.maybe(() => faker.internet.email(), {
      probability: 0.7,
    });

    // Ensure at least one contact method
    const finalContactPhone =
      contactPhone ||
      `${faker.string.numeric(3)}-${faker.string.numeric(4)}-${faker.string.numeric(4)}`;
    const finalContactEmail = contactEmail || null;

    // Create order
    generatedOrders.push({
      orderNumber,
      userId,
      outboundFlightSeatClassId,
      inboundFlightSeatClassId,
      status,
      paymentDeadline,
      passengerCount,
      contactPhone: finalContactPhone,
      contactEmail: finalContactEmail,
      pricePerTicket: pricePerTicket.toString(),
      baseAmount: baseAmount.toFixed(2),
      ancillaryAmount: ancillaryAmount.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
      ancillaryDetails: selectedAncillary.length > 0 ? selectedAncillary : null,
      deletedAt: null,
    });

    orderIdMap.set(tempOrderId, orderNumber);

    // Create order passengers (snapshots)
    for (const passenger of selectedPassengers) {
      generatedOrderPassengers.push({
        orderId: tempOrderId, // Will be replaced with actual order ID during insertion
        name: passenger.name,
        identityType: passenger.identityType,
        identityNumber: passenger.identityNumber,
        phone: passenger.phone,
      });
    }

    // Create payment (for CONFIRMED, PENDING_PAYMENT, and REFUNDED orders)
    // REFUNDED orders also have payment records (they were paid before being refunded)
    if (
      status === "CONFIRMED" ||
      status === "PENDING_PAYMENT" ||
      status === "REFUNDED"
    ) {
      const paymentStatus =
        status === "CONFIRMED" || status === "REFUNDED" ? "SUCCESS" : "FAILED";
      const paymentMethod = faker.helpers.arrayElement([
        "BALANCE",
        "ALIPAY",
        "WECHAT",
      ]);
      const transactionId = `TXN${Date.now()}${faker.string.numeric(6)}`;

      generatedPayments.push({
        orderId: tempOrderId, // Will be replaced with actual order ID during insertion
        amount: totalAmount.toFixed(2),
        method: paymentMethod,
        status: paymentStatus,
        transactionId,
      });
    }
  }

  return {
    orders: generatedOrders,
    orderPassengers: generatedOrderPassengers,
    payments: generatedPayments,
    orderIdMap,
  };
}
