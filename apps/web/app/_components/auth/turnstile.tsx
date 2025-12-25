import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { forwardRef } from "react";

export type { TurnstileInstance };

export interface TurnstileWidgetProps {
  /** Optional action name for analytics */
  action?: string;
  /** Widget size */
  size?: "normal" | "compact" | "flexible" | "invisible";
  /** Widget theme */
  theme?: "light" | "dark" | "auto";
  /** Custom className */
  className?: string;
  /** Callback when verification succeeds */
  onSuccess?: (token: string) => void;
  /** Callback when verification fails */
  onError?: () => void;
  /** Callback when token expires */
  onExpire?: () => void;
}

/**
 * Turnstile widget component for CAPTCHA verification
 * Supports ref for programmatic access (getResponse, reset, etc.)
 */
export const TurnstileWidget = forwardRef<
  TurnstileInstance | undefined,
  TurnstileWidgetProps
>(function TurnstileWidget(
  {
    action = "send-otp",
    size = "invisible",
    theme = "light",
    className,
    onSuccess,
    onError,
    onExpire,
  },
  ref
) {
  return (
    <Turnstile
      ref={ref}
      siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""}
      className={className}
      options={{
        action,
        theme,
        size,
        language: "zh-cn",
      }}
      scriptOptions={{
        appendTo: "body",
      }}
      onSuccess={onSuccess}
      onError={onError}
      onExpire={onExpire}
    />
  );
});

/**
 * @deprecated Use TurnstileWidget instead
 * Legacy OTP Turnstile widget for backwards compatibility
 */
export function OTPTurnstileWidget() {
  return (
    <TurnstileWidget
      action="send-otp"
      size="compact"
      theme="light"
      className="fixed bottom-4 right-4"
    />
  );
}
