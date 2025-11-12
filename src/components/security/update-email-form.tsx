"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

/**
 * Schema for email update form
 * Simplified version without agreedToTerms checkbox
 */
const updateEmailSchema = z.object({
  email: z.string().min(1, "请输入邮箱地址").email("邮箱格式不正确"),
  otp: z
    .string()
    .min(6, "验证码必须是6位数字")
    .max(6, "验证码必须是6位数字")
    .regex(/^[0-9]{6}$/, "验证码只能包含数字"),
});

type UpdateEmailData = z.infer<typeof updateEmailSchema>;

interface UpdateEmailFormProps {
  currentEmail: string;
  onSubmit: (data: UpdateEmailData) => void;
  onSendOtp: (email: string) => void;
  isLoading?: boolean;
  countdown?: number;
}

export default function UpdateEmailForm({
  currentEmail,
  onSubmit,
  onSendOtp,
  isLoading = false,
  countdown = 0,
}: UpdateEmailFormProps) {
  const [email, setEmail] = useState("");

  const form = useForm<UpdateEmailData>({
    resolver: zodResolver(updateEmailSchema),
    defaultValues: {
      email: "",
      otp: "",
    },
  });

  // Watch for changes in email
  const watchedEmail = form.watch("email");

  useEffect(() => {
    setEmail(watchedEmail);
  }, [watchedEmail]);

  const handleSubmit = (data: UpdateEmailData) => {
    onSubmit(data);
  };

  const handleSendOtp = async () => {
    // Validate email before sending OTP
    const isValid = await form.trigger("email");
    if (isValid) {
      onSendOtp(form.getValues("email"));
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Current Email Display */}
        <div className="rounded-lg bg-gray-50 p-4">
          <p className="text-sm text-gray-600">
            当前邮箱：<span className="font-medium">{currentEmail}</span>
          </p>
        </div>

        <div className="space-y-4">
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  新邮箱地址
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="请输入新邮箱地址"
                    className="h-12"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* OTP Field */}
          <div>
            <FormLabel className="text-sm font-medium text-gray-700 mb-3 block">
              邮箱验证码
            </FormLabel>
            <div className="flex gap-2">
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
                        disabled={isLoading}
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
                disabled={countdown > 0 || isLoading || !email}
              >
                {countdown > 0 ? `${countdown}s` : "发送验证码"}
              </Button>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-medium"
          disabled={isLoading}
        >
          {isLoading ? "验证中..." : "确认修改"}
        </Button>
      </form>
    </Form>
  );
}
