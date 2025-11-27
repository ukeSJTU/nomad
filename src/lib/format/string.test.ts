import { describe, expect, it } from "vitest";

import { getInitials } from "./string";

describe("getInitials", () => {
  describe("English names", () => {
    it("should return initials for two-word English name", () => {
      expect(getInitials("John Doe")).toBe("JD");
    });

    it("should return initials for three-word English name", () => {
      expect(getInitials("John Smith Doe")).toBe("JS");
    });

    it("should return single initial for one-word name", () => {
      expect(getInitials("John")).toBe("J");
    });

    it("should handle lowercase names and convert to uppercase", () => {
      expect(getInitials("john doe")).toBe("JD");
    });

    it("should handle mixed case names", () => {
      expect(getInitials("JoHn DoE")).toBe("JD");
    });
  });

  describe("Chinese names", () => {
    it("should return first character for two-character Chinese name without space", () => {
      expect(getInitials("张三")).toBe("张");
    });

    it("should return first character for three-character Chinese name without space", () => {
      expect(getInitials("欧阳修")).toBe("欧");
    });

    it("should return first character for four-character Chinese name without space", () => {
      expect(getInitials("司马相如")).toBe("司");
    });

    it("should return single character for one-character Chinese name", () => {
      expect(getInitials("李")).toBe("李");
    });
  });

  describe("Mixed names", () => {
    it("should handle Chinese name with space", () => {
      expect(getInitials("张 三")).toBe("张三");
    });

    it("should handle name with multiple spaces", () => {
      expect(getInitials("John  Smith  Doe")).toBe("JS");
    });
  });

  describe("Edge cases", () => {
    it("should return 'A' for undefined input", () => {
      expect(getInitials(undefined)).toBe("A");
    });

    it("should return 'A' for empty string", () => {
      expect(getInitials("")).toBe("A");
    });

    it("should return 'A' for whitespace-only string", () => {
      expect(getInitials("   ")).toBe("");
    });

    it("should handle names with leading/trailing spaces", () => {
      expect(getInitials("  John Doe  ")).toBe("JD");
    });

    it("should handle single character name", () => {
      expect(getInitials("J")).toBe("J");
    });

    it("should handle names with special characters", () => {
      expect(getInitials("Jean-Paul Sartre")).toBe("JS");
    });

    it("should handle names with numbers", () => {
      expect(getInitials("John2 Doe3")).toBe("JD");
    });
  });

  describe("Truncation", () => {
    it("should limit initials to maximum 2 characters", () => {
      expect(getInitials("John Smith Doe Junior")).toBe("JS");
    });

    it("should not truncate single character result", () => {
      expect(getInitials("John")).toBe("J");
    });

    it("should return exactly 2 characters when possible", () => {
      const result = getInitials("John Doe");
      expect(result).toHaveLength(2);
    });
  });
});
