"use client";

import type { TurnstileInstance } from "@marsidev/react-turnstile";
import { useCallback, useMemo, useRef, useState } from "react";

import { getTurnstileSiteKey } from "@/integrations/turnstile/client";

// Constants for captcha verification
const CAPTCHA_TIMEOUT = 30000; // 30 seconds
const CAPTCHA_POLL_INTERVAL = 100; // 100ms
const MOCKED_TEST_TOKEN = "test-captcha-token";

export interface CaptchaFetchOptions {
  headers: Record<string, string>;
}

export interface CaptchaRequestContext {
  fetchOptions: CaptchaFetchOptions;
  complete: () => void;
}

/**
 * Hook for managing Cloudflare Turnstile CAPTCHA in the application.
 * Uses @marsidev/react-turnstile for widget management.
 *
 * Supports two modes:
 * 1. Manual trigger: Call `prepareCaptchaRequest()` to trigger verification on-demand
 * 2. Auto mode (legacy): Pre-verified token ready to use
 *
 * @example
 * // Manual trigger (recommended for "Send OTP" buttons)
 * const { turnstileRef, siteKey, isVerifying, prepareCaptchaRequest } = useTurnstileCaptcha()
 *
 * <Turnstile
 *   ref={turnstileRef}
 *   siteKey={siteKey}
 *   options={{ size: 'invisible', execution: 'execute' }}
 * />
 *
 * <Button onClick={handleClick} disabled={isVerifying}>
 *   {isVerifying ? '验证中...' : '发送验证码'}
 * </Button>
 *
 * const handleClick = async () => {
 *   const context = await prepareCaptchaRequest()
 *   if (!context) return
 *
 *   try {
 *     await api.call(data, context.fetchOptions)
 *   } finally {
 *     context.complete()
 *   }
 * }
 */
export function useTurnstileCaptcha() {
  const turnstileRef = useRef<TurnstileInstance | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  // Memoize site key - only compute once
  const siteKey = useMemo(() => getTurnstileSiteKey(), []);

  // Memoize test environment check - only compute once
  const isTest = useMemo(
    () => typeof window !== "undefined" && process.env.NODE_ENV === "test",
    []
  );

  /**
   * Manually trigger Turnstile challenge and wait for token.
   * Returns null if verification fails.
   */
  const triggerChallenge = useCallback(async (): Promise<string | null> => {
    // In test environment, return mock token
    if (isTest) {
      return MOCKED_TEST_TOKEN;
    }

    try {
      setError(null);
      setIsVerifying(true);

      // Trigger the challenge
      turnstileRef.current?.execute();

      // Wait for token
      const token = await turnstileRef.current?.getResponsePromise(
        CAPTCHA_TIMEOUT,
        CAPTCHA_POLL_INTERVAL
      );

      if (!token) {
        setError("人机验证失败，请重试");
        return null;
      }

      return token;
    } catch (err) {
      console.error("Turnstile challenge error:", err);
      setError("人机验证超时，请重试");
      turnstileRef.current?.reset();
      return null;
    } finally {
      setIsVerifying(false);
    }
  }, [isTest]);

  /**
   * Prepare a request with CAPTCHA verification.
   * Triggers the challenge and returns fetch options with the token.
   * Returns null if verification fails.
   *
   * Usage:
   * const context = await prepareCaptchaRequest()
   * if (!context) return
   *
   * try {
   *   await fetch('/api/endpoint', context.fetchOptions)
   * } finally {
   *   context.complete() // Reset the widget
   * }
   */
  const prepareCaptchaRequest =
    useCallback(async (): Promise<CaptchaRequestContext | null> => {
      const token = await triggerChallenge();

      if (!token) {
        return null;
      }

      let completed = false;

      const complete = () => {
        if (completed) return;
        completed = true;
        // Reset widget for next verification
        turnstileRef.current?.reset();
      };

      return {
        fetchOptions: {
          headers: {
            "x-captcha-response": token,
          },
        },
        complete,
      };
    }, [triggerChallenge]);

  return {
    /** Cloudflare Turnstile site key */
    siteKey,

    /** Ref to control the Turnstile widget */
    turnstileRef,

    /** Current error message (null if no error) */
    error,

    /** Set error message manually */
    setError,

    /** Whether captcha verification is in progress */
    isVerifying,

    /** Trigger CAPTCHA challenge and return token */
    triggerChallenge,

    /** Prepare request with CAPTCHA verification (recommended) */
    prepareCaptchaRequest,
  };
}
