import { eq, sql } from "drizzle-orm";

import { db } from "@/orm/db";
import { account, user } from "@/orm/schema";
import type { UserInfo, UserSecurityStatus } from "@/types/dto";
import { maskEmail, maskPhoneNumber } from "@/utils/mask-data";

import { type DbExecutor, runInTransaction } from "./transaction";

export type UserRow = typeof user.$inferSelect;
type UserInsert = typeof user.$inferInsert;

/**
 * Get user information by user ID
 *
 * This function fetches user data from the database and applies
 * data masking for sensitive fields (phone, email).
 *
 * @param userId - The ID of the user to fetch
 * @returns User info with masked sensitive data, or null if user not found
 */
export async function getUserInfo(
  userId: string,
  dbClient: DbExecutor = db
): Promise<UserInfo> {
  const [result] = await dbClient
    .select()
    .from(user)
    .where(eq(user.id, userId));

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
  userId: string,
  dbClient: DbExecutor = db
): Promise<UserSecurityStatus> {
  // Fetch user data
  const [userData] = await dbClient
    .select()
    .from(user)
    .where(eq(user.id, userId));

  // Check if user has a password by querying account table for credential provider
  const credentialAccounts = await dbClient
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

/**
 * Get user balance
 *
 * This function fetches the user's current balance from the database.
 *
 * @param userId - The ID of the user to fetch
 * @returns User balance as a string (e.g., "10000.00"), or "0.00" if user not found
 */
export async function getUserBalance(
  userId: string,
  dbClient: DbExecutor = db
): Promise<string> {
  const [userData] = await dbClient
    .select({
      balance: user.balance,
    })
    .from(user)
    .where(eq(user.id, userId));

  return userData?.balance ?? "0.00";
}

export async function getUserById(
  userId: string,
  dbClient: DbExecutor = db
): Promise<UserRow | undefined> {
  const [result] = await dbClient
    .select()
    .from(user)
    .where(eq(user.id, userId));
  return result;
}

export async function updateUserProfile(
  userId: string,
  updateData: Partial<UserInsert>,
  dbClient: DbExecutor = db
): Promise<void> {
  await dbClient.update(user).set(updateData).where(eq(user.id, userId));
}

export async function updateUserPhoneNumber(
  userId: string,
  phoneNumber: string,
  dbClient: DbExecutor = db
): Promise<void> {
  await dbClient
    .update(user)
    .set({
      phoneNumber,
      phoneNumberVerified: true,
    })
    .where(eq(user.id, userId));
}

export async function updateUserEmail(
  userId: string,
  email: string,
  dbClient: DbExecutor = db
): Promise<void> {
  await dbClient
    .update(user)
    .set({
      email,
      emailVerified: true,
    })
    .where(eq(user.id, userId));
}

export async function rechargeUserBalance(
  userId: string,
  amount: number
): Promise<string | null> {
  return runInTransaction(async tx => {
    const existingUser = await getUserById(userId, tx);

    if (!existingUser) {
      return null;
    }

    const [updated] = await tx
      .update(user)
      .set({
        balance: sql`CAST(${user.balance} AS DECIMAL(10,2)) + ${amount}`,
        updatedAt: new Date(),
      })
      .where(eq(user.id, userId))
      .returning({ balance: user.balance });

    return updated?.balance ?? null;
  });
}
