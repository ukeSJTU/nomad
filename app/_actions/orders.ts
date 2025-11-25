"use server";

import { and, eq, inArray, sql } from "drizzle-orm";
import { nanoid } from "nanoid";
import { headers } from "next/headers";
import { z } from "zod";

import { db } from "@/db";
import { getAncillaryServiceByCode } from "@/db/schema/ancillary";
import { flightSeatClasses } from "@/db/schema/flight-seat-classes";
import { orderPassengers, orders } from "@/db/schema/orders";
import { auth } from "@/domains/auth";
import { cancelOrder, refundOrder } from "@/domains/booking/orders.service";
import {
  addCurrency,
  getCurrencyValue,
  multiplyCurrency,
  parseCurrency,
  toDatabaseValue,
} from "@/lib/currency";
import type { ActionResult } from "@/types/common";

/**
 * Create order action result data
 */
export type CreateOrderData = {
  orderId: string;
  orderNumber: string;
  paymentDeadline: string;
};

export type CreateOrderResult = ActionResult<CreateOrderData>;

/**
 * Update order ancillary action result data
 */
export type UpdateOrderAncillaryData = {
  orderId: string;
  totalAmount: string;
};

export type UpdateOrderAncillaryResult = ActionResult<UpdateOrderAncillaryData>;

/**
 * Delete order action result
 */
export type DeleteOrderResult = ActionResult<void>;

/**
 * Validation schema for passenger data
 */
const passengerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  documentType: z.enum(["id_card", "passport", "other"]),
  documentNumber: z.string().min(1, "Document number is required"),
  phone: z.string().optional(),
});

/**
 * Validation schema for contact information
 */
const contactInfoSchema = z.object({
  method: z.enum(["email", "phone"]),
  email: z.string().email().optional(),
  phone: z.string().optional(),
});

/**
 * Validation schema for create order request
 */
const createOrderSchema = z.object({
  outboundSeatClassId: z.string().uuid("Invalid seat class ID"),
  inboundSeatClassId: z.string().uuid("Invalid seat class ID").optional(),
  passengers: z
    .array(passengerSchema)
    .min(1, "At least one passenger is required"),
  contactInfo: contactInfoSchema,
});

/**
 * Generate order number in format: "NMD" + YYYYMMDD + random suffix
 * Example: "NMD20251104A1B2"
 */
function generateOrderNumber(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const dateStr = `${year}${month}${day}`;
  const randomSuffix = nanoid(4).toUpperCase();

  return `NMD${dateStr}${randomSuffix}`;
}

/**
 * Calculate payment deadline (15 minutes from now)
 */
function calculatePaymentDeadline(): Date {
  const deadline = new Date();
  deadline.setMinutes(deadline.getMinutes() + 15);
  return deadline;
}

/**
 * Server action to create a new order
 *
 * This is invoked after successful submit of first step of flights/booking/passengers/
 * It validates seat availability, creates order and order passenger records, and locks seats
 *
 * @param formData - Order creation data including seat class IDs, passengers, and contact info
 * @returns Object with success status, orderId if successful, or error message
 */
