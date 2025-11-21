import { describe, expect, it } from "vitest";

import { userInfoUpdateSchema } from "./user";

describe("User Info Update Schema", () => {
  it("should validate correct user info update data with all fields", () => {
    const validData = {
      nickname: "JohnDoe",
      name: "John Doe",
      gender: "male" as const,
      birthday: "1990-01-15",
    };

    const result = userInfoUpdateSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should validate with only some fields provided", () => {
    const validData = {
      nickname: "JohnDoe",
    };

    const result = userInfoUpdateSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should validate with empty object (all fields optional)", () => {
    const validData = {};

    const result = userInfoUpdateSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should validate with empty strings to clear fields", () => {
    const validData = {
      nickname: "",
      name: "",
      birthday: "",
    };

    const result = userInfoUpdateSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should reject nickname exceeding 50 characters", () => {
    const invalidData = {
      nickname: "a".repeat(51),
    };

    const result = userInfoUpdateSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it("should reject name exceeding 50 characters", () => {
    const invalidData = {
      name: "a".repeat(51),
    };

    const result = userInfoUpdateSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it("should reject invalid gender value", () => {
    const invalidData = {
      gender: "unknown",
    };

    const result = userInfoUpdateSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it("should accept valid gender values", () => {
    const validMale = { gender: "male" as const };
    const validFemale = { gender: "female" as const };
    const validOther = { gender: "other" as const };

    expect(userInfoUpdateSchema.safeParse(validMale).success).toBe(true);
    expect(userInfoUpdateSchema.safeParse(validFemale).success).toBe(true);
    expect(userInfoUpdateSchema.safeParse(validOther).success).toBe(true);
  });

  it("should reject invalid birthday format", () => {
    const invalidData = {
      birthday: "01/15/1990",
    };

    const result = userInfoUpdateSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it("should accept valid birthday format (YYYY-MM-DD)", () => {
    const validData = {
      birthday: "1990-01-15",
    };

    const result = userInfoUpdateSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });
});
