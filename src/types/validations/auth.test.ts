import { describe, expect, it } from "vitest";

import { emailSchema, phoneNumberSchema } from "@/types/validations";

describe("Auth Schemas", () => {
  describe("phoneNumberSchema", () => {
    it("should validate chinese phone numbers", () => {
      expect(phoneNumberSchema.safeParse("13812345678").success).toBe(true);
    });

    it("should reject invalid phone numbers", () => {
      expect(phoneNumberSchema.safeParse("123").success).toBe(false);
      expect(phoneNumberSchema.safeParse("abc").success).toBe(false);
      expect(phoneNumberSchema.safeParse("1381234567").success).toBe(false);
      expect(phoneNumberSchema.safeParse("138123456789").success).toBe(false);
    });
  });

  describe("emailSchema", () => {
    it("should validate emails", () => {
      expect(emailSchema.safeParse("test@example.com").success).toBe(true);
      expect(emailSchema.safeParse("user+tag@domain.co.uk").success).toBe(true);
    });

    it("should reject invalid emails", () => {
      expect(emailSchema.safeParse("notanemail").success).toBe(false);
      expect(emailSchema.safeParse("@example.com").success).toBe(false);
    });
  });
});
