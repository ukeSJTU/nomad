"use server";

/**
 * Server actions for email-related operations
 *
 * This module contains server actions for sending emails,
 * including order confirmation emails and resend functionality.
 */

import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { getOrderDetailById } from "@/lib/queries/orders";
import { sendOrderConfirmationEmail } from "@/lib/services/email";
import type { ActionResult } from "@/types/common";
import { transformOrderDetailToEmailData } from "@/utils/email-transformers";

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
  try {
    // 1. Check authentication
    const headersList = await headers();
    const session = await auth.api.getSession({ headers: headersList });

    if (!session?.user?.id) {
      return {
        success: false as const,
        error: "需要登录才能重新发送订单确认邮件",
      };
    }

    // 2. Fetch order details and verify ownership
    const orderDetail = await getOrderDetailById(orderId, session.user.id);

    if (!orderDetail) {
      return {
        success: false as const,
        error: "订单不存在或您没有访问权限",
      };
    }

    // 3. Verify order status is CONFIRMED
    if (orderDetail.status.status !== "CONFIRMED") {
      return {
        success: false as const,
        error: "只有已确认的订单才能重新发送确认邮件",
      };
    }

    // 4. Get user email from session
    if (!session.user.email) {
      return {
        success: false as const,
        error: "用户邮箱信息缺失，无法发送邮件",
      };
    }

    // 5. Transform order detail to email data
    const emailData = transformOrderDetailToEmailData(orderDetail, {
      name: session.user.name ?? undefined,
      email: session.user.email,
    });

    // 6. Send email via service layer
    const result = await sendOrderConfirmationEmail(emailData);

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
    console.error("[resendOrderConfirmationAction] Error:", error);

    return {
      success: false as const,
      error:
        error instanceof Error
          ? error.message
          : "重新发送订单确认邮件时发生错误，请稍后重试",
    };
  }
}
