import { beforeEach, describe, expect, it, vi } from "vitest";

// Create a mock function that we can control
const mockSendSmsVerifyCodeWithOptions = vi.fn();

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

// Import after mocking
import { sendSmsOtp } from "./client";

describe("SMS Service", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();

    // Reset environment variables
    delete process.env.ALIBABA_CLOUD_SMS_SIGN_NAME;
    delete process.env.ALIBABA_CLOUD_SMS_TEMPLATE_CODE;

    // Mock console methods to avoid noise in test output
    vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
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

      const result = await sendSmsOtp("+8613800138000", "123456");

      expect(result).toBe(true);
      expect(mockSendSmsVerifyCodeWithOptions).toHaveBeenCalledWith(
        {
          phoneNumber: "13800138000", // Should remove +86 prefix
          signName: "TestSign",
          templateCode: "SMS_123456",
          templateParam: JSON.stringify({ code: "123456", min: "5" }),
          countryCode: "86",
        },
        {}
      );
    });

    it("should handle phone number formatting correctly", async () => {
      process.env.ALIBABA_CLOUD_SMS_SIGN_NAME = "TestSign";
      process.env.ALIBABA_CLOUD_SMS_TEMPLATE_CODE = "SMS_123456";

      mockSendSmsVerifyCodeWithOptions.mockResolvedValue({
        body: { code: "OK", requestId: "test-request-id" },
      });

      // Test with +86 prefix
      await sendSmsOtp("+8613800138000", "123456");
      expect(mockSendSmsVerifyCodeWithOptions).toHaveBeenLastCalledWith(
        expect.objectContaining({
          phoneNumber: "13800138000", // Should remove +86 prefix
        }),
        {}
      );

      // Test without +86 prefix
      await sendSmsOtp("13800138001", "654321");
      expect(mockSendSmsVerifyCodeWithOptions).toHaveBeenLastCalledWith(
        expect.objectContaining({
          phoneNumber: "13800138001", // Should remain unchanged
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
      expect(console.error).toHaveBeenCalledWith(
        "Diagnostic URL:",
        "https://error.aliyun.com/diagnostic"
      );
    });
  });
});
