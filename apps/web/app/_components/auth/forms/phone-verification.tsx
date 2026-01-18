"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nomad/ui/components/primitives/button";
import { Checkbox } from "@nomad/ui/components/primitives/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@nomad/ui/components/primitives/form";
import { Input } from "@nomad/ui/components/primitives/input";
import { OtpInput } from "@nomad/ui/components/security/otp-input";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  type PhoneVerificationData,
  phoneVerificationSchema,
} from "@/types/validations";

interface PhoneVerificationFormProps {
  onSubmit: (data: PhoneVerificationData) => void;
  isLoading?: boolean;
  onSendOtp?: () => void;
  countdown?: number;
  onPhoneChange?: (phoneNumber: string) => void;
}

export default function PhoneVerificationForm({
  onSubmit,
  isLoading = false,
  onSendOtp,
  countdown = 0,
  onPhoneChange,
}: PhoneVerificationFormProps) {
  const form = useForm<PhoneVerificationData>({
    resolver: zodResolver(phoneVerificationSchema),
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

  const handleSubmit = (data: PhoneVerificationData) => {
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
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  短信验证码
                </FormLabel>
                <FormControl>
                  <OtpInput
                    value={field.value}
                    onChange={field.onChange}
                    onSendOtp={handleSendOtp}
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
