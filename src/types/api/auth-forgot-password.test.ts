import { describe, expect, it } from "vitest";

import {
  forgotPasswordErrorResponseSchema,
  forgotPasswordRequestSchema,
  forgotPasswordSentResponseSchema,
  updatePasswordRequestSchema,
  updatePasswordResponseSchema,
  verifyResetOtpRequestSchema,
  verifyResetOtpResponseSchema,
} from "./auth-forgot-password";

describe("Forgot Password API Schemas", () => {
  it("validates forgot password request with phone", () => {
    const result = forgotPasswordRequestSchema.safeParse({
      account: "13800138000",
      captchaToken: "token-123",
    });
    expect(result.success).toBe(true);
  });

  it("validates forgot password request with email", () => {
    const result = forgotPasswordRequestSchema.safeParse({
      account: "user@example.com",
      captchaToken: "token-abc",
    });
    expect(result.success).toBe(true);
  });

  it("rejects request without captcha token", () => {
    const result = forgotPasswordRequestSchema.safeParse({
      account: "user@example.com",
      captchaToken: "",
    });
    expect(result.success).toBe(false);
  });

  it("validates verify OTP request", () => {
    const result = verifyResetOtpRequestSchema.safeParse({
      account: "user@example.com",
      otp: "123456",
      captchaToken: "token-xyz",
    });
    expect(result.success).toBe(true);
  });

  it("validates update password request", () => {
    const result = updatePasswordRequestSchema.safeParse({
      newPassword: "StrongP@ssw0rd",
      confirmPassword: "StrongP@ssw0rd",
    });
    expect(result.success).toBe(true);
  });

  it("rejects mismatched confirm password", () => {
    const result = updatePasswordRequestSchema.safeParse({
      newPassword: "StrongP@ssw0rd",
      confirmPassword: "Different123",
    });
    expect(result.success).toBe(false);
  });

  it("validates success response schemas", () => {
    const sendRes = forgotPasswordSentResponseSchema.safeParse({
      success: true,
      data: { message: "验证码已发送" },
      meta: { timestamp: new Date().toISOString(), requestId: "req-1" },
    });
    expect(sendRes.success).toBe(true);

    const verifyRes = verifyResetOtpResponseSchema.safeParse({
      success: true,
      data: { verified: true },
      meta: { timestamp: new Date().toISOString(), requestId: "req-2" },
    });
    expect(verifyRes.success).toBe(true);

    const updateRes = updatePasswordResponseSchema.safeParse({
      success: true,
      data: { message: "密码更新成功" },
      meta: { timestamp: new Date().toISOString(), requestId: "req-3" },
    });
    expect(updateRes.success).toBe(true);
  });

  it("validates error response with standardized codes", () => {
    const errRes = forgotPasswordErrorResponseSchema.safeParse({
      success: false,
      error: {
        code: "ACCOUNT_NOT_FOUND",
        message: "账户不存在",
      },
      meta: { timestamp: new Date().toISOString(), requestId: "req-err" },
    });
    expect(errRes.success).toBe(true);
  });
});
