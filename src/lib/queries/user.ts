import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { account, user } from "@/lib/schema";
import type { UserInfo, UserSecurityStatus } from "@/types/dto";
import { maskEmail, maskPhoneNumber } from "@/utils/mask-data";

/**
 * Get user information by user ID
 *
 * This function fetches user data from the database and applies
 * data masking for sensitive fields (phone, email).
 *
 * @param userId - The ID of the user to fetch
 * @returns User info with masked sensitive data, or null if user not found
 */
export async function getUserInfo(userId: string): Promise<UserInfo> {
  const [result] = await db.select().from(user).where(eq(user.id, userId));

  // Apply data masking for sensitive fields
  const maskedEmail = maskEmail(result.email);
  const maskedPhone = result.phoneNumber
    ? maskPhoneNumber(result.phoneNumber)
    : null;

  // Convert database result to API format
  return {
    id: result.id,
    name: result.name,
    nickname: result.nickname,
    email: maskedEmail,
    emailVerified: result.emailVerified,
    phoneNumber: maskedPhone,
    phoneNumberVerified: result.phoneNumberVerified ?? false,
    gender: result.gender,
    birthday: result.birthday,
    image: result.image,
    createdAt: result.createdAt.toISOString(),
    updatedAt: result.updatedAt.toISOString(),
  };
}

/**
 * Get user security status by user ID
 *
 * This function fetches user security-related data including:
 * - Whether the user has set a password (by checking account table)
 * - Email and verification status
 * - Phone number and verification status
 *
 * Data is masked for security.
 *
 * @param userId - The ID of the user to fetch
 * @returns User security status with masked sensitive data, or null if user not found
 */
export async function getUserSecurityStatus(
  userId: string
): Promise<UserSecurityStatus> {
  // Fetch user data
  const [userData] = await db.select().from(user).where(eq(user.id, userId));

  // Check if user has a password by querying account table for credential provider
  const credentialAccounts = await db
    .select()
    .from(account)
    .where(eq(account.userId, userId));

  const hasPassword = credentialAccounts.some(
    acc => acc.providerId === "credential"
  );

  // Apply data masking for sensitive fields
  const maskedEmail = maskEmail(userData.email);
  const maskedPhone = userData.phoneNumber
    ? maskPhoneNumber(userData.phoneNumber)
    : null;

  return {
    hasPassword,
    email: maskedEmail,
    emailVerified: userData.emailVerified,
    phoneNumber: maskedPhone,
    phoneNumberVerified: userData.phoneNumberVerified ?? false,
  };
}
