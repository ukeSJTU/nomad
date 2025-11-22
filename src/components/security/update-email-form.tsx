"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import OtpInput from "@/components/auth/forms/otp-input";
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
  type UpdateEmailData,
  updateEmailSchema,
} from "@/types/validations/auth";

export type EmailFormMode = "bind" | "verify" | "update";

interface UpdateEmailFormProps {
  /** Current email address (empty for bind mode) */
  currentEmail?: string;
  /** Form mode: bind (first time), verify (existing unverified), update (change verified) */
  mode: EmailFormMode;
  onSubmit: (data: UpdateEmailData) => void;
  onSendOtp: (email: string) => void;
  isLoading?: boolean;
  countdown?: number;
}

/**
 * Get mode-specific configuration for UI labels and descriptions
 */
function getModeConfig(mode: EmailFormMode) {
  switch (mode) {
    case "bind":
      return {
        title: "绑定邮箱",
        currentLabel: null,
        emailLabel: "邮箱地址",
        emailPlaceholder: "请输入邮箱地址",
        submitText: "确认绑定",
        description: "首次绑定邮箱，验证后可用于登录和找回密码",
      };
    case "verify":
      return {
        title: "验证邮箱",
        currentLabel: "待验证的邮箱",
        emailLabel: null, // Don't show email input, use current email
        emailPlaceholder: null,
        submitText: "确认验证",
        description: "您的邮箱尚未验证，请输入验证码完成验证",
      };
    case "update":
      return {
        title: "修改邮箱",
        currentLabel: "当前邮箱",
        emailLabel: "新邮箱地址",
        emailPlaceholder: "请输入新邮箱地址",
        submitText: "确认修改",
        description: "修改邮箱后，新邮箱将用于登录和接收通知",
      };
  }
}

export default function UpdateEmailForm({
  currentEmail = "",
  mode,
  onSubmit,
  onSendOtp,
  isLoading = false,
  countdown = 0,
}: UpdateEmailFormProps) {
  const config = getModeConfig(mode);

  const form = useForm<UpdateEmailData>({
    resolver: zodResolver(updateEmailSchema),
    defaultValues: {
      email: mode === "verify" ? currentEmail : "",
      otp: "",
    },
  });

  // Watch for changes in email
  const email = form.watch("email");

  const handleSubmit = (data: UpdateEmailData) => {
    onSubmit(data);
  };

  const handleSendOtp = async () => {
    // For verify mode, use current email
    const targetEmail =
      mode === "verify" ? currentEmail : form.getValues("email");

    // Validate email before sending OTP (skip for verify mode since email is fixed)
    if (mode !== "verify") {
      const isValid = await form.trigger("email");
      if (!isValid) return;
    }

    onSendOtp(targetEmail);
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

        {/* Current Email Display */}
        {config.currentLabel && currentEmail && (
          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm text-muted-foreground">
              {config.currentLabel}：
              <span className="font-medium">{currentEmail}</span>
            </p>
          </div>
        )}

        <div className="space-y-4">
          {/* Email Field (hidden for verify mode) */}
          {config.emailLabel && (
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground">
                    {config.emailLabel}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder={config.emailPlaceholder || ""}
                      className="h-12"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Hidden email field for verify mode */}
          {mode === "verify" && (
            <FormField
              control={form.control}
              name="email"
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
                    maxLength={6}
                    disabled={mode !== "verify" && !email}
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
