/**
 * Order Service Layer
 *
 * This module contains business logic for order operations.
 * This layer delegates persistence to the repository layer.
 *
 * Key Functions:
 * - cancelExpiredOrders: Cancel orders that have exceeded their payment deadline
 * - cancelOrder: Cancel a specific order (user-initiated)
 * - refundOrder: Refund a confirmed order (user-initiated)
 */

import {
  cancelExpiredOrdersAndReleaseSeats,
  cancelOrderAndReleaseSeats,
  getExpiredOrders,
  getOrderForCancellation,
  getOrderForRefund,
  type OrderRefundData,
  refundOrderAndReleaseSeats,
} from "@/lib/repositories/orders";

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
    const order = await getOrderForCancellation(orderId, userId);

    if (!order) {
      return {
        success: false,
        error: "Order not found or you don't have permission to cancel it.",
      };
    }

    if (order.status !== "PENDING_PAYMENT") {
      return {
        success: false,
        error: `Cannot cancel order with status: ${order.status}. Only pending payment orders can be cancelled.`,
      };
    }

    await cancelOrderAndReleaseSeats(
      {
        id: order.id,
        outboundFlightSeatClassId: order.outboundFlightSeatClassId,
        inboundFlightSeatClassId: order.inboundFlightSeatClassId,
        passengerCount: order.passengerCount,
      },
      new Date()
    );

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
    const expiredOrders = await getExpiredOrders(now);

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

    const result = await cancelExpiredOrdersAndReleaseSeats(expiredOrders, now);

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

function hasFlightDeparted(
  flight: OrderRefundData["outboundFlightSeatClass"],
  now: Date
): boolean {
  return flight.flight.departureDatetime <= now;
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
    const order = await getOrderForRefund(orderId, userId);

    if (!order) {
      return {
        success: false,
        error: "Order not found or you don't have permission to refund it.",
      };
    }

    if (order.status !== "CONFIRMED") {
      return {
        success: false,
        error: `Cannot refund order with status: ${order.status}. Only confirmed orders can be refunded.`,
      };
    }

    const now = new Date();
    if (hasFlightDeparted(order.outboundFlightSeatClass, now)) {
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

    await refundOrderAndReleaseSeats(
      {
        id: order.id,
        userId: order.userId,
        passengerCount: order.passengerCount,
        totalAmount: order.totalAmount,
        outboundFlightSeatClassId: order.outboundFlightSeatClassId,
        inboundFlightSeatClassId: order.inboundFlightSeatClassId,
      },
      now
    );

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
