import { cancelExpiredOrders } from "@/lib/services/orders";
import {
  createUnauthorizedResponse,
  verifyCronSecret,
} from "@/lib/utils/cron-auth";

/**
 * Cron Job: Cancel Expired Orders
 *
 * This API endpoint is designed to be called by an external cron service
 * (e.g., cron-job.org) to automatically cancel orders that have exceeded
 * their payment deadline.
 *
 * Authentication:
 * - Requires Bearer token authentication via CRON_SECRET environment variable
 * - Request must include: Authorization: Bearer <CRON_SECRET>
 *
 * Functionality:
 * - Cancels all orders with status PENDING_PAYMENT and paymentDeadline < now
 * - Releases locked seats back to available inventory
 * - Updates order status to CANCELLED
 *
 * @returns JSON response with cancellation statistics
 */
export async function POST(request: Request) {
  // 1. Verify authentication
  if (!verifyCronSecret(request)) {
    return createUnauthorizedResponse();
  }

  try {
    // 2. Execute business logic
    const result = await cancelExpiredOrders();

    // 3. Return success response
    if (result.success) {
      return Response.json(
        {
          success: true,
          data: result.data,
          message: result.message,
        },
        { status: 200 }
      );
    } else {
      // Business logic error (e.g., database error)
      return Response.json(
        {
          success: false,
          error: result.error,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    // Unexpected error
    console.error("Unexpected error in cancel-expired-orders cron:", error);

    return Response.json(
      {
        success: false,
        error: "Internal server error",
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}
