/**
 * Order Service Layer
 *
 * This module contains business logic for order operations.
 * It is separate from the actions layer to allow reuse in different contexts
 * (e.g., API routes, cron jobs, background tasks).
 *
 * Key Functions:
 * - cancelExpiredOrders: Cancel orders that have exceeded their payment deadline
 * - cancelOrder: Cancel a specific order (user-initiated)
 * - refundOrder: Refund a confirmed order (user-initiated)
 */

import { and, eq, lt, sql } from "drizzle-orm";

import { db } from "@/lib/db";
import { user } from "@/lib/schema";
import { flightSeatClasses } from "@/lib/schema/flight-seat-classes";
import { orders } from "@/lib/schema/orders";

import type { ServiceResult } from "./types";

/**
 * Cancel a specific order (user-initiated)
 *
 * This function:
 * 1. Validates the order exists and belongs to the user
 * 2. Validates the order status is PENDING_PAYMENT
 * 3. Updates the order status to CANCELLED
 * 4. Releases locked seats back to available inventory
 *
 * Business Rules:
 * - Only orders with status PENDING_PAYMENT can be cancelled
 * - Releases seats for both outbound and inbound flights (if applicable)
 * - Uses database transaction to ensure atomicity
 *
 * @param orderId - Order UUID
 * @param userId - User UUID (for ownership validation)
 * @returns Result object with success/error
 */
export async function cancelOrder(
  orderId: string,
  userId: string
): Promise<ServiceResult> {
  try {
    // 1. Validate order exists and belongs to user
    const [order] = await db
      .select({
        id: orders.id,
        userId: orders.userId,
        status: orders.status,
        outboundFlightSeatClassId: orders.outboundFlightSeatClassId,
        inboundFlightSeatClassId: orders.inboundFlightSeatClassId,
        passengerCount: orders.passengerCount,
      })
      .from(orders)
      .where(and(eq(orders.id, orderId), eq(orders.userId, userId)));

    if (!order) {
      return {
        success: false,
        error: "Order not found or you don't have permission to cancel it.",
      };
    }

    // 2. Validate order status - only PENDING_PAYMENT orders can be cancelled
    if (order.status !== "PENDING_PAYMENT") {
      return {
        success: false,
        error: `Cannot cancel order with status: ${order.status}. Only pending payment orders can be cancelled.`,
      };
    }

    // 3. Cancel order and release seats in a transaction
    await db.transaction(async tx => {
      const now = new Date();

      // Update order status to CANCELLED
      await tx
        .update(orders)
        .set({
          status: "CANCELLED",
          cancellationReason: "用户取消",
          updatedAt: now,
        })
        .where(eq(orders.id, orderId));

      // Release outbound flight seats
      await tx
        .update(flightSeatClasses)
        .set({
          availableSeats: sql`${flightSeatClasses.availableSeats} + ${order.passengerCount}`,
          updatedAt: now,
        })
        .where(eq(flightSeatClasses.id, order.outboundFlightSeatClassId));

      // Release inbound flight seats (if round-trip)
      if (order.inboundFlightSeatClassId) {
        await tx
          .update(flightSeatClasses)
          .set({
            availableSeats: sql`${flightSeatClasses.availableSeats} + ${order.passengerCount}`,
            updatedAt: now,
          })
          .where(eq(flightSeatClasses.id, order.inboundFlightSeatClassId));
      }
    });

    return {
      success: true,
      message: "Order cancelled successfully",
    };
  } catch (error) {
    console.error("Error cancelling order:", error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unknown error occurred while cancelling order",
    };
  }
}

/**
 * Data returned by cancelExpiredOrders on success
 */
export interface CancelExpiredOrdersData {
  cancelledCount: number;
  releasedSeats: number;
}

/**
 * Data returned by refundOrder on success
 */
export interface RefundOrderData {
  refundAmount: string;
}

/**
 * Cancel all orders that have exceeded their payment deadline
 *
 * This function:
 * 1. Finds all orders with status PENDING_PAYMENT and paymentDeadline < now
 * 2. Updates their status to CANCELLED
 * 3. Releases locked seats back to available inventory
 *
 * Business Rules:
 * - Only cancels orders with status PENDING_PAYMENT
 * - Only cancels orders where paymentDeadline has passed
 * - Releases seats for both outbound and inbound flights (if applicable)
 * - Uses database transaction to ensure atomicity
 *
 * @returns Result object with cancellation statistics or error
 */
export async function cancelExpiredOrders(): Promise<
  ServiceResult<CancelExpiredOrdersData>
