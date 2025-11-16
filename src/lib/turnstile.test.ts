import { beforeEach, describe, expect, it, vi } from "vitest";

const betterFetchMock = vi.hoisted(() => vi.fn());

vi.mock("@better-fetch/fetch", () => ({
  betterFetch: betterFetchMock,
}));

import {
  TURNSTILE_PROTECTED_ENDPOINTS,
  TURNSTILE_TEST_SECRET_KEY,
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
};

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
