"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Eye, EyeOff, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import zxcvbn from "zxcvbn";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  type PasswordSetupData,
  passwordSetupSchema,
} from "@/types/validations/auth";

/**
 * Props for the PasswordSetupForm component
 */
interface PasswordSetupFormProps {
  /** Callback function called when form is submitted with valid data */
  onSubmit: (data: PasswordSetupData) => void;
  /** Whether the form is in loading state (disables submit button) */
  isLoading?: boolean;
  /** Masked phone number or email to display (e.g., "138****5678") */
  maskedIdentifier?: string;
  /** Custom submit button text (default: "完成注册") */
  submitButtonText?: string;
  /** Whether to show the help link at the bottom (default: true) */
  showHelpLink?: boolean;
}

/**
 * Password setup form component for the registration flow
 * Allows users to set their initial password after phone verification
 * Includes real-time password requirement validation with visual feedback
 */
export default function PasswordSetupForm({
  onSubmit,
  isLoading = false,
  maskedIdentifier,
  submitButtonText = "完成注册",
  showHelpLink = true,
}: PasswordSetupFormProps) {
  // Initialize form with Zod validation schema
  const form = useForm<PasswordSetupData>({
    resolver: zodResolver(passwordSetupSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  console.log("PasswordSetupForm - maskedIdentifier:", maskedIdentifier);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Handle form submission
  const handleSubmit = (data: PasswordSetupData) => {
    onSubmit(data);
  };

  // Watch password field for real-time validation feedback
  const password = form.watch("password");

  // Calculate password strength using zxcvbn
  const result = zxcvbn(password);
  const strengthScore = result.score;

  // Define password requirements with real-time validation
  // Each requirement shows a check/x icon based on current password input
  const requirements = [
    {
      label: "8-20位字符", // 8-20 characters
      met: password.length >= 8 && password.length <= 20,
    },
    {
      label: "包含至少一个大写字母", // Contains at least one uppercase letter
      met: /[A-Z]/.test(password),
    },
    {
      label: "包含至少一个小写字母", // Contains at least one lowercase letter
      met: /[a-z]/.test(password),
    },
    {
      label: "包含至少一个数字（可选）", // Contains at least one number (optional)
      met: /[0-9]/.test(password),
      optional: true,
    },
    {
      label: "包含至少一个特殊符号（如 _、!、@ 等）（可选）", // Contains at least one special character (optional)
      met: /[_!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
      optional: true,
    },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Display masked phone number or email if provided */}
        {maskedIdentifier && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-sm text-gray-700">
              <span className="font-medium">注册账号：</span>
              <span className="font-mono">{maskedIdentifier}</span>
            </p>
          </div>
        )}

        <div className="space-y-4">
          {/* Password Input Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
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
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-gray-100 transition-colors"
                    onClick={e => {
                      e.preventDefault();
                      setShowPassword(!showPassword);
                    }}
                    aria-label={showPassword ? "隐藏密码" : "显示密码"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-600" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password Input Field */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
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
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-gray-100 transition-colors"
                    onClick={e => {
                      e.preventDefault();
                      setShowConfirmPassword(!showConfirmPassword);
                    }}
                    aria-label={showConfirmPassword ? "隐藏密码" : "显示密码"}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-600" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Requirements with Real-time Validation */}
          <div className="text-sm space-y-2">
            <p className="text-gray-700 font-medium">
              密码要求：{/* Password Requirements */}
            </p>
            <ul className="space-y-2">
              {requirements.map((requirement, index) => (
                <li key={index} className="flex items-center gap-2 text-xs">
                  {requirement.optional ? (
                    requirement.met ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : null
                  ) : requirement.met ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <X className="h-4 w-4 text-gray-400" />
                  )}
                  {/* Change text color based on requirement status */}
                  <span
                    className={
                      requirement.met
                        ? "text-green-600"
                        : requirement.optional
                          ? "text-gray-500"
                          : "text-gray-600"
                    }
                  >
                    {requirement.label}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <p className="text-gray-700 font-medium">密码强度：</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      strengthScore === 0
                        ? "bg-red-500 w-0"
                        : strengthScore === 1
                          ? "bg-red-500 w-1/4"
                          : strengthScore === 2
                            ? "bg-yellow-500 w-2/4"
                            : strengthScore === 3
                              ? "bg-yellow-500 w-3/4"
                              : "bg-green-500 w-full"
                    }`}
                  ></div>
                </div>
                <span
                  className={`text-xs font-medium ${
                    strengthScore <= 1
                      ? "text-red-600"
                      : strengthScore === 2
                        ? "text-yellow-600"
                        : "text-green-600"
                  }`}
                >
                  {strengthScore <= 1
                    ? "弱"
                    : strengthScore === 2
                      ? "中"
                      : "强"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button with Loading State */}
        <Button
          type="submit"
          className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-medium"
          disabled={isLoading}
        >
          {isLoading ? "设置中..." : submitButtonText}
        </Button>

        {showHelpLink && (
          <div className="text-center mt-4">
            <a href="#" className="text-sm text-blue-600 hover:underline">
              注册遇到问题？
            </a>
          </div>
        )}
      </form>
    </Form>
  );
}
