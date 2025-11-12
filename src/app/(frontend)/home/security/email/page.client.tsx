"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import UpdateEmailForm from "@/components/security/update-email-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateEmailAction } from "@/lib/actions/auth";
import { authClient } from "@/lib/auth/client";

/**
 * Props for the EmailPageClient component
 */
interface EmailPageClientProps {
  /** Current email address (masked) */
  currentEmail: string;
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
}: EmailPageClientProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  /**
   * Handle sending OTP to the new email address
   */
  const handleSendOtp = async (email: string) => {
    setIsLoading(true);

    try {
      const { error } = await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "email-verification",
      });

      if (error) {
        console.error("发送验证码失败:", error);
        toast.error("发送验证码失败，请重试");
      } else {
        toast.success("验证码已发送到新邮箱");
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
   * Verify OTP and update email
   */
  const handleSubmit = async (data: { email: string; otp: string }) => {
    setIsLoading(true);

    try {
      // 1. Verify OTP using better-auth
      const { error: verifyError } = await authClient.emailOtp.verifyEmail({
        email: data.email,
        otp: data.otp,
      });

      if (verifyError) {
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

  // Countdown timer effect
  useState(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>修改邮箱</CardTitle>
      </CardHeader>
      <CardContent>
        <UpdateEmailForm
          currentEmail={currentEmail}
          onSubmit={handleSubmit}
          onSendOtp={handleSendOtp}
          isLoading={isLoading}
          countdown={countdown}
        />
      </CardContent>
    </Card>
  );
}
