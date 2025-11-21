"use client";

import { Turnstile } from "@marsidev/react-turnstile";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTurnstileCaptcha } from "@/hooks/use-turnstile-captcha";
import { cn } from "@/lib/utils";
import type { ActionResult } from "@/types/dto/action";
import type { FetchOptions } from "@/types/http";
import type {
  EmailVerificationData,
  PhoneVerificationData,
} from "@/types/validations/auth";

import EmailVerificationForm from "./email-verification";
import PhoneVerificationForm from "./phone-verification";

export interface UnifiedSignUpFormProps {
  /** Callback when phone verification succeeds */
  onPhoneVerified: (
    data: PhoneVerificationData,
    fetchOptions?: FetchOptions
  ) => Promise<ActionResult>;

  /** Callback when email verification succeeds */
  onEmailVerified: (
    data: EmailVerificationData,
    fetchOptions?: FetchOptions
  ) => Promise<ActionResult>;

  /** Callback to send phone OTP */
  onSendPhoneOtp: (
    phoneNumber: string,
    fetchOptions?: FetchOptions
  ) => Promise<boolean>;

  /** Callback to send email OTP */
  onSendEmailOtp: (
    email: string,
    fetchOptions?: FetchOptions
  ) => Promise<boolean>;

  /** Loading state from parent */
  isLoading?: boolean;

  /** Initial sign-up method */
  initialMethod?: "phone" | "email";

  /** Callback when method changes */
  onMethodChange?: (method: "phone" | "email") => void;

  /** Custom className */
  className?: string;
}

export default function UnifiedSignUpForm({
  onPhoneVerified,
  onEmailVerified,
  onSendPhoneOtp,
  onSendEmailOtp,
  isLoading = false,
  initialMethod = "phone",
  onMethodChange,
  className,
}: UnifiedSignUpFormProps) {
  const [_method, setMethod] = useState<"phone" | "email">(initialMethod);
  const [countdown, setCountdown] = useState(0);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [currentPhoneNumber, setCurrentPhoneNumber] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");

  const { siteKey, turnstileRef, isVerifying, prepareCaptchaRequest } =
    useTurnstileCaptcha();

  // Countdown timer effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleMethodChange = (value: string) => {
    const newMethod = value as "phone" | "email";
    setMethod(newMethod);
    onMethodChange?.(newMethod);
  };

  /**
   * Handle sending phone OTP with Turnstile verification
   */
  const handleSendPhoneOtp = async () => {
    if (!currentPhoneNumber) {
      toast.error("请先输入手机号");
      return;
    }

    try {
      setShowCaptcha(true);

      const context = await prepareCaptchaRequest();
      if (!context) {
        return;
      }

      const success = await onSendPhoneOtp(
        currentPhoneNumber,
        context.fetchOptions
      );

      if (success) {
        setCountdown(60);
      } else {
        toast.error("发送验证码失败，请重试");
      }
    } catch {
      toast.error("发送验证码失败，请重试");
    }
  };

  /**
   * Handle sending email OTP with Turnstile verification
   */
  const handleSendEmailOtp = async () => {
    if (!currentEmail) {
      toast.error("请先输入邮箱地址");
      return;
    }

    try {
      setShowCaptcha(true);

      const context = await prepareCaptchaRequest();
      if (!context) {
        return;
      }

      const success = await onSendEmailOtp(currentEmail, context.fetchOptions);

      if (success) {
        setCountdown(60);
      } else {
        toast.error("发送验证码失败，请重试");
      }
    } catch {
      toast.error("发送验证码失败，请重试");
    }
  };

  /**
   * Handle phone verification form submission with CAPTCHA
   */
  const handlePhoneSubmit = async (data: PhoneVerificationData) => {
    try {
      setShowCaptcha(true);

      const context = await prepareCaptchaRequest();
      if (!context) {
        return;
      }

      await onPhoneVerified(data, context.fetchOptions);
    } catch {
      toast.error("验证失败，请重试");
    }
  };

  /**
   * Handle email verification form submission with CAPTCHA
   */
  const handleEmailSubmit = async (data: EmailVerificationData) => {
    try {
      setShowCaptcha(true);

      const context = await prepareCaptchaRequest();
      if (!context) {
        return;
      }

      await onEmailVerified(data, context.fetchOptions);
    } catch {
      toast.error("验证失败，请重试");
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <Tabs
        defaultValue={initialMethod}
        className="w-full"
        onValueChange={handleMethodChange}
      >
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="phone">手机注册</TabsTrigger>
          <TabsTrigger value="email">邮箱注册</TabsTrigger>
        </TabsList>

        {/* Phone Verification Tab */}
        <TabsContent value="phone">
          <PhoneVerificationForm
            onSubmit={handlePhoneSubmit}
            onSendOtp={handleSendPhoneOtp}
            onPhoneChange={setCurrentPhoneNumber}
            isLoading={isLoading || isVerifying}
            countdown={countdown}
          />
        </TabsContent>

        {/* Email Verification Tab */}
        <TabsContent value="email">
          <EmailVerificationForm
            onSubmit={handleEmailSubmit}
            onSendOtp={handleSendEmailOtp}
            onEmailChange={setCurrentEmail}
            isLoading={isLoading || isVerifying}
            countdown={countdown}
          />
        </TabsContent>
      </Tabs>

      {/* Turnstile Widget - Hidden by default, shown when user clicks send OTP */}
      <div className={cn(!showCaptcha && "hidden")}>
        <Turnstile
          ref={turnstileRef}
          siteKey={siteKey}
          options={{
            appearance: "always",
            refreshExpired: "never",
            size: "normal",
            execution: "execute",
            action: "sign-up-send-otp",
          }}
        />
      </div>
    </div>
  );
}
