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

  // Force re-render when theme changes so Turnstile picks up the new theme.
  useEffect(() => {
    setRenderKey(prev => prev + 1);
  }, [resolvedTheme]);

  return (
    <div className={className}>
      <Turnstile
        key={renderKey}
        siteKey={siteKey}
        options={{
          theme: resolvedTheme === "dark" ? "dark" : "light",
        }}
        onSuccess={onSuccess}
        onError={onError}
        onExpire={onExpire}
      />
    </div>
  );
}
