/**
 * Cron Authentication Utilities
 *
 * This module provides authentication utilities for cron job endpoints.
 * It uses Bearer token authentication with a secret stored in environment variables.
 *
 * Security:
 * - CRON_SECRET must be set in environment variables
 * - Requests must include: Authorization: Bearer <CRON_SECRET>
 * - Returns 401 Unauthorized for invalid/missing tokens
 *
 * Usage:
 * ```typescript
 * export async function POST(request: Request) {
 *   if (!verifyCronSecret(request)) {
 *     return createUnauthorizedResponse();
 *   }
 *   // ... your cron logic
 * }
 * ```
 */

import "server-only";
import { env } from "@/config/env";

/**
 * Verify the cron secret from the request Authorization header
 *
 * @param request - The incoming HTTP request
 * @returns true if the secret is valid, false otherwise
 */
export function verifyCronSecret(request: Request): boolean {
  // Get the Authorization header
  const authHeader = request.headers.get("authorization");

  if (!authHeader) {
    console.warn("Cron auth failed: Missing Authorization header");
    return false;
  }

  // Check if it's a Bearer token
  if (!authHeader.startsWith("Bearer ")) {
    console.warn("Cron auth failed: Invalid Authorization header format");
    return false;
  }

  // Extract the token
  const token = authHeader.substring(7); // Remove "Bearer " prefix

  const expectedSecret = env.CRON_SECRET;

  if (!expectedSecret) {
    console.error(
      "Cron auth failed: CRON_SECRET environment variable is not set"
    );
    return false;
  }

  // Compare tokens (constant-time comparison to prevent timing attacks)
  return timingSafeEqual(token, expectedSecret);
}

/**
 * Create a standardized 401 Unauthorized response
 *
 * @returns Response object with 401 status
 */
export function createUnauthorizedResponse(): Response {
  return Response.json(
    {
      success: false,
      error: "Unauthorized",
      message: "Invalid or missing authentication token",
    },
    {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Bearer realm="Cron Jobs"',
      },
    }
  );
}

/**
 * Timing-safe string comparison to prevent timing attacks
 *
 * @param a - First string to compare
 * @param b - Second string to compare
 * @returns true if strings are equal, false otherwise
 */
function timingSafeEqual(a: string, b: string): boolean {
  // If lengths differ, they're not equal
  if (a.length !== b.length) {
    return false;
  }

  // Use bitwise XOR to compare each character
  // This ensures constant-time comparison regardless of where strings differ
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return result === 0;
}
