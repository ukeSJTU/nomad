import { sql } from "drizzle-orm";
import {
  check,
  index,
  integer,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { user } from "../../../auth-schema";
import { flightSeatClasses } from "./flight-seat-classes";
import { documentTypeEnum } from "./passengers";

/**
 * Order Status Enum
 *
 * Order state machine (core field):
 * - PENDING_PAYMENT: Awaiting payment (order created, seat locked, waiting for payment)
 * - CONFIRMED: Awaiting travel (payment successful)
 * - CANCELLED: Cancelled (user manually cancelled or payment timeout)
 * - REFUNDED: Refunded (from payment-module.mdx)
 */
export const orderStatusEnum = pgEnum("order_status", [
  "PENDING_PAYMENT",
  "CONFIRMED",
  "CANCELLED",
  "REFUNDED",
]);

/**
 * Payment Status Enum
 *
 * - SUCCESS: Payment successful
 * - FAILED: Payment failed (e.g., insufficient balance)
 */
export const paymentStatusEnum = pgEnum("payment_status", [
  "SUCCESS",
  "FAILED",
]);

/**
 * Orders Schema (Main Order Table)
 *
 * Purpose:
 * - Store flight booking orders
 * - Track order status and payment lifecycle
 * - Snapshot pricing information at order creation time
 * - Support ancillary services (insurance, meals, etc.)
 *
 * Relationships:
 * - Order → User (Many-to-One)
 * - Order → FlightSeatClass (Many-to-One) - Key: links to seat class, not flight
 * - Order → OrderPassengers (One-to-Many)
 * - Order → Payment (One-to-One)
 *
 * Business Rules:
 * - Order number format: "NMD" + YYYYMMDD + random suffix (e.g., "NMD20251103XXXX")
 * - At least one of contactPhone or contactEmail must be provided
 * - Price snapshot: pricePerTicket is captured from FlightSeatClass.price at order creation
 * - Total amount = baseAmount + ancillaryAmount
 * - Soft delete: deletedAt is null for active orders, has value for deleted orders
 */
export const orders = pgTable(
  "orders",
  {
    id: uuid().primaryKey().defaultRandom(),

    // Readable order number (e.g., "NMD20251103XXXX")
    orderNumber: varchar("order_number", { length: 50 }).notNull().unique(),

    // Core Relationships
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "restrict" }),
    flightSeatClassId: uuid("flight_seat_class_id")
      .notNull()
      .references(() => flightSeatClasses.id, { onDelete: "restrict" }),

    // Status and Timing
    status: orderStatusEnum().notNull().default("PENDING_PAYMENT"),
    paymentDeadline: timestamp("payment_deadline", {
      withTimezone: true,
    }).notNull(),

    // Passenger and Contact Information (Snapshot)
    passengerCount: integer("passenger_count").notNull(),
    contactName: varchar("contact_name", { length: 100 }).notNull(),
    contactPhone: varchar("contact_phone", { length: 20 }),
    contactEmail: varchar("contact_email", { length: 255 }),

    // Pricing Model (includes snapshot and ancillary services)
    pricePerTicket: numeric("price_per_ticket", {
      precision: 10,
      scale: 2,
    }).notNull(),
    baseAmount: numeric("base_amount", { precision: 10, scale: 2 }).notNull(),
    ancillaryAmount: numeric("ancillary_amount", {
      precision: 10,
      scale: 2,
    })
      .notNull()
      .default("0"),
    totalAmount: numeric("total_amount", { precision: 10, scale: 2 }).notNull(),

    // Ancillary Services (Simplified JSON Snapshot Approach)
    ancillaryDetails: jsonb("ancillary_details"),

    // Soft Delete (from order-module.mdx requirements)
    deletedAt: timestamp("deleted_at", { withTimezone: true }),

    // Timestamps
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  table => [
    // Index Design
    index("idx_orders_user_id").on(table.userId),
    index("idx_orders_order_number").on(table.orderNumber),
    index("idx_orders_status").on(table.status),
    index("idx_orders_flight_seat_class_id").on(table.flightSeatClassId),
    index("idx_orders_payment_deadline").on(table.paymentDeadline),
    index("idx_orders_deleted_at").on(table.deletedAt),
    index("idx_orders_created_at").on(table.createdAt),

    // Composite Index: Query active orders by user
    index("idx_orders_user_active").on(table.userId, table.deletedAt),

    // Constraints
    check(
      "orders_contact_info_required",
      sql`${table.contactPhone} IS NOT NULL OR ${table.contactEmail} IS NOT NULL`
    ),
    check("orders_passenger_count_positive", sql`${table.passengerCount} > 0`),
    check("orders_price_per_ticket_positive", sql`${table.pricePerTicket} > 0`),
    check("orders_base_amount_non_negative", sql`${table.baseAmount} >= 0`),
    check(
      "orders_ancillary_amount_non_negative",
      sql`${table.ancillaryAmount} >= 0`
    ),
    check("orders_total_amount_positive", sql`${table.totalAmount} > 0`),
  ]
);

/**
 * Order Passengers Schema
 *
 * Purpose:
 * - Solve "multiple passengers" problem
 * - Store passenger information snapshot at booking time
 * - Preserve order information even if user deletes/modifies frequent passengers
 *
 * Relationships:
 * - OrderPassenger → Order (Many-to-One, cascade delete)
 *
 * Business Rules:
 * - Passenger information is a snapshot, independent of user's passenger list
 * - When order is deleted, all associated passengers are deleted (cascade)
 */
export const orderPassengers = pgTable(
  "order_passengers",
  {
    id: uuid().primaryKey().defaultRandom(),

    // Link back to Order table
    orderId: uuid("order_id")
      .notNull()
      .references(() => orders.id, { onDelete: "cascade" }),

    // Passenger Information Snapshot
    name: varchar({ length: 100 }).notNull(),
    identityType: documentTypeEnum("identity_type").notNull(),
    identityNumber: varchar("identity_number", { length: 50 }).notNull(),

    // Timestamps
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  table => [
    // Index Design
    index("idx_order_passengers_order_id").on(table.orderId),
    index("idx_order_passengers_identity").on(
      table.identityType,
      table.identityNumber
    ),
  ]
);

/**
 * Payments Schema
 *
 * Purpose:
 * - Record payment transactions (from payment-module.mdx)
 * - Track payment status and method
 * - Store transaction IDs for reference
 *
 * Relationships:
 * - Payment → Order (One-to-One)
 *
 * Business Rules:
 * - One order can only have one payment record
 * - Payment amount should equal Order.totalAmount
 * - Transaction ID is optional (for simulated payments)
 */
export const payments = pgTable(
  "payments",
  {
    id: uuid().primaryKey().defaultRandom(),

    // One-to-One relationship with Order
    orderId: uuid("order_id")
      .notNull()
      .unique()
      .references(() => orders.id, { onDelete: "restrict" }),

    // Payment Information
    amount: numeric({ precision: 10, scale: 2 }).notNull(),
    method: varchar({ length: 50 }).notNull(),
    status: paymentStatusEnum().notNull(),

    // Transaction ID (simulated)
    transactionId: varchar("transaction_id", { length: 100 }),

    // Timestamps
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  table => [
    // Index Design
    index("idx_payments_order_id").on(table.orderId),
    index("idx_payments_status").on(table.status),
    index("idx_payments_transaction_id").on(table.transactionId),
    index("idx_payments_created_at").on(table.createdAt),

    // Constraints
    check("payments_amount_positive", sql`${table.amount} > 0`),
  ]
);
