"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nomad/ui/components/button";
import { Checkbox } from "@nomad/ui/components/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@nomad/ui/components/form";
import { Input } from "@nomad/ui/components/input";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  type EmailVerificationData,
  emailVerificationSchema,
} from "@/types/validations";

import OtpInput from "./otp-input";

interface EmailVerificationFormProps {
  onSubmit: (data: EmailVerificationData) => void;
  isLoading?: boolean;
  onSendOtp?: () => void;
  countdown?: number;
  onEmailChange?: (email: string) => void;
}

export default function EmailVerificationForm({
  onSubmit,
  isLoading = false,
  onSendOtp,
  countdown = 0,
  onEmailChange,
}: EmailVerificationFormProps) {
  const form = useForm<EmailVerificationData>({
    resolver: zodResolver(emailVerificationSchema),
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

  const handleSubmit = (data: EmailVerificationData) => {
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
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  邮箱验证码
                </FormLabel>
                <FormControl>
                  <OtpInput
                    value={field.value}
                    onChange={field.onChange}
                    onSendOtp={handleSendOtp}
                    countdown={countdown}
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
                    同意《
                    <button
                      type="button"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      服务协议
                    </button>
                    》和《
                    <button
                      type="button"
                      className="text-blue-600 hover:text-blue-800 underline"
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
          >
            企业客户注册
          </button>
        </div>
      </form>
    </Form>
  );
}
