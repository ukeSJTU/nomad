import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Mock the Resend SDK
const mockSendEmail = vi.fn();
vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: {
      send: mockSendEmail,
    },
  })),
}));

// Mock logger
vi.mock("@/utils/logger", () => ({
  default: {
    info: vi.fn(),
    error: vi.fn(),
  },
}));

// Import the function we want to test after mocking dependencies
import { sendEmailOtp } from "./email";

describe("Email Service", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();

    // Reset environment variables
    delete process.env.RESEND_API_KEY;
    delete process.env.RESEND_FROM_EMAIL;

    // Mock console methods to avoid noise in test output
    vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore environment variables
    vi.unstubAllEnvs();
  });

  describe("sendEmailOtp", () => {
    it("should send email successfully with valid configuration", async () => {
      // Setup environment variables
      process.env.RESEND_API_KEY = "re_test_key";
      process.env.RESEND_FROM_EMAIL = "test@example.com";

      // Mock successful response
      mockSendEmail.mockResolvedValue({
        data: {
          id: "test-email-id",
        },
        error: null,
      });

      const result = await sendEmailOtp("user@example.com", "123456");

      expect(result).toBe(true);
      expect(mockSendEmail).toHaveBeenCalledWith({
        from: "test@example.com",
        to: "user@example.com",
        subject: "Nomad - 验证您的邮箱",
        html: expect.stringContaining("123456"),
      });
    });

    it("should use default from email when RESEND_FROM_EMAIL is not set", async () => {
      process.env.RESEND_API_KEY = "re_test_key";
      // Don't set RESEND_FROM_EMAIL

      mockSendEmail.mockResolvedValue({
        data: { id: "test-email-id" },
        error: null,
      });

      await sendEmailOtp("user@example.com", "123456");

      expect(mockSendEmail).toHaveBeenCalledWith({
        from: "onboarding@resend.dev",
        to: "user@example.com",
        subject: "Nomad - 验证您的邮箱",
        html: expect.stringContaining("123456"),
      });
    });

    it("should include OTP code in email HTML", async () => {
      process.env.RESEND_API_KEY = "re_test_key";
      process.env.RESEND_FROM_EMAIL = "test@example.com";

      mockSendEmail.mockResolvedValue({
        data: { id: "test-email-id" },
        error: null,
      });

      const otpCode = "654321";
      await sendEmailOtp("user@example.com", otpCode);

      const callArgs = mockSendEmail.mock.calls[0][0];
      expect(callArgs.html).toContain(otpCode);
      expect(callArgs.html).toContain("验证码"); // Should contain Chinese text
    });

    it("should return false when email sending fails", async () => {
      process.env.RESEND_API_KEY = "re_test_key";
      process.env.RESEND_FROM_EMAIL = "test@example.com";

      mockSendEmail.mockResolvedValue({
        data: null,
        error: {
          message: "Email sending failed",
        },
      });

      const result = await sendEmailOtp("user@example.com", "123456");

      expect(result).toBe(false);
    });

    it("should return false when Resend API throws an error", async () => {
      process.env.RESEND_API_KEY = "re_test_key";
      process.env.RESEND_FROM_EMAIL = "test@example.com";

      mockSendEmail.mockRejectedValue(new Error("Network error"));

      const result = await sendEmailOtp("user@example.com", "123456");

      expect(result).toBe(false);
    });

    it("should return false when RESEND_API_KEY is missing", async () => {
      // Don't set RESEND_API_KEY
      process.env.RESEND_FROM_EMAIL = "test@example.com";

      const result = await sendEmailOtp("user@example.com", "123456");

      expect(result).toBe(false);
      expect(mockSendEmail).not.toHaveBeenCalled();
    });

    it("should handle different email addresses correctly", async () => {
      process.env.RESEND_API_KEY = "re_test_key";
      process.env.RESEND_FROM_EMAIL = "noreply@myapp.com";

      mockSendEmail.mockResolvedValue({
        data: { id: "test-email-id" },
        error: null,
      });

      // Test with different email addresses
      await sendEmailOtp("test1@example.com", "111111");
      expect(mockSendEmail).toHaveBeenLastCalledWith(
        expect.objectContaining({
          to: "test1@example.com",
        })
      );

      await sendEmailOtp("test2@example.org", "222222");
      expect(mockSendEmail).toHaveBeenLastCalledWith(
        expect.objectContaining({
          to: "test2@example.org",
        })
      );
    });

    it("should handle different OTP codes correctly", async () => {
      process.env.RESEND_API_KEY = "re_test_key";
      process.env.RESEND_FROM_EMAIL = "test@example.com";

      mockSendEmail.mockResolvedValue({
        data: { id: "test-email-id" },
        error: null,
      });

      // Test with different OTP codes
      await sendEmailOtp("user@example.com", "000000");
      let callArgs = mockSendEmail.mock.calls[0][0];
      expect(callArgs.html).toContain("000000");

      await sendEmailOtp("user@example.com", "999999");
      callArgs = mockSendEmail.mock.calls[1][0];
      expect(callArgs.html).toContain("999999");
    });

    it("should create proper HTML email structure", async () => {
      process.env.RESEND_API_KEY = "re_test_key";
      process.env.RESEND_FROM_EMAIL = "test@example.com";

      mockSendEmail.mockResolvedValue({
        data: { id: "test-email-id" },
        error: null,
      });

      await sendEmailOtp("user@example.com", "123456");

      const callArgs = mockSendEmail.mock.calls[0][0];
      const html = callArgs.html;

      // Check for HTML structure
      expect(html).toContain("<!DOCTYPE html>");
      expect(html).toContain("<html");
      expect(html).toContain("</html>");
      expect(html).toContain("<body");
      expect(html).toContain("</body>");

      // Check for content
      expect(html).toContain("123456");
      expect(html).toContain("5 分钟"); // Expiry time (note the space)
    });

    it("should use correct email subject", async () => {
      process.env.RESEND_API_KEY = "re_test_key";
      process.env.RESEND_FROM_EMAIL = "test@example.com";

      mockSendEmail.mockResolvedValue({
        data: { id: "test-email-id" },
        error: null,
      });

      await sendEmailOtp("user@example.com", "123456");

      expect(mockSendEmail).toHaveBeenCalledWith(
        expect.objectContaining({
          subject: "Nomad - 验证您的邮箱",
        })
      );
    });

    it("should handle concurrent email sending", async () => {
      process.env.RESEND_API_KEY = "re_test_key";
      process.env.RESEND_FROM_EMAIL = "test@example.com";

      mockSendEmail.mockResolvedValue({
        data: { id: "test-email-id" },
        error: null,
      });

      // Send multiple emails concurrently
      const promises = [
        sendEmailOtp("user1@example.com", "111111"),
        sendEmailOtp("user2@example.com", "222222"),
        sendEmailOtp("user3@example.com", "333333"),
      ];

      const results = await Promise.all(promises);

      expect(results).toEqual([true, true, true]);
      expect(mockSendEmail).toHaveBeenCalledTimes(3);
    });
  });
});
