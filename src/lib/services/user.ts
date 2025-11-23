import { eq, sql } from "drizzle-orm";

import { db } from "@/lib/db";
import { user } from "@/lib/schema";
import type { UserInfoUpdateData } from "@/types/validations";

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

/**
 * Recharge user balance
 *
 * This function handles the recharge operation:
 * 1. Validates the amount is within allowed range (1-10000)
 * 2. Updates user balance using atomic SQL operation within a transaction
 * 3. Returns the new balance after recharge
 *
 * @param userId - The ID of the user to recharge
 * @param amount - Amount to recharge (must be between 1-10000)
 * @returns Result object with success status, new balance or error
 */
export async function rechargeBalance(
  userId: string,
  amount: number
): Promise<ServiceResult<{ newBalance: string }>> {
  try {
    // Validation is already done in the action layer via Zod schema
    // But we add an extra check here for safety
    if (amount < 1 || amount > 10000) {
      return {
        success: false,
        error: "充值金额必须在 1 到 10000 元之间",
      };
    }

    // Ensure amount has at most 2 decimal places
    const validAmount = Math.round(amount * 100) / 100;

    // Use transaction for financial operations
    const result = await db.transaction(async tx => {
      // First, verify user exists
      const existingUser = await tx
        .select({ id: user.id })
        .from(user)
        .where(eq(user.id, userId))
        .limit(1);

      if (!existingUser || existingUser.length === 0) {
        throw new Error("用户不存在");
      }

      // Use atomic SQL operation to update balance
      // This prevents race conditions when multiple recharges happen simultaneously
      const updated = await tx
        .update(user)
        .set({
          balance: sql`CAST(${user.balance} AS DECIMAL(10,2)) + ${validAmount}`,
          updatedAt: new Date(),
        })
        .where(eq(user.id, userId))
        .returning({ balance: user.balance });

      return updated[0];
    });

    if (!result) {
      return {
        success: false,
        error: "充值失败",
      };
    }

    return {
      success: true,
      message: "充值成功",
      data: {
        newBalance: result.balance,
      },
    };
  } catch (error) {
    console.error("Recharge balance error:", error);

    // Handle specific error cases
    if (error instanceof Error && error.message === "用户不存在") {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : "充值失败，请稍后重试",
    };
  }
}
