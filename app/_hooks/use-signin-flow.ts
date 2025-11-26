import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import {
  sendEmailOtpAction,
  sendPhoneOtpAction,
  signInWithOtpAction,
  signInWithPasswordAction,
} from "@/app/_actions/auth";
import { validateAccount } from "@/lib/validation/account";
import type { ActionResult } from "@/types/common";
import type { FetchOptions } from "@/types/http";
import type { OtpLoginData, PasswordLoginData } from "@/types/validations/auth";

export interface UseSignInFlowReturn {
  isLoading: boolean;
  handlePasswordLogin: (data: PasswordLoginData) => Promise<ActionResult>;
  handleOtpLogin: (
    data: OtpLoginData,
    fetchOptions?: FetchOptions
  ) => Promise<ActionResult>;
  handleSendOtp: (
    account: string,
    fetchOptions?: FetchOptions
  ) => Promise<boolean>;
}

/**
 * Hook for managing sign-in flow logic
 * Handles password login, OTP login, and OTP sending with Turnstile integration
 */
export function useSignInFlow(): UseSignInFlowReturn {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handles password login (supports phone/email only)
   */
  const handlePasswordLogin = async (
    data: PasswordLoginData
  ): Promise<ActionResult> => {
    setIsLoading(true);

    try {
      const result = await signInWithPasswordAction(data);

      if (!result.success) {
        toast.error(result.error || "登录失败，请检查账号和密码");
        return result;
      }

      // Redirect to home page after successful login
      router.push("/");
      return { success: true, data: undefined };
    } catch (error) {
      console.error("登录异常:", error);
      const errorMessage = "登录失败，请稍后重试";
      toast.error(errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles OTP login (supports phone/email only)
   * Receives fetchOptions with Turnstile captcha token
   */
  const handleOtpLogin = async (
    data: OtpLoginData,
    fetchOptions?: FetchOptions
  ): Promise<ActionResult> => {
    setIsLoading(true);

    try {
      const result = await signInWithOtpAction(data, fetchOptions);

      if (!result.success) {
        toast.error(result.error || "验证码错误");
        return result;
      }

      // Redirect to home page after successful login
      router.push("/");
      return { success: true, data: undefined };
    } catch (error) {
      console.error("验证码登录异常:", error);
      const errorMessage = "登录失败，请稍后重试";
      toast.error(errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles OTP sending functionality (supports phone/email only)
   * Receives fetchOptions with Turnstile captcha token
   */
  const handleSendOtp = async (
    account: string,
    fetchOptions?: FetchOptions
  ): Promise<boolean> => {
    setIsLoading(true);

    try {
      const { isPhone, isEmail } = validateAccount(account);

      // Only support phone or email
      if (!isPhone && !isEmail) {
        toast.error("无效的账号格式");
        return false;
      }

      const result = isPhone
        ? await sendPhoneOtpAction(account, fetchOptions)
        : await sendEmailOtpAction(account, "sign-in", fetchOptions);

      if (!result.success) {
        console.error("发送验证码失败:", result.error);
        toast.error("发送验证码失败，请重试");
        return false;
      }

      return true;
    } catch (error) {
      console.error("发送验证码异常:", error);
      toast.error("发送验证码失败，请重试");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handlePasswordLogin,
    handleOtpLogin,
    handleSendOtp,
  };
}
