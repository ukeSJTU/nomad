/**
 * Next.js Instrumentation Hook
 *
 * This file runs once when the Next.js server starts (both dev and production).
 * Used to initialize monitoring, logging, or background tasks.
 *
 * @see https://nextjs.org/docs/15/app/guides/instrumentation
 */

import { env } from "@/config/env";

export async function register() {
  if (env.NODE_ENV === "development") {
    // Only run on server (not in edge runtime)
    if (env.NEXT_RUNTIME === "nodejs") {
      const { startOrderCancellationTask } = await import("@/infra/background");
      startOrderCancellationTask();
    }
  }
}
