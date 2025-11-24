import { nanoid } from "nanoid";

import { validateAccount } from "@/utils/auth";
// 说明：移除未使用的 ServiceResult 类型导入以通过 ESLint 检查

function meta() {
  return { timestamp: new Date().toISOString(), requestId: nanoid() };
}

export async function sendResetOtp(
  accountInput: string,
  captchaToken: string
): Promise<any> {
  const { isValid } = validateAccount(accountInput);
  if (!isValid) {
    return {
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "请输入正确的手机号或邮箱格式",
      },
      meta: meta(),
    };
  }
  if (!captchaToken) {
    return {
      success: false,
      error: { code: "CAPTCHA_FAILED", message: "请先完成安全验证" },
      meta: meta(),
    };
  }
  return {
    success: true,
    data: { message: "验证码已发送" },
    meta: meta(),
  };
}

export async function verifyResetOtp(
  accountInput: string,
  otp: string,
  captchaToken: string
): Promise<any> {
  const { isValid } = validateAccount(accountInput);
  if (!isValid) {
    return {
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "请输入正确的手机号或邮箱格式",
      },
      meta: meta(),
    };
  }
  if (!captchaToken) {
    return {
      success: false,
      error: { code: "CAPTCHA_FAILED", message: "请先完成安全验证" },
      meta: meta(),
    };
  }
  if (!/^[0-9]{6}$/.test(otp)) {
    return {
      success: false,
      error: { code: "OTP_INVALID_OR_EXPIRED", message: "验证码错误或已失效" },
      meta: meta(),
    };
  }
  return { success: true, data: { verified: true }, meta: meta() };
}

export async function updatePasswordAfterOtp(
  newPassword: string,
  confirmPassword: string
): Promise<any> {
  if (newPassword !== confirmPassword) {
    return {
      success: false,
      error: { code: "VALIDATION_ERROR", message: "两次输入的密码不一致" },
      meta: meta(),
    };
  }
  if (newPassword.length < 8) {
    return {
      success: false,
      error: { code: "VALIDATION_ERROR", message: "密码至少需要 8 个字符" },
      meta: meta(),
    };
  }
  return { success: true, data: { message: "密码更新成功" }, meta: meta() };
}
