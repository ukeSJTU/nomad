"use client";

import { Button } from "@ukesjtu/nomad-ui/components/primitives/button";
import { Checkbox } from "@ukesjtu/nomad-ui/components/primitives/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ukesjtu/nomad-ui/components/primitives/form";
import { Input } from "@ukesjtu/nomad-ui/components/primitives/input";
import { OtpInput } from "@ukesjtu/nomad-ui/components/security/otp-input";
import type { Control, FieldErrors } from "react-hook-form";

/**
 * Verification mode - determines field labels and input types
 */
export type VerificationMode = "phone" | "email";

/**
 * Form data structure for verification
 */
export interface VerificationFormData {
  /** Contact info - phone number or email address */
  contact: string;
  /** 6-digit OTP code */
  otp: string;
  /** User agreement to terms */
  agreedToTerms: boolean;
}

/**
 * Props for the VerificationForm component
 */
export interface VerificationFormProps {
  /** Verification mode - phone or email */
  mode: VerificationMode;
  /** Form control instance from react-hook-form */
  control: Control<VerificationFormData>;
  /** Form errors from react-hook-form */
  errors: FieldErrors<VerificationFormData>;
  /** Callback function called when form is submitted */
  onSubmit: (e?: React.BaseSyntheticEvent) => void;
  /** Callback when OTP send button is clicked */
  onSendOtp: () => void;
  /** Countdown timer in seconds (0 = can send) */
  countdown: number;
  /** Whether the form is in loading state */
  isLoading?: boolean;
  /** Callback when terms link is clicked */
  onTermsClick?: () => void;
  /** Callback when privacy link is clicked */
  onPrivacyClick?: () => void;
  /** Callback when enterprise registration link is clicked */
  onEnterpriseClick?: () => void;
}

const MODE_CONFIG = {
  phone: {
    contactLabel: "手机号",
    contactPlaceholder: "请输入手机号",
    contactType: "tel" as const,
    contactMaxLength: 11,
    otpLabel: "短信验证码",
  },
  email: {
    contactLabel: "邮箱地址",
    contactPlaceholder: "请输入邮箱地址",
    contactType: "email" as const,
    contactMaxLength: undefined,
    otpLabel: "邮箱验证码",
  },
};

/**
 * Unified verification form UI component for phone or email verification
 *
 * This is a pure UI component - form state management and validation
 * are handled by the parent component via react-hook-form.
 *
 * @example
 * ```tsx
 * // Parent component creates form and handles submission
 * const form = useForm<VerificationFormData>({
 *   resolver: zodResolver(phoneVerificationSchema),
 * });
 *
 * <Form {...form}>
 *   <VerificationForm
 *     mode="phone"
 *     control={form.control}
 *     errors={form.formState.errors}
 *     onSubmit={form.handleSubmit(handlePhoneVerification)}
 *     onSendOtp={handleSendOtp}
 *     countdown={countdown}
 *   />
 * </Form>
 * ```
 */
export function VerificationForm({
  mode,
  control,
  errors,
  onSubmit,
  onSendOtp,
  countdown,
  isLoading = false,
  onTermsClick,
  onPrivacyClick,
  onEnterpriseClick,
}: VerificationFormProps) {
  const config = MODE_CONFIG[mode];

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-4">
        {/* Contact Input (Phone or Email) */}
        <FormField
          control={control}
          name="contact"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">
                {config.contactLabel}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type={config.contactType}
                  placeholder={config.contactPlaceholder}
                  className="h-12"
                  maxLength={config.contactMaxLength}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* OTP Input */}
        <FormField
          control={control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">
                {config.otpLabel}
              </FormLabel>
              <FormControl>
                <OtpInput
                  value={field.value}
                  onChange={field.onChange}
                  onSendOtp={onSendOtp}
                  countdown={countdown}
                  hasSent={countdown > 0}
                  isLoading={isLoading}
                  placeholder="6位数字"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Terms Agreement Checkbox */}
        <FormField
          control={control}
          name="agreedToTerms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm text-gray-600">
                  同意《
                  <button
                    type="button"
                    className="text-blue-600 hover:text-blue-800 underline"
                    onClick={onTermsClick}
                  >
                    服务协议
                  </button>
                  》和《
                  <button
                    type="button"
                    className="text-blue-600 hover:text-blue-800 underline"
                    onClick={onPrivacyClick}
                  >
                    隐私政策
                  </button>
                  》
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-medium"
        disabled={isLoading}
      >
        {isLoading ? "验证中..." : "下一步，设置密码"}
      </Button>

      {/* Enterprise Registration Link */}
      <div className="text-center">
        <button
          type="button"
          className="text-blue-600 hover:text-blue-800 text-sm underline"
          onClick={onEnterpriseClick}
        >
          企业客户注册
        </button>
      </div>
    </form>
  );
}
