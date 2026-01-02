"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nomad/ui/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@nomad/ui/components/form";
import { Input } from "@nomad/ui/components/input";
import { useForm } from "react-hook-form";
import OtpInput from "@/components/auth/forms/otp-input";
import { type UpdatePhoneData, updatePhoneSchema } from "@/types/validations";

export type PhoneFormMode = "bind" | "verify" | "update";

interface UpdatePhoneFormProps {
  /** Current phone number (empty for bind mode) */
  currentPhoneNumber?: string | null;
  /** Form mode: bind (first time), verify (existing unverified), update (change verified) */
  mode: PhoneFormMode;
  onSubmit: (data: UpdatePhoneData) => void;
  onSendOtp: (phoneNumber: string) => void;
  isLoading?: boolean;
  isVerifying?: boolean;
  countdown?: number;
}

/**
 * Get mode-specific configuration for UI labels and descriptions
 */
function getModeConfig(mode: PhoneFormMode) {
  switch (mode) {
    case "bind":
      return {
        title: "绑定手机号",
        currentLabel: null,
        phoneLabel: "手机号",
        phonePlaceholder: "请输入手机号",
        submitText: "确认绑定",
        description: "首次绑定手机号，验证后可用于登录和找回密码",
      };
    case "verify":
      return {
        title: "验证手机号",
        currentLabel: "待验证的手机号",
        phoneLabel: null, // Don't show phone input, use current phone
        phonePlaceholder: null,
        submitText: "确认验证",
        description: "您的手机号尚未验证，请输入验证码完成验证",
      };
    case "update":
      return {
        title: "修改手机号",
        currentLabel: "当前手机号",
        phoneLabel: "新手机号",
        phonePlaceholder: "请输入新手机号",
        submitText: "确认修改",
        description: "修改手机号后，新手机号将用于登录和接收通知",
      };
  }
}

export default function UpdatePhoneForm({
  currentPhoneNumber,
  mode,
  onSubmit,
  onSendOtp,
  isLoading = false,
  isVerifying = false,
  countdown = 0,
}: UpdatePhoneFormProps) {
  const config = getModeConfig(mode);

  const form = useForm<UpdatePhoneData>({
    resolver: zodResolver(updatePhoneSchema),
    defaultValues: {
      phoneNumber:
        mode === "verify" && currentPhoneNumber ? currentPhoneNumber : "",
      otp: "",
    },
  });

  // Watch for changes in phoneNumber
  const phoneNumber = form.watch("phoneNumber");

  const handleSubmit = (data: UpdatePhoneData) => {
    onSubmit(data);
  };

  const handleSendOtp = async () => {
    // For verify mode, use current phone number
    const targetPhone =
      mode === "verify" && currentPhoneNumber
        ? currentPhoneNumber
        : form.getValues("phoneNumber");

    // Validate phone number before sending OTP (skip for verify mode since phone is fixed)
    if (mode !== "verify") {
      const isValid = await form.trigger("phoneNumber");
      if (!isValid) return;
    }

    onSendOtp(targetPhone);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Description */}
        {config.description && (
          <div className="rounded-lg bg-primary/10 p-4">
            <p className="text-sm text-primary">{config.description}</p>
          </div>
        )}

        {/* Current Phone Number Display */}
        {config.currentLabel && currentPhoneNumber && (
          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm text-muted-foreground">
              {config.currentLabel}：
              <span className="font-medium">{currentPhoneNumber}</span>
            </p>
          </div>
        )}

        <div className="space-y-4">
          {/* Phone Number Field (hidden for verify mode) */}
          {config.phoneLabel && (
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground">
                    {config.phoneLabel}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="tel"
                      placeholder={config.phonePlaceholder || ""}
                      className="h-12"
                      maxLength={11}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Hidden phone field for verify mode */}
          {mode === "verify" && (
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => <input {...field} type="hidden" />}
            />
          )}

          {/* OTP Field */}
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-foreground">
                  短信验证码
                </FormLabel>
                <FormControl>
                  <OtpInput
                    value={field.value}
                    onChange={field.onChange}
                    onSendOtp={handleSendOtp}
                    countdown={countdown}
                    isLoading={isLoading}
                    isVerifying={isVerifying}
                    placeholder="6位数字"
                    maxLength={6}
                    disabled={mode !== "verify" && !phoneNumber}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full h-12 bg-secondary hover:bg-secondary/90 text-white font-medium"
          disabled={isLoading}
        >
          {isLoading ? "验证中..." : config.submitText}
        </Button>
      </form>
    </Form>
  );
}
