import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const betterFetchMock = vi.hoisted(() => vi.fn());

vi.mock("@better-fetch/fetch", () => ({
  betterFetch: betterFetchMock,
}));

import {
  getTurnstileSecretKey,
  getTurnstileSiteKey,
  TURNSTILE_PROTECTED_ENDPOINTS,
  TURNSTILE_TEST_SECRET_KEY,
  TURNSTILE_TEST_SITE_KEY,
} from "@/lib/turnstile";

const createPlugin = async () => {
  const { captcha } = await import("better-auth/plugins");
  return captcha({
    provider: "cloudflare-turnstile",
    secretKey: TURNSTILE_TEST_SECRET_KEY,
    endpoints: Array.from(TURNSTILE_PROTECTED_ENDPOINTS),
  });
};

const mockCtx = {
  logger: {
    error: vi.fn(),
  },
} as any;

describe("Turnstile Configuration", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe("getTurnstileSecretKey", () => {
    it("returns the configured secret key when TURNSTILE_SECRET_KEY is set", () => {
      process.env.TURNSTILE_SECRET_KEY = "custom-secret-key";
      const key = getTurnstileSecretKey();
      expect(key).toBe("custom-secret-key");
    });

    it("returns test key in non-production environment when not configured", () => {
      delete process.env.TURNSTILE_SECRET_KEY;
      (process.env as Record<string, string>).NODE_ENV = "development";
      const key = getTurnstileSecretKey();
      expect(key).toBe(TURNSTILE_TEST_SECRET_KEY);
    });

    it("throws error in production environment when not configured", () => {
      delete process.env.TURNSTILE_SECRET_KEY;
      (process.env as Record<string, string>).NODE_ENV = "production";
      expect(() => getTurnstileSecretKey()).toThrow(
        "TURNSTILE_SECRET_KEY must be configured in production environment"
      );
    });
  });

  describe("getTurnstileSiteKey", () => {
    it("returns NEXT_PUBLIC_TURNSTILE_SITE_KEY when set", () => {
      process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY = "public-site-key";
      process.env.TURNSTILE_SITE_KEY = "legacy-key";
      const key = getTurnstileSiteKey();
      expect(key).toBe("public-site-key");
    });

    it("falls back to TURNSTILE_SITE_KEY for backwards compatibility", () => {
      delete process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
      process.env.TURNSTILE_SITE_KEY = "legacy-key";
      const key = getTurnstileSiteKey();
      expect(key).toBe("legacy-key");
    });

    it("returns test key in non-production environment when not configured", () => {
      delete process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
      delete process.env.TURNSTILE_SITE_KEY;
      (process.env as Record<string, string>).NODE_ENV = "development";
      const key = getTurnstileSiteKey();
      expect(key).toBe(TURNSTILE_TEST_SITE_KEY);
    });

    it("throws error in production environment when not configured", () => {
      delete process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
      delete process.env.TURNSTILE_SITE_KEY;
      (process.env as Record<string, string>).NODE_ENV = "production";
      expect(() => getTurnstileSiteKey()).toThrow(
        "NEXT_PUBLIC_TURNSTILE_SITE_KEY must be configured in production environment"
      );
    });
  });
});

describe("Turnstile captcha plugin", () => {
  beforeEach(() => {
    betterFetchMock.mockReset();
    mockCtx.logger.error.mockReset();
  });

  it("rejects requests without captcha header", async () => {
    const plugin = await createPlugin();
    const request = new Request(
      `https://example.com/api/auth${TURNSTILE_PROTECTED_ENDPOINTS[0]}`,
      {
        method: "POST",
      }
    );

    const result = await plugin.onRequest?.(request, mockCtx);
    console.log("logger calls invalid", mockCtx.logger.error.mock.calls);
    console.log("result status", result?.response.status);

    expect(result).toBeDefined();
    expect(result?.response.status).toBe(400);
    expect(betterFetchMock).not.toHaveBeenCalled();
  });
});
