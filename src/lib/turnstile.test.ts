import { beforeEach, describe, expect, it, vi } from "vitest";

const betterFetchMock = vi.hoisted(() => vi.fn());

vi.mock("@better-fetch/fetch", () => ({
  betterFetch: betterFetchMock,
}));

import { captcha } from "better-auth/plugins";

import {
  TURNSTILE_PROTECTED_ENDPOINTS,
  TURNSTILE_TEST_SECRET_KEY,
} from "@/lib/turnstile";

const createPlugin = () =>
  captcha({
    provider: "cloudflare-turnstile",
    secretKey: TURNSTILE_TEST_SECRET_KEY,
    endpoints: Array.from(TURNSTILE_PROTECTED_ENDPOINTS),
  });

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
    const plugin = createPlugin();
    const request = new Request(
      `https://example.com/api/auth${TURNSTILE_PROTECTED_ENDPOINTS[0]}`,
      {
        method: "POST",
      }
    );

    const result = await plugin.onRequest?.(request, mockCtx);

    expect(result).toBeDefined();
    expect(result?.response.status).toBe(400);
    expect(betterFetchMock).not.toHaveBeenCalled();
  });

  it("rejects invalid captcha tokens with 403 status", async () => {
    const plugin = createPlugin();
    betterFetchMock.mockResolvedValueOnce({
      data: { success: false },
      error: null,
    });

    const request = new Request(
      `https://example.com/api/auth${TURNSTILE_PROTECTED_ENDPOINTS[0]}`,
      {
        method: "POST",
        headers: {
          "x-captcha-response": "invalid-token",
        },
      }
    );

    expect(request.headers.get("x-captcha-response")).toBe("invalid-token");
    const result = await plugin.onRequest?.(request, mockCtx);

    expect(result).toBeDefined();
    expect(betterFetchMock).toHaveBeenCalled();
    expect(result?.response.status).toBe(403);
    expect(betterFetchMock).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        body: expect.stringContaining("invalid-token"),
      })
    );
  });
});
