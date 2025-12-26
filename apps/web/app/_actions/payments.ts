"use server";

import { headers } from "next/headers";
import { z } from "zod";

import { type ProcessPaymentData, processPayment } from "@/domains/payments";
import { auth } from "@/infra/auth";
import { createScopedLogger } from "@/infra/logging/logger";
import type { ActionResult } from "@/types/common";
import type { ServiceResult } from "@/types/result";

/**
 * Process payment action result data
 */
// export type { ProcessPaymentData } from "@/domains/payments";

export type ProcessPaymentResult = ActionResult<ProcessPaymentData>;

/**
 * Validation schema for process payment request
 */
const processPaymentSchema = z.object({
  orderId: z.string().uuid("Invalid order ID"),
  paymentMethod: z.enum(["balance", "wechat", "alipay"]),
});

const logger = createScopedLogger({ module: "actions.payments" });

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
  let paymentResult: ServiceResult<ProcessPaymentData> | undefined;
  let parsedOrderId: string | undefined;
  try {
    const result = processPaymentSchema.safeParse(formData);
    if (!result.success) {
      return {
        success: false as const,
        error: "Validation failed",
        fieldErrors: result.error.flatten().fieldErrors,
      };
    }

    const { orderId, paymentMethod } = result.data;
    parsedOrderId = orderId;

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

    paymentResult = await processPayment(session.user.id, {
      orderId,
      paymentMethod,
      userEmail: session.user.email,
      userName: session.user.name,
    });

    if (!paymentResult?.success || !paymentResult.data) {
      return {
        success: false as const,
        error:
          paymentResult?.error ||
          paymentResult?.message ||
          "Failed to process payment. Please try again.",
      };
    }

    if (paymentResult?.success && paymentResult.data) {
      return {
        success: true as const,
        data: paymentResult.data,
      };
    }

    return {
      success: false as const,
      error: "Failed to process payment. Please try again.",
    };
  } catch (error) {
    logger.error(
      {
        err: error,
        orderId: paymentResult?.data?.orderId ?? parsedOrderId,
      },
      "Error processing payment action"
    );

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
