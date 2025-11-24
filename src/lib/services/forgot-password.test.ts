import { describe, expect, test } from "vitest";

import {
  forgotPasswordErrorResponseSchema,
  forgotPasswordSentResponseSchema,
  updatePasswordResponseSchema,
  verifyResetOtpResponseSchema,
} from "@/types/api/auth-forgot-password";

import {
  sendResetOtp,
  updatePasswordAfterOtp,
  verifyResetOtp,
} from "./forgot-password";

describe("Forgot Password Service", () => {
  test("Given 有效邮箱与验证码 When 请求发送验证码 Then 返回成功响应并包含meta", async () => {
    const res = await sendResetOtp("user@example.com", "captcha-token");
    const parsed = forgotPasswordSentResponseSchema.safeParse(res);
    expect(parsed.success).toBe(true);
  });

  test("Given 无效账户格式 When 请求发送验证码 Then 返回VALIDATION_ERROR错误响应并包含meta", async () => {
    const res = await sendResetOtp("invalid", "captcha-token");
    const parsed = forgotPasswordErrorResponseSchema.safeParse(res);
    expect(parsed.success).toBe(true);
    expect(parsed.data.error.code).toBe("VALIDATION_ERROR");
  });

  test("Given 收到正确OTP When 验证验证码 Then 返回verified为true且包含meta", async () => {
    const res = await verifyResetOtp("user@example.com", "123456", "t");
    const parsed = verifyResetOtpResponseSchema.safeParse(res);
    expect(parsed.success).toBe(true);
    expect(parsed.data.verified).toBe(true);
  });

  test("Given OTP验证通过 When 更新符合强度的新密码 Then 返回成功响应并包含meta", async () => {
    const res = await updatePasswordAfterOtp("StrongPass1", "StrongPass1");
    const parsed = updatePasswordResponseSchema.safeParse(res);
    expect(parsed.success).toBe(true);
  });
});
