"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import {
  sendPhoneOtpAction,
  signInWithOtpAction,
  updatePhoneNumberAction,
} from "@/app/_actions/auth";
import {
  type PhoneFormMode,
  type SecurityStatus,
  UpdatePhoneForm,
} from "@/components/security";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useOtpCountdown } from "@/hooks/use-otp-countdown";
import { createClientLogger } from "@/infra/logging/client-logger";

const logger = createClientLogger({ module: "security-phone-page" });

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
    try {
      setIsLoading(true);

      const result = await sendPhoneOtpAction(phoneNumber);

      if (!result.success) {
        logger.error({ error: result.error }, "发送验证码失败");
        toast.error(result.error || "发送验证码失败，请重试");
      } else {
        toast.success("验证码已发送");
        startCountdown();
      }
    } catch (error) {
      logger.error({ err: error }, "发送验证码异常");
      toast.error("网络错误，请稍后重试");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle form submission
   * Verify OTP and update phone number
   */
  const handleSubmit = async (data: { phoneNumber: string; otp: string }) => {
    try {
      setIsLoading(true);

      // 1. Verify OTP using server action
      const verifyResult = await signInWithOtpAction({
        account: data.phoneNumber,
        otp: data.otp,
        agreedToTerms: true,
      });

      if (!verifyResult.success) {
        logger.error({ error: verifyResult.error }, "验证码验证失败");
        toast.error(verifyResult.error || "验证码错误，请重试");
        return;
      }

      // 2. Update phone number in database using Server Action
      const result = await updatePhoneNumberAction(data.phoneNumber);

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
      logger.error({ err: error }, "Update phone number error");
      toast.error("网络错误，请稍后重试");
    } finally {
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
      </CardContent>
    </Card>
  );
}
