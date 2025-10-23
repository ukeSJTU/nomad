import { z } from "zod";

// Phone verification schema - complete form for step 1
// Note: Only supports China mainland phone numbers (11 digits)
export const phoneVerificationSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, "请输入手机号码")
    .regex(/^[0-9]+$/, "手机号码只能包含数字")
    .min(11, "手机号码至少11位")
    .max(11, "手机号码最多11位"),
  otp: z
    .string()
    .min(6, "验证码必须是6位数字")
    .max(6, "验证码必须是6位数字")
    .regex(/^[0-9]{6}$/, "验证码只能包含数字"),
  agreedToTerms: z.boolean().refine(val => val === true, {
    message: "请同意服务协议和隐私政策",
  }),
});

// Password setup schema for step 2
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

// Phone login schema - for password-based login
// Note: Only supports China mainland phone numbers (11 digits)
export const phoneLoginSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, "请输入手机号码")
    .regex(/^[0-9]+$/, "手机号码只能包含数字")
    .min(11, "手机号码至少11位")
    .max(11, "手机号码最多11位"),
  password: z.string().min(1, "请输入密码"),
  agreedToTerms: z.boolean().refine(val => val === true, {
    message: "请同意服务协议和隐私政策",
  }),
});

// Phone OTP login schema - for OTP-based login
// Note: Only supports China mainland phone numbers (11 digits)
export const phoneOtpLoginSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, "请输入手机号码")
    .regex(/^[0-9]+$/, "手机号码只能包含数字")
    .min(11, "手机号码至少11位")
    .max(11, "手机号码最多11位"),
  otp: z
    .string()
    .min(6, "验证码必须是6位数字")
    .max(6, "验证码必须是6位数字")
    .regex(/^[0-9]{6}$/, "验证码只能包含数字"),
  agreedToTerms: z.boolean().refine(val => val === true, {
    message: "请同意服务协议和隐私政策",
  }),
});

// Email verification schema - complete form for step 1 (email sign-up)
export const emailVerificationSchema = z.object({
  email: z.string().min(1, "请输入邮箱地址").email("请输入有效的邮箱地址"),
  otp: z
    .string()
    .min(6, "验证码必须是6位数字")
    .max(6, "验证码必须是6位数字")
    .regex(/^[0-9]{6}$/, "验证码只能包含数字"),
  agreedToTerms: z.boolean().refine(val => val === true, {
    message: "请同意服务协议和隐私政策",
  }),
});

// Email login schema - for password-based login
export const emailLoginSchema = z.object({
  email: z.string().min(1, "请输入邮箱地址").email("请输入有效的邮箱地址"),
  password: z.string().min(1, "请输入密码"),
  agreedToTerms: z.boolean().refine(val => val === true, {
    message: "请同意服务协议和隐私政策",
  }),
});

// Email OTP login schema - for OTP-based login
export const emailOtpLoginSchema = z.object({
  email: z.string().min(1, "请输入邮箱地址").email("请输入有效的邮箱地址"),
  otp: z
    .string()
    .min(6, "验证码必须是6位数字")
    .max(6, "验证码必须是6位数字")
    .regex(/^[0-9]{6}$/, "验证码只能包含数字"),
  agreedToTerms: z.boolean().refine(val => val === true, {
    message: "请同意服务协议和隐私政策",
  }),
});

// Types
export type PhoneVerificationData = z.infer<typeof phoneVerificationSchema>;
export type EmailVerificationData = z.infer<typeof emailVerificationSchema>;
export type PasswordSetupData = z.infer<typeof passwordSetupSchema>;
export type PhoneLoginData = z.infer<typeof phoneLoginSchema>;
export type PhoneOtpLoginData = z.infer<typeof phoneOtpLoginSchema>;
export type EmailLoginData = z.infer<typeof emailLoginSchema>;
export type EmailOtpLoginData = z.infer<typeof emailOtpLoginSchema>;
