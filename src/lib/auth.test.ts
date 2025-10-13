import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// We need to extract the shouldEnableAliyunSms function for testing
// Since it's not exported, we'll need to test it indirectly through the sendOTP function
// or we can create a test version that exports it

// Mock the dependencies
vi.mock("@/lib/db", () => ({
  db: {},
}));

vi.mock("@/lib/sms", () => ({
  sendSmsOtp: vi.fn(),
}));

vi.mock("@/utils/logger", () => ({
  default: {
    info: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("better-auth", () => ({
  betterAuth: vi.fn().mockImplementation(config => config),
}));

vi.mock("better-auth/adapters/drizzle", () => ({
  drizzleAdapter: vi.fn(),
}));

vi.mock("better-auth/plugins", () => ({
  phoneNumber: vi.fn().mockImplementation(config => config),
}));

vi.mock("@faker-js/faker", () => ({
  faker: {
    person: {
      firstName: vi.fn().mockReturnValue("John"),
    },
  },
}));

describe("Auth Configuration", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();

    // Mock console methods to avoid noise in test output
    vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore environment variables
    vi.unstubAllEnvs();
  });

  describe("shouldEnableAliyunSms logic (tested through sendOTP)", () => {
    let sendOTPFunction: any;

    beforeEach(async () => {
      // Import the auth module to get the sendOTP function
      const authModule = await import("./auth");
      const authConfig = authModule.auth as any;

      // Extract the sendOTP function from the phoneNumber plugin configuration
      const phoneNumberPlugin = authConfig.plugins[0];
      sendOTPFunction = phoneNumberPlugin.sendOTP;
    });

    it("should enable Aliyun SMS when ENABLE_ALIYUN_SMS is 'enabled'", async () => {
      vi.stubEnv("ENABLE_ALIYUN_SMS", "enabled");
      vi.stubEnv("NODE_ENV", "development"); // Should be overridden by explicit setting

      const { sendSmsOtp } = await import("@/lib/sms");
      vi.mocked(sendSmsOtp).mockResolvedValue(true);

      await sendOTPFunction({ phoneNumber: "13800138000", code: "123456" }, {});

      expect(sendSmsOtp).toHaveBeenCalledWith("13800138000", "123456");
    });

    it("should enable Aliyun SMS when ENABLE_ALIYUN_SMS is 'true'", async () => {
      vi.stubEnv("ENABLE_ALIYUN_SMS", "true");
      vi.stubEnv("NODE_ENV", "development"); // Should be overridden by explicit setting

      const { sendSmsOtp } = await import("@/lib/sms");
      vi.mocked(sendSmsOtp).mockResolvedValue(true);

      await sendOTPFunction({ phoneNumber: "13800138000", code: "123456" }, {});

      expect(sendSmsOtp).toHaveBeenCalledWith("13800138000", "123456");
    });

    it("should disable Aliyun SMS when ENABLE_ALIYUN_SMS is 'disabled'", async () => {
      vi.stubEnv("ENABLE_ALIYUN_SMS", "disabled");
      vi.stubEnv("NODE_ENV", "production"); // Should be overridden by explicit setting

      const { sendSmsOtp } = await import("@/lib/sms");
      const logger = (await import("@/utils/logger")).default;

      await sendOTPFunction({ phoneNumber: "13800138000", code: "123456" }, {});

      expect(sendSmsOtp).not.toHaveBeenCalled();
      expect(logger.info).toHaveBeenCalledWith(
        "[SMS SIMULATION] Sending OTP code 123456 to 13800138000"
      );
      expect(logger.info).toHaveBeenCalledWith(
        "[SMS SIMULATION] Environment: production, ENABLE_ALIYUN_SMS: disabled"
      );
    });

    it("should disable Aliyun SMS when ENABLE_ALIYUN_SMS is 'false'", async () => {
      vi.stubEnv("ENABLE_ALIYUN_SMS", "false");
      vi.stubEnv("NODE_ENV", "production"); // Should be overridden by explicit setting

      const { sendSmsOtp } = await import("@/lib/sms");
      const logger = (await import("@/utils/logger")).default;

      await sendOTPFunction({ phoneNumber: "13800138000", code: "123456" }, {});

      expect(sendSmsOtp).not.toHaveBeenCalled();
      expect(logger.info).toHaveBeenCalledWith(
        "[SMS SIMULATION] Sending OTP code 123456 to 13800138000"
      );
    });

    it("should enable Aliyun SMS in production environment by default", async () => {
      // Don't set ENABLE_ALIYUN_SMS, let it use default logic
      vi.stubEnv("NODE_ENV", "production");

      const { sendSmsOtp } = await import("@/lib/sms");
      vi.mocked(sendSmsOtp).mockResolvedValue(true);

      await sendOTPFunction({ phoneNumber: "13800138000", code: "123456" }, {});

      expect(sendSmsOtp).toHaveBeenCalledWith("13800138000", "123456");
    });

    it("should disable Aliyun SMS in development environment by default", async () => {
      // Don't set ENABLE_ALIYUN_SMS, let it use default logic
      vi.stubEnv("NODE_ENV", "development");

      const { sendSmsOtp } = await import("@/lib/sms");
      const logger = (await import("@/utils/logger")).default;

      await sendOTPFunction({ phoneNumber: "13800138000", code: "123456" }, {});

      expect(sendSmsOtp).not.toHaveBeenCalled();
      expect(logger.info).toHaveBeenCalledWith(
        "[SMS SIMULATION] Sending OTP code 123456 to 13800138000"
      );
      expect(logger.info).toHaveBeenCalledWith(
        "[SMS SIMULATION] Environment: development, ENABLE_ALIYUN_SMS: undefined"
      );
    });

    it("should disable Aliyun SMS in test environment by default", async () => {
      // Don't set ENABLE_ALIYUN_SMS, let it use default logic
      vi.stubEnv("NODE_ENV", "test");

      const { sendSmsOtp } = await import("@/lib/sms");
      const logger = (await import("@/utils/logger")).default;

      await sendOTPFunction({ phoneNumber: "13800138000", code: "123456" }, {});

      expect(sendSmsOtp).not.toHaveBeenCalled();
      expect(logger.info).toHaveBeenCalledWith(
        "[SMS SIMULATION] Sending OTP code 123456 to 13800138000"
      );
    });

    it("should handle case-insensitive ENABLE_ALIYUN_SMS values", async () => {
      // Test uppercase
      vi.stubEnv("ENABLE_ALIYUN_SMS", "ENABLED");
      vi.stubEnv("NODE_ENV", "development");

      const { sendSmsOtp } = await import("@/lib/sms");
      vi.mocked(sendSmsOtp).mockResolvedValue(true);

      await sendOTPFunction({ phoneNumber: "13800138000", code: "123456" }, {});

      expect(sendSmsOtp).toHaveBeenCalledWith("13800138000", "123456");

      // Reset and test mixed case
      vi.clearAllMocks();
      vi.stubEnv("ENABLE_ALIYUN_SMS", "True");

      await sendOTPFunction({ phoneNumber: "13800138001", code: "654321" }, {});

      expect(sendSmsOtp).toHaveBeenCalledWith("13800138001", "654321");
    });

    it("should handle invalid ENABLE_ALIYUN_SMS values by using default logic", async () => {
      vi.stubEnv("ENABLE_ALIYUN_SMS", "maybe"); // Invalid value
      vi.stubEnv("NODE_ENV", "production"); // Should default to enabled in production

      const { sendSmsOtp } = await import("@/lib/sms");
      vi.mocked(sendSmsOtp).mockResolvedValue(true);

      await sendOTPFunction({ phoneNumber: "13800138000", code: "123456" }, {});

      expect(sendSmsOtp).toHaveBeenCalledWith("13800138000", "123456");

      // Test with development environment
      vi.clearAllMocks();
      vi.stubEnv("NODE_ENV", "development"); // Should default to disabled in development

      const logger = (await import("@/utils/logger")).default;

      await sendOTPFunction({ phoneNumber: "13800138000", code: "123456" }, {});

      expect(sendSmsOtp).not.toHaveBeenCalled();
      expect(logger.info).toHaveBeenCalledWith(
        "[SMS SIMULATION] Sending OTP code 123456 to 13800138000"
      );
    });

    it("should handle SMS sending success correctly", async () => {
      vi.stubEnv("ENABLE_ALIYUN_SMS", "enabled");

      const { sendSmsOtp } = await import("@/lib/sms");
      const logger = (await import("@/utils/logger")).default;
      vi.mocked(sendSmsOtp).mockResolvedValue(true);

      await sendOTPFunction({ phoneNumber: "13800138000", code: "123456" }, {});

      expect(logger.info).toHaveBeenCalledWith(
        "OTP code 123456 sent successfully to 13800138000 via Aliyun SMS"
      );
      expect(console.log).toHaveBeenCalledWith(
        "OTP code 123456 sent successfully to 13800138000 via Aliyun SMS"
      );
    });

    it("should handle SMS sending failure correctly", async () => {
      vi.stubEnv("ENABLE_ALIYUN_SMS", "enabled");

      const { sendSmsOtp } = await import("@/lib/sms");
      const logger = (await import("@/utils/logger")).default;
      vi.mocked(sendSmsOtp).mockResolvedValue(false);

      await expect(
        sendOTPFunction({ phoneNumber: "13800138000", code: "123456" }, {})
      ).rejects.toThrow("Failed to send SMS");

      expect(logger.error).toHaveBeenCalledWith(
        "Failed to send OTP code 123456 to 13800138000 via Aliyun SMS"
      );
      expect(console.error).toHaveBeenCalledWith(
        "Failed to send OTP code 123456 to 13800138000 via Aliyun SMS"
      );
    });

    it("should handle SMS sending errors correctly", async () => {
      vi.stubEnv("ENABLE_ALIYUN_SMS", "enabled");

      const { sendSmsOtp } = await import("@/lib/sms");
      const logger = (await import("@/utils/logger")).default;
      const testError = new Error("Network error");
      vi.mocked(sendSmsOtp).mockRejectedValue(testError);

      await expect(
        sendOTPFunction({ phoneNumber: "13800138000", code: "123456" }, {})
      ).rejects.toThrow("Network error");

      expect(logger.error).toHaveBeenCalledWith(
        { error: testError },
        "Error sending OTP via Aliyun SMS"
      );
      expect(console.error).toHaveBeenCalledWith(
        "Error sending OTP via Aliyun SMS:",
        testError
      );
    });
  });
});
