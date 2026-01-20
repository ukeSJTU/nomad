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

export type EmailFormMode = "bind" | "verify" | "update";

export interface UpdateEmailFormData {
  email: string;
  otp: string;
}

export interface UpdateEmailFormProps {
  /** Form control instance from react-hook-form */
  control: Control<UpdateEmailFormData>;
  /** Form errors from react-hook-form */
  errors: FieldErrors<UpdateEmailFormData>;
  /** Callback function called when form is submitted */
  onSubmit: (e?: React.BaseSyntheticEvent) => void;
  /** Callback to send OTP to email */
  onSendOtp: () => void | Promise<void>;
  /** Current email address (empty for bind mode) */
  currentEmail?: string;
  /** Current email value from form watch */
  emailValue: string;
  /** Form mode: bind (first time), verify (existing unverified), update (change verified) */
  mode: EmailFormMode;
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
function getModeConfig(mode: EmailFormMode) {
  switch (mode) {
    case "bind":
      return {
        title: "绑定邮箱",
        currentLabel: null,
        emailLabel: "邮箱地址",
        emailPlaceholder: "请输入邮箱地址",
        submitText: "确认绑定",
        description: "首次绑定邮箱，验证后可用于登录和找回密码",
      };
    case "verify":
      return {
        title: "验证邮箱",
        currentLabel: "待验证的邮箱",
        emailLabel: null,
        emailPlaceholder: null,
        submitText: "确认验证",
        description: "您的邮箱尚未验证，请输入验证码完成验证",
      };
    case "update":
      return {
        title: "修改邮箱",
        currentLabel: "当前邮箱",
        emailLabel: "新邮箱地址",
        emailPlaceholder: "请输入新邮箱地址",
        submitText: "确认修改",
        description: "修改邮箱后，新邮箱将用于登录和接收通知",
      };
  }
}

/**
 * Update email form UI component
 * Supports bind, verify, and update modes
 */
export function UpdateEmailForm({
  control,
  errors,
  onSubmit,
  onSendOtp,
  currentEmail = "",
  emailValue,
  mode,
  isLoading = false,
  isVerifying = false,
  countdown = 0,
  hasSent = false,
}: UpdateEmailFormProps) {
  const config = getModeConfig(mode);

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Description */}
      {config.description && (
        <div className="rounded-lg bg-primary/10 p-4">
          <p className="text-sm text-primary">{config.description}</p>
        </div>
      )}

      {/* Current Email Display */}
      {config.currentLabel && currentEmail && (
        <div className="rounded-lg bg-muted p-4">
          <p className="text-sm text-muted-foreground">
            {config.currentLabel}：
            <span className="font-medium">{currentEmail}</span>
          </p>
        </div>
      )}

      <div className="space-y-4">
        {/* Email Field (hidden for verify mode) */}
        {config.emailLabel && (
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-foreground">
                  {config.emailLabel}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder={config.emailPlaceholder || ""}
                    className="h-12"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Hidden email field for verify mode */}
        {mode === "verify" && (
          <FormField
            control={control}
            name="email"
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
                邮箱验证码
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
                  disabled={mode !== "verify" && !emailValue}
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
