"use server";

import { headers } from "next/headers";

import { getSessionUser, requireSessionUser } from "@/actions/session";
import {
  getUserBalance,
  getUserInfo,
  getUserSecurityStatus,
} from "@/domains/user/user.read.service";
import { rechargeBalance, updateUserInfo } from "@/domains/user/user.service";
import { auth } from "@/infra/auth";
import type { ActionResult } from "@/types/common";
import type { UserInfo, UserSecurityStatus } from "@/types/dto";
import {
  RechargeBalanceData,
  rechargeBalanceSchema,
  UserInfoUpdateData,
  userInfoUpdateSchema,
} from "@/types/validations";

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
  data: UserInfoUpdateData
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

export async function getUserInfoAction(): Promise<UserInfo | null> {
  const user = await getSessionUser();

  if (!user) {
    return null;
  }

  return getUserInfo(user.id);
}

/**
 * Recharge user balance action
 *
 * This is a thin controller that:
 * 1. Handles authentication (Next.js specific)
 * 2. Validates input data (amount between 1-10000)
 * 3. Calls the service layer for business logic
 * 4. Formats the response with new balance
 *
 * @param data - Recharge data containing amount
 * @returns Action result with success status, new balance or error
 */
export async function rechargeBalanceAction(
  data: RechargeBalanceData
): Promise<ActionResult<{ newBalance: string }>> {
  try {
    // 1. Verify authentication
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
    const validation = rechargeBalanceSchema.safeParse(data);

    if (!validation.success) {
      return {
        success: false,
        error: "输入数据无效",
        fieldErrors: validation.error.flatten().fieldErrors,
      };
    }

    // 3. Call service layer for business logic
    const result = await rechargeBalance(
      session.user.id,
      validation.data.amount
    );

    // 4. Return the result
    if (result.success && result.data) {
      return {
        success: true,
        data: {
          newBalance: result.data.newBalance,
        },
      };
    } else {
      return {
        success: false,
        error: result.error || "充值失败",
      };
    }
  } catch (error) {
    console.error("Failed to recharge balance:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "充值失败，请稍后重试",
    };
  }
}

export async function getUserBalanceAction(): Promise<string | null> {
  const user = await getSessionUser();

  if (!user) {
    return null;
  }

  return getUserBalance(user.id);
}

export async function getUserSecurityStatusAction(): Promise<UserSecurityStatus | null> {
  const user = await requireSessionUser();

  if (!user) {
    return null;
  }

  return getUserSecurityStatus(user.id);
}
