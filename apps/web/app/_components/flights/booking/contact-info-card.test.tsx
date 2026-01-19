import { describe, expect, it } from "vitest";

import { type ContactInfo, validateContactInfo } from "./contact-info-card";

/**
 * @requirement REQ-F05
 * Tests for validation logic in the container component
 */
describe("validateContactInfo Function", () => {
  describe("Email Validation", () => {
    it("returns no error for valid email", () => {
      const contactInfo: ContactInfo = {
        method: "email",
        email: "test@example.com",
        phone: "",
      };

      const errors = validateContactInfo(contactInfo);
      expect(errors.email).toBeUndefined();
    });

    it("returns error for empty email", () => {
      const contactInfo: ContactInfo = {
        method: "email",
        email: "",
        phone: "",
      };

      const errors = validateContactInfo(contactInfo);
      expect(errors.email).toBe("请输入联系邮箱");
    });

    it("returns error for whitespace-only email", () => {
      const contactInfo: ContactInfo = {
        method: "email",
        email: "   ",
        phone: "",
      };

      const errors = validateContactInfo(contactInfo);
      expect(errors.email).toBe("请输入联系邮箱");
    });

    it("returns error for invalid email format", () => {
      const contactInfo: ContactInfo = {
        method: "email",
        email: "invalid-email",
        phone: "",
      };

      const errors = validateContactInfo(contactInfo);
      expect(errors.email).toBeDefined();
      expect(errors.email).toContain("邮箱");
    });

    it("returns error for email without @", () => {
      const contactInfo: ContactInfo = {
        method: "email",
        email: "testexample.com",
        phone: "",
      };

      const errors = validateContactInfo(contactInfo);
      expect(errors.email).toBeDefined();
    });

    it("returns error for email without domain", () => {
      const contactInfo: ContactInfo = {
        method: "email",
        email: "test@",
        phone: "",
      };

      const errors = validateContactInfo(contactInfo);
      expect(errors.email).toBeDefined();
    });

    it("accepts valid email with subdomain", () => {
      const contactInfo: ContactInfo = {
        method: "email",
        email: "user@mail.example.com",
        phone: "",
      };

      const errors = validateContactInfo(contactInfo);
      expect(errors.email).toBeUndefined();
    });

    it("accepts valid email with plus sign", () => {
      const contactInfo: ContactInfo = {
        method: "email",
        email: "user+tag@example.com",
        phone: "",
      };

      const errors = validateContactInfo(contactInfo);
      expect(errors.email).toBeUndefined();
    });
  });

  describe("Phone Validation", () => {
    it("returns no error for valid phone number", () => {
      const contactInfo: ContactInfo = {
        method: "phone",
        email: "",
        phone: "13812345678",
      };

      const errors = validateContactInfo(contactInfo);
      expect(errors.phone).toBeUndefined();
    });

    it("returns error for empty phone", () => {
      const contactInfo: ContactInfo = {
        method: "phone",
        email: "",
        phone: "",
      };

      const errors = validateContactInfo(contactInfo);
      expect(errors.phone).toBe("请输入联系电话");
    });

    it("returns error for whitespace-only phone", () => {
      const contactInfo: ContactInfo = {
        method: "phone",
        email: "",
        phone: "   ",
      };

      const errors = validateContactInfo(contactInfo);
      expect(errors.phone).toBe("请输入联系电话");
    });

    it("returns error for phone not starting with 1", () => {
      const contactInfo: ContactInfo = {
        method: "phone",
        email: "",
        phone: "23812345678",
      };

      const errors = validateContactInfo(contactInfo);
      expect(errors.phone).toBeDefined();
      expect(errors.phone).toContain("手机号");
    });

    it("returns error for phone with invalid second digit", () => {
      const contactInfo: ContactInfo = {
        method: "phone",
        email: "",
        phone: "12812345678",
      };

      const errors = validateContactInfo(contactInfo);
      expect(errors.phone).toBeDefined();
    });

    it("returns error for phone with less than 11 digits", () => {
      const contactInfo: ContactInfo = {
        method: "phone",
        email: "",
        phone: "1381234567",
      };

      const errors = validateContactInfo(contactInfo);
      expect(errors.phone).toBeDefined();
    });

    it("returns error for phone with more than 11 digits", () => {
      const contactInfo: ContactInfo = {
        method: "phone",
        email: "",
        phone: "138123456789",
      };

      const errors = validateContactInfo(contactInfo);
      expect(errors.phone).toBeDefined();
    });

    it("returns error for phone with non-numeric characters", () => {
      const contactInfo: ContactInfo = {
        method: "phone",
        email: "",
        phone: "1381234567a",
      };

      const errors = validateContactInfo(contactInfo);
      expect(errors.phone).toBeDefined();
    });

    it("returns error for phone with spaces", () => {
      const contactInfo: ContactInfo = {
        method: "phone",
        email: "",
        phone: "138 1234 5678",
      };

      const errors = validateContactInfo(contactInfo);
      expect(errors.phone).toBeDefined();
    });

    it("returns error for phone with dashes", () => {
      const contactInfo: ContactInfo = {
        method: "phone",
        email: "",
        phone: "138-1234-5678",
      };

      const errors = validateContactInfo(contactInfo);
      expect(errors.phone).toBeDefined();
    });

    it("accepts valid phone starting with 13", () => {
      const contactInfo: ContactInfo = {
        method: "phone",
        email: "",
        phone: "13912345678",
      };

      const errors = validateContactInfo(contactInfo);
      expect(errors.phone).toBeUndefined();
    });

    it("accepts valid phone starting with 15", () => {
      const contactInfo: ContactInfo = {
        method: "phone",
        email: "",
        phone: "15912345678",
      };

      const errors = validateContactInfo(contactInfo);
      expect(errors.phone).toBeUndefined();
    });

    it("accepts valid phone starting with 18", () => {
      const contactInfo: ContactInfo = {
        method: "phone",
        email: "",
        phone: "18912345678",
      };

      const errors = validateContactInfo(contactInfo);
      expect(errors.phone).toBeUndefined();
    });

    it("accepts valid phone starting with 19", () => {
      const contactInfo: ContactInfo = {
        method: "phone",
        email: "",
        phone: "19912345678",
      };

      const errors = validateContactInfo(contactInfo);
      expect(errors.phone).toBeUndefined();
    });
  });

  describe("Method-specific Validation", () => {
    it("does not validate phone when email method is selected", () => {
      const contactInfo: ContactInfo = {
        method: "email",
        email: "test@example.com",
        phone: "invalid", // Invalid phone but should not matter
      };

      const errors = validateContactInfo(contactInfo);
      expect(errors.phone).toBeUndefined();
      expect(errors.email).toBeUndefined();
    });

    it("does not validate email when phone method is selected", () => {
      const contactInfo: ContactInfo = {
        method: "phone",
        email: "invalid-email", // Invalid email but should not matter
        phone: "13812345678",
      };

      const errors = validateContactInfo(contactInfo);
      expect(errors.email).toBeUndefined();
      expect(errors.phone).toBeUndefined();
    });
  });

  describe("Return Value Structure", () => {
    it("returns empty object when no errors", () => {
      const contactInfo: ContactInfo = {
        method: "email",
        email: "test@example.com",
        phone: "",
      };

      const errors = validateContactInfo(contactInfo);
      expect(Object.keys(errors)).toHaveLength(0);
    });

    it("returns object with only email error when email invalid", () => {
      const contactInfo: ContactInfo = {
        method: "email",
        email: "invalid",
        phone: "",
      };

      const errors = validateContactInfo(contactInfo);
      expect(errors.email).toBeDefined();
      expect(errors.phone).toBeUndefined();
    });

    it("returns object with only phone error when phone invalid", () => {
      const contactInfo: ContactInfo = {
        method: "phone",
        email: "",
        phone: "invalid",
      };

      const errors = validateContactInfo(contactInfo);
      expect(errors.phone).toBeDefined();
      expect(errors.email).toBeUndefined();
    });
  });
});
