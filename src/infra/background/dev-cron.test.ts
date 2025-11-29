import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { cancelExpiredOrders } from "@/domains/booking/orders.service";
import { logger } from "@/infra/logging";

import {
  startOrderCancellationTask,
  stopOrderCancellationTask,
} from "./dev-cron";

// Mock dependencies
vi.mock("@/domains/booking/orders.service", () => ({
  cancelExpiredOrders: vi.fn(),
}));

vi.mock("@/infra/logging", () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
    debug: vi.fn(),
    warn: vi.fn(),
  },
}));

describe("Development Cron Job Simulator", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.clearAllTimers();
    vi.useFakeTimers();

    // Default successful response
    vi.mocked(cancelExpiredOrders).mockResolvedValue({
      success: true,
      data: {
        cancelledCount: 0,
        releasedSeats: 0,
      },
    });
  });

  afterEach(() => {
    stopOrderCancellationTask();
    vi.useRealTimers();
  });

  describe("startOrderCancellationTask", () => {
    it("should log startup messages", () => {
      startOrderCancellationTask();

      expect(logger.info).toHaveBeenCalledWith(
        "[Dev Cron] Starting automatic order cancellation task"
      );
      expect(logger.info).toHaveBeenCalledWith(
        "[Dev Cron] Checking for expired orders every 60 seconds"
      );
    });

    it("should perform initial check immediately", () => {
      startOrderCancellationTask();

      expect(cancelExpiredOrders).toHaveBeenCalledTimes(1);
    });

    it("should check for expired orders every 60 seconds", async () => {
      startOrderCancellationTask();

      // Initial call
      expect(cancelExpiredOrders).toHaveBeenCalledTimes(1);

      // Fast-forward 60 seconds
      await vi.advanceTimersByTimeAsync(60000);
      expect(cancelExpiredOrders).toHaveBeenCalledTimes(2);

      // Fast-forward another 60 seconds
      await vi.advanceTimersByTimeAsync(60000);
      expect(cancelExpiredOrders).toHaveBeenCalledTimes(3);

      // Fast-forward 180 seconds (3 intervals)
      await vi.advanceTimersByTimeAsync(180000);
      expect(cancelExpiredOrders).toHaveBeenCalledTimes(6);
    });

    it("should log when orders are cancelled", async () => {
      vi.mocked(cancelExpiredOrders).mockResolvedValue({
        success: true,
        data: {
          cancelledCount: 5,
          releasedSeats: 10,
        },
      });

      startOrderCancellationTask();
      await vi.runOnlyPendingTimersAsync(); // Wait for initial check only

      expect(logger.info).toHaveBeenCalledWith(
        {
          cancelledCount: 5,
          releasedSeats: 10,
        },
        "[Dev Cron] Cancelled 5 expired order(s), released 10 seat(s)"
      );
    });

    it("should not log when no orders are cancelled", async () => {
      vi.mocked(cancelExpiredOrders).mockResolvedValue({
        success: true,
        data: {
          cancelledCount: 0,
          releasedSeats: 0,
        },
      });

      startOrderCancellationTask();
      await vi.runOnlyPendingTimersAsync();

      // Should only have the startup logs, not the cancellation log
      expect(logger.info).toHaveBeenCalledTimes(2);
    });

    it("should log error when cancellation fails", async () => {
      vi.mocked(cancelExpiredOrders).mockResolvedValue({
        success: false,
        error: "Database connection failed",
      });

      startOrderCancellationTask();
      await vi.runOnlyPendingTimersAsync();

      expect(logger.error).toHaveBeenCalledWith(
        { error: "Database connection failed" },
        "[Dev Cron] Failed to cancel expired orders"
      );
    });

    it("should handle exceptions during cancellation", async () => {
      const error = new Error("Unexpected error");
      vi.mocked(cancelExpiredOrders).mockRejectedValue(error);

      startOrderCancellationTask();
      await vi.runOnlyPendingTimersAsync();

      expect(logger.error).toHaveBeenCalledWith(
        { err: error },
        "[Dev Cron] Error cancelling expired orders"
      );
    });

    it("should continue running after errors", async () => {
      // First call fails, second succeeds
      vi.mocked(cancelExpiredOrders)
        .mockRejectedValueOnce(new Error("First error"))
        .mockResolvedValue({
          success: true,
          data: { cancelledCount: 2, releasedSeats: 4 },
        });

      startOrderCancellationTask();

      // Flush microtasks for initial call
      await vi.advanceTimersByTimeAsync(0);

      // Verify first call failed
      expect(logger.error).toHaveBeenCalledWith(
        { err: expect.any(Error) },
        "[Dev Cron] Error cancelling expired orders"
      );

      // Advance to next interval
      await vi.advanceTimersByTimeAsync(60000);

      // Should have been called again and succeeded
      expect(logger.info).toHaveBeenCalledWith(
        { cancelledCount: 2, releasedSeats: 4 },
        expect.stringContaining("Cancelled 2 expired order")
      );
    });
  });

  describe("stopOrderCancellationTask", () => {
    it("should stop the interval timer", async () => {
      startOrderCancellationTask();
      expect(cancelExpiredOrders).toHaveBeenCalledTimes(1);

      stopOrderCancellationTask();

      // Advance time - should not trigger more calls
      await vi.advanceTimersByTimeAsync(120000);
      expect(cancelExpiredOrders).toHaveBeenCalledTimes(1);
    });

    it("should log stop message", () => {
      startOrderCancellationTask();
      vi.clearAllMocks();

      stopOrderCancellationTask();

      expect(logger.info).toHaveBeenCalledWith(
        "[Dev Cron] Stopped automatic order cancellation task"
      );
    });

    it("should be safe to call multiple times", () => {
      startOrderCancellationTask();

      stopOrderCancellationTask();
      stopOrderCancellationTask();
      stopOrderCancellationTask();

      // Should only log once (after first stop)
      expect(logger.info).toHaveBeenCalledWith(
        "[Dev Cron] Stopped automatic order cancellation task"
      );
    });

    it("should be safe to call without starting", () => {
      expect(() => stopOrderCancellationTask()).not.toThrow();
    });
  });

  describe("Process signal handlers", () => {
    it("should stop task on SIGTERM", async () => {
      startOrderCancellationTask();

      // Simulate SIGTERM
      process.emit("SIGTERM");

      await vi.advanceTimersByTimeAsync(60000);

      // Should only have initial call, no subsequent calls
      expect(cancelExpiredOrders).toHaveBeenCalledTimes(1);
    });

    it("should stop task on SIGINT", async () => {
      startOrderCancellationTask();

      // Simulate SIGINT (Ctrl+C)
      process.emit("SIGINT");

      await vi.advanceTimersByTimeAsync(60000);

      expect(cancelExpiredOrders).toHaveBeenCalledTimes(1);
    });
  });

  describe("Integration scenarios", () => {
    it("should handle multiple start/stop cycles", async () => {
      // First cycle
      startOrderCancellationTask();
      await vi.advanceTimersByTimeAsync(60000);
      stopOrderCancellationTask();

      const firstCallCount = vi.mocked(cancelExpiredOrders).mock.calls.length;

      // Second cycle
      startOrderCancellationTask();
      await vi.advanceTimersByTimeAsync(60000);
      stopOrderCancellationTask();

      // Should have additional calls from second cycle
      expect(cancelExpiredOrders).toHaveBeenCalledTimes(firstCallCount + 2);
    });

    it("should handle varying cancellation results over time", async () => {
      vi.mocked(cancelExpiredOrders)
        .mockResolvedValueOnce({
          success: true,
          data: { cancelledCount: 3, releasedSeats: 6 },
        })
        .mockResolvedValueOnce({
          success: true,
          data: { cancelledCount: 0, releasedSeats: 0 },
        })
        .mockResolvedValueOnce({
          success: true,
          data: { cancelledCount: 1, releasedSeats: 2 },
        });

      startOrderCancellationTask();
      await vi.runOnlyPendingTimersAsync();

      await vi.advanceTimersByTimeAsync(60000);
      await vi.advanceTimersByTimeAsync(60000);

      // Check logs for different scenarios
      expect(logger.info).toHaveBeenCalledWith(
        { cancelledCount: 3, releasedSeats: 6 },
        expect.any(String)
      );
      expect(logger.info).toHaveBeenCalledWith(
        { cancelledCount: 1, releasedSeats: 2 },
        expect.any(String)
      );
    });
  });
});
