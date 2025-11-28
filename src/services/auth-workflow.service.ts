import "./auth-notification.service";

import {
  validateEmailFormat,
  validatePhoneNumberFormat,
} from "@/domains/auth/auth.service";
import {
  getUserById,
  updateUserEmail,
  updateUserPhoneNumber,
} from "@/domains/user/user.repository";
import logger from "@/lib/server/logger";
import type { ServiceResult } from "@/types/result";

import { emitAuthEvent } from "./auth-events";

export async function updateUserPhoneNumberWorkflow(
  userId: string,
  phoneNumber: string
): Promise<ServiceResult> {
  const validation = validatePhoneNumberFormat(phoneNumber);

  if (!validation.success || !validation.data) {
    return {
      success: false,
      error: validation.error || "Invalid phone number format",
    };
  }

  try {
    await updateUserPhoneNumber(userId, validation.data);

    const user = await getUserById(userId);

    emitAuthEvent("phoneNumberUpdated", {
      userId,
      phoneNumber: validation.data,
      userEmail: user?.email,
      userName: user?.name ?? null,
    });

    return {
      success: true,
      message: "手机号更新成功",
    };
  } catch (error) {
    logger.error({ error }, "[Auth Workflow] Failed to update phone number");
    return {
      success: false,
      error: error instanceof Error ? error.message : "更新手机号失败，请重试",
    };
  }
}

export async function updateUserEmailWorkflow(
  userId: string,
  email: string
): Promise<ServiceResult> {
  const trimmedEmail = email.trim().toLowerCase();
  const validation = validateEmailFormat(trimmedEmail);

  if (!validation.success) {
    return validation;
  }

  try {
    await updateUserEmail(userId, trimmedEmail);

    const user = await getUserById(userId);

    emitAuthEvent("emailUpdated", {
      userId,
      email: trimmedEmail,
      userName: user?.name ?? null,
    });

    return {
      success: true,
      message: "邮箱更新成功",
    };
  } catch (error) {
    logger.error({ error }, "[Auth Workflow] Failed to update email");
    return {
      success: false,
      error: error instanceof Error ? error.message : "更新邮箱失败，请重试",
    };
  }
}
