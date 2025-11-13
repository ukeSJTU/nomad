"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { TurnstileWidget } from "@/components/security/turnstile-widget";
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
  type PhoneVerificationData,
  phoneVerificationSchema,
} from "@/types/auth";

interface PhoneVerificationFormProps {
  onSubmit: (data: PhoneVerificationData) => void;
  isLoading?: boolean;
  onSendOtp?: (turnstileToken: string) => void;
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

  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileError, setTurnstileError] = useState<string | null>(null);

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
    console.log("handleSendOtp called, turnstileToken:", turnstileToken);

    if (!turnstileToken) {
      setTurnstileError("请完成人机验证再发送验证码");
      return;
    }

    setTurnstileError(null);

    if (onSendOtp) {
      console.log(
        "Calling onSendOtp with token length:",
        turnstileToken.length
      );
      onSendOtp(turnstileToken);
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
                disabled={countdown > 0 || isLoading || !turnstileToken}
              >
                {countdown > 0 ? `${countdown}s` : "发送验证码"}
              </Button>
            </div>
            <div className="mt-4 space-y-2">
              <TurnstileWidget
                onSuccess={token => {
                  setTurnstileToken(token);
                  setTurnstileError(null);
                }}
                onError={() => {
                  setTurnstileToken(null);
                  setTurnstileError("验证组件加载失败，请刷新页面或检查网络");
                }}
                onExpire={() => {
                  setTurnstileToken(null);
                  setTurnstileError("验证已过期，请重新验证");
                }}
              />
              {turnstileError && (
                <p className="text-sm text-red-500">{turnstileError}</p>
              )}
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
