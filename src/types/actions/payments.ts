import { z } from "zod";

/**
 * Server Action Result Types for Payments
 *
 * These types define the return values from payment-related Server Actions
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
 * Process Payment Action Result
 */
export const processPaymentDataSchema = z.object({
  orderId: z.string().uuid(),
  orderNumber: z.string(),
  paymentId: z.string().uuid(),
  transactionId: z.string(),
  amount: z.string(),
  remainingBalance: z.string(),
});

export type ProcessPaymentData = z.infer<typeof processPaymentDataSchema>;
export type ProcessPaymentResult = ActionResult<ProcessPaymentData>;

/**
 * Get User Balance Result
 */
export const userBalanceSchema = z.object({
  userId: z.string(),
  balance: z.string(),
});

export type UserBalance = z.infer<typeof userBalanceSchema>;
