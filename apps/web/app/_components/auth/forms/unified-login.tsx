"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Github } from "lucide-react";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import type { OtpSendActionResult } from "@/app/_actions/auth";
import {
  type TurnstileInstance,
  TurnstileWidget,
} from "@/components/auth/turnstile";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useOtpCountdown } from "@/hooks/use-otp-countdown";
import { buildOtpStorageKeyFromAccount } from "@/lib/otp";
import { cn } from "@/lib/utils";
import type { ActionResult } from "@/types/common";
import type { FetchOptions } from "@/types/http";
import {
  type OtpLoginData,
  otpLoginSchema,
  type PasswordLoginData,
  passwordLoginSchema,
} from "@/types/validations";

import OtpInput from "./otp-input";

// ============================================
// Shared Components
// ============================================

/** Error Display Component */
function ErrorDisplay({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <div className="flex items-center gap-2 rounded-md bg-secondary/10 border border-secondary/30 px-3 py-2.5 text-sm text-secondary">
      <AlertCircle className="h-4 w-4 shrink-0" />
      <span>{message}</span>
    </div>
  );
}

/** Terms Agreement Checkbox with Tooltip */
interface TermsCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  error?: string;
}

function TermsCheckbox({
  checked,
  onChange,
  disabled,
  error,
}: TermsCheckboxProps) {
  return (
    <FormItem className="flex flex-row items-start space-x-2 space-y-0">
      <FormControl>
        <Tooltip open={error ? true : false}>
          <TooltipTrigger asChild>
            <Checkbox
              checked={checked}
              onCheckedChange={onChange}
              disabled={disabled}
              className="rounded-full data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
          </TooltipTrigger>
          {error && (
            <TooltipContent side="top" className="bg-black text-white">
              请先阅读并勾选协议
            </TooltipContent>
          )}
        </Tooltip>
      </FormControl>
      <FormLabel className="text-xs text-muted-foreground font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        阅读并同意Nomad的{" "}
        <Link href="/terms" className="text-primary hover:text-primary/90">
          服务协议
        </Link>{" "}
        及{" "}
        <Link href="/privacy" className="text-primary hover:text-primary/90">
          个人信息保护政策
        </Link>
      </FormLabel>
    </FormItem>
  );
}

// ============================================
// Password Login Form Component
// ============================================

interface PasswordLoginFormProps {
  /** Form submit callback */
  onSubmit: (
    data: PasswordLoginData,
    fetchOptions?: FetchOptions
  ) => Promise<ActionResult>;

  /** Toggle to OTP login */
  onSwitchToOtp: () => void;

  /** Loading state */
  isLoading?: boolean;

  /** Custom className */
  className?: string;
}

