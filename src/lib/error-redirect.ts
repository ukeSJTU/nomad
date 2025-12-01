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
