/**
 * Database types for order-related tables.
 *
 * These types are automatically inferred from the Drizzle schema definitions.
 * They represent the structure of order data as it exists in the database.
 *
 * @module types/database/orders
 */

import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

import type { orderPassengers, orders } from "@/lib/schema";

// ============================================================================
// Order Types
// ============================================================================

/**
 * Order record as returned from database SELECT queries.
 * Represents a flight booking order.
 */
export type Order = InferSelectModel<typeof orders>;

/**
 * Order data for INSERT operations.
 */
export type NewOrder = InferInsertModel<typeof orders>;

/**
 * Order status enum type derived from the orders table.
 * Possible values: PENDING_PAYMENT, CONFIRMED, CANCELLED, REFUNDED
 */
export type OrderStatus = Order["status"];

// ============================================================================
// Order Passenger Types
// ============================================================================

/**
 * Order passenger record as returned from database SELECT queries.
 * Links passengers to specific orders.
 */
export type OrderPassenger = InferSelectModel<typeof orderPassengers>;

/**
 * Order passenger data for INSERT operations.
 */
export type NewOrderPassenger = InferInsertModel<typeof orderPassengers>;