function PasswordLoginForm({
  onSubmit,
  onSwitchToOtp,
  isLoading = false,
  className,
}: PasswordLoginFormProps) {
  const form = useForm<PasswordLoginData>({
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

  const handleSubmit = async (data: PasswordLoginData) => {
    // Sequential validation: only validate next field if previous one passes
    const accountValid = await form.trigger("account");
    if (!accountValid) return;

    const passwordValid = await form.trigger("password");
    if (!passwordValid) return;

    const termsValid = await form.trigger("agreedToTerms");
    if (!termsValid) return;

    try {
      // All validations passed, submit the form
      await onSubmit(data);
    } catch {
      toast.error("人机验证失败，请重试");
    }
  };

  // Get the first error message in order: account -> password (skip agreedToTerms)
  const getFirstError = () => {
    const errors = form.formState.errors;

    // Check in order, but exclude agreedToTerms (shown only via tooltip)
    if (errors.account) return errors.account.message;
    if (errors.password) return errors.password.message;

    return undefined;
  };

  const firstError = getFirstError();

  // Only show terms tooltip if account and password have no errors
  const showTermsTooltip =
    !!form.formState.errors.agreedToTerms &&
    !form.formState.errors.account &&
    !form.formState.errors.password;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={cn("space-y-4", className)}
      >
        {/* Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            账号密码登录
          </h1>
        </div>

        {/* Account Input */}
        <FormField
          control={form.control}
          name="account"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="国内手机号/用户名/邮箱"
                  className="h-12"
                  disabled={isLoading}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Password Input */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    type="password"
                    placeholder="登录密码"
                    className="h-12 pr-20"
                    disabled={isLoading}
                  />
                  <Link
                    href="/auth/forgot-password"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-primary hover:text-primary/90"
                  >
                    忘记密码
                  </Link>
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        {/* Error Display Area */}
        <ErrorDisplay message={firstError} />

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full h-12 bg-secondary hover:bg-secondary/90 text-white font-medium"
          disabled={isLoading}
        >
          登 录
        </Button>

        {/* Terms Agreement with Tooltip */}
        <FormField
          control={form.control}
          name="agreedToTerms"
          render={({ field }) => (
            <TermsCheckbox
              checked={field.value}
              onChange={field.onChange}
              disabled={isLoading}
              error={
                showTermsTooltip
                  ? form.formState.errors.agreedToTerms?.message
                  : undefined
              }
            />
          )}
        />

        {/* Bottom Links */}
        <div className="flex items-center justify-between text-sm pt-2">
          <Button
            type="button"
            variant="link"
            onClick={onSwitchToOtp}
            disabled={isLoading}
            className="text-primary hover:text-primary/90 p-0 h-auto"
          >
            验证码登录
          </Button>

          <Link
            href="/auth/sign-up"
            className="text-primary hover:text-primary/90"
          >
            免费注册
          </Link>
        </div>
      </form>
    </Form>
  );
}

// ============================================
// OTP Login Form Component
// ============================================

interface OtpLoginFormProps {
  /**
   * Form submit callback
   * @param data - Login form data
   * @param fetchOptions - Optional fetch options (e.g., headers with captcha token)
   */
  onSubmit: (
    data: OtpLoginData,
    fetchOptions?: FetchOptions
  ) => Promise<ActionResult>;

  /**
   * Send OTP callback - should return true if OTP was sent successfully
   * @param account - User's phone number or email
   * @param fetchOptions - Optional fetch options (e.g., headers with captcha token)
   */
  onSendOtp: (
    account: string,
    fetchOptions?: FetchOptions
  ) => Promise<OtpSendActionResult>;

  /** Switch to password login */
  onSwitchToPassword: () => void;

  /** Loading state */
  isLoading?: boolean;

  /** Custom className */
  className?: string;
}

function OtpLoginForm({
  onSubmit,
  onSendOtp,
  onSwitchToPassword,
  isLoading = false,
  className,
}: OtpLoginFormProps) {
  const [isVerifying, setIsVerifying] = useState(false);
  const turnstileRef = useRef<TurnstileInstance | undefined>(null);
  const form = useForm<OtpLoginData>({
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
  const accountValue = form.watch("account");
  const countdownKey = useMemo(
    () => buildOtpStorageKeyFromAccount(accountValue),
    [accountValue]
  );
  const { countdown, start: startCountdown } = useOtpCountdown({
    storageKey: countdownKey,
  });

  const handleSendOtp = async () => {
    // Validate account field before sending OTP
    const isValid = await form.trigger("account");

    if (!isValid) {
      return;
    }

    const account = form.getValues("account");

    // Get Turnstile token
    setIsVerifying(true);
    try {
      // Use getResponsePromise to wait for the token (with 30s timeout)
      const token = await turnstileRef.current?.getResponsePromise();

      if (!token) {
        toast.error("人机验证失败，请重试");
        turnstileRef.current?.reset();
        return;
      }

      // Call backend API to send OTP with captcha token
      const result = await onSendOtp(account, {
        headers: { "x-captcha-token": token },
      });

      // Start countdown only if backend returns success
      if (result.success) {
        startCountdown();
      } else {
        if (result.retryAfterSeconds) {
          startCountdown(result.retryAfterSeconds);
        }
        toast.error(result.error || "发送验证码失败，请重试");
      }

      // Reset Turnstile for next use
      turnstileRef.current?.reset();
    } catch {
      toast.error("人机验证失败，请重试");
      turnstileRef.current?.reset();
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSubmit = async (data: OtpLoginData) => {
    // Sequential validation: only validate next field if previous one passes
    const accountValid = await form.trigger("account");
    if (!accountValid) return;

    const otpValid = await form.trigger("otp");
    if (!otpValid) return;

    const termsValid = await form.trigger("agreedToTerms");
    if (!termsValid) return;

    try {
      // All validations passed, submit the form with captcha token
      await onSubmit(data);
    } catch {
      toast.error("人机验证失败，请重试");
    }
  };

  // Get the first error message in order: account -> otp (skip agreedToTerms)
  const getFirstError = () => {
    const errors = form.formState.errors;

    // Check in order, but exclude agreedToTerms (shown only via tooltip)
    if (errors.account) return errors.account.message;
    if (errors.otp) return errors.otp.message;

    return undefined;
  };

  const firstError = getFirstError();

  // Only show terms tooltip if account and otp have no errors
  const showTermsTooltip =
    !!form.formState.errors.agreedToTerms &&
    !form.formState.errors.account &&
    !form.formState.errors.otp;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={cn("space-y-4", className)}
      >
        {/* Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            验证码登录
          </h1>
        </div>

        {/* Account Input */}
        <FormField
          control={form.control}
          name="account"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="国内手机号/邮箱"
                  className="h-12"
                  disabled={isLoading}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* OTP Input */}
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <OtpInput
                  value={field.value}
                  onChange={field.onChange}
                  onSendOtp={handleSendOtp}
                  countdown={countdown}
                  isLoading={isLoading}
                  isVerifying={isVerifying}
                  placeholder="短信验证码"
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Invisible Turnstile Widget for OTP verification */}
        <TurnstileWidget
          ref={turnstileRef}
          action="send-otp"
          size="invisible"
        />

        {/* Error Display Area - Show form validation errors */}
        <ErrorDisplay message={firstError} />

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full h-12 bg-secondary hover:bg-secondary/90 text-white font-medium"
          disabled={isLoading}
        >
          登 录
        </Button>

        {/* Terms Agreement with Tooltip */}
        <FormField
          control={form.control}
          name="agreedToTerms"
          render={({ field }) => (
            <TermsCheckbox
              checked={field.value}
              onChange={field.onChange}
              disabled={isLoading}
              error={
                showTermsTooltip
                  ? form.formState.errors.agreedToTerms?.message
                  : undefined
              }
            />
          )}
        />

        {/* Bottom Links */}
        <div className="flex items-center justify-between text-sm pt-2">
          <Button
            type="button"
            variant="link"
            onClick={onSwitchToPassword}
            disabled={isLoading}
            className="text-primary hover:text-primary/90 p-0 h-auto"
          >
            账号登录
          </Button>
        </div>
      </form>
    </Form>
  );
}

// ============================================
// Unified Login Form (Coordinator Component)
// ============================================

export interface UnifiedLoginFormProps {
  /** Form submit callback for password login */
  onPasswordSubmit: (
    data: PasswordLoginData,
    fetchOptions?: FetchOptions
  ) => Promise<ActionResult>;

  /** Form submit callback for OTP login */
  onOtpSubmit: (
    data: OtpLoginData,
    fetchOptions?: FetchOptions
  ) => Promise<ActionResult>;

  /** Send OTP callback - should return true if OTP was sent successfully */
  onSendOtp: (
    account: string,
    fetchOptions?: FetchOptions
  ) => Promise<OtpSendActionResult>;

  /** Initial login method (optional, defaults to password) */
  initialLoginMethod?: "password" | "otp";

  /** Loading state */
  isLoading?: boolean;

  /** Custom className */
  className?: string;
}

export default function UnifiedLoginForm({
  onPasswordSubmit,
  onOtpSubmit,
  onSendOtp,
  initialLoginMethod = "password",
  isLoading = false,
  className,
}: UnifiedLoginFormProps) {
  const [loginMethod, setLoginMethod] = useState<"password" | "otp">(
    initialLoginMethod
  );

  const toggleLoginMethod = () => {
    setLoginMethod(prev => (prev === "password" ? "otp" : "password"));
  };

  if (loginMethod === "password") {
    return (
      <div className="space-y-6">
        <PasswordLoginForm
          onSubmit={onPasswordSubmit}
          onSwitchToOtp={toggleLoginMethod}
          isLoading={isLoading}
          className={className}
        />
        <div className="flex items-center justify-start">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground hover:bg-foreground/90 transition-colors cursor-pointer">
            <Github className="h-5 w-5 text-white" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <OtpLoginForm
      onSubmit={onOtpSubmit}
      onSendOtp={onSendOtp}
      onSwitchToPassword={toggleLoginMethod}
      isLoading={isLoading}
      className={className}
    />
  );
}
