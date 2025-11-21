"use client";

import { Turnstile } from "@marsidev/react-turnstile";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import type { SecurityStatus } from "@/components/security";
import UpdatePhoneForm, {
  type PhoneFormMode,
} from "@/components/security/update-phone-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useOtpCountdown } from "@/hooks/use-otp-countdown";
import { useTurnstileCaptcha } from "@/hooks/use-turnstile-captcha";
import { updatePhoneNumberAction } from "@/lib/actions/auth";
import { authClient } from "@/lib/auth/client";
import { getTurnstileSiteKey } from "@/services/turnstile";

const TURNSTILE_SITE_KEY = getTurnstileSiteKey();

/**
 * Props for the PhonePageClient component
 */
interface PhonePageClientProps {
  /** Current phone number (masked) or null if not set */
  currentPhoneNumber: string | null;
  /** Current security status */
  currentStatus: SecurityStatus;
}

/**
 * Client component for phone number management
 *
 * Handles the OTP verification flow:
 * 1. User enters new phone number (or uses current for verify mode)
 * 2. Send OTP to phone number
 * 3. User enters OTP
 * 4. Verify OTP using better-auth
 * 5. Update database using Server Action
 * 6. Redirect back to security page
 */
export default function PhonePageClient({
  currentPhoneNumber,
  currentStatus,
}: PhonePageClientProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { countdown, start: startCountdown } = useOtpCountdown();
  const {
    turnstileRef,
    setError: setCaptchaError,
    prepareCaptchaRequest,
  } = useTurnstileCaptcha();
  const isCaptchaValidationError = (error?: { message?: string }) =>
    typeof error?.message === "string" &&
    error.message.toLowerCase().includes("captcha");

  // Determine form mode based on current status
  const mode: PhoneFormMode =
    currentStatus === "notSet"
      ? "bind"
      : currentStatus === "unverified"
        ? "verify"
        : "update";

  /**
   * Handle sending OTP to the new phone number
   */
  const handleSendOtp = async (phoneNumber: string) => {
    const captchaRequest = await prepareCaptchaRequest();

    if (!captchaRequest) {
      return;
    }

    setIsLoading(true);

    // Add +86 prefix for China mainland phone numbers
    const fullPhoneNumber = `+86${phoneNumber}`;

    try {
      const { error } = await authClient.phoneNumber.sendOtp({
        phoneNumber: fullPhoneNumber,
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
        toast.success("验证码已发送");
        startCountdown();
      }
    } catch (error) {
      console.error("发送验证码异常:", error);
      toast.error("网络错误，请稍后重试");
    } finally {
      captchaRequest.complete();
      setIsLoading(false);
    }
  };

  /**
   * Handle form submission
   * Verify OTP and update phone number
   */
  const handleSubmit = async (data: { phoneNumber: string; otp: string }) => {
    const captchaRequest = await prepareCaptchaRequest();

    if (!captchaRequest) {
      return;
    }

    setIsLoading(true);

    // Add +86 prefix for China mainland phone numbers
    const fullPhoneNumber = `+86${data.phoneNumber}`;

    try {
      // 1. Verify OTP using better-auth
      const { error: verifyError } = await authClient.phoneNumber.verify({
        phoneNumber: fullPhoneNumber,
        code: data.otp,
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

      // 2. Update phone number in database using Server Action
      const result = await updatePhoneNumberAction(fullPhoneNumber);

      if (!result.success) {
        toast.error(result.error || "更新手机号失败");
        return;
      }

      toast.success("手机号更新成功");
      // Redirect back to security page after 1 second
      setTimeout(() => {
        router.push("/home/security");
      }, 1000);
    } catch (error) {
      console.error("Update phone number error:", error);
      toast.error("网络错误，请稍后重试");
    } finally {
      captchaRequest.complete();
      setIsLoading(false);
    }
  };

  // Dynamic title based on mode
  const getTitle = () => {
    switch (mode) {
      case "bind":
        return "绑定手机号";
      case "verify":
        return "验证手机号";
      case "update":
        return "修改手机号";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{getTitle()}</CardTitle>
      </CardHeader>
      <CardContent>
        <UpdatePhoneForm
          currentPhoneNumber={currentPhoneNumber}
          mode={mode}
          onSubmit={handleSubmit}
          onSendOtp={handleSendOtp}
          isLoading={isLoading}
          countdown={countdown}
        />
        <div className="mt-6 space-y-3">
          <p className="text-sm text-gray-600 text-center">
            {mode === "bind"
              ? "绑定手机号前请完成人机验证"
              : mode === "verify"
                ? "验证手机号前请完成人机验证"
                : "修改手机号前请完成人机验证"}
            ，每次发送或提交验证码都会消耗一次令牌。
          </p>
          <Turnstile
            ref={turnstileRef}
            siteKey={TURNSTILE_SITE_KEY}
            options={{
              size: "invisible",
              execution: "execute",
              action: "update-phone",
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
