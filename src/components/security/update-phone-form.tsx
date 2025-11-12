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
 * Schema for phone number update form
 * Simplified version without agreedToTerms checkbox
 */
const updatePhoneSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, "请输入手机号")
    .regex(/^[0-9]+$/, "手机号码只能包含数字")
    .min(11, "手机号码必须是11位")
    .max(11, "手机号码必须是11位"),
  otp: z
    .string()
    .min(6, "验证码必须是6位数字")
    .max(6, "验证码必须是6位数字")
    .regex(/^[0-9]{6}$/, "验证码只能包含数字"),
});

type UpdatePhoneData = z.infer<typeof updatePhoneSchema>;

interface UpdatePhoneFormProps {
  currentPhoneNumber: string | null;
  onSubmit: (data: UpdatePhoneData) => void;
  onSendOtp: (phoneNumber: string) => void;
  isLoading?: boolean;
  countdown?: number;
}

export default function UpdatePhoneForm({
  currentPhoneNumber,
  onSubmit,
  onSendOtp,
  isLoading = false,
  countdown = 0,
}: UpdatePhoneFormProps) {
  const [phoneNumber, setPhoneNumber] = useState("");

  const form = useForm<UpdatePhoneData>({
    resolver: zodResolver(updatePhoneSchema),
    defaultValues: {
      phoneNumber: "",
      otp: "",
    },
  });

  // Watch for changes in phoneNumber
  const watchedPhoneNumber = form.watch("phoneNumber");

  useEffect(() => {
    setPhoneNumber(watchedPhoneNumber);
  }, [watchedPhoneNumber]);

  const handleSubmit = (data: UpdatePhoneData) => {
    onSubmit(data);
  };

  const handleSendOtp = async () => {
    // Validate phone number before sending OTP
    const isValid = await form.trigger("phoneNumber");
    if (isValid) {
      onSendOtp(form.getValues("phoneNumber"));
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Current Phone Number Display */}
        {currentPhoneNumber && (
          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-sm text-gray-600">
              当前手机号：
              <span className="font-medium">{currentPhoneNumber}</span>
            </p>
          </div>
        )}

        <div className="space-y-4">
          {/* Phone Number Field */}
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  新手机号
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="tel"
                    placeholder="请输入新手机号"
                    className="h-12"
                    maxLength={11}
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
              短信验证码
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
                disabled={countdown > 0 || isLoading || !phoneNumber}
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
