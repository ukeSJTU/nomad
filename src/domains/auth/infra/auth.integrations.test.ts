import { afterEach, describe, expect, it, vi } from "vitest";

import {
  sendAuthEmailOtp,
  sendAuthPhoneOtp,
  shouldEnableAliyunSms,
  shouldEnableResend,
} from "./auth.integrations";

vi.mock("@/integrations/aliyun-sms/client", () => ({
  sendSmsOtp: vi.fn().mockResolvedValue(true),
}));

vi.mock("@/integrations/resend/client", () => ({
  sendEmailOtp: vi.fn().mockResolvedValue(true),
}));

vi.mock("@/lib/server/logger", () => ({
  default: {
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn(),
    trace: vi.fn(),
    fatal: vi.fn(),
  },
}));

const mockSendSmsOtp = vi.mocked(
  await import("@/integrations/aliyun-sms/client")
).sendSmsOtp;
const mockSendEmailOtp = vi.mocked(
  await import("@/integrations/resend/client")
).sendEmailOtp;
const mockLogger = vi.mocked((await import("@/lib/server/logger")).default);

describe("Auth integrations toggles", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.clearAllMocks();
  });

  describe("shouldEnableAliyunSms", () => {
    it("returns true when explicitly enabled", () => {
      vi.stubEnv("ENABLE_ALIYUN_SMS", "enabled");
      expect(shouldEnableAliyunSms()).toBe(true);
    });

    it("returns false when explicitly disabled", () => {
      vi.stubEnv("ENABLE_ALIYUN_SMS", "disabled");
      expect(shouldEnableAliyunSms()).toBe(false);
    });

    it("defaults to production true, non-prod false", () => {
      vi.stubEnv("ENABLE_ALIYUN_SMS", "");
      vi.stubEnv("NODE_ENV", "production");
      expect(shouldEnableAliyunSms()).toBe(true);
      vi.stubEnv("NODE_ENV", "development");
      expect(shouldEnableAliyunSms()).toBe(false);
    });
  });

  describe("shouldEnableResend", () => {
    it("returns true when explicitly enabled", () => {
      vi.stubEnv("ENABLE_RESEND", "enabled");
      expect(shouldEnableResend()).toBe(true);
    });

    it("returns false when explicitly disabled", () => {
      vi.stubEnv("ENABLE_RESEND", "disabled");
      expect(shouldEnableResend()).toBe(false);
    });

    it("defaults to production true, non-prod false", () => {
      vi.stubEnv("ENABLE_RESEND", "");
      vi.stubEnv("NODE_ENV", "production");
      expect(shouldEnableResend()).toBe(true);
      vi.stubEnv("NODE_ENV", "development");
      expect(shouldEnableResend()).toBe(false);
    });
  });
});

describe("Auth OTP senders", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.clearAllMocks();
  });

  describe("sendAuthPhoneOtp", () => {
    it("uses Aliyun when enabled", async () => {
      vi.stubEnv("ENABLE_ALIYUN_SMS", "true");

      await sendAuthPhoneOtp("+8613812345678", "123456");

      expect(mockSendSmsOtp).toHaveBeenCalledWith("+8613812345678", "123456");
    });

    it("simulates send when disabled", async () => {
      vi.stubEnv("ENABLE_ALIYUN_SMS", "false");

      await sendAuthPhoneOtp("+8613812345678", "123456");

      expect(mockSendSmsOtp).not.toHaveBeenCalled();
      expect(mockLogger.info).toHaveBeenCalled();
    });

    it("throws when provider reports failure", async () => {
      vi.stubEnv("ENABLE_ALIYUN_SMS", "true");
      mockSendSmsOtp.mockResolvedValueOnce(false);

      await expect(
        sendAuthPhoneOtp("+8613812345678", "123456")
      ).rejects.toThrow("Failed to send SMS");
    });
  });

  describe("sendAuthEmailOtp", () => {
    it("uses Resend when enabled", async () => {
      vi.stubEnv("ENABLE_RESEND", "true");

      await sendAuthEmailOtp("user@example.com", "123456", "sign-in");

      expect(mockSendEmailOtp).toHaveBeenCalledWith(
        "user@example.com",
        "123456"
      );
    });

    it("simulates send when disabled", async () => {
      vi.stubEnv("ENABLE_RESEND", "false");

      await sendAuthEmailOtp("user@example.com", "123456", "sign-in");

      expect(mockSendEmailOtp).not.toHaveBeenCalled();
      expect(mockLogger.info).toHaveBeenCalled();
    });

    it("throws when provider reports failure", async () => {
      vi.stubEnv("ENABLE_RESEND", "true");
      mockSendEmailOtp.mockResolvedValueOnce(false);

      await expect(
        sendAuthEmailOtp("user@example.com", "123456", "sign-in")
      ).rejects.toThrow("Failed to send email");
    });
  });
});
