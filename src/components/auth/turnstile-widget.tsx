"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

declare global {
  interface Window {
    turnstile?: {
      render(
        container: HTMLElement,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          "error-callback"?: () => void;
          "expire-callback"?: () => void;
          "timeout-callback"?: () => void;
          action?: string;
          theme?: "light" | "dark" | "auto";
        }
      ): string;
      reset(widgetId?: string): void;
      remove(widgetId?: string): void;
    };
  }
}

const TURNSTILE_SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

interface TurnstileWidgetProps {
  siteKey: string;
  className?: string;
  resetSignal?: number;
  onSuccess: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
}

export default function TurnstileWidget({
  siteKey,
  className,
  resetSignal = 0,
  onSuccess,
  onExpire,
  onError,
}: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [isScriptReady, setIsScriptReady] = useState(false);
  const [internalError, setInternalError] = useState<string | null>(null);

  const renderWidget = useCallback(() => {
    if (!siteKey || !window.turnstile || !containerRef.current) {
      return;
    }

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      callback: token => {
        setInternalError(null);
        onSuccess(token);
      },
      "expire-callback": () => {
        onExpire?.();
      },
      "timeout-callback": () => {
        onExpire?.();
      },
      "error-callback": () => {
        setInternalError("人机验证加载失败，请刷新页面后重试");
        onError?.();
      },
    });
  }, [onError, onExpire, onSuccess, siteKey]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (window.turnstile) {
      setIsScriptReady(true);
    }
  }, []);

  useEffect(() => {
    if (isScriptReady && siteKey && window.turnstile && !widgetIdRef.current) {
      renderWidget();
    }
  }, [isScriptReady, renderWidget, siteKey]);

  useEffect(() => {
    if (!resetSignal) {
      return;
    }

    if (window.turnstile && widgetIdRef.current) {
      window.turnstile.reset(widgetIdRef.current);
      setInternalError(null);
    }
  }, [resetSignal]);

  useEffect(() => {
    return () => {
      if (window.turnstile && widgetIdRef.current) {
        window.turnstile.remove(widgetIdRef.current);
      }
    };
  }, []);

  if (!siteKey) {
    return (
      <div
        className={cn(
          "rounded-md border border-dashed border-amber-300 bg-amber-50 p-3 text-sm text-amber-800",
          className
        )}
      >
        尚未配置 `NEXT_PUBLIC_TURNSTILE_SITE_KEY`，无法加载人机验证组件。
      </div>
    );
  }

  return (
    <div className={cn("space-y-2", className)}>
      <Script
        id="cf-turnstile-script"
        src={TURNSTILE_SCRIPT_SRC}
        strategy="lazyOnload"
        onReady={() => setIsScriptReady(true)}
        onError={() => setInternalError("无法加载 Turnstile 脚本，请稍后重试")}
      />
      <div ref={containerRef} className="flex justify-center" />
      {internalError && (
        <p className="text-sm text-red-600 text-center">{internalError}</p>
      )}
    </div>
  );
}
