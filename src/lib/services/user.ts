import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { user } from "@/lib/schema";
import type { UserInfoUpdateData } from "@/types/user";

import type { ServiceResult } from "./types";

/**
 * Service layer for user-related business logic
 *
 * This layer contains pure business logic without framework dependencies,
 * making it easy to test and reuse in different contexts.
 */

/**
 * Update user profile information
 *
 * This function contains the core business logic for updating user info.
 * It performs the following:
 * 1. Builds update object dynamically (only includes provided fields)
 * 2. Handles empty strings by converting to null (except for required fields)
 * 3. Updates the database
 *
 * @param userId - The ID of the user to update
 * @param data - Validated user info data (all fields optional)
 * @returns Result object with success status and message/error
 */
export async function updateUserInfo(
  userId: string,
  data: UserInfoUpdateData
): Promise<ServiceResult> {
  try {
    const { nickname, name, gender, birthday } = data;

    // Build update object dynamically (only include provided fields)
    const updateData: {
      nickname?: string | null;
      name?: string;
      gender?: "male" | "female" | "other" | null;
      birthday?: string | null;
      updatedAt: Date;
    } = {
      updatedAt: new Date(),
    };

    // Only add fields that are provided (not undefined)
    if (nickname !== undefined) {
      updateData.nickname = nickname === "" ? null : nickname;
    }
    // name is required in DB, so only update if a non-empty value is provided
    if (name !== undefined && name !== "") {
      updateData.name = name;
    }
    if (gender !== undefined) {
      updateData.gender = gender;
    }
    if (birthday !== undefined) {
      updateData.birthday = birthday === "" ? null : birthday;
    }

    // Update database
    await db.update(user).set(updateData).where(eq(user.id, userId));

    return {
      success: true,
      message: "User information updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to update user information",
    };
  }
}
