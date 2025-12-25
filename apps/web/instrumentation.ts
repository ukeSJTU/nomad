/**
 * Next.js Instrumentation Hook
 *
 * This file runs once when the Next.js server starts (both dev and production).
 * Used to initialize monitoring, logging, or background tasks.
 *
 * @see https://nextjs.org/docs/15/app/guides/instrumentation
 */

import { isDevelopment } from "@/config/env";

export async function register() {
  if (isDevelopment()) {
    if (process.env.NEXT_RUNTIME === "nodejs") {
      const { startOrderCancellationTask } = await import("@/infra/background");
      startOrderCancellationTask();
    }
  }
}
