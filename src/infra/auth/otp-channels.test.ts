import { beforeEach, describe, expect, it, vi } from "vitest";

import { __resetEnvForTests } from "@/config/env";
import {
  sendAuthEmailOtp,
  sendAuthPhoneOtp,
  shouldEnableAliyunSms,
  shouldEnableResend,
} from "./otp-channels";

vi.mock("@/infra/communications", () => ({
  sendSmsOtp: vi.fn().mockResolvedValue(true),
  sendEmailOtp: vi.fn().mockResolvedValue(true),
}));

vi.mock("@/infra/logging", () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn(),
    trace: vi.fn(),
    fatal: vi.fn(),
  },
}));

const mockSendSmsOtp = vi.mocked(
  await import("@/infra/communications")
).sendSmsOtp;
const mockSendEmailOtp = vi.mocked(
  await import("@/infra/communications")
).sendEmailOtp;
const mockLogger = vi.mocked((await import("@/infra/logging")).logger);

beforeEach(() => {
  vi.unstubAllEnvs();
  __resetEnvForTests();
  vi.clearAllMocks();
});

describe("Auth integrations toggles", () => {
  describe("shouldEnableAliyunSms", () => {
    it("returns true when explicitly enabled", () => {
      vi.stubEnv("ENABLE_ALIYUN_SMS", "enabled");
      vi.stubEnv("ALIBABA_CLOUD_SMS_SIGN_NAME", "dummy-sign");
      vi.stubEnv("ALIBABA_CLOUD_SMS_TEMPLATE_CODE", "dummy-template");
      // NODE_ENV 任意，此处主要验证显式 enable 覆盖环境
      vi.stubEnv("NODE_ENV", "development");

      expect(shouldEnableAliyunSms()).toBe(true);
    });

    it("returns false when explicitly disabled", () => {
      vi.stubEnv("ENABLE_ALIYUN_SMS", "disabled");
      vi.stubEnv("NODE_ENV", "production"); // 即使 prod，只要显式 disabled 就 false

      expect(shouldEnableAliyunSms()).toBe(false);
    });

    it("defaults to true in production when flag is empty", () => {
      vi.stubEnv("ENABLE_ALIYUN_SMS", "");
      vi.stubEnv("NODE_ENV", "production");

      expect(shouldEnableAliyunSms()).toBe(true);
    });

    it("defaults to false in non-production when flag is empty", () => {
      vi.stubEnv("ENABLE_ALIYUN_SMS", "");
      vi.stubEnv("NODE_ENV", "development");

      expect(shouldEnableAliyunSms()).toBe(false);

      vi.unstubAllEnvs();
      __resetEnvForTests();

      vi.stubEnv("ENABLE_ALIYUN_SMS", "");
      vi.stubEnv("NODE_ENV", "test");

      expect(shouldEnableAliyunSms()).toBe(false);
    });
  });

  describe("shouldEnableResend", () => {
    it("returns true when explicitly enabled", () => {
      vi.stubEnv("ENABLE_RESEND", "enabled");
      vi.stubEnv("RESEND_API_KEY", "test-key");
      vi.stubEnv("NODE_ENV", "development");

      expect(shouldEnableResend()).toBe(true);
    });

    it("returns false when explicitly disabled", () => {
      vi.stubEnv("ENABLE_RESEND", "disabled");
      vi.stubEnv("NODE_ENV", "production");

      expect(shouldEnableResend()).toBe(false);
    });

    it("defaults to true in production when flag is empty", () => {
      vi.stubEnv("ENABLE_RESEND", "");
      vi.stubEnv("NODE_ENV", "production");

      expect(shouldEnableResend()).toBe(true);
    });

    it("defaults to false in non-production when flag is empty", () => {
      vi.stubEnv("ENABLE_RESEND", "");
      vi.stubEnv("NODE_ENV", "development");

      expect(shouldEnableResend()).toBe(false);

      vi.unstubAllEnvs();
      __resetEnvForTests();

      vi.stubEnv("ENABLE_RESEND", "");
      vi.stubEnv("NODE_ENV", "test");

      expect(shouldEnableResend()).toBe(false);
    });
  });
});

describe("Auth OTP senders", () => {
  describe("sendAuthPhoneOtp", () => {
    it("uses Aliyun when enabled", async () => {
      vi.stubEnv("ENABLE_ALIYUN_SMS", "true");
      vi.stubEnv("ALIBABA_CLOUD_SMS_SIGN_NAME", "dummy-sign");
      vi.stubEnv("ALIBABA_CLOUD_SMS_TEMPLATE_CODE", "dummy-template");

      await sendAuthPhoneOtp("13812345678", "123456");

      expect(mockSendSmsOtp).toHaveBeenCalledWith("13812345678", "123456");
    });

    it("simulates send when disabled", async () => {
      vi.stubEnv("ENABLE_ALIYUN_SMS", "false");

      await sendAuthPhoneOtp("13812345678", "123456");

      expect(mockSendSmsOtp).not.toHaveBeenCalled();
      expect(mockLogger.info).toHaveBeenCalled();
    });

    it("throws when provider reports failure", async () => {
      vi.stubEnv("ENABLE_ALIYUN_SMS", "true");
      vi.stubEnv("ALIBABA_CLOUD_SMS_SIGN_NAME", "dummy-sign");
      vi.stubEnv("ALIBABA_CLOUD_SMS_TEMPLATE_CODE", "dummy-template");

      mockSendSmsOtp.mockResolvedValueOnce(false);

      await expect(sendAuthPhoneOtp("13812345678", "123456")).rejects.toThrow(
        "Failed to send SMS"
      );
    });
  });

  describe("sendAuthEmailOtp", () => {
    it("uses Resend when enabled", async () => {
      vi.stubEnv("ENABLE_RESEND", "true");
      vi.stubEnv("RESEND_API_KEY", "test-key");

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
      vi.stubEnv("RESEND_API_KEY", "test-key");

      mockSendEmailOtp.mockResolvedValueOnce(false);

      await expect(
        sendAuthEmailOtp("user@example.com", "123456", "sign-in")
      ).rejects.toThrow("Failed to send email");
    });
  });
});
