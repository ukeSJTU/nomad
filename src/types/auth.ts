import { z } from "zod";

// Phone verification schemas
export const phoneVerificationSchema = z.object({
  countryCode: z.string().min(1, "请选择国家/地区"),
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

// Step-specific schemas
export const phoneNumberStepSchema = phoneVerificationSchema.pick({
  countryCode: true,
  phoneNumber: true,
});

export const otpStepSchema = phoneVerificationSchema.pick({
  otp: true,
});

// Types
export type PhoneVerificationData = z.infer<typeof phoneVerificationSchema>;
export type PhoneNumberStepData = z.infer<typeof phoneNumberStepSchema>;
export type OtpStepData = z.infer<typeof otpStepSchema>;

// Country codes data
export const countryCodes = [
  { code: "+86", name: "中国大陆", flag: "🇨🇳" },
  { code: "+852", name: "香港", flag: "🇭🇰" },
  { code: "+853", name: "澳门", flag: "🇲🇴" },
  { code: "+886", name: "台湾", flag: "🇹🇼" },
  { code: "+1", name: "美国", flag: "🇺🇸" },
  { code: "+44", name: "英国", flag: "🇬🇧" },
] as const;
