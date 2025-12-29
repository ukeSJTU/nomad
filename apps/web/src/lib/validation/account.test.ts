import { describe, expect, it } from "vitest";

import { validateAccount } from "@/lib/validation";

/**
 * @requirement REQ-U01
 * @requirement REQ-U05
 */
describe("validateAccount", () => {
  /**
   * @requirement REQ-U01
   * @scenario 场景2
   */
  it("should validate phone numbers correctly", () => {
    expect(validateAccount("13800138000")).toEqual({
      isPhone: true,
      isEmail: false,
      isValid: true,
    });
  });

  /**
   * @requirement REQ-U02
   * @scenario 场景2
   */
  it("should validate emails correctly", () => {
    expect(validateAccount("test@example.com")).toEqual({
      isPhone: false,
      isEmail: true,
      isValid: true,
    });
  });

  it("should reject invalid inputs", () => {
    expect(validateAccount("invalid")).toEqual({
      isPhone: false,
      isEmail: false,
      isValid: false,
    });
  });

  it("should reject incomplete phone numbers", () => {
    expect(validateAccount("+86")).toEqual({
      isPhone: false,
      isEmail: false,
      isValid: false,
    });
  });

  it("should handle edge cases", () => {
    expect(validateAccount("")).toEqual({
      isPhone: false,
      isEmail: false,
      isValid: false,
    });
    expect(validateAccount("   ")).toEqual({
      isPhone: false,
      isEmail: false,
      isValid: false,
    });
  });
});
