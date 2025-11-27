import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/domains/auth";

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
 * Require authentication and redirect to sign-in page if not authenticated
 *
 * This is designed for Server Components that need to protect pages.
 * It automatically redirects to the sign-in page if the user is not authenticated.
 *
 * @param redirectTo - Optional path to redirect back to after login
 * @returns The authenticated user ID
 *
 * @example
 * ```ts
 * // In a Server Component
 * const userId = await requireAuth();
 * // User is guaranteed to be authenticated here
 * ```
 *
 * @example
 * ```ts
 * // With redirect back to current page after login
 * const userId = await requireAuth("/home/passengers");
 * ```
 */
export async function requireAuth(redirectTo?: string): Promise<string> {
  const authResult = await getAuthenticatedUserId();

  if (!authResult.success || !authResult.userId) {
    const loginUrl = redirectTo
      ? `/auth/sign-in?redirect=${encodeURIComponent(redirectTo)}`
      : "/auth/sign-in";
    redirect(loginUrl);
  }

  return authResult.userId;
}
