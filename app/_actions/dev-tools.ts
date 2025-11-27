"use server";

import { headers } from "next/headers";

import {
  type DevUser,
  listDevUsers,
  switchUser as switchUserService,
} from "@/services/dev-tools/dev-users.service";

// ============================================================================
export type DevUserListResult =
  | { success: true; users: DevUser[] }
  | { success: false; error: string };

export type SwitchUserResult =
  | { success: true }
  | { success: false; error: string };

// ============================================================================
// Server Actions
// ============================================================================

/**
 * Get all users (dev only)
 */
export async function getAllUsersForDevAction(): Promise<DevUserListResult> {
  const result = await listDevUsers();

  if (!result.success || !result.data) {
    return { success: false, error: result.error || "Failed to fetch users" };
  }

  return { success: true, users: result.data };
}

/**
 * Switch to specified user (dev only)
 *
 * Implementation approach:
 * Since passwords are randomly generated and not guaranteed to be present,
 * we use the email OTP flow:
 * 1. Query the database to get the email of given userId
 * 2. Send email OTP using Better Auth's sendVerificationOTP API
 * 3. Retrieve the verification code from the database
 * 4. Sign in with the email and verification OTP code
 */
export async function switchUserAction(
  userId: string
): Promise<SwitchUserResult> {
  const headersList = await headers();
  const result = await switchUserService({
    userId,
    headers: headersList,
  });

  if (!result.success) {
    return { success: false, error: result.error || "Failed to switch user" };
  }

  return { success: true };
}
