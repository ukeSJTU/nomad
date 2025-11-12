"use server";

import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { updateUserInfo } from "@/lib/services/user";
import { userInfoUpdateSchema } from "@/types/user";

// Action state type for useActionState
export interface UpdateUserInfoActionState {
  success: boolean;
  message?: string;
  error?: string;
  fieldErrors?: Record<string, string[] | undefined>;
}

/**
 * Update user information action (compatible with useActionState)
 *
 * This is a thin controller that:
 * 1. Handles authentication (Next.js specific)
 * 2. Validates input data
 * 3. Calls the service layer for business logic
 * 4. Formats the response
 *
 * All fields are optional - only provided fields will be updated
 *
 * @param prevState - Previous state (required by useActionState)
 * @param formData - Form data from the form submission
 * @returns Action state with success status and message/error
 */
export async function updateUserInfoAction(
  prevState: UpdateUserInfoActionState | null,
  formData: FormData
): Promise<UpdateUserInfoActionState> {
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

    // 2. Convert FormData to object
    const data = {
      nickname: formData.get("nickname") as string | undefined,
      name: formData.get("name") as string | undefined,
      gender: formData.get("gender") as "male" | "female" | "other" | undefined,
      birthday: formData.get("birthday") as string | undefined,
    };

    // 3. Validate input data
    const validation = userInfoUpdateSchema.safeParse(data);

    if (!validation.success) {
      return {
        success: false,
        error: "输入数据无效",
        fieldErrors: validation.error.flatten().fieldErrors,
      };
    }

    // 4. Call service layer for business logic
    const result = await updateUserInfo(session.user.id, validation.data);

    // 5. Return the result
    if (result.success) {
      return {
        success: true,
        message: result.message || "个人信息更新成功",
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
