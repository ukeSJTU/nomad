import { describe, expect, it } from "vitest";

import { emailSchema, phoneNumberSchema } from "@/types/validations";

/**
 * @requirement REQ-U01
 * @requirement REQ-U02
 * @requirement REQ-U05
 * @requirement REQ-U07
 */
describe("Auth Schemas", () => {
  /**
   * @requirement REQ-U01
   * @requirement REQ-U05
   */
  describe("phoneNumberSchema", () => {
    /**
     * @requirement REQ-U01
     * @scenario 场景1
     */
    it("should validate chinese phone numbers", () => {
      expect(phoneNumberSchema.safeParse("13812345678").success).toBe(true);
    });

    /**
     * @requirement REQ-U01
     * @scenario 场景2
     */
    it("should reject invalid phone numbers", () => {
      expect(phoneNumberSchema.safeParse("123").success).toBe(false);
      expect(phoneNumberSchema.safeParse("abc").success).toBe(false);
      expect(phoneNumberSchema.safeParse("1381234567").success).toBe(false);
      expect(phoneNumberSchema.safeParse("138123456789").success).toBe(false);
    });
  });

  /**
   * @requirement REQ-U02
   * @requirement REQ-U07
   */
  describe("emailSchema", () => {
    /**
     * @requirement REQ-U02
     * @scenario 场景1
     */
    it("should validate emails", () => {
      expect(emailSchema.safeParse("test@example.com").success).toBe(true);
      expect(emailSchema.safeParse("user+tag@domain.co.uk").success).toBe(true);
    });

    /**
     * @requirement REQ-U02
     * @scenario 场景2
     */
    it("should reject invalid emails", () => {
      expect(emailSchema.safeParse("notanemail").success).toBe(false);
      expect(emailSchema.safeParse("@example.com").success).toBe(false);
    });
  });
});
