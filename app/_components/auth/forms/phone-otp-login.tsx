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
  type PhoneOtpLoginData,
  phoneOtpLoginSchema,
} from "@/types/validations/auth";

interface PhoneOtpLoginFormProps {
  onSubmit: (data: PhoneOtpLoginData) => void;
  isLoading?: boolean;
  onSendOtp?: () => void;
  countdown?: number;
  onPhoneChange?: (phoneNumber: string) => void;
}

export default function PhoneOtpLoginForm({
  onSubmit,
  isLoading = false,
  onSendOtp,
  countdown = 0,
  onPhoneChange,
}: PhoneOtpLoginFormProps) {
  const form = useForm<PhoneOtpLoginData>({
    resolver: zodResolver(phoneOtpLoginSchema),
    defaultValues: {
      phoneNumber: "",
      otp: "",
      agreedToTerms: false,
    },
  });

  // Watch for changes in phoneNumber
  const phoneNumber = form.watch("phoneNumber");

  useEffect(() => {
    if (onPhoneChange && phoneNumber) {
      onPhoneChange(phoneNumber);
    }
  }, [phoneNumber, onPhoneChange]);

  const handleSubmit = (data: PhoneOtpLoginData) => {
    onSubmit(data);
  };

  const handleSendOtp = async () => {
    // Validate phone number field before sending OTP
    const phoneNumberValid = await form.trigger("phoneNumber");

    if (!phoneNumberValid) {
      return; // Don't send OTP if validation fails
    }

    if (onSendOtp) {
      onSendOtp();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="space-y-4">
          {/* Phone Number Section */}
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  手机号
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="tel"
                    placeholder="请输入手机号"
                    className="h-12"
                    maxLength={11}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* OTP Section */}
          <div>
            <FormLabel className="text-sm font-medium text-gray-700 mb-3 block">
              短信验证码
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
                    <Link
                      href="/terms"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      服务协议
                    </Link>
                    》和《
                    <Link
                      href="/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      隐私政策
                    </Link>
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
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white"
          disabled={isLoading}
        >
          {isLoading ? "登录中..." : "登录"}
        </Button>
      </form>
    </Form>
  );
}
