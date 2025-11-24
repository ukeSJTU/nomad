import { describe, expect, test, vi } from "vitest";

import {
  forgotPasswordErrorResponseSchema,
  forgotPasswordSentResponseSchema,
  updatePasswordResponseSchema,
  verifyResetOtpResponseSchema,
} from "@/types/api/auth-forgot-password";

import {
  requestPasswordResetAction,
  resetPasswordAfterOtpAction,
  verifyPasswordResetOtpAction,
} from "./auth";

vi.mock("next/headers", () => ({
  headers: async () => new Headers(),
}));

vi.mock("@/utils/auth", () => ({
  validateAccount: (input: string) => ({
    isPhone: input.startsWith("+86"),
    isEmail: input.includes("@"),
    isValid: input.startsWith("+86") || input.includes("@"),
  }),
}));

vi.mock("@/lib/auth", () => ({
  auth: {
    api: {
      phoneNumber: {
        sendOtp: vi.fn().mockResolvedValue({}),
        verify: vi.fn().mockResolvedValue({}),
      },
      emailOtp: {
        sendVerificationOtp: vi.fn().mockResolvedValue({}),
      },
      signIn: {
        emailOtp: vi.fn().mockResolvedValue({}),
      },
      setPassword: vi.fn().mockResolvedValue({}),
      getSession: vi.fn().mockResolvedValue({ user: { id: "u1" } }),
    },
  },
}));

vi.mock("@/lib/services/auth", () => ({
  validatePasswordStrength: (pwd: string) => ({ success: pwd.length >= 8 }),
}));

describe("Forgot Password Actions", () => {
  test("Given 有效邮箱与验证码 When 请求发送验证码 Then 返回标准成功响应", async () => {
    const res = await requestPasswordResetAction("user@example.com", "t");
    const parsed = forgotPasswordSentResponseSchema.safeParse(res);
    expect(parsed.success).toBe(true);
  });

  test("Given 无效账户 When 请求发送验证码 Then 返回VALIDATION_ERROR标准错误响应", async () => {
    const res = await requestPasswordResetAction("invalid", "t");
    const parsed = forgotPasswordErrorResponseSchema.safeParse(res);
    expect(parsed.success).toBe(true);
    expect(parsed.data.error.code).toBe("VALIDATION_ERROR");
  });

  test("Given 正确OTP When 验证验证码 Then 返回verified为true的标准成功响应", async () => {
    const res = await verifyPasswordResetOtpAction(
      "user@example.com",
      "123456",
      "t"
    );
    const parsed = verifyResetOtpResponseSchema.safeParse(res);
    expect(parsed.success).toBe(true);
    expect(parsed.data.verified).toBe(true);
  });

  test("Given OTP已验证 When 更新符合强度的新密码 Then 返回标准成功响应", async () => {
    const res = await resetPasswordAfterOtpAction("StrongPass1");
    const parsed = updatePasswordResponseSchema.safeParse(res);
    expect(parsed.success).toBe(true);
  });
});
