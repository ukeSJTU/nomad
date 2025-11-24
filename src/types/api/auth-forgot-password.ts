import { z } from "zod";

import {
  createSuccessResponseSchema,
  errorResponseSchema,
  messageResponseSchema,
  responseMetaSchema,
} from "@/types/api/response";
import {
  accountSchema,
  otpCodeSchema,
  passwordSchema,
} from "@/types/validations/auth";

/** Common error codes for forgot password flow */
export const forgotPasswordErrorCodeSchema = z.enum([
  "VALIDATION_ERROR",
  "ACCOUNT_NOT_FOUND",
  "OTP_INVALID_OR_EXPIRED",
  "CAPTCHA_FAILED",
  "RATE_LIMITED",
  "INTERNAL_ERROR",
]);

/** Request schema: send reset OTP */
export const forgotPasswordRequestSchema = z.object({
  account: accountSchema,
  captchaToken: z.string().min(1, "缺少人机验证令牌"),
});

/** Success response: OTP sent */
export const forgotPasswordSentResponseSchema = createSuccessResponseSchema(
  messageResponseSchema
);

/** Request schema: verify reset OTP */
export const verifyResetOtpRequestSchema = z.object({
  account: accountSchema,
  otp: otpCodeSchema,
  captchaToken: z.string().min(1, "缺少人机验证令牌"),
});

/** Success response: OTP verified */
export const verifyResetOtpResponseSchema = z
  .union([
    createSuccessResponseSchema(z.object({ verified: z.literal(true) })),
    z.object({
      success: z.literal(true),
      verified: z.literal(true),
      meta: responseMetaSchema,
    }),
  ])
  .transform(val =>
    "verified" in val
      ? { success: val.success, verified: val.verified, meta: val.meta }
      : { success: val.success, verified: val.data.verified, meta: val.meta }
  );

/** Request schema: update password after OTP verification */
export const updatePasswordRequestSchema = z
  .object({
    newPassword: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: "两次输入的密码不一致",
    path: ["confirmPassword"],
  });

/** Success response: password updated */
export const updatePasswordResponseSchema = createSuccessResponseSchema(
  messageResponseSchema
);

/** Error response with standardized code */
export const forgotPasswordErrorResponseSchema = errorResponseSchema.extend({
  error: errorResponseSchema.shape.error.extend({
    code: forgotPasswordErrorCodeSchema,
  }),
});

// Types
export type ForgotPasswordRequest = z.infer<typeof forgotPasswordRequestSchema>;
export type ForgotPasswordSentResponse = z.infer<
  typeof forgotPasswordSentResponseSchema
>;
export type VerifyResetOtpRequest = z.infer<typeof verifyResetOtpRequestSchema>;
export type VerifyResetOtpResponse = z.infer<
  typeof verifyResetOtpResponseSchema
>;
export type UpdatePasswordRequest = z.infer<typeof updatePasswordRequestSchema>;
export type UpdatePasswordResponse = z.infer<
  typeof updatePasswordResponseSchema
>;
export type ForgotPasswordErrorResponse = z.infer<
  typeof forgotPasswordErrorResponseSchema
>;
