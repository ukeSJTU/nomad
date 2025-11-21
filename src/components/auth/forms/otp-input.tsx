"use client";

import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface OtpInputProps {
  /** Current OTP value */
  value: string;
  /** Callback when OTP value changes */
  onChange: (value: string) => void;
  /** Callback to send OTP */
  onSendOtp: () => void | Promise<void>;
  /** Countdown timer in seconds (0 = can send) */
  countdown: number;
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

/**
 * OTP Input component with inline send button
 * Used for phone/email verification flows
 */
export default function OtpInput({
  value,
  onChange,
  onSendOtp,
  countdown,
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

  /** Track if OTP has been sent at least once */
  const hasSentRef = useRef(false);

  // Mark as sent when countdown starts
  useEffect(() => {
    if (countdown > 0) {
      hasSentRef.current = true;
    }
  }, [countdown]);

  const getButtonText = () => {
    if (isVerifying) return "验证中...";
    if (countdown > 0) return `${countdown}秒后重试`;
    return hasSentRef.current ? "重发验证码" : "发送验证码";
  };

  return (
    <div className={cn("relative", className)}>
      <Input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
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
        {getButtonText()}
      </Button>
    </div>
  );
}
