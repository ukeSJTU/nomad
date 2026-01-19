"use client";

import { Button } from "@nomad/ui/components/primitives/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@nomad/ui/components/primitives/form";
import { Input } from "@nomad/ui/components/primitives/input";
import { Check, Eye, EyeOff, X } from "lucide-react";
import { useState } from "react";
import type { Control, FieldErrors } from "react-hook-form";

export interface ChangePasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordFormProps {
  /** Form control instance from react-hook-form */
  control: Control<ChangePasswordFormData>;
  /** Form errors from react-hook-form */
  errors: FieldErrors<ChangePasswordFormData>;
  /** Callback function called when form is submitted */
  onSubmit: (e?: React.BaseSyntheticEvent) => void;
  /** Current new password value for real-time validation */
  newPasswordValue: string;
  /** Whether the form is in loading state (disables submit button) */
  isLoading?: boolean;
}

interface PasswordRequirement {
  label: string;
  met: boolean;
}

/**
 * Change password form UI component for users who already have a password
 * Includes real-time password requirement validation with visual feedback
 */
export function ChangePasswordForm({
  control,
  errors,
  onSubmit,
  newPasswordValue,
  isLoading = false,
}: ChangePasswordFormProps) {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Define password requirements with real-time validation
  const requirements: PasswordRequirement[] = [
    {
      label: "至少 8 个字符",
      met: newPasswordValue.length >= 8,
    },
    {
      label: "包含至少一个数字",
      met: /\d/.test(newPasswordValue),
    },
    {
      label: "包含至少一个字母",
      met: /[a-zA-Z]/.test(newPasswordValue),
    },
  ];

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Current Password Field */}
      <FormField
        control={control}
        name="currentPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel>当前密码</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  {...field}
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="请输入当前密码"
                  disabled={isLoading}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* New Password Field */}
      <FormField
        control={control}
        name="newPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel>新密码</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  {...field}
                  type={showNewPassword ? "text" : "password"}
                  placeholder="请输入新密码"
                  disabled={isLoading}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </FormControl>
            <FormMessage />

            {/* Password Requirements */}
            {newPasswordValue && (
              <div className="mt-3 space-y-2">
                <p className="text-sm text-muted-foreground">密码要求：</p>
                <div className="space-y-1">
                  {requirements.map((req, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm"
                    >
                      {req.met ? (
                        <Check className="h-4 w-4 text-chart-5" />
                      ) : (
                        <X className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span
                        className={
                          req.met ? "text-chart-5" : "text-muted-foreground"
                        }
                      >
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </FormItem>
        )}
      />

      {/* Confirm Password Field */}
      <FormField
        control={control}
        name="confirmPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel>确认新密码</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  {...field}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="请再次输入新密码"
                  disabled={isLoading}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full h-12 bg-secondary hover:bg-secondary/90 text-white font-medium"
        disabled={isLoading}
      >
        {isLoading ? "修改中..." : "修改密码"}
      </Button>
    </form>
  );
}
