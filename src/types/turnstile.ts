/**
 * Result of verifying a Cloudflare Turnstile token.
 */
export interface TurnstileVerificationResult {
  success: boolean;
  /**
   * Optional error message when verification fails.
   */
  error?: string;
  /**
   * Cloudflare error codes returned by the verification endpoint.
   */
  errorCodes?: string[];
  /**
   * Indicates that verification was bypassed (typically in development).
   */
  bypassed?: boolean;
}

/**
 * Props for the reusable Turnstile widget component.
 */
export interface TurnstileWidgetProps {
  onSuccess: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
  /**
   * Optional className to let parents control layout.
   */
  className?: string;
}
