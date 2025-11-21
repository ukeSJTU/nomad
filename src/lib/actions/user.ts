"use server";

import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { updateUserInfo } from "@/lib/services/user";
import type { ActionResult } from "@/types/common";
import { userInfoUpdateSchema } from "@/types/validations";

/**
 * Update user information action
 *
 * This is a thin controller that:
 * 1. Handles authentication (Next.js specific)
 * 2. Validates input data
 * 3. Calls the service layer for business logic
 * 4. Formats the response
 *
 * All fields are optional - only provided fields will be updated
 *
 * @param data - User information data to update
 * @returns Action result with success status and error if any
 */
export async function updateUserInfoAction(
  data: unknown
): Promise<ActionResult<void>> {
  try {
    // 1. Verify authentication (framework-specific)
    const headersList = await headers();
    const session = await auth.api.getSession({
      headers: headersList,
    });

    if (!session?.user?.id) {
      return {
        success: false,
        error: "需要登录。请先登录。",
      };
    }

    // 2. Validate input data
    const validation = userInfoUpdateSchema.safeParse(data);

    if (!validation.success) {
      return {
        success: false,
        error: "输入数据无效",
        fieldErrors: validation.error.flatten().fieldErrors,
      };
    }

    // 3. Call service layer for business logic
    const result = await updateUserInfo(session.user.id, validation.data);

    // 4. Return the result
    if (result.success) {
      return {
        success: true,
        data: undefined,
      };
    } else {
      return {
        success: false,
        error: result.error || "更新用户信息失败",
      };
    }
  } catch (error) {
    console.error("Failed to update user info:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "更新用户信息失败",
    };
  }
}
