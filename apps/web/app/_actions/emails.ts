"use server";

/**
 * Server actions for email-related operations
 *
 * This module contains server actions for sending emails,
 * including order confirmation emails and resend functionality.
 */

import { headers } from "next/headers";

import { resendOrderConfirmation } from "@/domains/notification";
import { auth } from "@/infra/auth";
import { createScopedLogger } from "@/infra/logging/logger";
import type { ActionResult } from "@/types/common";

const logger = createScopedLogger({ module: "actions.emails" });

/**
 * Server action to resend order confirmation email
 *
 * This action:
 * 1. Validates user authentication
 * 2. Fetches order details and verifies ownership
 * 3. Checks order status is CONFIRMED
 * 4. Transforms data and sends email via service layer
 *
 * @param orderId - The ID of the order to resend confirmation for
 * @returns ActionResult indicating success or failure
 *
 * @example
 * ```typescript
 * const result = await resendOrderConfirmationAction(orderId);
 * if (result.success) {
 *   toast.success("确认邮件已重新发送");
 * } else {
 *   toast.error(result.error);
 * }
 * ```
 */
export async function resendOrderConfirmationAction(
  orderId: string
): Promise<ActionResult<void>> {
  let session:
    | {
        user: { id: string; email: string | null; name: string | null };
      }
    | null
    | undefined;
  try {
    const headersList = await headers();
    session = await auth.api.getSession({ headers: headersList });

    if (!session?.user?.id) {
      return {
        success: false as const,
        error: "需要登录才能重新发送订单确认邮件",
      };
    }

    const result = await resendOrderConfirmation({
      orderId,
      userId: session.user.id,
      userEmail: session.user.email,
      userName: session.user.name,
    });

    if (!result.success) {
      return {
        success: false as const,
        error: result.error || "邮件发送失败，请稍后重试",
      };
    }

    return {
      success: true as const,
      data: undefined,
    };
  } catch (error) {
    logger.error(
      { err: error, orderId, userId: session?.user?.id },
      "[resendOrderConfirmationAction] Error"
    );

    return {
      success: false as const,
      error:
        error instanceof Error
          ? error.message
          : "重新发送订单确认邮件时发生错误，请稍后重试",
    };
  }
}
