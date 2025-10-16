import { describe, expect, it } from "vitest";

import { maskDocumentNumber, maskEmail, maskPhoneNumber } from "./mask-data";

describe("Data Masking Utilities", () => {
  describe("maskDocumentNumber", () => {
    it("should mask a standard ID card number", () => {
      const idCard = "310115199001011234"; // 18 chars
      const masked = maskDocumentNumber(idCard);
      // First 4: "3101", Last 3: "234", Middle: 18-7=11 stars
      expect(masked).toBe("3101***********234");
      expect(masked.length).toBe(idCard.length);
    });

    it("should mask a passport number", () => {
      const passport = "E12345678";
      const masked = maskDocumentNumber(passport);
      expect(masked).toBe("E123**678");
    });

    it("should return original if length is 7 or less", () => {
      const shortDoc = "ABC123";
      expect(maskDocumentNumber(shortDoc)).toBe("ABC123");
    });

    it("should return original if empty", () => {
      expect(maskDocumentNumber("")).toBe("");
    });

    it("should handle exactly 8 characters", () => {
      const doc = "12345678";
      const masked = maskDocumentNumber(doc);
      expect(masked).toBe("1234*678");
    });
  });

  describe("maskPhoneNumber", () => {
    it("should mask a standard Chinese mobile number", () => {
      const phone = "13812345678";
      const masked = maskPhoneNumber(phone);
      expect(masked).toBe("138****5678");
    });

    it("should mask a phone with country code prefix", () => {
      const phone = "+86 13812345678";
      const masked = maskPhoneNumber(phone);
      expect(masked).toBe("138****5678");
    });

    it("should handle short phone numbers", () => {
      const shortPhone = "1234567";
      expect(maskPhoneNumber(shortPhone)).toBe("1234567");
    });

    it("should return original if empty", () => {
      expect(maskPhoneNumber("")).toBe("");
    });

    it("should mask 10-digit phone numbers", () => {
      const phone = "1234567890";
      const masked = maskPhoneNumber(phone);
      expect(masked).toBe("123***7890");
    });
  });

  describe("maskEmail", () => {
    it("should mask a standard email address", () => {
      const email = "user@example.com";
      const masked = maskEmail(email);
      expect(masked).toBe("us***@example.com");
    });

    it("should mask a long email local part", () => {
      const email = "verylongemail@example.com";
      const masked = maskEmail(email);
      expect(masked).toBe("ve***@example.com");
    });

    it("should handle short local part (2 chars)", () => {
      const email = "ab@example.com";
      const masked = maskEmail(email);
      expect(masked).toBe("ab@example.com");
    });

    it("should handle single character local part", () => {
      const email = "a@example.com";
      const masked = maskEmail(email);
      expect(masked).toBe("a@example.com");
    });

    it("should return original if no @ symbol", () => {
      const invalid = "notanemail";
      expect(maskEmail(invalid)).toBe("notanemail");
    });

    it("should return original if empty", () => {
      expect(maskEmail("")).toBe("");
    });

    it("should preserve the domain part", () => {
      const email = "test@very.long.domain.com";
      const masked = maskEmail(email);
      expect(masked).toBe("te***@very.long.domain.com");
    });
  });
});
