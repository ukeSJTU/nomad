/**
 * Next.js Instrumentation Hook
 *
 * This file runs once when the Next.js server starts (both dev and production).
 * Used to initialize monitoring, logging, or background tasks.
 *
 * @see https://nextjs.org/docs/15/app/guides/instrumentation
 */

export async function register() {
  // Only run in development mode
  if (process.env.NODE_ENV === "development") {
    // Only run on server (not in edge runtime)
    if (process.env.NEXT_RUNTIME === "nodejs") {
      const { startOrderCancellationTask } = await import("@/infra/background");
      startOrderCancellationTask();
    }
  }
}
