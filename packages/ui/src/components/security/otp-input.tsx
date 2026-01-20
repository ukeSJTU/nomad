"use client";

import { Button } from "@ukesjtu/nomad-ui/components/primitives/button";
import { Input } from "@ukesjtu/nomad-ui/components/primitives/input";
import { cn } from "@ukesjtu/nomad-ui/lib/utils";

export interface OtpInputProps {
  /** Current OTP value */
  value: string;
  /** Callback when OTP value changes */
  onChange: (value: string) => void;
  /** Callback to send OTP */
  onSendOtp: () => void | Promise<void>;
  /** Countdown timer in seconds (0 = can send) */
  countdown: number;
  /** Has OTP been sent at least once */
  hasSent: boolean;
  /** Loading state for form submission */
  isLoading?: boolean;
  /** Verifying state for captcha */
  isVerifying?: boolean;
  /** Input placeholder */
  placeholder?: string;
  /** Maximum length for OTP */
  maxLength?: number;
  /** Disabled state */
  disabled?: boolean;
  /** Custom className for the container */
  className?: string;
  /** Custom className for the input */
  inputClassName?: string;
}

function getOtpButtonText(
  isVerifying: boolean,
  countdown: number,
  hasSent: boolean
): string {
  if (isVerifying) return "验证中...";
  if (countdown > 0) return `${countdown}秒后重试`;
  return hasSent ? "重发验证码" : "发送验证码";
}

/**
 * OTP Input component with inline send button
 * Used for phone/email verification flows
 */
export function OtpInput({
  value,
  onChange,
  onSendOtp,
  countdown,
  hasSent,
  isLoading = false,
  isVerifying = false,
  placeholder = "验证码",
  maxLength = 6,
  disabled = false,
  className,
  inputClassName,
}: OtpInputProps) {
  const isButtonDisabled =
    isLoading || isVerifying || countdown > 0 || disabled;

  return (
    <div className={cn("relative", className)}>
      <Input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value.replace(/\D/g, ""))}
        placeholder={placeholder}
        className={cn("h-12 pr-28", inputClassName)}
        maxLength={maxLength}
        disabled={isLoading || disabled}
      />
      <Button
        type="button"
        variant="link"
        size="sm"
        onClick={onSendOtp}
        disabled={isButtonDisabled}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-700"
      >
        {getOtpButtonText(isVerifying, countdown, hasSent)}
      </Button>
    </div>
  );
}
