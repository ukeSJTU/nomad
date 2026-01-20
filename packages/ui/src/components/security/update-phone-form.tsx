"use client";

import { Button } from "@ukesjtu/nomad-ui/components/primitives/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ukesjtu/nomad-ui/components/primitives/form";
import { Input } from "@ukesjtu/nomad-ui/components/primitives/input";
import type { Control, FieldErrors } from "react-hook-form";
import { OtpInput } from "./otp-input";

export type PhoneFormMode = "bind" | "verify" | "update";

export interface UpdatePhoneFormData {
  phoneNumber: string;
  otp: string;
}

export interface UpdatePhoneFormProps {
  /** Form control instance from react-hook-form */
  control: Control<UpdatePhoneFormData>;
  /** Form errors from react-hook-form */
  errors: FieldErrors<UpdatePhoneFormData>;
  /** Callback function called when form is submitted */
  onSubmit: (e?: React.BaseSyntheticEvent) => void;
  /** Callback to send OTP to phone */
  onSendOtp: () => void | Promise<void>;
  /** Current phone number (empty for bind mode) */
  currentPhoneNumber?: string | null;
  /** Current phone number value from form watch */
  phoneNumberValue: string;
  /** Form mode: bind (first time), verify (existing unverified), update (change verified) */
  mode: PhoneFormMode;
  /** Whether the form is in loading state */
  isLoading?: boolean;
  /** Whether OTP is being verified */
  isVerifying?: boolean;
  /** Countdown timer for OTP resend */
  countdown?: number;
  /** Whether OTP has been sent at least once */
  hasSent?: boolean;
}

/**
 * Get mode-specific configuration for UI labels and descriptions
 */
function getModeConfig(mode: PhoneFormMode) {
  switch (mode) {
    case "bind":
      return {
        title: "绑定手机号",
        currentLabel: null,
        phoneLabel: "手机号",
        phonePlaceholder: "请输入手机号",
        submitText: "确认绑定",
        description: "首次绑定手机号，验证后可用于登录和找回密码",
      };
    case "verify":
      return {
        title: "验证手机号",
        currentLabel: "待验证的手机号",
        phoneLabel: null,
        phonePlaceholder: null,
        submitText: "确认验证",
        description: "您的手机号尚未验证，请输入验证码完成验证",
      };
    case "update":
      return {
        title: "修改手机号",
        currentLabel: "当前手机号",
        phoneLabel: "新手机号",
        phonePlaceholder: "请输入新手机号",
        submitText: "确认修改",
        description: "修改手机号后，新手机号将用于登录和接收通知",
      };
  }
}

/**
 * Update phone form UI component
 * Supports bind, verify, and update modes
 */
export function UpdatePhoneForm({
  control,
  errors,
  onSubmit,
  onSendOtp,
  currentPhoneNumber,
  phoneNumberValue,
  mode,
  isLoading = false,
  isVerifying = false,
  countdown = 0,
  hasSent = false,
}: UpdatePhoneFormProps) {
  const config = getModeConfig(mode);

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Description */}
      {config.description && (
        <div className="rounded-lg bg-primary/10 p-4">
          <p className="text-sm text-primary">{config.description}</p>
        </div>
      )}

      {/* Current Phone Number Display */}
      {config.currentLabel && currentPhoneNumber && (
        <div className="rounded-lg bg-muted p-4">
          <p className="text-sm text-muted-foreground">
            {config.currentLabel}：
            <span className="font-medium">{currentPhoneNumber}</span>
          </p>
        </div>
      )}

      <div className="space-y-4">
        {/* Phone Number Field (hidden for verify mode) */}
        {config.phoneLabel && (
          <FormField
            control={control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-foreground">
                  {config.phoneLabel}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="tel"
                    placeholder={config.phonePlaceholder || ""}
                    className="h-12"
                    maxLength={11}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Hidden phone field for verify mode */}
        {mode === "verify" && (
          <FormField
            control={control}
            name="phoneNumber"
            render={({ field }) => <input {...field} type="hidden" />}
          />
        )}

        {/* OTP Field */}
        <FormField
          control={control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-foreground">
                短信验证码
              </FormLabel>
              <FormControl>
                <OtpInput
                  value={field.value}
                  onChange={field.onChange}
                  onSendOtp={onSendOtp}
                  countdown={countdown}
                  hasSent={hasSent}
                  isLoading={isLoading}
                  isVerifying={isVerifying}
                  placeholder="6位数字"
                  maxLength={6}
                  disabled={mode !== "verify" && !phoneNumberValue}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full h-12 bg-secondary hover:bg-secondary/90 text-white font-medium"
        disabled={isLoading}
      >
        {isLoading ? "验证中..." : config.submitText}
      </Button>
    </form>
  );
}
