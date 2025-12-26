import { useCallback, useEffect, useMemo, useState } from "react";

import { OTP_COOLDOWN_SECONDS } from "@/lib/otp";

export interface UseOtpCountdownOptions {
  /** Initial countdown duration in seconds (default: 60) */
  duration?: number;
  /**
   * Storage key used to persist countdown state
   * Provide a per-account key to avoid collisions across flows
   */
  storageKey?: string | null;
}

export interface UseOtpCountdownReturn {
  /** Current countdown value in seconds */
  countdown: number;
  /** Whether the countdown is active */
  isActive: boolean;
  /** Start the countdown (optionally override start seconds) */
  start: (seconds?: number) => void;
  /** Reset the countdown to 0 */
  reset: () => void;
}

const DEFAULT_STORAGE_KEY = "otp-countdown:default";

function readCookieValue(key: string): string | null {
  if (typeof document === "undefined") return null;

  const match = document.cookie.match(
    new RegExp(`(?:^|; )${encodeURIComponent(key)}=([^;]*)`)
  );

  return match?.[1] ? decodeURIComponent(match[1]) : null;
}

function persistExpiration(
  key: string,
  expiresAt: number,
  maxAgeSeconds: number
) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(key, String(expiresAt));
  } catch {
    // Ignore storage errors (e.g., private mode)
  }

  try {
    document.cookie = `${encodeURIComponent(key)}=${expiresAt}; max-age=${Math.ceil(maxAgeSeconds)}; path=/; SameSite=Lax`;
  } catch {
    // Ignore cookie write errors in restrictive environments
  }
}

function clearExpiration(key: string) {
  if (typeof window !== "undefined") {
    try {
      window.localStorage.removeItem(key);
    } catch {
      // Ignore storage errors
    }
  }

  if (typeof document !== "undefined") {
    try {
      document.cookie = `${encodeURIComponent(key)}=; max-age=0; path=/; SameSite=Lax`;
    } catch {
      // Ignore cookie write errors
    }
  }
}

function readStoredExpiration(key: string): number | null {
  const raw =
    (typeof window !== "undefined"
      ? (() => {
          try {
            return window.localStorage.getItem(key);
          } catch {
            return null;
          }
        })()
      : null) ?? readCookieValue(key);

  if (!raw) return null;

  const expiresAt = Number(raw);
  return Number.isFinite(expiresAt) ? expiresAt : null;
}

function getRemainingSeconds(key: string): number {
  const expiresAt = readStoredExpiration(key);
  if (!expiresAt) return 0;

  const remainingMs = expiresAt - Date.now();
  if (remainingMs <= 0) {
    clearExpiration(key);
    return 0;
  }

  return Math.ceil(remainingMs / 1000);
}

/**
 * Hook to manage OTP countdown timer with persistence across reloads/tabs.
 */
export function useOtpCountdown(
  options: UseOtpCountdownOptions = {}
): UseOtpCountdownReturn {
  const { duration = OTP_COOLDOWN_SECONDS, storageKey } = options;
  const resolvedKey = useMemo(
    () => (storageKey === null ? null : (storageKey ?? DEFAULT_STORAGE_KEY)),
    [storageKey]
  );
  const [countdown, setCountdown] = useState(0);

  const isActive = countdown > 0;

  // Rehydrate countdown from storage when the key changes or on mount
  useEffect(() => {
    if (!resolvedKey) return;

    const remainingSeconds = getRemainingSeconds(resolvedKey);
    setCountdown(remainingSeconds);
  }, [resolvedKey]);

  useEffect(() => {
    if (countdown <= 0) {
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(prev => {
        const next = prev - 1;
        if (next <= 0 && resolvedKey) {
          clearExpiration(resolvedKey);
          return 0;
        }
        return next;
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, resolvedKey]);

  const start = useCallback(
    (seconds?: number) => {
      const nextCountdown = seconds ?? duration;

      if (nextCountdown <= 0) {
        if (resolvedKey) {
          clearExpiration(resolvedKey);
        }
        setCountdown(0);
        return;
      }

      const expiresAt = Date.now() + nextCountdown * 1000;
      if (resolvedKey) {
        persistExpiration(resolvedKey, expiresAt, nextCountdown);
      }
      setCountdown(nextCountdown);
    },
    [duration, resolvedKey]
  );

  const reset = useCallback(() => {
    if (resolvedKey) {
      clearExpiration(resolvedKey);
    }
    setCountdown(0);
  }, [resolvedKey]);

  return {
    countdown,
    isActive,
    start,
    reset,
  };
}
