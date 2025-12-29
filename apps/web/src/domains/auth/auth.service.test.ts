import { describe, expect, it } from "vitest";

import { validateEmailFormat, validatePhoneNumberFormat } from "./auth.service";

/**
 * @requirement REQ-U01
 * @requirement REQ-U02
 */
describe("Auth Service Validation", () => {
  /**
   * @requirement REQ-U01
   */
  describe("validatePhoneNumberFormat", () => {
    /**
     * @requirement REQ-U01
     * @scenario 场景1
     */
    it("accepts 11-digit numbers and trims whitespace", () => {
      const result = validatePhoneNumberFormat(" 13812345678 ");

      expect(result.success).toBe(true);
      expect(result.data).toBe("13812345678");
    });

    /**
     * @requirement REQ-U01
     * @scenario 场景2
     */
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

  /**
   * @requirement REQ-U02
   */
  describe("validateEmailFormat", () => {
    /**
     * @requirement REQ-U02
     * @scenario 场景1
     */
    it("accepts standard email format", () => {
      const result = validateEmailFormat("user@example.com");

      expect(result.success).toBe(true);
    });

    /**
     * @requirement REQ-U02
     * @scenario 场景2
     */
    it("rejects invalid email format", () => {
      const result = validateEmailFormat("invalid-email");

      expect(result.success).toBe(false);
      expect(result.error).toBe("邮箱格式错误");
    });
  });
});
