import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { user } from "@/lib/schema";
import { maskEmail, maskPhoneNumber } from "@/utils/mask-data";

/**
 * User info data structure for frontend display
 */
export interface UserInfo {
  id: string;
  name: string;
  nickname: string | null;
  email: string;
  emailVerified: boolean;
  phoneNumber: string | null;
  phoneNumberVerified: boolean;
  gender: "male" | "female" | "other" | null;
  birthday: string | null;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * Get user information by user ID
 *
 * This function fetches user data from the database and applies
 * data masking for sensitive fields (phone, email).
 *
 * @param userId - The ID of the user to fetch
 * @returns User info with masked sensitive data, or null if user not found
 */
export async function getUserInfo(userId: string): Promise<UserInfo | null> {
  const [result] = await db.select().from(user).where(eq(user.id, userId));

  if (!result) {
    return null;
  }

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
