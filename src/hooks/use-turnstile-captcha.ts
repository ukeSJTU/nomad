"use client";

import { useCallback, useEffect, useState } from "react";

export interface CaptchaFetchOptions {
  headers: Record<string, string>;
}

export interface CaptchaRequestContext {
  fetchOptions: CaptchaFetchOptions;
  complete: () => void;
}

export function useTurnstileCaptcha() {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const [resetSignal, setResetSignal] = useState(0);

  // In test environment, automatically set a mock token
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      process.env.NEXT_PUBLIC_IS_TEST === "true"
    ) {
      setCaptchaToken("test-captcha-token");
    }
  }, []);

  const requestNewChallenge = useCallback(() => {
    setCaptchaToken(null);
    setResetSignal(prev => prev + 1);
  }, []);

  const handleSolved = useCallback((token: string) => {
    setCaptchaToken(token);
    setCaptchaError(null);
  }, []);

  const handleWidgetExpire = useCallback(() => {
    setCaptchaError("验证码已过期，请重新完成人机验证");
    requestNewChallenge();
  }, [requestNewChallenge]);

  const handleWidgetError = useCallback(() => {
    setCaptchaError("人机验证组件加载失败，请刷新后重试");
    requestNewChallenge();
  }, [requestNewChallenge]);

  const prepareCaptchaRequest =
    useCallback((): CaptchaRequestContext | null => {
      // In test environment, always allow
      if (
        typeof window !== "undefined" &&
        process.env.NEXT_PUBLIC_IS_TEST === "true"
      ) {
        return {
          fetchOptions: {
            headers: {
              "x-captcha-response": "test-captcha-token",
            },
          },
          complete: () => {},
        };
      }

      if (!captchaToken) {
        setCaptchaError("请先完成人机验证");
        return null;
      }

      let completed = false;

      const complete = () => {
        if (completed) {
          return;
        }
        completed = true;
        requestNewChallenge();
      };

      return {
        fetchOptions: {
          headers: {
            "x-captcha-response": captchaToken,
          },
        },
        complete,
      };
    }, [captchaToken, requestNewChallenge]);

  return {
    captchaError,
    setCaptchaError,
    resetSignal,
    handleSolved,
    handleWidgetExpire,
    handleWidgetError,
    prepareCaptchaRequest,
    forceRefresh: requestNewChallenge,
  };
}
