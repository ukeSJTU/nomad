import { z } from "zod";

export const phoneNumberSchema = z
  .string()
  .regex(/^1[3-9]\d{9}$/, "手机号格式不正确，请重新输入");

export const emailSchema = z.email({ error: "邮箱格式不正确" });

// Base password validation rules (without the empty check)
const passwordBaseSchema = z
  .string()
  .min(8, "密码至少8位")
  .max(20, "密码最多20位")
  .regex(/[A-Z]/, "密码必须包含至少一个大写字母")
  .regex(/[a-z]/, "密码必须包含至少一个小写字母")
  .regex(/[0-9]/, "密码必须包含至少一个数字");

// General password schema with generic empty message
export const passwordSchema = z
  .string()
  .min(1, "请输入密码")
  .pipe(passwordBaseSchema);

// Login-specific password schema with context-specific empty message
export const loginPasswordSchema = z
  .string()
  .min(1, "请输入登录密码")
  .pipe(passwordBaseSchema);

export const accountSchema = z
  .string()
  .min(1, "请输入手机号或邮箱")
  .superRefine((val, ctx) => {
    const isPhone = phoneNumberSchema.safeParse(val).success;
    const isEmail = emailSchema.safeParse(val).success;

    if (!isPhone && !isEmail) {
      ctx.addIssue({
        code: "custom",
        message: "请输入正确的手机号或邮箱格式",
      });
    }
  });

export const otpCodeSchema = z
  .string()
  .length(6, "验证码必须是6位数字")
  .regex(/^[0-9]{6}$/, "验证码只能包含数字");

export const termsAgreementSchema = z.boolean().refine(val => val === true, {
  message: "请同意服务协议和隐私政策",
});

export const passwordLoginSchema = z.object({
  account: accountSchema,
  password: loginPasswordSchema,
  agreedToTerms: termsAgreementSchema,
});

export const otpLoginSchema = z.object({
  account: accountSchema,
  otp: otpCodeSchema,
  agreedToTerms: termsAgreementSchema,
});

export const unifiedLoginSchema = z.discriminatedUnion("loginMethod", [
  passwordLoginSchema.extend({
    loginMethod: z.literal("password"),
  }),
  otpLoginSchema.extend({
    loginMethod: z.literal("otp"),
  }),
]);

export const phoneVerificationSchema = z.object({
  phoneNumber: phoneNumberSchema,
  otp: otpCodeSchema,
  agreedToTerms: termsAgreementSchema,
});

export const emailVerificationSchema = z.object({
  email: emailSchema,
  otp: otpCodeSchema,
  agreedToTerms: termsAgreementSchema,
});

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

// Security/Update schemas (without agreedToTerms)
export const updatePhoneSchema = z.object({
  phoneNumber: phoneNumberSchema,
  otp: otpCodeSchema,
});

export const updateEmailSchema = z.object({
  email: emailSchema,
  otp: otpCodeSchema,
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "请输入当前密码"),
    newPassword: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: "两次输入的密码不一致",
    path: ["confirmPassword"],
  })
  .refine(data => data.currentPassword !== data.newPassword, {
    message: "新密码不能与当前密码相同",
    path: ["newPassword"],
  });

// Legacy schemas for backward compatibility (deprecated - prefer unified schemas)
export const phoneLoginSchema = z.object({
  phoneNumber: phoneNumberSchema,
  password: loginPasswordSchema,
  agreedToTerms: termsAgreementSchema,
});

export const phoneOtpLoginSchema = z.object({
  phoneNumber: phoneNumberSchema,
  otp: otpCodeSchema,
  agreedToTerms: termsAgreementSchema,
});

export const emailLoginSchema = z.object({
  email: emailSchema,
  password: loginPasswordSchema,
  agreedToTerms: termsAgreementSchema,
});

export const emailOtpLoginSchema = z.object({
  email: emailSchema,
  otp: otpCodeSchema,
  agreedToTerms: termsAgreementSchema,
});

// Exported types
export type PasswordLoginData = z.infer<typeof passwordLoginSchema>;
export type OtpLoginData = z.infer<typeof otpLoginSchema>;
export type UnifiedLoginData = z.infer<typeof unifiedLoginSchema>;
export type PhoneVerificationData = z.infer<typeof phoneVerificationSchema>;
export type EmailVerificationData = z.infer<typeof emailVerificationSchema>;
export type PasswordSetupData = z.infer<typeof passwordSetupSchema>;
export type UpdatePhoneData = z.infer<typeof updatePhoneSchema>;
export type UpdateEmailData = z.infer<typeof updateEmailSchema>;
export type ChangePasswordData = z.infer<typeof changePasswordSchema>;

// Legacy types for backward compatibility (deprecated)
export type PhoneLoginData = z.infer<typeof phoneLoginSchema>;
export type PhoneOtpLoginData = z.infer<typeof phoneOtpLoginSchema>;
export type EmailLoginData = z.infer<typeof emailLoginSchema>;
export type EmailOtpLoginData = z.infer<typeof emailOtpLoginSchema>;
