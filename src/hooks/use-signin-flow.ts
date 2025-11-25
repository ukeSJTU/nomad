import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { authClient } from "@/domains/auth/client";
import type { ActionResult } from "@/types/common";
import type { FetchOptions } from "@/types/http";
import type { OtpLoginData, PasswordLoginData } from "@/types/validations/auth";
import { validateAccount } from "@/utils/auth";

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
      const { isPhone, isEmail } = validateAccount(data.account);

      // Only support phone or email login
      if (!isPhone && !isEmail) {
        return {
          success: false,
          error: "请输入正确的手机号或邮箱格式",
        };
      }

      let signInError;

      if (isPhone) {
        const result = await authClient.signIn.phoneNumber({
          phoneNumber: data.account,
          password: data.password,
          rememberMe: true,
        });
        signInError = result.error;
      } else {
        // isEmail
        const result = await authClient.signIn.email({
          email: data.account,
          password: data.password,
          rememberMe: true,
        });
        signInError = result.error;
      }

      if (signInError) {
        const errorMessage =
          signInError.message || "登录失败，请检查账号和密码";
        toast.error(errorMessage);
        return {
          success: false,
          error: errorMessage,
        };
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
      const { isPhone, isEmail } = validateAccount(data.account);

      // Only support phone or email login
      if (!isPhone && !isEmail) {
        return {
          success: false,
          error: "请输入正确的手机号或邮箱格式",
        };
      }

      let verifyError;

      if (isPhone) {
        const result = await authClient.phoneNumber.verify(
          {
            phoneNumber: data.account,
            code: data.otp,
          },
          fetchOptions
        );
        verifyError = result.error;
      } else {
        // isEmail
        const result = await authClient.signIn.emailOtp(
          {
            email: data.account,
            otp: data.otp,
          },
          fetchOptions
        );
        verifyError = result.error;
      }

      if (verifyError) {
        const errorMessage = verifyError.message || "验证码错误";
        toast.error(errorMessage);
        return {
          success: false,
          error: errorMessage,
        };
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

      let sendError;

      if (isPhone) {
        const result = await authClient.phoneNumber.sendOtp(
          {
            phoneNumber: account,
          },
          fetchOptions
        );
        sendError = result.error;
      } else {
        // isEmail
        const result = await authClient.emailOtp.sendVerificationOtp(
          {
            email: account,
            type: "sign-in",
          },
          fetchOptions
        );
        sendError = result.error;
      }

      if (sendError) {
        console.error("发送验证码失败:", sendError);
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
