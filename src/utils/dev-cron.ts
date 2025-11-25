/**
 * Development Mode Cron Job Simulator
 *
 * This module provides automatic background task execution in development mode
 * to simulate production cron job behavior. It automatically cancels expired
 * orders without requiring external cron services.
 */

import { cancelExpiredOrders } from "@/lib/services/orders";
import logger from "@/utils/logger";

let orderCancellationInterval: NodeJS.Timeout | null = null;
let isTaskRunning = false;

/**
 * Signal handler for graceful shutdown
 */
function handleShutdown() {
  stopOrderCancellationTask();
}

/**
 * Start the automatic order cancellation task
 *
 * This function:
 * 1. Performs an immediate check for expired orders
 * 2. Sets up a 60-second interval for subsequent checks
 * 3. Logs all cancellation activities for debugging
 *
 * Should only be called in development mode.
 */
export function startOrderCancellationTask() {
  // Prevent multiple instances
  if (isTaskRunning) {
    return;
  }

  isTaskRunning = true;

  logger.info("[Dev Cron] Starting automatic order cancellation task");
  logger.info("[Dev Cron] Checking for expired orders every 60 seconds");

  // Initial check
  checkAndCancelOrders();

  // Set up interval for subsequent checks
  orderCancellationInterval = setInterval(() => {
    checkAndCancelOrders();
  }, 60000); // 60 seconds

  // Cleanup on process termination (register handlers only once)
  process.once("SIGTERM", handleShutdown);
  process.once("SIGINT", handleShutdown);
}

/**
 * Stop the automatic order cancellation task and clean up resources
 */
export function stopOrderCancellationTask() {
  if (orderCancellationInterval) {
    clearInterval(orderCancellationInterval);
    orderCancellationInterval = null;
    isTaskRunning = false;
    logger.info("[Dev Cron] Stopped automatic order cancellation task");

    // Remove signal handlers
    process.removeListener("SIGTERM", handleShutdown);
    process.removeListener("SIGINT", handleShutdown);
  }
}

/**
 * Check for and cancel expired orders
 *
 * This function wraps the cancelExpiredOrders service function
 * and provides appropriate logging for development debugging.
 */
async function checkAndCancelOrders() {
  try {
    const result = await cancelExpiredOrders();

    if (result.success && result.data) {
      const { cancelledCount, releasedSeats } = result.data;

      if (cancelledCount > 0) {
        logger.info(
          {
            cancelledCount,
            releasedSeats,
          },
          `[Dev Cron] Cancelled ${cancelledCount} expired order(s), released ${releasedSeats} seat(s)`
        );
      }
    } else if (!result.success) {
      logger.error(
        { error: result.error },
        "[Dev Cron] Failed to cancel expired orders"
      );
    }
  } catch (error) {
    logger.error({ err: error }, "[Dev Cron] Error cancelling expired orders");
  }
}
