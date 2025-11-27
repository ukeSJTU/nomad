"use server";

import { headers } from "next/headers";
import { z } from "zod";

import { requireSessionUser } from "@/actions/session";
import { auth } from "@/domains/auth";
import {
  getAllOrdersByUserId,
  getFlightSeatClassById,
  getOrderConfirmation,
  getOrderDetailById,
  getOrderForAncillary,
  getOrderForPayment,
  getSavedPassengers,
} from "@/domains/booking/booking.read.service";
import {
  cancelOrder,
  createOrder,
  deleteOrder,
  refundOrder,
  updateOrderAncillary,
} from "@/domains/booking/orders.service";
import { getUserBalance } from "@/domains/user/user.read.service";
import type { ActionResult } from "@/types/common";
import type {
  AncillaryPageOrder,
  ConfirmationPageOrder,
  PaymentPageOrder,
} from "@/types/dto/booking";
import type { OrderDetailFull, OrderListItem } from "@/types/dto/orders";

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

    const result = createOrderSchema.safeParse(formData);

    if (!result.success) {
      return {
        success: false as const,
        error: "Validation failed",
        fieldErrors: result.error.flatten().fieldErrors,
      };
    }

    const validatedData = result.data;

    if (
      validatedData.contactInfo.method === "email" &&
      !validatedData.contactInfo.email
    ) {
      return {
        success: false as const,
        error: "Email is required when contact method is email",
      };
    }

    if (
      validatedData.contactInfo.method === "phone" &&
      !validatedData.contactInfo.phone
    ) {
      return {
        success: false as const,
        error: "Phone is required when contact method is phone",
      };
    }

    const createResult = await createOrder(session.user.id, validatedData);

    if (!createResult.success || !createResult.data) {
      return {
        success: false as const,
        error:
          createResult.error || "Failed to create order. Please try again.",
      };
    }

    return {
      success: true as const,
      data: createResult.data,
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
    const result = updateOrderAncillarySchema.safeParse(formData);
    if (!result.success) {
      return {
        success: false as const,
        error: "Validation failed",
        fieldErrors: result.error.flatten().fieldErrors,
      };
    }

    const { orderId, ancillaryServiceCodes } = result.data;

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

    const updateResult = await updateOrderAncillary(session.user.id, {
      orderId,
      ancillaryServiceCodes,
    });

    if (!updateResult.success || !updateResult.data) {
      return {
        success: false as const,
        error:
          updateResult.error || "Failed to update order. Please try again.",
      };
    }

    return {
      success: true as const,
      data: updateResult.data,
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
    const result = deleteOrderSchema.safeParse(formData);

    if (!result.success) {
      return {
        success: false as const,
        error: "Invalid order ID",
        fieldErrors: result.error.flatten().fieldErrors,
      };
    }

    const { orderId } = result.data;

    const headersList = await headers();
    const session = await auth.api.getSession({ headers: headersList });

    if (!session?.user?.id) {
      return {
        success: false as const,
        error: "Authentication required. Please log in first.",
      };
    }

    const deleteResult = await deleteOrder(session.user.id, orderId);

    if (!deleteResult.success) {
      return {
        success: false as const,
        error:
          deleteResult.error || "Failed to delete order. Please try again.",
      };
    }

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

export async function getOrderDetailAction(
  orderId: string,
  redirectTo?: string
): Promise<OrderDetailFull | null> {
  const user = await requireSessionUser(redirectTo);

  return getOrderDetailById(orderId, user.id);
}

export async function listUserOrdersAction(
  redirectTo?: string
): Promise<OrderListItem[]> {
  const user = await requireSessionUser(redirectTo);

  return getAllOrdersByUserId(user.id);
}

export async function getBookingPassengersDataAction(params: {
  seatClassId?: string;
  outboundSeatClassId?: string;
  inboundSeatClassId?: string;
}) {
  const user = await requireSessionUser();

  const outboundFlight = params.seatClassId
    ? await getFlightSeatClassById(params.seatClassId)
    : params.outboundSeatClassId
      ? await getFlightSeatClassById(params.outboundSeatClassId)
      : null;

  const inboundFlight = params.inboundSeatClassId
    ? await getFlightSeatClassById(params.inboundSeatClassId)
    : null;

  const savedPassengers = await getSavedPassengers(user.id);

  return {
    outboundFlight,
    inboundFlight,
    savedPassengers,
  };
}

export async function getAncillaryOrderAction(
  orderId: string
): Promise<AncillaryPageOrder | null> {
  const user = await requireSessionUser();
  return getOrderForAncillary(orderId, user.id);
}

export async function getOrderConfirmationAction(
  orderId: string
): Promise<ConfirmationPageOrder | null> {
  const user = await requireSessionUser();

  return getOrderConfirmation(orderId, user.id);
}

export async function getPaymentPageDataAction(
  orderId: string
): Promise<{ order: PaymentPageOrder; balance: string } | null> {
  const user = await requireSessionUser();

  const [order, balance] = await Promise.all([
    getOrderForPayment(orderId, user.id),
    getUserBalance(user.id),
  ]);

  if (!order) {
    return null;
  }

  return {
    order,
    balance,
  };
}
