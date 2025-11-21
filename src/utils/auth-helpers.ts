import { headers } from "next/headers";

import { auth } from "@/lib/auth";

/**
 * Result type for authentication operations
 */
export interface AuthResult {
  success: boolean;
  userId?: string;
  error?: string;
}

/**
 * Get authenticated user ID from the current session
 *
 * This is a reusable helper function that extracts the common authentication
 * pattern used across all Server Actions. It handles:
 * - Getting headers
 * - Fetching session
 * - Validating user ID exists
 *
 * @returns AuthResult with userId if authenticated, or error if not
 *
 * @example
 * ```ts
 * const authResult = await getAuthenticatedUserId();
 * if (!authResult.success || !authResult.userId) {
 *   return { success: false, error: authResult.error };
 * }
 * const userId = authResult.userId;
 * ```
 */
export async function getAuthenticatedUserId(): Promise<AuthResult> {
  try {
    const headersList = await headers();
    const session = await auth.api.getSession({
      headers: headersList,
    });

    if (!session?.user?.id) {
      return {
        success: false,
        error: "Authentication required. Please log in first.",
      };
    }

    return {
      success: true,
      userId: session.user.id,
    };
  } catch (error) {
    console.error("Authentication error:", error);
    return {
      success: false,
      error: "Failed to verify authentication. Please try again.",
    };
  }
}

/**
 * Get authenticated user ID or throw an error
 *
 * This is a stricter version that throws an error if authentication fails.
 * Useful for actions that should redirect or fail hard on auth failure.
 *
 * @throws Error if user is not authenticated
 * @returns The authenticated user ID
 *
 * @example
 * ```ts
 * try {
 *   const userId = await requireAuthenticatedUserId();
 *   // Use userId...
 * } catch (error) {
 *   redirect("/auth/sign-in");
 * }
 * ```
 */
export async function requireAuthenticatedUserId(): Promise<string> {
  const authResult = await getAuthenticatedUserId();

  if (!authResult.success || !authResult.userId) {
    throw new Error(authResult.error || "Authentication required");
  }

  return authResult.userId;
}
