import { redirect } from "next/navigation";

/**
 * Redirects to the error page with specified error type and optional custom message
 *
 * @param type - Predefined error type from ERROR_CONFIGS
 * @param customMessage - Optional custom error message to override default
 * @param customTitle - Optional custom error title to override default
 *
 * @example
 * ```ts
 * // Use predefined error
 * redirectToError("missing_flight");
 *
 * // Use predefined error with custom message
 * redirectToError("flight_not_found", "航班 CA1234 已取消");
 *
 * // Use custom error (fallback to default config)
 * redirectToError("custom_error", "自定义错误信息", "自定义标题");
 * ```
 */
export function redirectToError(
  type: string,
  customMessage?: string,
  customTitle?: string
): never {
  const params = new URLSearchParams({ type });

  if (customMessage) {
    params.append("message", customMessage);
  }

  if (customTitle) {
    params.append("title", customTitle);
  }

  redirect(`/error?${params.toString()}`);
}

/**
 * Creates an error page URL with specified parameters
 * Useful for Link components or client-side navigation
 *
 * @param type - Predefined error type from ERROR_CONFIGS
 * @param customMessage - Optional custom error message
 * @param customTitle - Optional custom error title
 * @returns URL string for the error page
 *
 * @example
 * ```tsx
 * <Link href={getErrorUrl("unauthorized")}>View Error</Link>
 * ```
 */
export function getErrorUrl(
  type: string,
  customMessage?: string,
  customTitle?: string
): string {
  const params = new URLSearchParams({ type });

  if (customMessage) {
    params.append("message", customMessage);
  }

  if (customTitle) {
    params.append("title", customTitle);
  }

  return `/error?${params.toString()}`;
}
