import { describe, expect, it, vi } from "vitest";

import { verifyTurnstileToken } from "./turnstile";

const ORIGINAL_ENV = {
  TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY,
  NODE_ENV: process.env.NODE_ENV,
};

describe("verifyTurnstileToken", () => {
  beforeEach(() => {
    process.env.TURNSTILE_SECRET_KEY = "test-secret";
    process.env.NODE_ENV = "development";
  });

  afterEach(() => {
    if (ORIGINAL_ENV.TURNSTILE_SECRET_KEY === undefined) {
      delete process.env.TURNSTILE_SECRET_KEY;
    } else {
      process.env.TURNSTILE_SECRET_KEY = ORIGINAL_ENV.TURNSTILE_SECRET_KEY;
    }

    if (ORIGINAL_ENV.NODE_ENV === undefined) {
      delete process.env.NODE_ENV;
    } else {
      process.env.NODE_ENV = ORIGINAL_ENV.NODE_ENV;
    }

    vi.restoreAllMocks();
  });

  it("should return success for a valid token and include remote IP", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      json: async () => ({ success: true }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const result = await verifyTurnstileToken("valid-token", "1.2.3.4");

    expect(result).toEqual({ success: true });
    expect(fetchMock).toHaveBeenCalledTimes(1);

    const fetchOptions = fetchMock.mock.calls[0][1];
    const rawBody = fetchOptions?.body;
    expect(rawBody).toBeInstanceOf(URLSearchParams);

    const body = rawBody as URLSearchParams;
    expect(body.get("secret")).toBe("test-secret");
    expect(body.get("response")).toBe("valid-token");
    expect(body.get("remoteip")).toBe("1.2.3.4");
  });

  it("should return a localized error for invalid tokens", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      json: async () => ({
        success: false,
        "error-codes": ["invalid-input-response"],
      }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const result = await verifyTurnstileToken("bad-token");

    expect(result.success).toBe(false);
    expect(result.error).toBe("请完成人机验证");
    expect(result.errorCodes).toEqual(["invalid-input-response"]);
  });

  it("should handle network failures gracefully", async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error("Network error"));
    vi.stubGlobal("fetch", fetchMock);

    const result = await verifyTurnstileToken("token");

    expect(result.success).toBe(false);
    expect(result.error).toBe("验证服务暂时不可用，请稍后重试");
    expect(result.errorCodes).toEqual(["network-error"]);
  });

  it("should reject missing tokens before calling the API", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const result = await verifyTurnstileToken();

    expect(result.success).toBe(false);
    expect(result.errorCodes).toEqual(["missing-input-response"]);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("should bypass verification in development without a secret key", async () => {
    delete process.env.TURNSTILE_SECRET_KEY;
    process.env.NODE_ENV = "development";
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const result = await verifyTurnstileToken("token");

    expect(result).toEqual({ success: true, bypassed: true });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("should fail when no secret key is configured in production", async () => {
    delete process.env.TURNSTILE_SECRET_KEY;
    process.env.NODE_ENV = "production";
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const result = await verifyTurnstileToken("token");

    expect(result.success).toBe(false);
    expect(result.error).toBe("Turnstile 未配置，请联系管理员");
    expect(result.errorCodes).toEqual(["missing-input-secret"]);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
