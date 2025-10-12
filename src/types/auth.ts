import { z } from "zod";

// Phone verification schema - complete form for step 1
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

// Password setup schema for step 2
export const passwordSetupSchema = z
  .object({
    password: z
      .string()
      .min(8, "密码至少8位")
      .regex(/[A-Z]/, "密码必须包含至少一个大写字母")
      .regex(/[a-z]/, "密码必须包含至少一个小写字母")
      .regex(/[0-9]/, "密码必须包含至少一个数字"),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "两次输入的密码不一致",
    path: ["confirmPassword"],
  });

// Types
export type PhoneVerificationData = z.infer<typeof phoneVerificationSchema>;
export type PasswordSetupData = z.infer<typeof passwordSetupSchema>;

// Country codes data
export const countryCodes = [
  { code: "+86", name: "中国大陆", flag: "🇨🇳" },
  { code: "+852", name: "香港", flag: "🇭🇰" },
  { code: "+853", name: "澳门", flag: "🇲🇴" },
  { code: "+886", name: "台湾", flag: "🇹🇼" },
  { code: "+1", name: "美国", flag: "🇺🇸" },
  { code: "+44", name: "英国", flag: "🇬🇧" },
] as const;
