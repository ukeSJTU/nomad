/**
 * Next.js Instrumentation Hook
 *
 * This file runs once when the Next.js server starts (both dev and production).
 * Used to initialize monitoring, logging, or background tasks.
 *
 * @see https://nextjs.org/docs/15/app/guides/instrumentation
 */

export async function register() {
  // Use direct process.env access instead of config/env to avoid
  // environment validation during build time
  const isDevelopment = process.env.NODE_ENV === "development";

  if (isDevelopment) {
    if (process.env.NEXT_RUNTIME === "nodejs") {
      const { startOrderCancellationTask } = await import("@/infra/background");
      startOrderCancellationTask();
    }
  }
}
