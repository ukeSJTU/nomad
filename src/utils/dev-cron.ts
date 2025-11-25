/**
 * Development Mode Cron Job Simulator
 *
 * This module provides automatic background task execution in development mode
 * to simulate production cron job behavior. It automatically cancels expired
 * orders without requiring external cron services.
 */

import { cancelExpiredOrders } from "@/lib/services/orders";
import logger from "@/utils/logger";

let orderCancellationTimer: NodeJS.Timeout | null = null;
let isTaskRunning = false;

const CRON_INTERVAL_MS = 60 * 1000; // 60 seconds

/**
 * Signal handler for graceful shutdown
 */
function handleShutdown() {
  stopOrderCancellationTask();
}

/**
 * Run the order cancellation task and schedule the next execution
 *
 * This function ensures that tasks are executed serially (never concurrently)
 * by waiting for the current task to complete before scheduling the next one.
 */
async function runOrderCancellationTask() {
  // checkAndCancelOrders has its own try/catch, so we don't need another one here
  await checkAndCancelOrders();

  // If the task is still running, schedule the next execution
  if (isTaskRunning) {
    orderCancellationTimer = setTimeout(
      runOrderCancellationTask,
      CRON_INTERVAL_MS
    );
  }
}

/**
 * Start the automatic order cancellation task
 *
 * This function:
 * 1. Performs an immediate check for expired orders
 * 2. Sets up a recurring task for subsequent checks
 * 3. Logs all cancellation activities for debugging
 *
 * Uses recursive setTimeout instead of setInterval to ensure tasks
 * never run concurrently, preventing race conditions.
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
  logger.info(
    `[Dev Cron] Checking for expired orders every ${CRON_INTERVAL_MS / 1000} seconds`
  );

  // Start the first execution (subsequent runs are scheduled inside the runner)
  runOrderCancellationTask();

  // Cleanup on process termination
  process.once("SIGTERM", handleShutdown);
  process.once("SIGINT", handleShutdown);
}

/**
 * Stop the automatic order cancellation task and clean up resources
 */
export function stopOrderCancellationTask() {
  if (!isTaskRunning) {
    return;
  }

  isTaskRunning = false;

  if (orderCancellationTimer) {
    clearTimeout(orderCancellationTimer);
    orderCancellationTimer = null;
  }

  logger.info("[Dev Cron] Stopped automatic order cancellation task");

  // Remove signal handlers
  process.removeListener("SIGTERM", handleShutdown);
  process.removeListener("SIGINT", handleShutdown);
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
