/**
 * Order Service Layer
 *
 * This module contains business logic for order operations.
 * It is separate from the actions layer to allow reuse in different contexts
 * (e.g., API routes, cron jobs, background tasks).
 *
 * Key Functions:
 * - cancelExpiredOrders: Cancel orders that have exceeded their payment deadline
 */

import { and, eq, lt, sql } from "drizzle-orm";

import { db } from "@/lib/db";
import { flightSeatClasses } from "@/lib/schema/flight-seat-classes";
import { orders } from "@/lib/schema/orders";

/**
 * Result type for cancelExpiredOrders function
 */
export type CancelExpiredOrdersResult =
  | {
      success: true;
      data: {
        cancelledCount: number;
        releasedSeats: number;
      };
      message: string;
    }
  | {
      success: false;
      error: string;
    };

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
export async function cancelExpiredOrders(): Promise<CancelExpiredOrdersResult> {
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
