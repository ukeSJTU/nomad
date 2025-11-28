import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Mock the database dependency before importing
vi.mock("@/db", () => ({
  db: {},
}));

// Mock other dependencies that might be imported
vi.mock("@/integrations/aliyun-sms/client", () => ({
  sendSmsOtp: vi.fn(),
}));

vi.mock("@/integrations/resend/client", () => ({
  sendEmailOtp: vi.fn(),
}));

vi.mock("@/lib/server/logger", () => ({
  default: {
    info: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("better-auth", () => ({
  betterAuth: vi.fn(),
}));

vi.mock("better-auth/adapters/drizzle", () => ({
  drizzleAdapter: vi.fn(),
}));

vi.mock("better-auth/plugins", () => ({
  phoneNumber: vi.fn(),
  emailOTP: vi.fn(),
  captcha: vi.fn(),
}));

vi.mock("@faker-js/faker", () => ({
  faker: {
    person: {
      firstName: vi.fn().mockReturnValue("John"),
    },
  },
}));

// Import the functions we want to test directly after mocking dependencies
import {
  shouldEnableAliyunSms,
  shouldEnableResend,
} from "./infra/auth.integrations";

describe("Auth Configuration", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Restore environment variables
    vi.unstubAllEnvs();
  });

  describe("shouldEnableAliyunSms", () => {
    it("should return true when ENABLE_ALIYUN_SMS is 'enabled'", () => {
      vi.stubEnv("ENABLE_ALIYUN_SMS", "enabled");
      vi.stubEnv("NODE_ENV", "development"); // Should be overridden by explicit setting

      const result = shouldEnableAliyunSms();

      expect(result).toBe(true);
    });

    it("should return true when ENABLE_ALIYUN_SMS is 'true'", () => {
      vi.stubEnv("ENABLE_ALIYUN_SMS", "true");
      vi.stubEnv("NODE_ENV", "development"); // Should be overridden by explicit setting

      const result = shouldEnableAliyunSms();

      expect(result).toBe(true);
    });

    it("should return false when ENABLE_ALIYUN_SMS is 'disabled'", () => {
      vi.stubEnv("ENABLE_ALIYUN_SMS", "disabled");
      vi.stubEnv("NODE_ENV", "production"); // Should be overridden by explicit setting

      const result = shouldEnableAliyunSms();

      expect(result).toBe(false);
    });

    it("should return false when ENABLE_ALIYUN_SMS is 'false'", () => {
      vi.stubEnv("ENABLE_ALIYUN_SMS", "false");
      vi.stubEnv("NODE_ENV", "production"); // Should be overridden by explicit setting

      const result = shouldEnableAliyunSms();

      expect(result).toBe(false);
    });

    it("should return true in production environment by default", () => {
      // Don't set ENABLE_ALIYUN_SMS, let it use default logic
      vi.stubEnv("ENABLE_ALIYUN_SMS", "");
      vi.stubEnv("NODE_ENV", "production");

      const result = shouldEnableAliyunSms();

      expect(result).toBe(true);
    });

    it("should return false in development environment by default", () => {
      // Don't set ENABLE_ALIYUN_SMS, let it use default logic
      vi.stubEnv("NODE_ENV", "development");

      const result = shouldEnableAliyunSms();

      expect(result).toBe(false);
    });

    it("should return false in test environment by default", () => {
      // Don't set ENABLE_ALIYUN_SMS, let it use default logic
      vi.stubEnv("NODE_ENV", "test");

      const result = shouldEnableAliyunSms();

      expect(result).toBe(false);
    });

    it("should handle case-insensitive ENABLE_ALIYUN_SMS values", () => {
      // Test uppercase
      vi.stubEnv("ENABLE_ALIYUN_SMS", "ENABLED");
      vi.stubEnv("NODE_ENV", "development");

      let result = shouldEnableAliyunSms();
      expect(result).toBe(true);

      // Reset and test mixed case
      vi.unstubAllEnvs();
      vi.stubEnv("ENABLE_ALIYUN_SMS", "True");
      vi.stubEnv("NODE_ENV", "development");

      result = shouldEnableAliyunSms();
      expect(result).toBe(true);
    });

    it("should handle invalid ENABLE_ALIYUN_SMS values by using default logic", () => {
      // Test with production environment (should default to enabled)
      vi.stubEnv("ENABLE_ALIYUN_SMS", "maybe"); // Invalid value
      vi.stubEnv("NODE_ENV", "production");

      let result = shouldEnableAliyunSms();
      expect(result).toBe(true);

      // Test with development environment (should default to disabled)
      vi.unstubAllEnvs();
      vi.stubEnv("ENABLE_ALIYUN_SMS", "maybe"); // Invalid value
      vi.stubEnv("NODE_ENV", "development");

      result = shouldEnableAliyunSms();
      expect(result).toBe(false);
    });

    it("should handle undefined NODE_ENV by defaulting to false", () => {
      // Don't set NODE_ENV at all
      vi.stubEnv("ENABLE_ALIYUN_SMS", "maybe"); // Invalid value, should use default logic

      const result = shouldEnableAliyunSms();
      expect(result).toBe(false); // Should default to false when NODE_ENV is undefined
    });

    it("should prioritize explicit ENABLE_ALIYUN_SMS over NODE_ENV", () => {
      // Test that explicit 'enabled' overrides development environment
      vi.stubEnv("ENABLE_ALIYUN_SMS", "enabled");
      vi.stubEnv("NODE_ENV", "development");

      let result = shouldEnableAliyunSms();
      expect(result).toBe(true);

      // Test that explicit 'disabled' overrides production environment
      vi.unstubAllEnvs();
      vi.stubEnv("ENABLE_ALIYUN_SMS", "disabled");
      vi.stubEnv("NODE_ENV", "production");

      result = shouldEnableAliyunSms();
      expect(result).toBe(false);
    });
  });

  describe("shouldEnableResend", () => {
    it("should return true when ENABLE_RESEND is 'enabled'", () => {
      vi.stubEnv("ENABLE_RESEND", "enabled");
      vi.stubEnv("NODE_ENV", "development"); // Should be overridden by explicit setting

      const result = shouldEnableResend();

      expect(result).toBe(true);
    });

    it("should return true when ENABLE_RESEND is 'true'", () => {
      vi.stubEnv("ENABLE_RESEND", "true");
      vi.stubEnv("NODE_ENV", "development"); // Should be overridden by explicit setting

      const result = shouldEnableResend();

      expect(result).toBe(true);
    });

    it("should return false when ENABLE_RESEND is 'disabled'", () => {
      vi.stubEnv("ENABLE_RESEND", "disabled");
      vi.stubEnv("NODE_ENV", "production"); // Should be overridden by explicit setting

      const result = shouldEnableResend();

      expect(result).toBe(false);
    });

    it("should return false when ENABLE_RESEND is 'false'", () => {
      vi.stubEnv("ENABLE_RESEND", "false");
      vi.stubEnv("NODE_ENV", "production"); // Should be overridden by explicit setting

      const result = shouldEnableResend();

      expect(result).toBe(false);
    });

    it("should return true in production environment by default", () => {
      // Don't set ENABLE_RESEND, let it use default logic
      vi.stubEnv("ENABLE_RESEND", "");
      vi.stubEnv("NODE_ENV", "production");

      const result = shouldEnableResend();

      expect(result).toBe(true);
    });

    it("should return false in development environment by default", () => {
      // Don't set ENABLE_RESEND, let it use default logic
      vi.stubEnv("NODE_ENV", "development");

      const result = shouldEnableResend();

      expect(result).toBe(false);
    });

    it("should return false in test environment by default", () => {
      // Don't set ENABLE_RESEND, let it use default logic
      vi.stubEnv("NODE_ENV", "test");

      const result = shouldEnableResend();

      expect(result).toBe(false);
    });

    it("should handle undefined NODE_ENV", () => {
      // Don't set any environment variables
      const result = shouldEnableResend();

      // Should default to false when NODE_ENV is undefined
      expect(result).toBe(false);
    });

    it("should prioritize explicit setting over environment", () => {
      // Test that explicit 'enabled' overrides development environment
      vi.stubEnv("ENABLE_RESEND", "enabled");
      vi.stubEnv("NODE_ENV", "development");

      let result = shouldEnableResend();
      expect(result).toBe(true);

      // Test that explicit 'disabled' overrides production environment
      vi.unstubAllEnvs();
      vi.stubEnv("ENABLE_RESEND", "disabled");
      vi.stubEnv("NODE_ENV", "production");

      result = shouldEnableResend();
      expect(result).toBe(false);
    });
  });
});
