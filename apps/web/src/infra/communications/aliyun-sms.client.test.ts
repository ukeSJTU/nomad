import { beforeEach, describe, expect, it, vi } from "vitest";

// Create a mock function that we can control
const mockSendSmsVerifyCodeWithOptions = vi.fn();

const { mockLogger } = vi.hoisted(() => {
  const logger = {
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn(),
    child: vi.fn(),
  };
  logger.child.mockReturnValue(logger);
  return { mockLogger: logger };
});

// Mock the Aliyun SDK modules
vi.mock("@alicloud/credentials", () => ({
  default: vi.fn(),
}));

vi.mock("@alicloud/dypnsapi20170525", () => ({
  default: vi.fn().mockImplementation(() => ({
    sendSmsVerifyCodeWithOptions: mockSendSmsVerifyCodeWithOptions,
  })),
  SendSmsVerifyCodeRequest: vi.fn().mockImplementation(params => params),
}));

vi.mock("@alicloud/openapi-client", () => ({
  Config: vi.fn(),
}));

vi.mock("@alicloud/tea-util", () => ({
  RuntimeOptions: vi.fn().mockImplementation(params => params),
}));

vi.mock("@/infra/logging/logger", () => ({
  createScopedLogger: () => mockLogger,
  default: mockLogger,
}));

// Import after mocking
import { sendSmsOtp } from "./aliyun-sms.client";

describe("SMS Service", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
    mockLogger.info.mockClear();
    mockLogger.error.mockClear();
    mockLogger.warn.mockClear();
    mockLogger.debug.mockClear();
    mockLogger.child.mockClear();

    // Reset environment variables
    delete process.env.ALIBABA_CLOUD_SMS_SIGN_NAME;
    delete process.env.ALIBABA_CLOUD_SMS_TEMPLATE_CODE;
  });

  describe("sendSmsOtp", () => {
    it("should send SMS successfully with valid configuration", async () => {
      // Setup environment variables
      process.env.ALIBABA_CLOUD_SMS_SIGN_NAME = "TestSign";
      process.env.ALIBABA_CLOUD_SMS_TEMPLATE_CODE = "SMS_123456";

      // Mock successful response
      mockSendSmsVerifyCodeWithOptions.mockResolvedValue({
        body: {
          code: "OK",
          requestId: "test-request-id",
        },
      });

      const result = await sendSmsOtp("13800138000", "123456");

      expect(result).toBe(true);
      expect(mockSendSmsVerifyCodeWithOptions).toHaveBeenCalledWith(
        {
          phoneNumber: "13800138000",
          signName: "TestSign",
          templateCode: "SMS_123456",
          templateParam: JSON.stringify({ code: "123456", min: "5" }),
          countryCode: "86",
        },
        {}
      );
    });

    it("should reject phone numbers with country prefixes", async () => {
      process.env.ALIBABA_CLOUD_SMS_SIGN_NAME = "TestSign";
      process.env.ALIBABA_CLOUD_SMS_TEMPLATE_CODE = "SMS_123456";

      mockSendSmsVerifyCodeWithOptions.mockResolvedValue({
        body: { code: "OK", requestId: "test-request-id" },
      });

      const result = await sendSmsOtp("+8613800138000", "123456");

      expect(result).toBe(false);
      expect(mockSendSmsVerifyCodeWithOptions).not.toHaveBeenCalled();
    });

    it("should trim whitespace before sending phone numbers", async () => {
      process.env.ALIBABA_CLOUD_SMS_SIGN_NAME = "TestSign";
      process.env.ALIBABA_CLOUD_SMS_TEMPLATE_CODE = "SMS_123456";

      mockSendSmsVerifyCodeWithOptions.mockResolvedValue({
        body: { code: "OK", requestId: "test-request-id" },
      });

      await sendSmsOtp(" 13800138000 ", "123456");

      expect(mockSendSmsVerifyCodeWithOptions).toHaveBeenLastCalledWith(
        expect.objectContaining({
          phoneNumber: "13800138000",
        }),
        {}
      );
    });

    it("should return false when SMS sending fails", async () => {
      process.env.ALIBABA_CLOUD_SMS_SIGN_NAME = "TestSign";
      process.env.ALIBABA_CLOUD_SMS_TEMPLATE_CODE = "SMS_123456";

      mockSendSmsVerifyCodeWithOptions.mockResolvedValue({
        body: {
          code: "FAILED",
          message: "SMS sending failed",
        },
      });

      const result = await sendSmsOtp("13800138000", "123456");

      expect(result).toBe(false);
    });

    it("should return false when required environment variables are missing", async () => {
      // Don't set environment variables

      const result = await sendSmsOtp("13800138000", "123456");

      expect(result).toBe(false);
      expect(mockSendSmsVerifyCodeWithOptions).not.toHaveBeenCalled();
    });

    it("should handle API errors gracefully", async () => {
      process.env.ALIBABA_CLOUD_SMS_SIGN_NAME = "TestSign";
      process.env.ALIBABA_CLOUD_SMS_TEMPLATE_CODE = "SMS_123456";

      mockSendSmsVerifyCodeWithOptions.mockRejectedValue(
        new Error("Network error")
      );

      const result = await sendSmsOtp("13800138000", "123456");

      expect(result).toBe(false);
    });

    it("should handle API errors with diagnostic information", async () => {
      process.env.ALIBABA_CLOUD_SMS_SIGN_NAME = "TestSign";
      process.env.ALIBABA_CLOUD_SMS_TEMPLATE_CODE = "SMS_123456";

      const errorWithData = {
        message: "API Error",
        data: {
          Recommend: "https://error.aliyun.com/diagnostic",
        },
      };

      mockSendSmsVerifyCodeWithOptions.mockRejectedValue(errorWithData);

      const result = await sendSmsOtp("13800138000", "123456");

      expect(result).toBe(false);
      expect(mockLogger.error).toHaveBeenCalledWith(
        expect.objectContaining({
          diagnosticUrl: "https://error.aliyun.com/diagnostic",
        }),
        "Error sending SMS verification code"
      );
    });
  });
});
