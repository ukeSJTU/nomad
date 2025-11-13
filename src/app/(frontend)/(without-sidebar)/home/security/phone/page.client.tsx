"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import UpdatePhoneForm from "@/components/security/update-phone-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updatePhoneNumberAction } from "@/lib/actions/auth";
import { requestPhoneOtpAction } from "@/lib/actions/otp";
import { authClient } from "@/lib/auth/client";

/**
 * Props for the PhonePageClient component
 */
interface PhonePageClientProps {
  /** Current phone number (masked) or null if not set */
  currentPhoneNumber: string | null;
}

/**
 * Client component for phone number management
 *
 * Handles the OTP verification flow:
 * 1. User enters new phone number
 * 2. Send OTP to new phone number
 * 3. User enters OTP
 * 4. Verify OTP using better-auth
 * 5. Update database using Server Action
 * 6. Redirect back to security page
 */
export default function PhonePageClient({
  currentPhoneNumber,
}: PhonePageClientProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  /**
   * Handle sending OTP to the new phone number
   */
  const handleSendOtp = async (phoneNumber: string, turnstileToken: string) => {
    setIsLoading(true);

    // Add +86 prefix for China mainland phone numbers
    const fullPhoneNumber = `+86${phoneNumber}`;

    try {
      const result = await requestPhoneOtpAction({
        phoneNumber: fullPhoneNumber,
        turnstileToken,
      });

      if (!result.success) {
        console.error("发送验证码失败:", result.error);
        toast.error(result.error || "发送验证码失败，请重试");
      } else {
        toast.success("验证码已发送");
        setCountdown(60); // Start 60-second countdown
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
   * Verify OTP and update phone number
   */
  const handleSubmit = async (data: { phoneNumber: string; otp: string }) => {
    setIsLoading(true);

    // Add +86 prefix for China mainland phone numbers
    const fullPhoneNumber = `+86${data.phoneNumber}`;

    try {
      // 1. Verify OTP using better-auth
      const { error: verifyError } = await authClient.phoneNumber.verify({
        phoneNumber: fullPhoneNumber,
        code: data.otp,
      });

      if (verifyError) {
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
      setIsLoading(false);
    }
  };

  // Countdown timer effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {currentPhoneNumber ? "修改手机号" : "绑定手机号"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <UpdatePhoneForm
          currentPhoneNumber={currentPhoneNumber}
          onSubmit={handleSubmit}
          onSendOtp={handleSendOtp}
          isLoading={isLoading}
          countdown={countdown}
        />
      </CardContent>
    </Card>
  );
}
