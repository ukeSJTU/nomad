import { describe, expect, it } from "vitest";

import { validateEmailFormat, validatePhoneNumberFormat } from "./auth.service";

describe("Auth Service Validation", () => {
  describe("validatePhoneNumberFormat", () => {
    it("accepts 11-digit numbers and trims whitespace", () => {
      const result = validatePhoneNumberFormat(" 13812345678 ");

      expect(result.success).toBe(true);
      expect(result.data).toBe("13812345678");
    });

    it("rejects numbers with country prefix", () => {
      const result = validatePhoneNumberFormat("+8613812345678");

      expect(result.success).toBe(false);
      expect(result.error).toBe("手机号格式不正确，请重新输入");
    });

    it("rejects invalid lengths", () => {
      const result = validatePhoneNumberFormat("123");

      expect(result.success).toBe(false);
      expect(result.error).toBe("手机号格式不正确，请重新输入");
    });
  });

  describe("validateEmailFormat", () => {
    it("accepts standard email format", () => {
      const result = validateEmailFormat("user@example.com");

      expect(result.success).toBe(true);
    });

    it("rejects invalid email format", () => {
      const result = validateEmailFormat("invalid-email");

      expect(result.success).toBe(false);
      expect(result.error).toBe("邮箱格式错误");
    });
  });
});