> {
  try {
    const now = new Date();

    // Find all expired orders
    const expiredOrders = await db.query.orders.findMany({
      where: and(
        eq(orders.status, "PENDING_PAYMENT"),
        lt(orders.paymentDeadline, now)
      ),
      columns: {
        id: true,
        orderNumber: true,
        outboundFlightSeatClassId: true,
        inboundFlightSeatClassId: true,
        passengerCount: true,
      },
    });

    // If no expired orders, return early
    if (expiredOrders.length === 0) {
      return {
        success: true,
        data: {
          cancelledCount: 0,
          releasedSeats: 0,
        },
        message: "No expired orders found",
      };
    }

    // Process cancellations in a transaction
    const result = await db.transaction(async tx => {
      let totalReleasedSeats = 0;

      // Update all expired orders to CANCELLED status
      await tx
        .update(orders)
        .set({
          status: "CANCELLED",
          cancellationReason: "支付失败",
          updatedAt: now,
        })
        .where(
          and(
            eq(orders.status, "PENDING_PAYMENT"),
            lt(orders.paymentDeadline, now)
          )
        );

      // Release seats for each expired order
      for (const order of expiredOrders) {
        const seatsToRelease = order.passengerCount;

        // Release outbound flight seats
        await tx
          .update(flightSeatClasses)
          .set({
            availableSeats: sql`${flightSeatClasses.availableSeats} + ${seatsToRelease}`,
            updatedAt: now,
          })
          .where(eq(flightSeatClasses.id, order.outboundFlightSeatClassId));

        totalReleasedSeats += seatsToRelease;

        // Release inbound flight seats (if round-trip)
        if (order.inboundFlightSeatClassId) {
          await tx
            .update(flightSeatClasses)
            .set({
              availableSeats: sql`${flightSeatClasses.availableSeats} + ${seatsToRelease}`,
              updatedAt: now,
            })
            .where(eq(flightSeatClasses.id, order.inboundFlightSeatClassId));

          totalReleasedSeats += seatsToRelease;
        }
      }

      return {
        cancelledCount: expiredOrders.length,
        releasedSeats: totalReleasedSeats,
      };
    });

    return {
      success: true,
      data: result,
      message: `Successfully cancelled ${result.cancelledCount} expired order(s) and released ${result.releasedSeats} seat(s)`,
    };
  } catch (error) {
    console.error("Error cancelling expired orders:", error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unknown error occurred while cancelling expired orders",
    };
  }
}

/**
 * Refund a confirmed order (user-initiated)
 *
 * This function:
 * 1. Validates the order exists and belongs to the user
 * 2. Validates the order status is CONFIRMED
 * 3. Validates the flight has not departed yet
 * 4. Updates the order status to REFUNDED
 * 5. Returns the refund amount to user's balance
 * 6. Releases locked seats back to available inventory
 *
 * Business Rules:
 * - Only orders with status CONFIRMED can be refunded
 * - Cannot refund orders if the flight has already departed
 * - Refund amount is the full order total
 * - All refunds are automatically approved (no manual review)
 * - Releases seats for both outbound and inbound flights (if applicable)
 * - Uses database transaction to ensure atomicity
 *
 * @param orderId - Order UUID
 * @param userId - User UUID (for ownership validation)
 * @returns Result object with success/error and refund amount
 */
export async function refundOrder(
  orderId: string,
  userId: string
): Promise<ServiceResult<RefundOrderData>> {
  try {
    // 1. Validate order exists and belongs to user, and get flight info
    const order = await db.query.orders.findFirst({
      where: and(eq(orders.id, orderId), eq(orders.userId, userId)),
      columns: {
        id: true,
        userId: true,
        status: true,
        outboundFlightSeatClassId: true,
        inboundFlightSeatClassId: true,
        passengerCount: true,
        totalAmount: true,
      },
      with: {
        outboundFlightSeatClass: {
          with: {
            flight: {
              columns: {
                departureDatetime: true,
                flightNumber: true,
              },
            },
          },
        },
        inboundFlightSeatClass: {
          with: {
            flight: {
              columns: {
                departureDatetime: true,
                flightNumber: true,
              },
            },
          },
        },
      },
    });

    if (!order) {
      return {
        success: false,
        error: "Order not found or you don't have permission to refund it.",
      };
    }

    // 2. Validate order status - only CONFIRMED orders can be refunded
    if (order.status !== "CONFIRMED") {
      return {
        success: false,
        error: `Cannot refund order with status: ${order.status}. Only confirmed orders can be refunded.`,
      };
    }

    // 3. Validate flight hasn't departed
    const now = new Date();
    if (order.outboundFlightSeatClass.flight.departureDatetime <= now) {
      return {
        success: false,
        error: `Cannot refund: Outbound flight ${order.outboundFlightSeatClass.flight.flightNumber} has already departed.`,
      };
    }

    if (
      order.inboundFlightSeatClass &&
      order.inboundFlightSeatClass.flight.departureDatetime <= now
    ) {
      return {
        success: false,
        error: `Cannot refund: Inbound flight ${order.inboundFlightSeatClass.flight.flightNumber} has already departed.`,
      };
    }

    // 4. Process refund in a transaction
    await db.transaction(async tx => {
      // Update order status to REFUNDED
      await tx
        .update(orders)
        .set({
          status: "REFUNDED",
          updatedAt: now,
        })
        .where(eq(orders.id, orderId));

      // Return funds to user balance
      await tx
        .update(user)
        .set({
          balance: sql`${user.balance} + ${order.totalAmount}`,
          updatedAt: now,
        })
        .where(eq(user.id, userId));

      // Release outbound flight seats
      await tx
        .update(flightSeatClasses)
        .set({
          availableSeats: sql`${flightSeatClasses.availableSeats} + ${order.passengerCount}`,
          updatedAt: now,
        })
        .where(eq(flightSeatClasses.id, order.outboundFlightSeatClassId));

      // Release inbound flight seats (if round-trip)
      if (order.inboundFlightSeatClassId) {
        await tx
          .update(flightSeatClasses)
          .set({
            availableSeats: sql`${flightSeatClasses.availableSeats} + ${order.passengerCount}`,
            updatedAt: now,
          })
          .where(eq(flightSeatClasses.id, order.inboundFlightSeatClassId));
      }
    });

    return {
      success: true,
      message:
        "Order refunded successfully. Funds have been returned to your balance.",
      data: {
        refundAmount: order.totalAmount,
      },
    };
  } catch (error) {
    console.error("Error refunding order:", error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unknown error occurred while refunding order",
    };
  }
}
