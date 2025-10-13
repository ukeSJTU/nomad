"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, X } from "lucide-react";
import { useForm } from "react-hook-form";

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
import { type PasswordSetupData, passwordSetupSchema } from "@/types/auth";

/**
 * Props for the PasswordSetupForm component
 */
interface PasswordSetupFormProps {
  /** Callback function called when form is submitted with valid data */
  onSubmit: (data: PasswordSetupData) => void;
  /** Whether the form is in loading state (disables submit button) */
  isLoading?: boolean;
}

/**
 * Password setup form component for the registration flow
 * Allows users to set their initial password after phone verification
 * Includes real-time password requirement validation with visual feedback
 */
export default function PasswordSetupForm({
  onSubmit,
  isLoading = false,
}: PasswordSetupFormProps) {
  // Initialize form with Zod validation schema
  const form = useForm<PasswordSetupData>({
    resolver: zodResolver(passwordSetupSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // Handle form submission
  const handleSubmit = (data: PasswordSetupData) => {
    onSubmit(data);
  };

  // Watch password field for real-time validation feedback
  const password = form.watch("password");

  // Define password requirements with real-time validation
  // Each requirement shows a check/x icon based on current password input
  const requirements = [
    {
      label: "至少8位字符", // At least 8 characters
      met: password.length >= 8,
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
      label: "包含至少一个数字", // Contains at least one number
      met: /[0-9]/.test(password),
    },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="请输入密码" // Please enter password
                    className="h-12"
                  />
                </FormControl>
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
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="请再次输入密码" // Please enter password again
                    className="h-12"
                  />
                </FormControl>
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
                  {/* Show check icon if requirement is met, X icon if not */}
                  {requirement.met ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <X className="h-4 w-4 text-gray-400" />
                  )}
                  {/* Change text color based on requirement status */}
                  <span
                    className={
                      requirement.met ? "text-green-600" : "text-gray-600"
                    }
                  >
                    {requirement.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Submit Button with Loading State */}
        <Button
          type="submit"
          className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-medium"
          disabled={isLoading}
        >
          {isLoading ? "创建中..." : "完成注册"}{" "}
          {/* Creating... : Complete Registration */}
        </Button>
      </form>
    </Form>
  );
}
