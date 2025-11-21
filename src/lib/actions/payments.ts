"use server";

import { and, eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { headers } from "next/headers";
import { z } from "zod";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { user } from "@/lib/schema";
import { orders, payments } from "@/lib/schema/orders";
import type { ProcessPaymentResult } from "@/types/actions/payments";
import {
  getCurrencyValue,
  parseCurrency,
  subtractCurrency,
  toDatabaseValue,
} from "@/utils/currency";

/**
 * Validation schema for process payment request
 */
const processPaymentSchema = z.object({
  orderId: z.string().uuid("Invalid order ID"),
  paymentMethod: z.enum(["balance", "wechat", "alipay"]),
});

/**
 * Generate transaction ID in format: "TXN" + YYYYMMDDHHMMSS + random suffix
 * Example: "TXN20251104153045A1B2"
 */
function generateTransactionId(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const dateTimeStr = `${year}${month}${day}${hours}${minutes}${seconds}`;
  const randomSuffix = nanoid(4).toUpperCase();

  return `TXN${dateTimeStr}${randomSuffix}`;
}

/**
 * Server action to process payment
 *
 * This is invoked when user confirms payment on the payment page
 * It validates order status, checks user balance, processes payment, and updates order status
 *
 * @param formData - Payment data including orderId and paymentMethod
 * @returns Object with success status, payment details if successful, or error message
 */
export async function processPaymentAction(
  formData: unknown
): Promise<ProcessPaymentResult> {
  try {
    // 1. Validate input
    const result = processPaymentSchema.safeParse(formData);
    if (!result.success) {
      return {
        success: false as const,
        error: "Validation failed",
        fieldErrors: result.error.flatten().fieldErrors,
      };
    }

    const { orderId, paymentMethod } = result.data;

    // 2. Check authentication
    const headersList = await headers();
    const session = await auth.api.getSession({
      headers: headersList,
    });

    if (!session?.user?.id) {
      return {
        success: false as const,
        error: "Authentication required. Please log in first.",
      };
    }

    // 3. Only support balance payment for now
    if (paymentMethod !== "balance") {
      return {
        success: false as const,
        error: "Only balance payment is supported at this time.",
      };
    }

    // 4. Process payment in a transaction
    const paymentResult = await db.transaction(async tx => {
      // Get order and verify ownership
      const [order] = await tx
        .select()
        .from(orders)
        .where(and(eq(orders.id, orderId), eq(orders.userId, session.user.id)))
        .for("update"); // Lock the row for update

      if (!order) {
        throw new Error("Order not found");
      }

      // Check order status
      if (order.status !== "PENDING_PAYMENT") {
        throw new Error(
          `Order cannot be paid. Current status: ${order.status}`
        );
      }

      // Check payment deadline
      if (new Date() > order.paymentDeadline) {
        // Update order status to CANCELLED
        await tx
          .update(orders)
          .set({
            status: "CANCELLED",
            updatedAt: new Date(),
          })
          .where(eq(orders.id, orderId));

        throw new Error(
          "Payment deadline has passed. Order has been cancelled."
        );
      }

      // Get user balance
      const [userData] = await tx
        .select({
          balance: user.balance,
        })
        .from(user)
        .where(eq(user.id, session.user.id))
        .for("update"); // Lock the row for update

      if (!userData) {
        throw new Error("User not found");
      }

      // Check if user has sufficient balance
      const userBalance = parseCurrency(userData.balance);
      const orderAmount = parseCurrency(order.totalAmount);

      if (getCurrencyValue(userBalance) < getCurrencyValue(orderAmount)) {
        throw new Error(
          `Insufficient balance. Required: ¥${order.totalAmount}, Available: ¥${userData.balance}`
        );
      }

      // Deduct balance
      const newBalance = subtractCurrency(
        getCurrencyValue(userBalance),
        getCurrencyValue(orderAmount)
      );

      await tx
        .update(user)
        .set({
          balance: toDatabaseValue(newBalance),
          updatedAt: new Date(),
        })
        .where(eq(user.id, session.user.id));

      // Update order status to CONFIRMED
      await tx
        .update(orders)
        .set({
          status: "CONFIRMED",
          updatedAt: new Date(),
        })
        .where(eq(orders.id, orderId));

      // Create payment record
      const transactionId = generateTransactionId();
      const [payment] = await tx
        .insert(payments)
        .values({
          orderId: order.id,
          amount: order.totalAmount,
          method: paymentMethod,
          status: "SUCCESS",
          transactionId,
        })
        .returning();

      return {
        orderId: order.id,
        orderNumber: order.orderNumber,
        paymentId: payment.id,
        transactionId: payment.transactionId!,
        amount: order.totalAmount,
        remainingBalance: toDatabaseValue(newBalance),
      };
    });

    return {
      success: true as const,
      data: paymentResult,
    };
  } catch (error) {
    console.error("Error processing payment:", error);

    // Return user-friendly error message
    if (error instanceof Error) {
      return {
        success: false as const,
        error: error.message,
      };
    }

    return {
      success: false as const,
      error: "Failed to process payment. Please try again.",
    };
  }
}
