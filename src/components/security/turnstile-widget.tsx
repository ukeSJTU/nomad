"use client";

import { Turnstile } from "@marsidev/react-turnstile";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import type { TurnstileWidgetProps } from "@/types";

const TESTING_SITE_KEY = "1x00000000000000000000AA";

export function TurnstileWidget({
  onSuccess,
  onError,
  onExpire,
  className,
}: TurnstileWidgetProps) {
  const { resolvedTheme } = useTheme();
  const [renderKey, setRenderKey] = useState(0);

  const siteKey =
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || TESTING_SITE_KEY;

  useEffect(() => {
    console.log("TurnstileWidget: Using site key:", siteKey);
  }, [siteKey]);

  // Force re-render when theme changes so Turnstile picks up the new theme.
  useEffect(() => {
    setRenderKey(prev => prev + 1);
  }, [resolvedTheme]);

  const handleSuccess = (token: string) => {
    console.log("TurnstileWidget: Token received, length:", token.length);
    onSuccess(token);
  };

  const handleError = () => {
    console.error("TurnstileWidget: Error occurred");
    onError?.();
  };

  const handleExpire = () => {
    console.warn("TurnstileWidget: Token expired");
    onExpire?.();
  };

  return (
    <div className={className}>
      <Turnstile
        key={renderKey}
        siteKey={siteKey}
        options={{
          theme: resolvedTheme === "dark" ? "dark" : "light",
        }}
        onSuccess={handleSuccess}
        onError={handleError}
        onExpire={handleExpire}
      />
    </div>
  );
}
