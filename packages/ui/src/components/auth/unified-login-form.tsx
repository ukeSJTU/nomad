"use client";

import { Button } from "@nomad/ui/components/primitives/button";
import { Checkbox } from "@nomad/ui/components/primitives/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@nomad/ui/components/primitives/form";
import { Input } from "@nomad/ui/components/primitives/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@nomad/ui/components/primitives/tooltip";
import { OtpInput } from "@nomad/ui/components/security/otp-input";
import { cn } from "@nomad/ui/lib/utils";
import { AlertCircle, Github } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";

// ============================================
// Types
// ============================================

/**
 * Login method - password or OTP
 */
export type LoginMethod = "password" | "otp";

/**
 * Form data for password login
 */
export interface PasswordLoginFormData {
  account: string;
  password: string;
  agreedToTerms: boolean;
}

/**
 * Form data for OTP login
 */
export interface OtpLoginFormData {
  account: string;
  otp: string;
  agreedToTerms: boolean;
}

/**
 * Props for the UnifiedLoginForm component
 */
export interface UnifiedLoginFormProps {
  // Mode control
  /** Current login method */
  loginMethod: LoginMethod;
  /** Callback when login method changes */
  onLoginMethodChange: (method: LoginMethod) => void;

  // Password form (full form object from useForm)
  /** Form instance for password login */
  passwordForm: UseFormReturn<PasswordLoginFormData>;

  // OTP form (full form object from useForm)
  /** Form instance for OTP login */
  otpForm: UseFormReturn<OtpLoginFormData>;

  // Submit handlers
  /** Submit handler for password form */
  onPasswordSubmit: (e?: React.BaseSyntheticEvent) => void;
  /** Submit handler for OTP form */
  onOtpSubmit: (e?: React.BaseSyntheticEvent) => void;

  // OTP-specific
  /** Callback to send OTP */
  onSendOtp: () => void;
  /** Countdown timer in seconds */
  countdown: number;
  /** Whether OTP is being sent/verified */
  isVerifying?: boolean;

  // State
  /** Whether the form is in loading state */
  isLoading?: boolean;

  // Error display (sequential validation - one error at a time)
  /** Current error message to display */
  currentError?: string;
  /** Whether to show the terms agreement tooltip */
  showTermsTooltip?: boolean;

  // Navigation callbacks (NOT Link adapter)
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

// ============================================
// Mode Configuration
// ============================================

const LOGIN_MODE_CONFIG = {
  password: {
    title: "账号密码登录",
    accountPlaceholder: "国内手机号/用户名/邮箱",
    showPasswordField: true,
    showOtpField: false,
    showForgotPassword: true,
    showRegisterLink: true,
    showGithubLogin: true,
    switchButtonText: "验证码登录",
  },
  otp: {
    title: "验证码登录",
    accountPlaceholder: "国内手机号/邮箱",
    showPasswordField: false,
    showOtpField: true,
    showForgotPassword: false,
    showRegisterLink: false,
    showGithubLogin: false,
    switchButtonText: "账号登录",
  },
} as const;

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
interface TermsCheckboxWithTooltipProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  showTooltip?: boolean;
  onTermsClick?: () => void;
  onPrivacyClick?: () => void;
}

function TermsCheckboxWithTooltip({
  checked,
  onChange,
  disabled,
  showTooltip,
  onTermsClick,
  onPrivacyClick,
}: TermsCheckboxWithTooltipProps) {
  return (
    <FormItem className="flex flex-row items-start space-x-2 space-y-0">
      <FormControl>
        <Tooltip open={showTooltip}>
          <TooltipTrigger asChild>
            <Checkbox
              checked={checked}
              onCheckedChange={onChange}
              disabled={disabled}
              className="rounded-full data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
          </TooltipTrigger>
          {showTooltip && (
            <TooltipContent side="top" className="bg-black text-white">
              请先阅读并勾选协议
            </TooltipContent>
          )}
        </Tooltip>
      </FormControl>
      <FormLabel className="text-xs text-muted-foreground font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        阅读并同意Nomad的{" "}
        <button
          type="button"
          className="text-primary hover:text-primary/90"
          onClick={onTermsClick}
        >
          服务协议
        </button>{" "}
        及{" "}
        <button
          type="button"
          className="text-primary hover:text-primary/90"
          onClick={onPrivacyClick}
        >
          个人信息保护政策
        </button>
      </FormLabel>
    </FormItem>
  );
}

// ============================================
// Main Component
// ============================================

