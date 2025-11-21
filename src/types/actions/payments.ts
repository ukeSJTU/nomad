import { z } from "zod";

import type { ActionResult } from "@/types/common";

/**
 * Server Action Result Types for Payments
 *
 * This file contains Zod validation schemas and TypeScript types for payment-related
 * Server Actions in Next.js. All schemas are compatible with Zod v4.
 *
 * Server Actions are async functions that run on the server and can be called from
 * client or server components. These types define the standardized return values.
 *
 * Naming conventions:
 * - Schemas: camelCase ending with "Schema" (e.g., processPaymentDataSchema)
 * - Types: PascalCase (e.g., ProcessPaymentData, ProcessPaymentResult)
 *
 * Note: These schemas align with the payments and user_balances tables in the database schema.
 */

// ============================================================================
// Process Payment Action
// ============================================================================

/**
 * Process payment action result data schema
 *
 * Defines the data returned when a payment is successfully processed.
 * Includes order, payment, and balance information.
 *
 * @property orderId - UUID of the order being paid
 * @property orderNumber - Human-readable order number (e.g., "ORD-20240101-001")
 * @property paymentId - UUID of the payment record
 * @property transactionId - External payment gateway transaction ID
 * @property amount - Payment amount as decimal string (e.g., "1234.56")
 * @property remainingBalance - User's remaining balance after payment as decimal string
 */
export const processPaymentDataSchema = z.object({
  orderId: z.string().uuid(),
  orderNumber: z.string(),
  paymentId: z.string().uuid(),
  transactionId: z.string(),
  amount: z.string(),
  remainingBalance: z.string(),
});

/**
 * Inferred TypeScript types for process payment action
 */
export type ProcessPaymentData = z.infer<typeof processPaymentDataSchema>;
export type ProcessPaymentResult = ActionResult<ProcessPaymentData>;

// ============================================================================
// User Balance Schema
// ============================================================================

/**
 * User balance schema
 *
 * Represents a user's current balance.
 * Used for displaying balance information and validating payment operations.
 *
 * @property userId - User's unique identifier
 * @property balance - Current balance as decimal string (e.g., "1234.56")
 */
export const userBalanceSchema = z.object({
  userId: z.string(),
  balance: z.string(),
});

/**
 * Inferred TypeScript type for user balance
 */
export type UserBalance = z.infer<typeof userBalanceSchema>;
