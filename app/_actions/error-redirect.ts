"use server";

import { redirect } from "next/navigation";

import { getErrorUrl } from "@/lib/error-redirect";

/**
 * Redirects to the error page with specified error type and optional custom message
 *
 * @param type - Predefined error type from ERROR_CONFIGS
 * @param customMessage - Optional custom error message to override default
 * @param customTitle - Optional custom error title to override default
 */
export async function redirectToError(
  type: string,
  customMessage?: string,
  customTitle?: string
): Promise<never> {
  const errorUrl = getErrorUrl(type, customMessage, customTitle);
  redirect(errorUrl);
}
