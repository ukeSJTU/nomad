import { describe, expect, it } from "vitest";

import {
  emailLoginSchema,
  emailOtpLoginSchema,
  emailVerificationSchema,
  passwordSetupSchema,
  phoneLoginSchema,
  phoneOtpLoginSchema,
  phoneVerificationSchema,
} from "./auth";

describe("Phone Verification Schema", () => {
  it("should validate correct phone verification data", () => {
    const validData = {
      phoneNumber: "13800138000",
      otp: "123456",
      agreedToTerms: true,
    };

    const result = phoneVerificationSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should reject phone number with incorrect length", () => {
    const invalidData = {
      phoneNumber: "138001380",
      otp: "123456",
      agreedToTerms: true,
    };

    const result = phoneVerificationSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it("should reject non-numeric phone number", () => {
    const invalidData = {
      phoneNumber: "1380013800a",
      otp: "123456",
      agreedToTerms: true,
    };

    const result = phoneVerificationSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it("should reject OTP with incorrect length", () => {
    const invalidData = {
      phoneNumber: "13800138000",
      otp: "12345",
      agreedToTerms: true,
    };

    const result = phoneVerificationSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it("should reject when terms not agreed", () => {
    const invalidData = {
      phoneNumber: "13800138000",
      otp: "123456",
      agreedToTerms: false,
    };

    const result = phoneVerificationSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});

describe("Password Setup Schema", () => {
  it("should validate correct password setup data", () => {
    const validData = {
      password: "Password123",
      confirmPassword: "Password123",
    };

    const result = passwordSetupSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should reject password without uppercase letter", () => {
    const invalidData = {
      password: "password123",
      confirmPassword: "password123",
    };

    const result = passwordSetupSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it("should reject password without lowercase letter", () => {
    const invalidData = {
      password: "PASSWORD123",
      confirmPassword: "PASSWORD123",
    };

    const result = passwordSetupSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it("should reject password without digit", () => {
    const invalidData = {
      password: "PasswordABC",
      confirmPassword: "PasswordABC",
    };

    const result = passwordSetupSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it("should reject password that is too short", () => {
    const invalidData = {
      password: "Pass1",
      confirmPassword: "Pass1",
    };

    const result = passwordSetupSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it("should reject password that is too long", () => {
    const invalidData = {
      password: "Password123456789012345",
      confirmPassword: "Password123456789012345",
    };

    const result = passwordSetupSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it("should reject when passwords do not match", () => {
    const invalidData = {
      password: "Password123",
      confirmPassword: "Password456",
    };

    const result = passwordSetupSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});

describe("Phone Login Schema", () => {
  it("should validate correct phone login data", () => {
    const validData = {
      phoneNumber: "13800138000",
      password: "Password123",
      agreedToTerms: true,
    };

    const result = phoneLoginSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should reject invalid phone number", () => {
    const invalidData = {
      phoneNumber: "138001380",
      password: "Password123",
      agreedToTerms: true,
    };

    const result = phoneLoginSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});

describe("Phone OTP Login Schema", () => {
  it("should validate correct phone OTP login data", () => {
    const validData = {
      phoneNumber: "13800138000",
      otp: "123456",
      agreedToTerms: true,
    };

    const result = phoneOtpLoginSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });
});

describe("Email Verification Schema", () => {
  it("should validate correct email verification data", () => {
    const validData = {
      email: "test@example.com",
      otp: "123456",
      agreedToTerms: true,
    };

    const result = emailVerificationSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should reject invalid email", () => {
    const invalidData = {
      email: "invalid-email",
      otp: "123456",
      agreedToTerms: true,
    };

    const result = emailVerificationSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it("should reject invalid OTP", () => {
    const invalidData = {
      email: "test@example.com",
      otp: "12345",
      agreedToTerms: true,
    };

    const result = emailVerificationSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});

describe("Email Login Schema", () => {
  it("should validate correct email login data", () => {
    const validData = {
      email: "test@example.com",
      password: "Password123",
      agreedToTerms: true,
    };

    const result = emailLoginSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });
});

describe("Email OTP Login Schema", () => {
  it("should validate correct email OTP login data", () => {
    const validData = {
      email: "test@example.com",
      otp: "123456",
      agreedToTerms: true,
    };

    const result = emailOtpLoginSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });
});
