"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";

import {
  resetPasswordWithOtpAction,
  sendResetEmailOtpAction,
  sendResetPhoneOtpAction,
} from "@/app/_actions/auth";
import type { OtpSendActionResult } from "@/app/_actions/auth";
import { useOtpCountdown } from "@/hooks/use-otp-countdown";
import { buildOtpStorageKey } from "@/lib/otp";
import { maskEmail, maskPhoneNumber } from "@/lib/security";
import { validateAccount } from "@/lib/validation";
import type { ActionResult } from "@/types/common";
import type { FetchOptions } from "@/types/http";
import type { PasswordSetupData } from "@/types/validations";
import { accountSchema, otpCodeSchema } from "@/types/validations";

type ResetMethod = "phone" | "email";

export interface UseForgotPasswordFlowReturn {
  currentStep: number;
  method: ResetMethod | null;
  maskedAccount: string | null;
  countdown: number;
  otp: string;
  isLoading: boolean;
  isResetting: boolean;
  hasCompleted: boolean;
  setOtp: (otp: string) => void;
  handleAccountSubmit: (
    account: string,
    fetchOptions?: FetchOptions
  ) => Promise<ActionResult>;
  handleVerifyOtp: (otp: string) => boolean;
  handleResendOtp: (fetchOptions?: FetchOptions) => Promise<boolean>;
  handleResetPassword: (data: PasswordSetupData) => Promise<void>;
}

/**
 * Hook to orchestrate forgot-password flow across three steps:
 * 1) Verify account & send OTP (Turnstile required)
 * 2) Capture OTP and move to reset
 * 3) Reset password with OTP
 */
export function useForgotPasswordFlow(): UseForgotPasswordFlowReturn {
  const [currentStep, setCurrentStep] = useState(1);
  const [method, setMethod] = useState<ResetMethod | null>(null);
  const [account, setAccount] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  const countdownKey = useMemo(() => {
    if (!account || !method) return null;
    return buildOtpStorageKey(method, account);
  }, [account, method]);
  const {
    countdown,
    start: startCountdown,
    reset: resetCountdown,
  } = useOtpCountdown({
    storageKey: countdownKey,
  });

  const maskedAccount = useMemo(() => {
    if (!account || !method) return null;
    return method === "phone" ? maskPhoneNumber(account) : maskEmail(account);
  }, [account, method]);

  const sendOtp = async (
    targetAccount: string,
    targetMethod: ResetMethod,
    fetchOptions?: FetchOptions
  ): Promise<OtpSendActionResult> => {
    if (targetMethod === "phone") {
      return sendResetPhoneOtpAction(targetAccount, fetchOptions);
    }

    return sendResetEmailOtpAction(targetAccount, fetchOptions);
  };

  /**
   * Step 1: Validate account and send OTP (Turnstile guarded)
   */
  const handleAccountSubmit = async (
    rawAccount: string,
    fetchOptions?: FetchOptions
  ): Promise<ActionResult> => {
    const parsedAccount = accountSchema.safeParse(rawAccount.trim());

    if (!parsedAccount.success) {
      const message =
        parsedAccount.error.issues?.[0]?.message || parsedAccount.error.message;
      toast.error(message || "请输入正确的手机号或邮箱格式");
      return { success: false, error: message };
    }

    // Normalize + validate type
    const trimmedAccount = parsedAccount.data.replace(/^\+86/, "");
    const { isPhone, isEmail } = validateAccount(trimmedAccount);

    if (!isPhone && !isEmail) {
      const message = "请输入正确的手机号或邮箱格式";
      toast.error(message);
      return { success: false, error: message };
    }

    setIsLoading(true);

    try {
      const targetMethod: ResetMethod = isPhone ? "phone" : "email";
      const sendResult = await sendOtp(
        trimmedAccount,
        targetMethod,
        fetchOptions
      );

      if (!sendResult.success) {
        if (sendResult.retryAfterSeconds) {
          startCountdown(sendResult.retryAfterSeconds);
        }
        toast.error(sendResult.error || "发送验证码失败，请重试");
        return sendResult;
      }

      // Reset flow state for new account
      setAccount(trimmedAccount);
      setMethod(targetMethod);
      setOtp("");
      setHasCompleted(false);
      setCurrentStep(2);
      resetCountdown();
      startCountdown();

      toast.success("验证码已发送，请查收");
      return { success: true, data: undefined };
    } catch {
      const message = "网络错误，请稍后重试";
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Step 2: Store OTP locally (format validation only)
   */
  const handleVerifyOtp = (inputOtp: string): boolean => {
    const parsedOtp = otpCodeSchema.safeParse(inputOtp.trim());

    if (!parsedOtp.success) {
      const message =
        parsedOtp.error.issues?.[0]?.message || parsedOtp.error.message;
      toast.error(message || "请输入6位数字验证码");
      return false;
    }

    setOtp(parsedOtp.data);
    setCurrentStep(3);
    return true;
  };

  /**
   * Resend OTP with Turnstile verification
   */
  const handleResendOtp = async (
    fetchOptions?: FetchOptions
  ): Promise<boolean> => {
    if (!account || !method) {
      toast.error("请先填写并验证账号");
      return false;
    }

    setIsLoading(true);

    try {
      const result = await sendOtp(account, method, fetchOptions);

      if (!result.success) {
        if (result.retryAfterSeconds) {
          startCountdown(result.retryAfterSeconds);
        }
        toast.error(result.error || "发送验证码失败，请重试");
        return false;
      }

      resetCountdown();
      startCountdown();
      toast.success("验证码已发送，请查收");
      return true;
    } catch {
      toast.error("网络错误，请稍后重试");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Step 3: Reset password using OTP
   */
  const handleResetPassword = async (
    data: PasswordSetupData
  ): Promise<void> => {
    if (!account || !method) {
      toast.error("请先完成账号验证");
      setCurrentStep(1);
      return;
    }

    const parsedOtp = otpCodeSchema.safeParse(otp);
    if (!parsedOtp.success) {
      toast.error("请先输入收到的验证码");
      setCurrentStep(2);
      return;
    }

    setIsResetting(true);

    try {
      const result = await resetPasswordWithOtpAction({
        account,
        otp: parsedOtp.data,
        newPassword: data.password,
      });

      if (!result.success) {
        toast.error(result.error || "重置密码失败，请重试");
        setCurrentStep(2);
        return;
      }

      setHasCompleted(true);
      toast.success("重置密码成功，请使用新密码登录");
    } catch {
      toast.error("网络错误，请稍后重试");
    } finally {
      setIsResetting(false);
    }
  };

  return {
    currentStep,
    method,
    maskedAccount,
    countdown,
    otp,
    isLoading,
    isResetting,
    hasCompleted,
    setOtp,
    handleAccountSubmit,
    handleVerifyOtp,
    handleResendOtp,
    handleResetPassword,
  };
}
