"use client";

import { Turnstile } from "@marsidev/react-turnstile";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { updateEmailAction } from "@/app/_actions/auth";
import type { SecurityStatus } from "@/components/security";
import UpdateEmailForm, {
  type EmailFormMode,
} from "@/components/security/update-email-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authClient } from "@/domains/auth/client";
import { useOtpCountdown } from "@/hooks/use-otp-countdown";
import { useTurnstileCaptcha } from "@/hooks/use-turnstile-captcha";

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
  const [showCaptcha, setShowCaptcha] = useState(false);
  const { countdown, start: startCountdown } = useOtpCountdown();
  const {
    siteKey,
    turnstileRef,
    isVerifying,
    setError: setCaptchaError,
    prepareCaptchaRequest,
  } = useTurnstileCaptcha();
  const isCaptchaValidationError = (error?: { message?: string }) =>
    typeof error?.message === "string" &&
    error.message.toLowerCase().includes("captcha");

  // Determine form mode based on current status
  const mode: EmailFormMode =
    currentStatus === "notSet"
      ? "bind"
      : currentStatus === "unverified"
        ? "verify"
        : "update";

  /**
   * Handle sending OTP to the new email address
   */
  const handleSendOtp = async (email: string) => {
    try {
      // Show Turnstile widget before triggering verification
      setShowCaptcha(true);

      // Trigger Turnstile verification
      const captchaRequest = await prepareCaptchaRequest();

      if (!captchaRequest) {
        toast.error("人机验证失败，请重新完成验证");
        return;
      }

      setIsLoading(true);

      const { error } = await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "email-verification",
        fetchOptions: captchaRequest.fetchOptions,
      });

      if (error) {
        if (isCaptchaValidationError(error)) {
          setCaptchaError("人机验证失败，请重新完成人机验证");
          toast.error("人机验证失败，请重试");
          return;
        }
        console.error("发送验证码失败:", error);
        toast.error("发送验证码失败，请重试");
      } else {
        toast.success("验证码已发送到新邮箱");
        startCountdown();
      }
    } catch (error) {
      console.error("发送验证码异常:", error);
      toast.error("网络错误，请稍后重试");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle form submission
   * Verify OTP and update email
   */
  const handleSubmit = async (data: { email: string; otp: string }) => {
    try {
      // Show Turnstile widget before triggering verification
      setShowCaptcha(true);

      // Trigger Turnstile verification
      const captchaRequest = await prepareCaptchaRequest();

      if (!captchaRequest) {
        toast.error("人机验证失败，请重新完成验证");
        return;
      }

      setIsLoading(true);

      // 1. Verify OTP using better-auth
      const { error: verifyError } = await authClient.emailOtp.verifyEmail({
        email: data.email,
        otp: data.otp,
        fetchOptions: captchaRequest.fetchOptions,
      });

      if (verifyError) {
        if (isCaptchaValidationError(verifyError)) {
          setCaptchaError("人机验证失败，请重新完成人机验证");
          toast.error("人机验证失败，请重试");
          return;
        }
        console.error("验证码验证失败:", verifyError);
        toast.error("验证码错误，请重试");
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

        {/* Turnstile Widget - Hidden by default, shown when user clicks send OTP or submit */}
        <div className={showCaptcha ? "mt-6" : "hidden"}>
          <Turnstile
            ref={turnstileRef}
            siteKey={siteKey}
            options={{
              appearance: "always",
              refreshExpired: "never",
              size: "normal",
              execution: "execute",
              action: "update-email",
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
