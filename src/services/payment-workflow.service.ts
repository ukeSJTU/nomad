import { and, eq } from "drizzle-orm";
import { nanoid } from "nanoid";

import { db } from "@/db";
import { user } from "@/db/schema";
import { orders, payments } from "@/db/schema/orders";
import { getOrderDetailById } from "@/domains/booking";
import { sendOrderConfirmationEmail } from "@/infra/notifications";
import {
  getCurrencyValue,
  parseCurrency,
  subtractCurrency,
  toDatabaseValue,
} from "@/lib/format/currency";
import { transformOrderDetailToEmailData } from "@/lib/notification/transformers";
import type { ServiceResult } from "@/types/result";
import type {
  ProcessPaymentData,
  ProcessPaymentParams,
} from "@/types/services";

export type { ProcessPaymentData, ProcessPaymentParams };

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

export async function processPayment(
  userId: string,
  params: ProcessPaymentParams
): Promise<ServiceResult<ProcessPaymentData>> {
  if (params.paymentMethod !== "balance") {
    return {
      success: false,
      error: "Only balance payment is supported at this time.",
    };
  }

  try {
    const paymentResult = await db.transaction(async tx => {
      const [order] = await tx
        .select()
        .from(orders)
        .where(and(eq(orders.id, params.orderId), eq(orders.userId, userId)))
        .for("update");

      if (!order) {
        throw new Error("Order not found");
      }

      if (order.status !== "PENDING_PAYMENT") {
        throw new Error(
          `Order cannot be paid. Current status: ${order.status}`
        );
      }

      if (new Date() > order.paymentDeadline) {
        await tx
          .update(orders)
          .set({
            status: "CANCELLED",
            updatedAt: new Date(),
          })
          .where(eq(orders.id, params.orderId));

        throw new Error(
          "Payment deadline has passed. Order has been cancelled."
        );
      }

      const [userData] = await tx
        .select({
          balance: user.balance,
        })
        .from(user)
        .where(eq(user.id, userId))
        .for("update");

      if (!userData) {
        throw new Error("User not found");
      }

      const userBalance = parseCurrency(userData.balance);
      const orderAmount = parseCurrency(order.totalAmount);

      if (getCurrencyValue(userBalance) < getCurrencyValue(orderAmount)) {
        throw new Error(
          `Insufficient balance. Required: ¥${order.totalAmount}, Available: ¥${userData.balance}`
        );
      }

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
        .where(eq(user.id, userId));

      const updatedOrder = await tx
        .update(orders)
        .set({
          status: "CONFIRMED",
          updatedAt: new Date(),
        })
        .where(eq(orders.id, params.orderId))
        .returning({ id: orders.id, orderNumber: orders.orderNumber });

      const transactionId = generateTransactionId();
      const [paymentRecord] = await tx
        .insert(payments)
        .values({
          orderId: params.orderId,
          amount: order.totalAmount,
          method: params.paymentMethod,
          status: "SUCCESS",
          transactionId,
        })
        .returning();

      return {
        orderId: updatedOrder[0]?.id ?? order.id,
        orderNumber: updatedOrder[0]?.orderNumber ?? order.orderNumber,
        paymentId: paymentRecord.id,
        transactionId: paymentRecord.transactionId ?? transactionId,
        amount: order.totalAmount,
        remainingBalance: toDatabaseValue(newBalance),
      };
    });

    try {
      if (params.userEmail) {
        const orderDetail = await getOrderDetailById(
          paymentResult.orderId,
          userId
        );

        if (orderDetail) {
          const emailData = transformOrderDetailToEmailData(orderDetail, {
            name: params.userName ?? undefined,
            email: params.userEmail,
          });

          await sendOrderConfirmationEmail(emailData);
        }
      }
    } catch (emailError) {
      console.error(
        "[Payment] Error sending order confirmation email:",
        emailError
      );
    }

    return {
      success: true,
      data: paymentResult,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to process payment. Please try again.",
    };
  }
}
