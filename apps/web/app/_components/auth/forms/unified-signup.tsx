"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@nomad/ui/components/tabs";
import { useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import type { OtpSendActionResult } from "@/app/_actions/auth";
import { useOtpCountdown } from "@/hooks/use-otp-countdown";
import { buildOtpStorageKey } from "@/lib/otp";
import { cn } from "@/lib/utils";
import type { ActionResult } from "@/types/common";
import type { FetchOptions } from "@/types/http";
import type {
  EmailVerificationData,
  PhoneVerificationData,
} from "@/types/validations";

import { type TurnstileInstance, TurnstileWidget } from "../turnstile";
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
  ) => Promise<OtpSendActionResult>;

  /** Callback to send email OTP */
  onSendEmailOtp: (
    email: string,
    fetchOptions?: FetchOptions
  ) => Promise<OtpSendActionResult>;

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
  const [isVerifying, setIsVerifying] = useState(false);
  const [currentPhoneNumber, setCurrentPhoneNumber] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  const countdownKey = useMemo(() => {
    if (_method === "phone" && currentPhoneNumber) {
      return buildOtpStorageKey("phone", currentPhoneNumber);
    }

    if (_method === "email" && currentEmail) {
      return buildOtpStorageKey("email", currentEmail);
    }

    return null;
  }, [_method, currentEmail, currentPhoneNumber]);
  const { countdown, start: startCountdown } = useOtpCountdown({
    storageKey: countdownKey,
  });
  const turnstileRef = useRef<TurnstileInstance>(null);

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

    setIsVerifying(true);

    try {
      // Get captcha token from Turnstile
      const token = await turnstileRef.current?.getResponsePromise();

      if (!token) {
        toast.error("人机验证失败，请重试");
        return;
      }

      const fetchOptions: FetchOptions = {
        headers: {
          "x-captcha-token": token,
        },
      };

      const result = await onSendPhoneOtp(currentPhoneNumber, fetchOptions);

      if (result.success) {
        startCountdown();
      } else {
        if (result.retryAfterSeconds) {
          startCountdown(result.retryAfterSeconds);
        }
        toast.error(result.error || "发送验证码失败，请重试");
      }
    } catch {
      toast.error("发送验证码失败，请重试");
    } finally {
      setIsVerifying(false);
      turnstileRef.current?.reset();
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

    setIsVerifying(true);

    try {
      // Get captcha token from Turnstile
      const token = await turnstileRef.current?.getResponsePromise();

      if (!token) {
        toast.error("人机验证失败，请重试");
        return;
      }

      const fetchOptions: FetchOptions = {
        headers: {
          "x-captcha-token": token,
        },
      };

      const result = await onSendEmailOtp(currentEmail, fetchOptions);

      if (result.success) {
        startCountdown();
      } else {
        if (result.retryAfterSeconds) {
          startCountdown(result.retryAfterSeconds);
        }
        toast.error(result.error || "发送验证码失败，请重试");
      }
    } catch {
      toast.error("发送验证码失败，请重试");
    } finally {
      setIsVerifying(false);
      turnstileRef.current?.reset();
    }
  };

  /**
   * Handle phone verification form submission (no CAPTCHA - only for OTP send)
   */
  const handlePhoneSubmit = async (data: PhoneVerificationData) => {
    try {
      await onPhoneVerified(data);
    } catch {
      toast.error("验证失败，请重试");
    }
  };

  /**
   * Handle email verification form submission (no CAPTCHA - only for OTP send)
   */
  const handleEmailSubmit = async (data: EmailVerificationData) => {
    try {
      await onEmailVerified(data);
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

      {/* Turnstile Widget - invisible mode for OTP sending */}
      <TurnstileWidget
        ref={turnstileRef}
        action="signup-otp"
        size="invisible"
      />
    </div>
  );
}
