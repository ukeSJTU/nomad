import { and, eq, inArray, sql } from "drizzle-orm";
import { nanoid } from "nanoid";

import { db } from "@/db";
import { getAncillaryServiceByCode } from "@/db/schema/ancillary";
import { flightSeatClasses } from "@/db/schema/flight-seat-classes";
import { orderPassengers, orders } from "@/db/schema/orders";
import {
  type OrderRefundData,
  cancelExpiredOrdersAndReleaseSeats,
  cancelOrderAndReleaseSeats,
  getExpiredOrders,
  getOrderForCancellation,
  getOrderForRefund,
  refundOrderAndReleaseSeats,
} from "@/domains/booking/orders.repository";
import {
  addCurrency,
  getCurrencyValue,
  multiplyCurrency,
  parseCurrency,
  toDatabaseValue,
} from "@/lib/format/currency";
import type {
  CreateOrderPayload,
  UpdateOrderAncillaryPayload,
} from "@/types/dto";
import type { ServiceResult } from "@/types/result";

/**
 * Order Service Layer
 *
 * This module contains business logic for order operations.
 * This layer delegates persistence to the repository layer.
 *
 * Key Functions:
 * - createOrder: Create a new order and lock seats
 * - updateOrderAncillary: Update ancillary selections and totals
 * - cancelExpiredOrders: Cancel orders that have exceeded their payment deadline
 * - cancelOrder: Cancel a specific order (user-initiated)
 * - refundOrder: Refund a confirmed order (user-initiated)
 */

export interface CreateOrderInput {
  outboundSeatClassId: string;
  inboundSeatClassId?: string;
  passengers: {
    name: string;
    documentType: "id_card" | "passport" | "other";
    documentNumber: string;
    phone?: string;
  }[];
  contactInfo: {
    method: "email" | "phone";
    email?: string;
    phone?: string;
  };
}

function generateOrderNumber(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const dateStr = `${year}${month}${day}`;
  const randomSuffix = nanoid(4).toUpperCase();

  return `NMD${dateStr}${randomSuffix}`;
}

function calculatePaymentDeadline(): Date {
  const deadline = new Date();
  deadline.setMinutes(deadline.getMinutes() + 15);
  return deadline;
}

export async function createOrder(
  userId: string,
  payload: CreateOrderInput
): Promise<ServiceResult<CreateOrderPayload>> {
  try {
    const passengerCount = payload.passengers.length;
    const seatClassIds = [
      payload.outboundSeatClassId,
      ...(payload.inboundSeatClassId ? [payload.inboundSeatClassId] : []),
    ];

    const seatClasses = await db
      .select()
      .from(flightSeatClasses)
      .where(
        and(
          inArray(flightSeatClasses.id, seatClassIds),
          eq(flightSeatClasses.isDeleted, false)
        )
      );

    if (seatClasses.length !== seatClassIds.length) {
      return {
        success: false,
        error: "One or more seat classes not found",
      };
    }

    for (const seatClass of seatClasses) {
      if (seatClass.availableSeats < passengerCount) {
        return {
          success: false,
          error: `Not enough seats available. Only ${seatClass.availableSeats} seats remaining.`,
        };
      }
    }

    const outboundSeatClass = seatClasses.find(
      sc => sc.id === payload.outboundSeatClassId
    )!;
    const inboundSeatClass = payload.inboundSeatClassId
      ? seatClasses.find(sc => sc.id === payload.inboundSeatClassId)
      : null;

    const outboundPrice = parseCurrency(outboundSeatClass.price);
    const inboundPrice = inboundSeatClass
      ? parseCurrency(inboundSeatClass.price)
      : parseCurrency(0);

    const totalPricePerTicket = addCurrency(
      getCurrencyValue(outboundPrice),
      getCurrencyValue(inboundPrice)
    );
    const baseAmount = multiplyCurrency(
      getCurrencyValue(totalPricePerTicket),
      passengerCount
    );

    const orderNumber = generateOrderNumber();
    const paymentDeadline = calculatePaymentDeadline();

    const [createdOrder] = await db.transaction(async tx => {
      const [order] = await tx
        .insert(orders)
        .values({
          orderNumber,
          userId,
          outboundFlightSeatClassId: payload.outboundSeatClassId,
          inboundFlightSeatClassId: payload.inboundSeatClassId || null,
          status: "PENDING_PAYMENT",
          paymentDeadline,
          contactPhone: payload.contactInfo.phone || null,
          contactEmail: payload.contactInfo.email || null,
          passengerCount,
          pricePerTicket: toDatabaseValue(totalPricePerTicket),
          baseAmount: toDatabaseValue(baseAmount),
          ancillaryAmount: "0.00",
          totalAmount: toDatabaseValue(baseAmount),
          ancillaryDetails: null,
        })
        .returning();

      const passengerData = payload.passengers.map(passenger => ({
        orderId: order.id,
        name: passenger.name,
        identityType: passenger.documentType,
        identityNumber: passenger.documentNumber,
        phone: passenger.phone || null,
      }));

      await tx.insert(orderPassengers).values(passengerData);

      for (const seatClassId of seatClassIds) {
        await tx
          .update(flightSeatClasses)
          .set({
            availableSeats: sql`${flightSeatClasses.availableSeats} - ${passengerCount}`,
            updatedAt: new Date(),
          })
          .where(eq(flightSeatClasses.id, seatClassId));
      }

      return [order];
    });

    return {
      success: true,
      data: {
        orderId: createdOrder.id,
        orderNumber: createdOrder.orderNumber,
        paymentDeadline: createdOrder.paymentDeadline.toISOString(),
      },
    };
  } catch (error) {
    console.error("Error creating order:", error);
    return {
      success: false,
      error: "Failed to create order. Please try again.",
    };
  }
}

