"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  type SignupMethod,
  UnifiedSignupForm,
  type VerificationFormData,
} from "@ukesjtu/nomad-ui/components/auth";
import { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { OtpSendActionResult } from "@/app/_actions/auth";
import { useOtpCountdown } from "@/hooks/use-otp-countdown";
import { buildOtpStorageKey } from "@/lib/otp";
import type { ActionResult } from "@/types/common";
import type { FetchOptions } from "@/types/http";
import {
  type EmailVerificationData,
  emailContactVerificationSchema,
  type PhoneVerificationData,
  phoneContactVerificationSchema,
} from "@/types/validations";

import { type TurnstileInstance, TurnstileWidget } from "../turnstile";

export interface UnifiedSignUpProps {
  /** Callback when phone verification succeeds */
  onPhoneVerified: (
    data: PhoneVerificationData,
    fetchOptions?: FetchOptions
  ) => Promise<ActionResult>;

  /** Callback when email verification succeeds */
  onEmailVerified: (
    data: EmailVerificationData,
    fetchOptions?: FetchOptions
  ) => Promise<ActionResult>;

  /** Callback to send phone OTP */
  onSendPhoneOtp: (
    phoneNumber: string,
    fetchOptions?: FetchOptions
  ) => Promise<OtpSendActionResult>;

  /** Callback to send email OTP */
  onSendEmailOtp: (
    email: string,
    fetchOptions?: FetchOptions
  ) => Promise<OtpSendActionResult>;

  /** Loading state from parent */
  isLoading?: boolean;

  /** Initial sign-up method */
  initialMethod?: SignupMethod;

  /** Callback when method changes */
  onMethodChange?: (method: SignupMethod) => void;

  /** Callback when terms link is clicked */
  onTermsClick?: () => void;

  /** Callback when privacy link is clicked */
  onPrivacyClick?: () => void;

  /** Callback when enterprise registration link is clicked */
  onEnterpriseClick?: () => void;

  /** Custom className */
  className?: string;
}

/**
 * Smart container component for the unified signup form
 *
 * Handles all business logic including:
 * - Form state management via react-hook-form
 * - OTP countdown management for both phone and email
 * - Turnstile CAPTCHA integration for OTP
 * - Toast notifications for errors
 *
 * @example
 * ```tsx
 * <UnifiedSignUp
 *   onPhoneVerified={handlePhoneVerified}
 *   onEmailVerified={handleEmailVerified}
 *   onSendPhoneOtp={handleSendPhoneOtp}
 *   onSendEmailOtp={handleSendEmailOtp}
 *   onTermsClick={() => window.open("/terms", "_blank")}
 *   onPrivacyClick={() => window.open("/privacy", "_blank")}
 * />
 * ```
 */
export default function UnifiedSignUp({
  onPhoneVerified,
  onEmailVerified,
  onSendPhoneOtp,
  onSendEmailOtp,
  isLoading = false,
  initialMethod = "phone",
  onMethodChange,
  onTermsClick,
  onPrivacyClick,
  onEnterpriseClick,
  className,
}: UnifiedSignUpProps) {
  const [method, setMethod] = useState<SignupMethod>(initialMethod);
  const [isVerifying, setIsVerifying] = useState(false);
  const turnstileRef = useRef<TurnstileInstance>(null);

  // Phone form
  const phoneForm = useForm<VerificationFormData>({
    resolver: zodResolver(phoneContactVerificationSchema),
    defaultValues: {
      contact: "",
      otp: "",
      agreedToTerms: false,
    },
  });

  // Email form
  const emailForm = useForm<VerificationFormData>({
    resolver: zodResolver(emailContactVerificationSchema),
    defaultValues: {
      contact: "",
      otp: "",
      agreedToTerms: false,
    },
  });

  // Watch contact values for countdown key
  const currentPhoneNumber = phoneForm.watch("contact");
  const currentEmail = emailForm.watch("contact");

  // Phone countdown
  const phoneCountdownKey = useMemo(() => {
    if (currentPhoneNumber) {
      return buildOtpStorageKey("phone", currentPhoneNumber);
    }
    return null;
  }, [currentPhoneNumber]);

  const { countdown: phoneCountdown, start: startPhoneCountdown } =
    useOtpCountdown({
      storageKey: phoneCountdownKey,
    });

  // Email countdown
  const emailCountdownKey = useMemo(() => {
    if (currentEmail) {
      return buildOtpStorageKey("email", currentEmail);
    }
    return null;
  }, [currentEmail]);

  const { countdown: emailCountdown, start: startEmailCountdown } =
    useOtpCountdown({
      storageKey: emailCountdownKey,
    });

  const handleMethodChange = (value: SignupMethod) => {
    setMethod(value);
    onMethodChange?.(value);
  };

  /**
   * Handle sending phone OTP with Turnstile verification
   */
  const handleSendPhoneOtp = async () => {
    if (!currentPhoneNumber) {
      toast.error("请先输入手机号");
      return;
    }

    // Trigger validation for phone number field
    const isValid = await phoneForm.trigger("contact");
    if (!isValid) {
      return;
    }

    setIsVerifying(true);

    try {
      // Get captcha token from Turnstile
      const token = await turnstileRef.current?.getResponsePromise();

      if (!token) {
        toast.error("人机验证失败，请重试");
        return;
      }

      const fetchOptions: FetchOptions = {
        headers: {
          "x-captcha-token": token,
        },
      };

      const result = await onSendPhoneOtp(currentPhoneNumber, fetchOptions);

      if (result.success) {
        startPhoneCountdown();
      } else {
        if (result.retryAfterSeconds) {
          startPhoneCountdown(result.retryAfterSeconds);
        }
        toast.error(result.error || "发送验证码失败，请重试");
      }
    } catch {
      toast.error("发送验证码失败，请重试");
    } finally {
      setIsVerifying(false);
      turnstileRef.current?.reset();
    }
  };

  /**
   * Handle sending email OTP with Turnstile verification
   */
  const handleSendEmailOtp = async () => {
    if (!currentEmail) {
      toast.error("请先输入邮箱地址");
      return;
    }

    // Trigger validation for email field
    const isValid = await emailForm.trigger("contact");
    if (!isValid) {
      return;
    }

    setIsVerifying(true);

    try {
      // Get captcha token from Turnstile
      const token = await turnstileRef.current?.getResponsePromise();

      if (!token) {
        toast.error("人机验证失败，请重试");
        return;
      }

      const fetchOptions: FetchOptions = {
        headers: {
          "x-captcha-token": token,
        },
      };

      const result = await onSendEmailOtp(currentEmail, fetchOptions);

      if (result.success) {
        startEmailCountdown();
      } else {
        if (result.retryAfterSeconds) {
          startEmailCountdown(result.retryAfterSeconds);
        }
        toast.error(result.error || "发送验证码失败，请重试");
      }
    } catch {
      toast.error("发送验证码失败，请重试");
    } finally {
      setIsVerifying(false);
      turnstileRef.current?.reset();
    }
  };

  /**
   * Handle phone verification form submission
   */
  const handlePhoneSubmit = async (data: VerificationFormData) => {
    try {
      // Transform to the expected format
      const verificationData: PhoneVerificationData = {
        phoneNumber: data.contact,
        otp: data.otp,
        agreedToTerms: data.agreedToTerms,
      };
      await onPhoneVerified(verificationData);
    } catch {
      toast.error("验证失败，请重试");
    }
  };

  /**
   * Handle email verification form submission
   */
  const handleEmailSubmit = async (data: VerificationFormData) => {
    try {
      // Transform to the expected format
      const verificationData: EmailVerificationData = {
        email: data.contact,
        otp: data.otp,
        agreedToTerms: data.agreedToTerms,
      };
      await onEmailVerified(verificationData);
    } catch {
      toast.error("验证失败，请重试");
    }
  };

  return (
    <>
      <UnifiedSignupForm
        method={method}
        onMethodChange={handleMethodChange}
        phoneForm={phoneForm}
        onPhoneSubmit={phoneForm.handleSubmit(handlePhoneSubmit)}
        onSendPhoneOtp={handleSendPhoneOtp}
        phoneCountdown={phoneCountdown}
        emailForm={emailForm}
        onEmailSubmit={emailForm.handleSubmit(handleEmailSubmit)}
        onSendEmailOtp={handleSendEmailOtp}
        emailCountdown={emailCountdown}
        isLoading={isLoading || isVerifying}
        onTermsClick={onTermsClick}
        onPrivacyClick={onPrivacyClick}
        onEnterpriseClick={onEnterpriseClick}
        className={className}
      />
      {/* Turnstile Widget - invisible mode for OTP sending */}
      <TurnstileWidget
        ref={turnstileRef}
        action="signup-otp"
        size="invisible"
      />
    </>
  );
}
