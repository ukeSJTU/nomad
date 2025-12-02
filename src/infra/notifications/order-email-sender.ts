/**
 * Service layer for email-related business logic
 *
 * This layer contains pure business logic without framework dependencies (no Next.js runtime),
 * making it easy to test and reuse in different contexts (user actions, admin operations, cron jobs, etc.).
 */

import "server-only";

import { sendOrderConfirmationEmail as sendEmailViaClient } from "@/infra/communications";
import { createScopedLogger } from "@/infra/logging/logger";
import type { OrderConfirmationEmailData } from "@/types/dto";
import type { ServiceResult } from "@/types/result";

const logger = createScopedLogger({ module: "order-email-sender" });

/**
 * Send order confirmation email
 *
 * This service function sends an order confirmation email to the user.
 * It wraps the email client call with proper error handling and logging.
 *
 * @param emailData - Order confirmation email data
 * @returns ServiceResult indicating success or failure
 *
 * @example
 * ```typescript
 * const result = await sendOrderConfirmationEmail(emailData);
 * if (result.success) {
 *   logger.info("Email sent successfully");
 * } else {
 *   logger.error({ err: result.error }, "Failed to send email");
 * }
 * ```
 */
export async function sendOrderConfirmationEmail(
  emailData: OrderConfirmationEmailData
): Promise<ServiceResult<void>> {
  try {
    logger.info(
      {
        orderNumber: emailData.orderNumber,
        email: emailData.user.email,
      },
      "[Email Service] Sending order confirmation email"
    );

    // Send email via client
    const success = await sendEmailViaClient(emailData);

    if (!success) {
      logger.error(
        { orderNumber: emailData.orderNumber },
        "[Email Service] Failed to send order confirmation email"
      );
      return {
        success: false,
        error: "邮件发送失败，请稍后重试",
      };
    }

    logger.info(
      { orderNumber: emailData.orderNumber },
      "[Email Service] Order confirmation email sent successfully"
    );

    return {
      success: true,
      message: "订单确认邮件已发送",
    };
  } catch (error) {
    logger.error(
      { err: error, orderNumber: emailData.orderNumber },
      "[Email Service] Error sending order confirmation email"
    );

    return {
      success: false,
      error:
        error instanceof Error ? error.message : "邮件发送过程中发生未知错误",
    };
  }
}
