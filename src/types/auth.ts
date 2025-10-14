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

// Phone login schema - for password-based login
export const phoneLoginSchema = z.object({
  countryCode: z.string().min(1, "请选择国家/地区"),
  phoneNumber: z
    .string()
    .min(1, "请输入手机号码")
    .regex(/^[0-9]+$/, "手机号码只能包含数字")
    .min(11, "手机号码至少11位")
    .max(11, "手机号码最多11位"),
  password: z.string().min(1, "请输入密码"),
});

// Phone OTP login schema - for OTP-based login
export const phoneOtpLoginSchema = z.object({
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
});

// Types
export type PhoneVerificationData = z.infer<typeof phoneVerificationSchema>;
export type PasswordSetupData = z.infer<typeof passwordSetupSchema>;
export type PhoneLoginData = z.infer<typeof phoneLoginSchema>;
export type PhoneOtpLoginData = z.infer<typeof phoneOtpLoginSchema>;

// Country codes data with search functionality
export const countryCodes = [
  {
    value: "+86",
    label: "+86 中国大陆",
    searchTerms: ["+86", "86", "中国", "中国大陆", "china", "mainland"],
  },
  {
    value: "+852",
    label: "+852 香港",
    searchTerms: ["+852", "852", "香港", "hong kong", "hk"],
  },
  {
    value: "+853",
    label: "+853 澳门",
    searchTerms: ["+853", "853", "澳门", "macau", "macao"],
  },
  {
    value: "+886",
    label: "+886 台湾",
    searchTerms: ["+886", "886", "台湾", "taiwan", "tw"],
  },
  {
    value: "+1",
    label: "+1 美国",
    searchTerms: ["+1", "1", "美国", "usa", "united states", "america"],
  },
  {
    value: "+44",
    label: "+44 英国",
    searchTerms: ["+44", "44", "英国", "uk", "united kingdom", "britain"],
  },
  {
    value: "+81",
    label: "+81 日本",
    searchTerms: ["+81", "81", "日本", "japan", "jp"],
  },
  {
    value: "+82",
    label: "+82 韩国",
    searchTerms: ["+82", "82", "韩国", "korea", "south korea", "kr"],
  },
  {
    value: "+65",
    label: "+65 新加坡",
    searchTerms: ["+65", "65", "新加坡", "singapore", "sg"],
  },
  {
    value: "+60",
    label: "+60 马来西亚",
    searchTerms: ["+60", "60", "马来西亚", "malaysia", "my"],
  },
] as const;
