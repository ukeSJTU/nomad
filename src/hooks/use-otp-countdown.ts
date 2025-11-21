import { useCallback, useEffect, useState } from "react";

export interface UseOtpCountdownOptions {
  /** Initial countdown duration in seconds (default: 60) */
  duration?: number;
}

export interface UseOtpCountdownReturn {
  /** Current countdown value in seconds */
  countdown: number;
  /** Whether the countdown is active */
  isActive: boolean;
  /** Start the countdown */
  start: () => void;
  /** Reset the countdown to 0 */
  reset: () => void;
}

/**
 * Hook to manage OTP countdown timer
 * @param options - Configuration options
 * @returns Countdown state and controls
 */
export function useOtpCountdown(
  options: UseOtpCountdownOptions = {}
): UseOtpCountdownReturn {
  const { duration = 60 } = options;
  const [countdown, setCountdown] = useState(0);

  const isActive = countdown > 0;

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setTimeout(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  const start = useCallback(() => {
    setCountdown(duration);
  }, [duration]);

  const reset = useCallback(() => {
    setCountdown(0);
  }, []);

  return {
    countdown,
    isActive,
    start,
    reset,
  };
}
