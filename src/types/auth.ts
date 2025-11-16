import { z } from "zod";

/**
 * Authentication Validation Schemas
 *
 * This file contains Zod validation schemas for authentication-related forms and operations.
 * All schemas are compatible with Zod v4 and follow consistent naming conventions.
 *
 * Naming conventions:
 * - Schemas: camelCase ending with "Schema" (e.g., phoneVerificationSchema)
 * - Types: PascalCase ending with "Data" (e.g., PhoneVerificationData)
 */

// ============================================================================
// Phone Number Validation Schemas
// ============================================================================

/**
 * Phone verification schema for sign-up flow (Step 1)
 *
 * Used when users sign up with phone number and OTP verification.
 * Currently only supports China mainland phone numbers (11 digits).
 *
 * @property phoneNumber - 11-digit Chinese mobile number
 * @property otp - 6-digit one-time password
 * @property agreedToTerms - User must agree to terms and privacy policy
 */
export const phoneVerificationSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, "请输入手机号")
    .regex(/^[0-9]+$/, "手机号码只能包含数字")
    .length(11, "手机号码必须是11位"),
  otp: z
    .string()
    .length(6, "验证码必须是6位数字")
    .regex(/^[0-9]{6}$/, "验证码只能包含数字"),
  agreedToTerms: z.boolean().refine(val => val === true, {
    message: "请同意服务协议和隐私政策",
  }),
});

/**
 * Password setup schema for sign-up flow (Step 2)
 *
 * Used after phone/email verification to set up user password.
 * Enforces strong password requirements and confirmation matching.
 *
 * @property password - Must be 8-20 characters with uppercase, lowercase, and digit
 * @property confirmPassword - Must match the password field
 */
export const passwordSetupSchema = z
  .object({
    password: z
      .string()
      .min(8, "密码至少8位")
      .max(20, "密码最多20位")
      .regex(/[A-Z]/, "密码必须包含至少一个大写字母")
      .regex(/[a-z]/, "密码必须包含至少一个小写字母")
      .regex(/[0-9]/, "密码必须包含至少一个数字"),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "两次输入的密码不一致",
    path: ["confirmPassword"],
  });

/**
 * Phone login schema for password-based authentication
 *
 * Used when users log in with phone number and password.
 * Currently only supports China mainland phone numbers (11 digits).
 *
 * @property phoneNumber - 11-digit Chinese mobile number
 * @property password - User's password
 * @property agreedToTerms - User must agree to terms and privacy policy
 */
export const phoneLoginSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, "请输入手机号")
    .regex(/^[0-9]+$/, "手机号码只能包含数字")
    .length(11, "手机号码必须是11位"),
  password: z.string().min(1, "请输入密码"),
  agreedToTerms: z.boolean().refine(val => val === true, {
    message: "请同意服务协议和隐私政策",
  }),
});

/**
 * Phone OTP login schema for OTP-based authentication
 *
 * Used when users log in with phone number and one-time password.
 * Currently only supports China mainland phone numbers (11 digits).
 *
 * @property phoneNumber - 11-digit Chinese mobile number
 * @property otp - 6-digit one-time password
 * @property agreedToTerms - User must agree to terms and privacy policy
 */
export const phoneOtpLoginSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, "请输入手机号")
    .regex(/^[0-9]+$/, "手机号码只能包含数字")
    .length(11, "手机号码必须是11位"),
  otp: z
    .string()
    .length(6, "验证码必须是6位数字")
    .regex(/^[0-9]{6}$/, "验证码只能包含数字"),
  agreedToTerms: z.boolean().refine(val => val === true, {
    message: "请同意服务协议和隐私政策",
  }),
});

// ============================================================================
// Email Validation Schemas
// ============================================================================

/**
 * Email verification schema for sign-up flow (Step 1)
 *
 * Used when users sign up with email address and OTP verification.
 *
 * @property email - Valid email address
 * @property otp - 6-digit one-time password
 * @property agreedToTerms - User must agree to terms and privacy policy
 */
export const emailVerificationSchema = z.object({
  email: z.email({ error: "请输入邮箱地址" }),
  otp: z
    .string()
    .length(6, "验证码必须是6位数字")
    .regex(/^[0-9]{6}$/, "验证码只能包含数字"),
  agreedToTerms: z.boolean().refine(val => val === true, {
    message: "请同意服务协议和隐私政策",
  }),
});

/**
 * Email login schema for password-based authentication
 *
 * Used when users log in with email address and password.
 *
 * @property email - Valid email address
 * @property password - User's password
 * @property agreedToTerms - User must agree to terms and privacy policy
 */
export const emailLoginSchema = z.object({
  email: z.email({ error: "请输入邮箱地址" }),
  password: z.string().min(1, "请输入密码"),
  agreedToTerms: z.boolean().refine(val => val === true, {
    message: "请同意服务协议和隐私政策",
  }),
});

/**
 * Email OTP login schema for OTP-based authentication
 *
 * Used when users log in with email address and one-time password.
 *
 * @property email - Valid email address
 * @property otp - 6-digit one-time password
 * @property agreedToTerms - User must agree to terms and privacy policy
 */
export const emailOtpLoginSchema = z.object({
  email: z.email({ error: "请输入邮箱地址" }),
  otp: z
    .string()
    .length(6, "验证码必须是6位数字")
    .regex(/^[0-9]{6}$/, "验证码只能包含数字"),
  agreedToTerms: z.boolean().refine(val => val === true, {
    message: "请同意服务协议和隐私政策",
  }),
});

// ============================================================================
// TypeScript Type Exports
// ============================================================================

/**
 * Inferred TypeScript types from Zod schemas
 * These types are automatically generated and should not be manually modified
 */
export type PhoneVerificationData = z.infer<typeof phoneVerificationSchema>;
export type EmailVerificationData = z.infer<typeof emailVerificationSchema>;
export type PasswordSetupData = z.infer<typeof passwordSetupSchema>;
export type PhoneLoginData = z.infer<typeof phoneLoginSchema>;
export type PhoneOtpLoginData = z.infer<typeof phoneOtpLoginSchema>;
export type EmailLoginData = z.infer<typeof emailLoginSchema>;
export type EmailOtpLoginData = z.infer<typeof emailOtpLoginSchema>;
