"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
  type EmailOtpLoginData,
  emailOtpLoginSchema,
} from "@/types/validations/auth";

interface EmailOtpLoginFormProps {
  onSubmit: (data: EmailOtpLoginData) => void;
  isLoading?: boolean;
  onSendOtp?: () => void;
  countdown?: number;
  onEmailChange?: (email: string) => void;
}

export default function EmailOtpLoginForm({
  onSubmit,
  isLoading = false,
  onSendOtp,
  countdown = 0,
  onEmailChange,
}: EmailOtpLoginFormProps) {
  const form = useForm<EmailOtpLoginData>({
    resolver: zodResolver(emailOtpLoginSchema),
    defaultValues: {
      email: "",
      otp: "",
      agreedToTerms: false,
    },
  });

  // Watch for changes in email
  const watchedEmail = form.watch("email");

  useEffect(() => {
    if (onEmailChange && watchedEmail) {
      onEmailChange(watchedEmail);
    }
  }, [watchedEmail, onEmailChange]);

  const handleSubmit = (data: EmailOtpLoginData) => {
    onSubmit(data);
  };

  const handleSendOtp = () => {
    if (onSendOtp) {
      onSendOtp();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="space-y-4">
          {/* Email Section */}
          <div>
            <FormLabel className="text-sm font-medium text-gray-700 mb-3 block">
              邮箱地址
            </FormLabel>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="请输入邮箱地址"
                      className="h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* OTP Section */}
          <div>
            <FormLabel className="text-sm font-medium text-gray-700 mb-3 block">
              邮箱验证码
            </FormLabel>
            <div className="flex gap-2">
              {/* OTP Input */}
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="6位数字"
                        className="h-12"
                        maxLength={6}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Send OTP Button */}
              <Button
                type="button"
                variant="outline"
                className="h-12 px-4 text-blue-600 border-blue-600 hover:bg-blue-50"
                onClick={handleSendOtp}
                disabled={countdown > 0 || isLoading}
              >
                {countdown > 0 ? `${countdown}s` : "发送验证码"}
              </Button>
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <FormField
          control={form.control}
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
                  我已阅读并同意
                  <Link
                    href="/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline ml-1"
                  >
                    服务协议
                  </Link>
                  和
                  <Link
                    href="/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline ml-1"
                  >
                    隐私政策
                  </Link>
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white"
          disabled={isLoading}
        >
          {isLoading ? "登录中..." : "登录"}
        </Button>
      </form>
    </Form>
  );
}
