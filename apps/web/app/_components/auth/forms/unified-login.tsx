"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  type LoginMethod,
  type OtpLoginFormData,
  type PasswordLoginFormData,
  UnifiedLoginForm,
} from "@nomad/ui/components/auth";
import { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { OtpSendActionResult } from "@/app/_actions/auth";
import {
  type TurnstileInstance,
  TurnstileWidget,
} from "@/components/auth/turnstile";
import { useOtpCountdown } from "@/hooks/use-otp-countdown";
import { buildOtpStorageKeyFromAccount } from "@/lib/otp";
import type { ActionResult } from "@/types/common";
import type { FetchOptions } from "@/types/http";
import { otpLoginSchema, passwordLoginSchema } from "@/types/validations";

export interface UnifiedLoginProps {
  /** Form submit callback for password login */
  onPasswordSubmit: (
    data: PasswordLoginFormData,
    fetchOptions?: FetchOptions
  ) => Promise<ActionResult>;

  /** Form submit callback for OTP login */
  onOtpSubmit: (
    data: OtpLoginFormData,
    fetchOptions?: FetchOptions
  ) => Promise<ActionResult>;

  /** Send OTP callback - should return true if OTP was sent successfully */
  onSendOtp: (
    account: string,
    fetchOptions?: FetchOptions
  ) => Promise<OtpSendActionResult>;

  /** Initial login method (optional, defaults to password) */
  initialLoginMethod?: LoginMethod;

  /** Loading state from parent (optional, will be combined with internal loading state) */
  isLoading?: boolean;

  /** Callback when forgot password link is clicked */
  onForgotPasswordClick?: () => void;

  /** Callback when register link is clicked */
  onRegisterClick?: () => void;

  /** Callback when terms link is clicked */
  onTermsClick?: () => void;

  /** Callback when privacy link is clicked */
  onPrivacyClick?: () => void;

  /** Callback when GitHub login button is clicked */
  onGithubLoginClick?: () => void;

  /** Custom className */
  className?: string;
}

/**
 * Smart container component for the unified login form
 *
 * Handles all business logic including:
 * - Form state management via react-hook-form
 * - Sequential validation (one error at a time)
 * - OTP countdown management
 * - Turnstile CAPTCHA integration for OTP
 * - Toast notifications for errors
 *
 * @example
 * ```tsx
 * <UnifiedLogin
 *   onPasswordSubmit={handlePasswordLogin}
 *   onOtpSubmit={handleOtpLogin}
 *   onSendOtp={handleSendOtp}
 *   onForgotPasswordClick={() => router.push("/auth/forgot-password")}
 *   onRegisterClick={() => router.push("/auth/sign-up")}
 * />
 * ```
 */
export default function UnifiedLogin({
  onPasswordSubmit,
  onOtpSubmit,
  onSendOtp,
  initialLoginMethod = "password",
  isLoading: externalLoading = false,
  onForgotPasswordClick,
  onRegisterClick,
  onTermsClick,
  onPrivacyClick,
  onGithubLoginClick,
  className,
}: UnifiedLoginProps) {
  const [loginMethod, setLoginMethod] =
    useState<LoginMethod>(initialLoginMethod);
  const [isVerifying, setIsVerifying] = useState(false);
  const turnstileRef = useRef<TurnstileInstance>(null);

  // Password form
  const passwordForm = useForm<PasswordLoginFormData>({
    resolver: zodResolver(passwordLoginSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    criteriaMode: "firstError",
    defaultValues: {
      account: "",
      password: "",
      agreedToTerms: false,
    },
  });

  // OTP form
  const otpForm = useForm<OtpLoginFormData>({
    resolver: zodResolver(otpLoginSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    criteriaMode: "firstError",
    defaultValues: {
      account: "",
      otp: "",
      agreedToTerms: false,
    },
  });

  // OTP countdown
  const accountValue = otpForm.watch("account");
  const countdownKey = useMemo(
    () => buildOtpStorageKeyFromAccount(accountValue),
    [accountValue]
  );
  const { countdown, start: startCountdown } = useOtpCountdown({
    storageKey: countdownKey,
  });

  // Sequential validation helper for password form
  const validatePasswordSequentially = async (
    fields: (keyof PasswordLoginFormData)[]
  ): Promise<boolean> => {
    for (const field of fields) {
      const valid = await passwordForm.trigger(field);
      if (!valid) return false;
    }
    return true;
  };

  // Sequential validation helper for OTP form
  const validateOtpSequentially = async (
    fields: (keyof OtpLoginFormData)[]
  ): Promise<boolean> => {
    for (const field of fields) {
      const valid = await otpForm.trigger(field);
      if (!valid) return false;
    }
    return true;
  };

  // Password submit with sequential validation
  const handlePasswordSubmit = async (data: PasswordLoginFormData) => {
    const valid = await validatePasswordSequentially([
      "account",
      "password",
      "agreedToTerms",
    ]);
    if (!valid) return;

    try {
      await onPasswordSubmit(data);
    } catch {
      toast.error("人机验证失败，请重试");
    }
  };

  // OTP submit with sequential validation
  const handleOtpSubmit = async (data: OtpLoginFormData) => {
    const valid = await validateOtpSequentially([
      "account",
      "otp",
      "agreedToTerms",
    ]);
    if (!valid) return;

    try {
      await onOtpSubmit(data);
    } catch {
      toast.error("人机验证失败，请重试");
    }
  };

  // Send OTP with CAPTCHA
  const handleSendOtp = async () => {
    const accountValid = await otpForm.trigger("account");
    if (!accountValid) return;

    setIsVerifying(true);
    try {
      const token = await turnstileRef.current?.getResponsePromise();
      if (!token) {
        toast.error("人机验证失败，请重试");
        turnstileRef.current?.reset();
        return;
      }

      const result = await onSendOtp(otpForm.getValues("account"), {
        headers: { "x-captcha-token": token },
      });

      if (result.success) {
        startCountdown();
      } else {
        if (result.retryAfterSeconds) {
          startCountdown(result.retryAfterSeconds);
        }
        toast.error(result.error || "发送验证码失败");
      }

      turnstileRef.current?.reset();
    } catch {
      toast.error("人机验证失败，请重试");
      turnstileRef.current?.reset();
    } finally {
      setIsVerifying(false);
    }
  };

  // Error display logic (sequential - show first error only)
  const getCurrentError = (): string | undefined => {
    const errors =
      loginMethod === "password"
        ? passwordForm.formState.errors
        : otpForm.formState.errors;

    if (errors.account) return errors.account.message;
    if (loginMethod === "password" && "password" in errors) {
      return errors.password?.message;
    }
    if (loginMethod === "otp" && "otp" in errors) {
      return errors.otp?.message;
    }
    return undefined;
  };

  const shouldShowTermsTooltip = (): boolean => {
    const errors =
      loginMethod === "password"
        ? passwordForm.formState.errors
        : otpForm.formState.errors;

    const hasTermsError = !!errors.agreedToTerms;
    const hasAccountError = !!errors.account;
    const hasOtherFieldError =
      loginMethod === "password"
        ? !!("password" in errors && errors.password)
        : !!("otp" in errors && errors.otp);

    return hasTermsError && !hasAccountError && !hasOtherFieldError;
  };

  const isLoading =
    externalLoading ||
    passwordForm.formState.isSubmitting ||
    otpForm.formState.isSubmitting;

  return (
    <>
      <UnifiedLoginForm
        loginMethod={loginMethod}
        onLoginMethodChange={setLoginMethod}
        passwordForm={passwordForm}
        otpForm={otpForm}
        onPasswordSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}
        onOtpSubmit={otpForm.handleSubmit(handleOtpSubmit)}
        onSendOtp={handleSendOtp}
        countdown={countdown}
        isVerifying={isVerifying}
        isLoading={isLoading}
        currentError={getCurrentError()}
        showTermsTooltip={shouldShowTermsTooltip()}
        onForgotPasswordClick={onForgotPasswordClick}
        onRegisterClick={onRegisterClick}
        onTermsClick={onTermsClick}
        onPrivacyClick={onPrivacyClick}
        onGithubLoginClick={onGithubLoginClick}
        className={className}
      />
      {/* CAPTCHA widget in container, NOT in UI component */}
      <TurnstileWidget ref={turnstileRef} action="login-otp" size="invisible" />
    </>
  );
}