export async function createOrderAction(
  formData: unknown
): Promise<CreateOrderResult> {
  try {
    // 1. Check authentication
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

    // 2. Validate input data
    const result = createOrderSchema.safeParse(formData);

    if (!result.success) {
      return {
        success: false as const,
        error: "Validation failed",
        fieldErrors: result.error.flatten().fieldErrors,
      };
    }

    const validatedData = result.data;
    const passengerCount = validatedData.passengers.length;

    // 3. Validate contact information
    if (validatedData.contactInfo.method === "email") {
      if (!validatedData.contactInfo.email) {
        return {
          success: false as const,
          error: "Email is required when contact method is email",
        };
      }
    } else if (validatedData.contactInfo.method === "phone") {
      if (!validatedData.contactInfo.phone) {
        return {
          success: false as const,
          error: "Phone is required when contact method is phone",
        };
      }
    }

    // 4. Check seat availability and get seat class details
    const seatClassIds = [validatedData.outboundSeatClassId];
    if (validatedData.inboundSeatClassId) {
      seatClassIds.push(validatedData.inboundSeatClassId);
    }

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
        success: false as const,
        error: "One or more seat classes not found",
      };
    }

    // Check if enough seats are available for all flights
    for (const seatClass of seatClasses) {
      if (seatClass.availableSeats < passengerCount) {
        return {
          success: false as const,
          error: `Not enough seats available. Only ${seatClass.availableSeats} seats remaining.`,
        };
      }
    }

    // 5. Calculate pricing using currency.js for precision
    const outboundSeatClass = seatClasses.find(
      sc => sc.id === validatedData.outboundSeatClassId
    )!;
    const inboundSeatClass = validatedData.inboundSeatClassId
      ? seatClasses.find(sc => sc.id === validatedData.inboundSeatClassId)
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

    // 6. Create order in a transaction
    const orderNumber = generateOrderNumber();
    const paymentDeadline = calculatePaymentDeadline();

    const [createdOrder] = await db.transaction(async tx => {
      // Create order
      const [order] = await tx
        .insert(orders)
        .values({
          orderNumber,
          userId: session.user.id,
          outboundFlightSeatClassId: validatedData.outboundSeatClassId,
          inboundFlightSeatClassId: validatedData.inboundSeatClassId || null,
          status: "PENDING_PAYMENT",
          paymentDeadline,
          contactPhone: validatedData.contactInfo.phone || null,
          contactEmail: validatedData.contactInfo.email || null,
          passengerCount,
          pricePerTicket: toDatabaseValue(totalPricePerTicket),
          baseAmount: toDatabaseValue(baseAmount),
          ancillaryAmount: "0.00", // Will be updated in ancillary step
          totalAmount: toDatabaseValue(baseAmount), // Will be updated in ancillary step
          ancillaryDetails: null, // Will be updated in ancillary step
        })
        .returning();

      // Create order passengers
      const passengerData = validatedData.passengers.map(passenger => ({
        orderId: order.id,
        name: passenger.name,
        identityType: passenger.documentType as
          | "id_card"
          | "passport"
          | "other",
        identityNumber: passenger.documentNumber,
        phone: passenger.phone || null,
      }));

      await tx.insert(orderPassengers).values(passengerData);

      // Lock seats by decrementing available seats
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
      success: true as const,
      data: {
        orderId: createdOrder.id,
        orderNumber: createdOrder.orderNumber,
        paymentDeadline: createdOrder.paymentDeadline.toISOString(),
      },
    };
  } catch (error) {
    console.error("Error creating order:", error);
    return {
      success: false as const,
      error: "Failed to create order. Please try again.",
    };
  }
}

/**
 * Validation schema for update order ancillary request
 */
const updateOrderAncillarySchema = z.object({
  orderId: z.string().uuid("Invalid order ID"),
  ancillaryServiceCodes: z.array(z.string()).default([]),
});

/**
 * Server action to update order ancillary services
 *
 * This is invoked after the ancillary selection step
 *
 * @param formData - Object containing orderId and ancillaryServiceCodes
 * @returns Object with success status or error message
 */
export async function updateOrderAncillaryAction(
  formData: unknown
): Promise<UpdateOrderAncillaryResult> {
  try {
    // 1. Validate input
    const result = updateOrderAncillarySchema.safeParse(formData);
    if (!result.success) {
      return {
        success: false as const,
        error: "Validation failed",
        fieldErrors: result.error.flatten().fieldErrors,
      };
    }

    const { orderId, ancillaryServiceCodes } = result.data;

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

    // 3. Validate order exists and belongs to user
    const [order] = await db
      .select()
      .from(orders)
      .where(and(eq(orders.id, orderId), eq(orders.userId, session.user.id)));

    if (!order) {
      return {
        success: false as const,
        error: "Order not found",
      };
    }

    // 3. Calculate ancillary amount using currency.js for precision
    let ancillaryAmount = parseCurrency(0);
    for (const code of ancillaryServiceCodes) {
      const service = getAncillaryServiceByCode(code);
      if (service) {
        ancillaryAmount = addCurrency(
          getCurrencyValue(ancillaryAmount),
          service.price
        );
      }
    }
    const totalAmount = addCurrency(order.baseAmount, ancillaryAmount);

    // 4. Update order
    await db
      .update(orders)
      .set({
        ancillaryDetails:
          ancillaryServiceCodes.length > 0 ? ancillaryServiceCodes : null,
        ancillaryAmount: toDatabaseValue(ancillaryAmount),
        totalAmount: toDatabaseValue(totalAmount),
      })
      .where(eq(orders.id, orderId));

    return {
      success: true as const,
      data: {
        orderId: order.id,
        totalAmount: toDatabaseValue(totalAmount),
      },
    };
  } catch (error) {
    console.error("Error updating order ancillary:", error);
    return {
      success: false as const,
      error: "Failed to update order. Please try again.",
    };
  }
}

