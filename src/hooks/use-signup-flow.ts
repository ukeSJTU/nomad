"use client";

import { useState } from "react";
import { toast } from "sonner";

import { setInitialPasswordAction } from "@/lib/actions";
import { authClient } from "@/lib/auth/client";
import type { ActionResult } from "@/types/dto/action";
import type { FetchOptions } from "@/types/http";
import type {
  EmailVerificationData,
  PasswordSetupData,
  PhoneVerificationData,
} from "@/types/validations/auth";

export interface UseSignUpFlowReturn {
  // State
  currentStep: number;
  signUpMethod: "phone" | "email";
  phoneData: PhoneVerificationData | null;
  emailData: EmailVerificationData | null;
  isLoading: boolean;

  // Actions
  setSignUpMethod: (method: "phone" | "email") => void;
  handlePhoneVerified: (
    data: PhoneVerificationData,
    fetchOptions?: FetchOptions
  ) => Promise<ActionResult>;
  handleEmailVerified: (
    data: EmailVerificationData,
    fetchOptions?: FetchOptions
  ) => Promise<ActionResult>;
  handlePasswordSetup: (data: PasswordSetupData) => Promise<void>;
  handleSendPhoneOtp: (
    phoneNumber: string,
    fetchOptions?: FetchOptions
  ) => Promise<boolean>;
  handleSendEmailOtp: (
    email: string,
    fetchOptions?: FetchOptions
  ) => Promise<boolean>;
}

export function useSignUpFlow(): UseSignUpFlowReturn {
  // State
  const [currentStep, setCurrentStep] = useState(1);
  const [signUpMethod, setSignUpMethod] = useState<"phone" | "email">("phone");
  const [phoneData, setPhoneData] = useState<PhoneVerificationData | null>(
    null
  );
  const [emailData, setEmailData] = useState<EmailVerificationData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handle phone OTP verification
   */
  const handlePhoneVerified = async (
    data: PhoneVerificationData,
    fetchOptions?: FetchOptions
  ): Promise<ActionResult> => {
    setIsLoading(true);

    const fullPhoneNumber = `+86${data.phoneNumber}`;

    try {
      const { error: verifyError } = await authClient.phoneNumber.verify(
        {
          phoneNumber: fullPhoneNumber,
          code: data.otp,
        },
        fetchOptions
      );

      if (verifyError) {
        const errorMessage = verifyError.message || "验证码错误，请重试";
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }

      setPhoneData(data);
      setCurrentStep(2);
      return { success: true, data: undefined };
    } catch {
      const errorMessage = "网络错误，请稍后重试";
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle email OTP verification
   */
  const handleEmailVerified = async (
    data: EmailVerificationData,
    fetchOptions?: FetchOptions
  ): Promise<ActionResult> => {
    setIsLoading(true);

    try {
      const { error: verifyError } = await authClient.signIn.emailOtp(
        {
          email: data.email,
          otp: data.otp,
        },
        fetchOptions
      );

      if (verifyError) {
        const errorMessage = verifyError.message || "验证码错误，请重试";
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }

      setEmailData(data);
      setCurrentStep(2);
      return { success: true, data: undefined };
    } catch {
      const errorMessage = "网络错误，请稍后重试";
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle password setup
   */
  const handlePasswordSetup = async (
    data: PasswordSetupData
  ): Promise<void> => {
    setIsLoading(true);

    try {
      const result = await setInitialPasswordAction(data.password);

      if (!result.success) {
        toast.error(result.error || "设置密码失败");
        return;
      }

      setCurrentStep(3);
    } catch {
      toast.error("网络错误，请稍后重试");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Send phone OTP
   */
  const handleSendPhoneOtp = async (
    phoneNumber: string,
    fetchOptions?: FetchOptions
  ): Promise<boolean> => {
    if (!phoneNumber) {
      toast.error("请先输入手机号");
      return false;
    }

    setIsLoading(true);

    const fullPhoneNumber = `+86${phoneNumber}`;

    try {
      const { error: sendError } = await authClient.phoneNumber.sendOtp(
        {
          phoneNumber: fullPhoneNumber,
        },
        fetchOptions
      );

      if (sendError) {
        return false;
      }

      return true;
    } catch {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Send email OTP
   */
  const handleSendEmailOtp = async (
    email: string,
    fetchOptions?: FetchOptions
  ): Promise<boolean> => {
    if (!email) {
      toast.error("请先输入邮箱地址");
      return false;
    }

    setIsLoading(true);

    try {
      const { error: sendError } =
        await authClient.emailOtp.sendVerificationOtp(
          {
            email,
            type: "sign-in",
          },
          fetchOptions
        );

      if (sendError) {
        return false;
      }

      return true;
    } catch {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    currentStep,
    signUpMethod,
    phoneData,
    emailData,
    isLoading,
    setSignUpMethod,
    handlePhoneVerified,
    handleEmailVerified,
    handlePasswordSetup,
    handleSendPhoneOtp,
    handleSendEmailOtp,
  };
}