/**
 * Unified login form UI component supporting password and OTP login modes
 *
 * This is a pure UI component - form state management, validation, and
 * business logic are handled by the parent container component.
 *
 * @example
 * ```tsx
 * // Parent container handles all logic
 * <UnifiedLoginForm
 *   loginMethod={loginMethod}
 *   onLoginMethodChange={setLoginMethod}
 *   passwordForm={passwordForm}
 *   otpForm={otpForm}
 *   onPasswordSubmit={passwordForm.handleSubmit(handlePasswordLogin)}
 *   onOtpSubmit={otpForm.handleSubmit(handleOtpLogin)}
 *   onSendOtp={handleSendOtp}
 *   countdown={countdown}
 *   isLoading={isLoading}
 *   currentError={getCurrentError()}
 *   showTermsTooltip={shouldShowTermsTooltip()}
 *   onForgotPasswordClick={() => router.push("/auth/forgot-password")}
 *   onRegisterClick={() => router.push("/auth/sign-up")}
 * />
 * ```
 */
export function UnifiedLoginForm({
  loginMethod,
  onLoginMethodChange,
  passwordForm,
  otpForm,
  onPasswordSubmit,
  onOtpSubmit,
  onSendOtp,
  countdown,
  isVerifying,
  isLoading,
  currentError,
  showTermsTooltip,
  onForgotPasswordClick,
  onRegisterClick,
  onTermsClick,
  onPrivacyClick,
  onGithubLoginClick,
  className,
}: UnifiedLoginFormProps) {
  const config = LOGIN_MODE_CONFIG[loginMethod];
  const isPassword = loginMethod === "password";

  return (
    <div className={cn("space-y-6", className)}>
      {isPassword ? (
        <Form {...passwordForm}>
          <form onSubmit={onPasswordSubmit} className="space-y-4">
            {/* Title */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-foreground mb-2">
                {config.title}
              </h1>
            </div>

            {/* Account Input */}
            <FormField
              control={passwordForm.control}
              name="account"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder={config.accountPlaceholder}
                      className="h-12"
                      disabled={isLoading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Password Input */}
            <FormField
              control={passwordForm.control}
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
                      {config.showForgotPassword && (
                        <button
                          type="button"
                          onClick={onForgotPasswordClick}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-primary hover:text-primary/90"
                        >
                          忘记密码
                        </button>
                      )}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Error Display Area */}
            <ErrorDisplay message={currentError} />

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
              control={passwordForm.control}
              name="agreedToTerms"
              render={({ field }) => (
                <TermsCheckboxWithTooltip
                  checked={field.value}
                  onChange={field.onChange}
                  disabled={isLoading}
                  showTooltip={showTermsTooltip}
                  onTermsClick={onTermsClick}
                  onPrivacyClick={onPrivacyClick}
                />
              )}
            />

            {/* Bottom Links */}
            <div className="flex items-center justify-between text-sm pt-2">
              <Button
                type="button"
                variant="link"
                onClick={() => onLoginMethodChange("otp")}
                disabled={isLoading}
                className="text-primary hover:text-primary/90 p-0 h-auto"
              >
                {LOGIN_MODE_CONFIG.password.switchButtonText}
              </Button>

              {config.showRegisterLink && (
                <button
                  type="button"
                  onClick={onRegisterClick}
                  className="text-primary hover:text-primary/90"
                >
                  免费注册
                </button>
              )}
            </div>
          </form>
        </Form>
      ) : (
        <Form {...otpForm}>
          <form onSubmit={onOtpSubmit} className="space-y-4">
            {/* Title */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-foreground mb-2">
                {config.title}
              </h1>
            </div>

            {/* Account Input */}
            <FormField
              control={otpForm.control}
              name="account"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder={config.accountPlaceholder}
                      className="h-12"
                      disabled={isLoading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* OTP Input */}
            <FormField
              control={otpForm.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <OtpInput
                      value={field.value}
                      onChange={field.onChange}
                      onSendOtp={onSendOtp}
                      countdown={countdown}
                      hasSent={countdown > 0}
                      isLoading={isLoading}
                      isVerifying={isVerifying}
                      placeholder="短信验证码"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Error Display Area */}
            <ErrorDisplay message={currentError} />

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
              control={otpForm.control}
              name="agreedToTerms"
              render={({ field }) => (
                <TermsCheckboxWithTooltip
                  checked={field.value}
                  onChange={field.onChange}
                  disabled={isLoading}
                  showTooltip={showTermsTooltip}
                  onTermsClick={onTermsClick}
                  onPrivacyClick={onPrivacyClick}
                />
              )}
            />

            {/* Bottom Links */}
            <div className="flex items-center justify-between text-sm pt-2">
              <Button
                type="button"
                variant="link"
                onClick={() => onLoginMethodChange("password")}
                disabled={isLoading}
                className="text-primary hover:text-primary/90 p-0 h-auto"
              >
                {LOGIN_MODE_CONFIG.otp.switchButtonText}
              </Button>
            </div>
          </form>
        </Form>
      )}

      {/* GitHub Login - only in password mode */}
      {config.showGithubLogin && (
        <div className="flex items-center justify-start">
          <button
            type="button"
            onClick={onGithubLoginClick}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground hover:bg-foreground/90 transition-colors cursor-pointer"
          >
            <Github className="h-5 w-5 text-white" />
          </button>
        </div>
      )}
    </div>
  );
}