export async function updateOrderAncillary(
  userId: string,
  params: {
    orderId: string;
    ancillaryServiceCodes: string[];
  }
): Promise<ServiceResult<UpdateOrderAncillaryPayload>> {
  try {
    const [order] = await db
      .select()
      .from(orders)
      .where(and(eq(orders.id, params.orderId), eq(orders.userId, userId)));

    if (!order) {
      return {
        success: false,
        error: "Order not found",
      };
    }

    let ancillaryAmount = parseCurrency(0);
    for (const code of params.ancillaryServiceCodes) {
      const service = getAncillaryServiceByCode(code);
      if (service) {
        ancillaryAmount = addCurrency(
          getCurrencyValue(ancillaryAmount),
          service.price
        );
      }
    }
    const totalAmount = addCurrency(order.baseAmount, ancillaryAmount);

    await db
      .update(orders)
      .set({
        ancillaryDetails:
          params.ancillaryServiceCodes.length > 0
            ? params.ancillaryServiceCodes
            : null,
        ancillaryAmount: toDatabaseValue(ancillaryAmount),
        totalAmount: toDatabaseValue(totalAmount),
      })
      .where(eq(orders.id, params.orderId));

    return {
      success: true,
      data: {
        orderId: order.id,
        totalAmount: toDatabaseValue(totalAmount),
      },
    };
  } catch (error) {
    console.error("Error updating order ancillary:", error);
    return {
      success: false,
      error: "Failed to update order. Please try again.",
    };
  }
}

export async function deleteOrder(
  userId: string,
  orderId: string
): Promise<ServiceResult> {
  try {
    const [order] = await db
      .select()
      .from(orders)
      .where(and(eq(orders.id, orderId), eq(orders.userId, userId)));

    if (!order) {
      return {
        success: false,
        error: "Order not found or you do not have permission to delete it.",
      };
    }

    if (order.deletedAt) {
      return {
        success: false,
        error: "Order has already been deleted.",
      };
    }

    if (order.status === "PENDING_PAYMENT") {
      return {
        success: false,
        error:
          "Cannot delete pending payment orders. Please wait for payment timeout or complete the payment.",
      };
    }

    if (!["CONFIRMED", "CANCELLED", "REFUNDED"].includes(order.status)) {
      return {
        success: false,
        error: `Cannot delete order with status: ${order.status}`,
      };
    }

    await db
      .update(orders)
      .set({
        deletedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(orders.id, orderId));

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error deleting order:", error);
    return {
      success: false,
      error: "Failed to delete order. Please try again.",
    };
  }
}

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
