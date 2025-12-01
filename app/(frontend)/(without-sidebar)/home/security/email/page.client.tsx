"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";

import {
  sendEmailOtpAction,
  updateEmailAction,
  verifyEmailOtpAction,
} from "@/app/_actions/auth";
import {
  type TurnstileInstance,
  TurnstileWidget,
} from "@/components/auth/turnstile";
import type { SecurityStatus } from "@/components/security";
import UpdateEmailForm, {
  type EmailFormMode,
} from "@/components/security/update-email-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useOtpCountdown } from "@/hooks/use-otp-countdown";

/**
 * Props for the EmailPageClient component
 */
interface EmailPageClientProps {
  /** Current email address (masked) */
  currentEmail: string;
  /** Current security status */
  currentStatus: SecurityStatus;
}

/**
 * Client component for email management
 *
 * Handles the OTP verification flow:
 * 1. User enters new email address
 * 2. Send OTP to new email address
 * 3. User enters OTP
 * 4. Verify OTP using better-auth
 * 5. Update database using Server Action
 * 6. Redirect back to security page
 */
export default function EmailPageClient({
  currentEmail,
  currentStatus,
}: EmailPageClientProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const { countdown, start: startCountdown } = useOtpCountdown();
  const turnstileRef = useRef<TurnstileInstance | undefined>(null);

  // Determine form mode based on current status
  const mode: EmailFormMode =
    currentStatus === "notSet"
      ? "bind"
      : currentStatus === "unverified"
        ? "verify"
        : "update";

  /**
   * Handle sending OTP to the new email address
   * Requires Turnstile verification before sending
   */
  const handleSendOtp = async (email: string) => {
    setIsVerifying(true);
    try {
      // Get Turnstile token
      const token = await turnstileRef.current?.getResponsePromise();

      if (!token) {
        toast.error("人机验证失败，请重试");
        turnstileRef.current?.reset();
        return;
      }

      setIsLoading(true);

      const result = await sendEmailOtpAction(email, "email-verification", {
        headers: { "x-captcha-token": token },
      });

      if (!result.success) {
        console.error("发送验证码失败:", result.error);
        toast.error(result.error || "发送验证码失败，请重试");
      } else {
        toast.success("验证码已发送到新邮箱");
        startCountdown();
      }

      // Reset Turnstile for next use
      turnstileRef.current?.reset();
    } catch (error) {
      console.error("发送验证码异常:", error);
      toast.error("人机验证失败，请重试");
      turnstileRef.current?.reset();
    } finally {
      setIsLoading(false);
      setIsVerifying(false);
    }
  };

  /**
   * Handle form submission
   * Verify OTP and update email
   */
  const handleSubmit = async (data: { email: string; otp: string }) => {
    try {
      setIsLoading(true);

      // 1. Verify OTP using better-auth
      const verifyResult = await verifyEmailOtpAction({
        email: data.email,
        otp: data.otp,
        agreedToTerms: true,
      });

      if (!verifyResult.success) {
        console.error("验证码验证失败:", verifyResult.error);
        toast.error(verifyResult.error || "验证码错误，请重试");
        return;
      }

      // 2. Update email in database using Server Action
      const result = await updateEmailAction(data.email);

      if (!result.success) {
        toast.error(result.error || "更新邮箱失败");
        return;
      }

      toast.success("邮箱更新成功");
      // Redirect back to security page after 1 second
      setTimeout(() => {
        router.push("/home/security");
      }, 1000);
    } catch (error) {
      console.error("Update email error:", error);
      toast.error("网络错误，请稍后重试");
    } finally {
      setIsLoading(false);
    }
  };

  // Dynamic title based on mode
  const getTitle = () => {
    switch (mode) {
      case "bind":
        return "绑定邮箱";
      case "verify":
        return "验证邮箱";
      case "update":
        return "修改邮箱";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{getTitle()}</CardTitle>
      </CardHeader>
      <CardContent>
        <UpdateEmailForm
          currentEmail={currentEmail}
          mode={mode}
          onSubmit={handleSubmit}
          onSendOtp={handleSendOtp}
          isLoading={isLoading}
          isVerifying={isVerifying}
          countdown={countdown}
        />

        {/* Invisible Turnstile Widget for OTP verification */}
        <TurnstileWidget
          ref={turnstileRef}
          action="send-email-otp"
          size="invisible"
        />
      </CardContent>
    </Card>
  );
}
