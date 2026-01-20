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
import { Check, Eye, EyeOff, X } from "lucide-react";
import { useState } from "react";
import type { Control, FieldErrors } from "react-hook-form";

export interface PasswordSetupFormData {
  password: string;
  confirmPassword: string;
}

export interface PasswordSetupFormProps {
  /** Form control instance from react-hook-form */
  control: Control<PasswordSetupFormData>;
  /** Form errors from react-hook-form */
  errors: FieldErrors<PasswordSetupFormData>;
  /** Callback function called when form is submitted */
  onSubmit: (e?: React.BaseSyntheticEvent) => void;
  /** Current password value for real-time validation */
  passwordValue: string;
  /** Password strength score (0-4) calculated by zxcvbn */
  strengthScore: number;
  /** Whether the form is in loading state (disables submit button) */
  isLoading?: boolean;
  /** Masked phone number or email to display (e.g., "138****5678") */
  maskedIdentifier?: string;
  /** Custom submit button text (default: "完成注册") */
  submitButtonText?: string;
  /** Whether to show the help link at the bottom (default: true) */
  showHelpLink?: boolean;
  /** Callback when help link is clicked */
  onHelpClick?: () => void;
}

interface PasswordRequirement {
  label: string;
  met: boolean;
  optional?: boolean;
}

/**
 * Password setup form UI component for the registration flow
 * Allows users to set their initial password after phone verification
 * Includes real-time password requirement validation with visual feedback
 */
export function PasswordSetupForm({
  control,
  errors,
  onSubmit,
  passwordValue,
  strengthScore,
  isLoading = false,
  maskedIdentifier,
  submitButtonText = "完成注册",
  showHelpLink = true,
  onHelpClick,
}: PasswordSetupFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Define password requirements with real-time validation
  // Each requirement shows a check/x icon based on current password input
  const requirements: PasswordRequirement[] = [
    {
      label: "8-20位字符", // 8-20 characters
      met: passwordValue.length >= 8 && passwordValue.length <= 20,
    },
    {
      label: "包含至少一个大写字母", // Contains at least one uppercase letter
      met: /[A-Z]/.test(passwordValue),
    },
    {
      label: "包含至少一个小写字母", // Contains at least one lowercase letter
      met: /[a-z]/.test(passwordValue),
    },
    {
      label: "包含至少一个数字（可选）", // Contains at least one number (optional)
      met: /[0-9]/.test(passwordValue),
      optional: true,
    },
    {
      label: "包含至少一个特殊符号（如 _、!、@ 等）（可选）", // Contains at least one special character (optional)
      met: /[_!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?]/.test(passwordValue),
      optional: true,
    },
  ];

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Display masked phone number or email if provided */}
      {maskedIdentifier && (
        <div className="p-3 bg-primary/10 border border-primary/20 rounded-md">
          <p className="text-sm text-foreground">
            <span className="font-medium">注册账号：</span>
            <span className="font-mono">{maskedIdentifier}</span>
          </p>
        </div>
      )}

      <div className="space-y-4">
        {/* Password Input Field */}
        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-foreground">
                设置密码 {/* Set Password */}
              </FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    placeholder="请输入密码" // Please enter password
                    className="h-12 pr-10"
                  />
                </FormControl>
                <button
                  type="button"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-accent transition-colors"
                  onClick={e => {
                    e.preventDefault();
                    setShowPassword(!showPassword);
                  }}
                  aria-label={showPassword ? "隐藏密码" : "显示密码"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm Password Input Field */}
        <FormField
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-foreground">
                确认密码 {/* Confirm Password */}
              </FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    {...field}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="请再次输入密码" // Please enter password again
                    className="h-12 pr-10"
                  />
                </FormControl>
                <button
                  type="button"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-accent transition-colors"
                  onClick={e => {
                    e.preventDefault();
                    setShowConfirmPassword(!showConfirmPassword);
                  }}
                  aria-label={showConfirmPassword ? "隐藏密码" : "显示密码"}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password Requirements with Real-time Validation */}
        <div className="text-sm space-y-2">
          <p className="text-foreground font-medium">
            密码要求：{/* Password Requirements */}
          </p>
          <ul className="space-y-2">
            {requirements.map((requirement, index) => (
              <li key={index} className="flex items-center gap-2 text-xs">
                {requirement.optional ? (
                  requirement.met ? (
                    <Check className="h-4 w-4 text-chart-5" />
                  ) : null
                ) : requirement.met ? (
                  <Check className="h-4 w-4 text-chart-5" />
                ) : (
                  <X className="h-4 w-4 text-muted-foreground" />
                )}
                {/* Change text color based on requirement status */}
                <span
                  className={
                    requirement.met
                      ? "text-chart-5"
                      : requirement.optional
                        ? "text-muted-foreground"
                        : "text-foreground"
                  }
                >
                  {requirement.label}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <p className="text-foreground font-medium">密码强度：</p>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex-1 bg-muted rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    strengthScore === 0
                      ? "bg-destructive w-0"
                      : strengthScore === 1
                        ? "bg-destructive w-1/4"
                        : strengthScore === 2
                          ? "bg-secondary w-2/4"
                          : strengthScore === 3
                            ? "bg-secondary w-3/4"
                            : "bg-chart-5 w-full"
                  }`}
                />
              </div>
              <span
                className={`text-xs font-medium ${
                  strengthScore <= 1
                    ? "text-destructive"
                    : strengthScore === 2
                      ? "text-secondary"
                      : "text-chart-5"
                }`}
              >
                {strengthScore <= 1 ? "弱" : strengthScore === 2 ? "中" : "强"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button with Loading State */}
      <Button
        type="submit"
        className="w-full h-12 bg-secondary text-secondary-foreground hover:bg-secondary/90 font-medium"
        disabled={isLoading}
      >
        {isLoading ? "设置中..." : submitButtonText}
      </Button>

      {showHelpLink && (
        <div className="text-center mt-4">
          <a
            href="#"
            onClick={e => {
              e.preventDefault();
              onHelpClick?.();
            }}
            className="text-sm text-primary hover:underline"
          >
            注册遇到问题？
          </a>
        </div>
      )}
    </form>
  );
}
