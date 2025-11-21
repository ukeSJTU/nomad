import { describe, expect, it } from "vitest";

import { emailSchema, phoneNumberSchema } from "@/types/validations/auth";

describe("Auth Schemas", () => {
  describe("phoneNumberSchema", () => {
    it("should validate international phone numbers", () => {
      expect(phoneNumberSchema.safeParse("+8613800138000").success).toBe(true);
      expect(phoneNumberSchema.safeParse("+14155552671").success).toBe(true);
      expect(phoneNumberSchema.safeParse("+442071838750").success).toBe(true);
    });

    it("should reject invalid phone numbers", () => {
      expect(phoneNumberSchema.safeParse("123").success).toBe(false);
      expect(phoneNumberSchema.safeParse("abc").success).toBe(false);
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