/**
 * Server action to cancel an order (user-initiated)
 *
 * This action:
 * 1. Validates user authentication
 * 2. Delegates to the service layer for business logic
 *
 * @param orderId - Order UUID
 * @returns ActionResult with success/error
 */
export async function cancelOrderAction(
  orderId: string
): Promise<ActionResult<void>> {
  try {
    // 1. Check authentication
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

    // 2. Delegate to service layer
    const result = await cancelOrder(orderId, session.user.id);

    if (!result.success) {
      return {
        success: false as const,
        error: result.error || "Failed to cancel order",
      };
    }

    return {
      success: true as const,
      data: undefined,
    };
  } catch (error) {
    console.error("Error in cancelOrderAction:", error);
    return {
      success: false as const,
      error: "Failed to cancel order. Please try again.",
    };
  }
}

/**
 * Server action to refund an order (user-initiated)
 *
 * This action:
 * 1. Validates user authentication
 * 2. Delegates to the service layer for business logic
 *
 * Business Rules (enforced in service layer):
 * - Only CONFIRMED orders can be refunded
 * - Flight must not have departed yet
 * - Refund amount is returned to user balance
 * - Seats are released immediately
 *
 * @param orderId - Order UUID
 * @returns ActionResult with success/error
 */
export async function refundOrderAction(
  orderId: string
): Promise<ActionResult<void>> {
  try {
    // 1. Check authentication
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

    // 2. Delegate to service layer
    const result = await refundOrder(orderId, session.user.id);

    if (!result.success) {
      return {
        success: false as const,
        error: result.error || "Failed to refund order",
      };
    }

    return {
      success: true as const,
      data: undefined,
    };
  } catch (error) {
    console.error("Error in refundOrderAction:", error);
    return {
      success: false as const,
      error: "Failed to refund order. Please try again.",
    };
  }
}

/**
 * Validation schema for delete order request
 */
const deleteOrderSchema = z.object({
  orderId: z.string().uuid("Invalid order ID"),
});

/**
 * Delete Order Action (Soft Delete)
 *
 * Business Rules:
 * - Only orders with status CONFIRMED, CANCELLED, or REFUNDED can be deleted
 * - PENDING_PAYMENT orders cannot be deleted (user should wait for timeout or complete payment)
 * - Soft delete by setting deletedAt timestamp
 * - Order must belong to the authenticated user
 *
 * @param formData - Object containing orderId
 * @returns DeleteOrderResult indicating success or failure
 */
export async function deleteOrderAction(
  formData: unknown
): Promise<DeleteOrderResult> {
  try {
    // Step 1: Validate input
    const result = deleteOrderSchema.safeParse(formData);

    if (!result.success) {
      return {
        success: false as const,
        error: "Invalid order ID",
        fieldErrors: result.error.flatten().fieldErrors,
      };
    }

    const { orderId } = result.data;

    // Step 2: Check authentication
    const headersList = await headers();
    const session = await auth.api.getSession({ headers: headersList });

    if (!session?.user?.id) {
      return {
        success: false as const,
        error: "Authentication required. Please log in first.",
      };
    }

    // Step 3: Query order and verify ownership
    const [order] = await db
      .select()
      .from(orders)
      .where(and(eq(orders.id, orderId), eq(orders.userId, session.user.id)));

    if (!order) {
      return {
        success: false as const,
        error: "Order not found or you do not have permission to delete it.",
      };
    }

    // Step 4: Check if order is already deleted
    if (order.deletedAt) {
      return {
        success: false as const,
        error: "Order has already been deleted.",
      };
    }

    // Step 5: Verify order status - only allow deletion for completed/cancelled orders
    if (order.status === "PENDING_PAYMENT") {
      return {
        success: false as const,
        error:
          "Cannot delete pending payment orders. Please wait for payment timeout or complete the payment.",
      };
    }

    if (!["CONFIRMED", "CANCELLED", "REFUNDED"].includes(order.status)) {
      return {
        success: false as const,
        error: `Cannot delete order with status: ${order.status}`,
      };
    }

    // Step 6: Perform soft delete
    await db
      .update(orders)
      .set({
        deletedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(orders.id, orderId));

    return {
      success: true as const,
      data: undefined,
    };
  } catch (error) {
    console.error("Error deleting order:", error);
    return {
      success: false as const,
      error: "Failed to delete order. Please try again.",
    };
  }
}
