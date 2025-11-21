/**
 * Currency Utility Tests
 *
 * This test suite ensures that all currency operations work correctly,
 * especially focusing on precision issues that plague JavaScript's
 * native number arithmetic.
 *
 * Coverage target: ≥70%
 */

import { describe, expect, it } from "vitest";

import {
  addCurrency,
  compareCurrency,
  divideCurrency,
  formatCurrency,
  formatCurrencyWithoutSymbol,
  fromDatabaseValue,
  getCurrencyValue,
  isEqualCurrency,
  isValidCurrency,
  multiplyCurrency,
  parseCurrency,
  subtractCurrency,
  toDatabaseValue,
} from "./currency";

describe("parseCurrency", () => {
  it("should parse number values", () => {
    const result = parseCurrency(100);
    expect(getCurrencyValue(result)).toBe(100);
  });

  it("should parse string values", () => {
    const result = parseCurrency("1234.56");
    expect(getCurrencyValue(result)).toBe(1234.56);
  });

  it("should parse zero", () => {
    const result = parseCurrency(0);
    expect(getCurrencyValue(result)).toBe(0);
  });

  it("should handle decimal strings", () => {
    const result = parseCurrency("0.01");
    expect(getCurrencyValue(result)).toBe(0.01);
  });
});

describe("formatCurrency", () => {
  it("should format with CNY symbol", () => {
    expect(formatCurrency(1234.56)).toBe("¥1,234.56");
  });

  it("should format with thousands separator", () => {
    expect(formatCurrency(1234567.89)).toBe("¥1,234,567.89");
  });

  it("should format zero", () => {
    expect(formatCurrency(0)).toBe("¥0.00");
  });

  it("should format small amounts", () => {
    expect(formatCurrency(0.01)).toBe("¥0.01");
  });

  it("should format string inputs", () => {
    expect(formatCurrency("1234.56")).toBe("¥1,234.56");
  });
});

describe("formatCurrencyWithoutSymbol", () => {
  it("should format without symbol", () => {
    expect(formatCurrencyWithoutSymbol(1234.56)).toBe("1,234.56");
  });

  it("should include thousands separator", () => {
    expect(formatCurrencyWithoutSymbol(1234567.89)).toBe("1,234,567.89");
  });

  it("should format zero without symbol", () => {
    expect(formatCurrencyWithoutSymbol(0)).toBe("0.00");
  });
});

describe("addCurrency", () => {
  it("should add two numbers", () => {
    const result = addCurrency(100, 200);
    expect(getCurrencyValue(result)).toBe(300);
  });

  it("should add multiple numbers", () => {
    const result = addCurrency(100, 200, 300, 400);
    expect(getCurrencyValue(result)).toBe(1000);
  });

  it("should handle decimal addition correctly (precision test)", () => {
    // This is the classic JavaScript precision problem: 0.1 + 0.2 !== 0.3
    const result = addCurrency(0.1, 0.2);
    expect(getCurrencyValue(result)).toBe(0.3);
  });

  it("should add string values", () => {
    const result = addCurrency("100.50", "200.25");
    expect(getCurrencyValue(result)).toBe(300.75);
  });

  it("should handle zero addition", () => {
    const result = addCurrency(0, 0);
    expect(getCurrencyValue(result)).toBe(0);
  });

  it("should return zero for empty arguments", () => {
    const result = addCurrency();
    expect(getCurrencyValue(result)).toBe(0);
  });

  it("should handle single argument", () => {
    const result = addCurrency(100);
    expect(getCurrencyValue(result)).toBe(100);
  });
});

describe("subtractCurrency", () => {
  it("should subtract two numbers", () => {
    const result = subtractCurrency(500, 200);
    expect(getCurrencyValue(result)).toBe(300);
  });

  it("should handle decimal subtraction correctly", () => {
    const result = subtractCurrency(0.3, 0.1);
    expect(getCurrencyValue(result)).toBe(0.2);
  });

  it("should subtract string values", () => {
    const result = subtractCurrency("500.75", "200.25");
    expect(getCurrencyValue(result)).toBe(300.5);
  });

  it("should handle zero subtraction", () => {
    const result = subtractCurrency(100, 0);
    expect(getCurrencyValue(result)).toBe(100);
  });

  it("should handle negative results", () => {
    const result = subtractCurrency(100, 200);
    expect(getCurrencyValue(result)).toBe(-100);
  });
});

describe("multiplyCurrency", () => {
  it("should multiply by integer", () => {
    const result = multiplyCurrency(100, 3);
    expect(getCurrencyValue(result)).toBe(300);
  });

  it("should multiply by decimal", () => {
    const result = multiplyCurrency(100, 1.5);
    expect(getCurrencyValue(result)).toBe(150);
  });

  it("should handle decimal multiplication correctly", () => {
    const result = multiplyCurrency("100.50", 2);
    expect(getCurrencyValue(result)).toBe(201);
  });

  it("should multiply by zero", () => {
    const result = multiplyCurrency(100, 0);
    expect(getCurrencyValue(result)).toBe(0);
  });

  it("should handle string input", () => {
    const result = multiplyCurrency("50.25", 4);
    expect(getCurrencyValue(result)).toBe(201);
  });
});

describe("divideCurrency", () => {
  it("should divide by integer", () => {
    const result = divideCurrency(300, 3);
    expect(getCurrencyValue(result)).toBe(100);
  });

  it("should divide by decimal", () => {
    const result = divideCurrency(100, 2);
    expect(getCurrencyValue(result)).toBe(50);
  });

  it("should handle decimal division correctly", () => {
    const result = divideCurrency("100.50", 2);
    expect(getCurrencyValue(result)).toBe(50.25);
  });

  it("should handle string input", () => {
    const result = divideCurrency("201", 4);
    expect(getCurrencyValue(result)).toBe(50.25);
  });
});

describe("toDatabaseValue", () => {
  it("should convert to fixed 2 decimal string", () => {
    expect(toDatabaseValue(1234.56)).toBe("1234.56");
  });

  it("should pad single decimal", () => {
    expect(toDatabaseValue(1234.5)).toBe("1234.50");
  });

  it("should pad zero decimals", () => {
    expect(toDatabaseValue(1234)).toBe("1234.00");
  });

  it("should handle zero", () => {
    expect(toDatabaseValue(0)).toBe("0.00");
  });

  it("should handle small amounts", () => {
    expect(toDatabaseValue(0.01)).toBe("0.01");
  });

  it("should handle string input", () => {
    expect(toDatabaseValue("1234.5")).toBe("1234.50");
  });
});

describe("fromDatabaseValue", () => {
  it("should parse database string", () => {
    const result = fromDatabaseValue("1234.56");
    expect(getCurrencyValue(result)).toBe(1234.56);
  });

  it("should parse database number", () => {
    const result = fromDatabaseValue(1234.56);
    expect(getCurrencyValue(result)).toBe(1234.56);
  });

  it("should handle zero", () => {
    const result = fromDatabaseValue("0.00");
    expect(getCurrencyValue(result)).toBe(0);
  });
});

describe("database round-trip", () => {
  it("should preserve value through round-trip conversion", () => {
    const original = 1234.56;
    const dbValue = toDatabaseValue(original);
    const restored = fromDatabaseValue(dbValue);
    expect(getCurrencyValue(restored)).toBe(original);
  });

  it("should preserve precision through round-trip", () => {
    const original = 0.01;
    const dbValue = toDatabaseValue(original);
    const restored = fromDatabaseValue(dbValue);
    expect(getCurrencyValue(restored)).toBe(original);
  });
});

describe("compareCurrency", () => {
  it("should return -1 when first is less", () => {
    expect(compareCurrency(100, 200)).toBe(-1);
  });

  it("should return 1 when first is greater", () => {
    expect(compareCurrency(200, 100)).toBe(1);
  });

  it("should return 0 when equal", () => {
    expect(compareCurrency(100, 100)).toBe(0);
  });

  it("should handle string comparisons", () => {
    expect(compareCurrency("100.00", "100")).toBe(0);
  });

  it("should handle decimal comparisons", () => {
    expect(compareCurrency(0.1, 0.2)).toBe(-1);
  });
});

describe("isEqualCurrency", () => {
  it("should return true for equal values", () => {
    expect(isEqualCurrency(100, 100)).toBe(true);
  });

  it("should return false for different values", () => {
    expect(isEqualCurrency(100, 200)).toBe(false);
  });

  it("should handle string equality", () => {
    expect(isEqualCurrency("100.00", 100)).toBe(true);
  });

  it("should handle decimal equality", () => {
    expect(isEqualCurrency(0.1, 0.1)).toBe(true);
  });
});

describe("isValidCurrency", () => {
  it("should accept valid positive numbers", () => {
    expect(isValidCurrency(100)).toBe(true);
    expect(isValidCurrency(0.01)).toBe(true);
  });

  it("should accept zero", () => {
    expect(isValidCurrency(0)).toBe(true);
  });

  it("should accept valid string numbers", () => {
    expect(isValidCurrency("100")).toBe(true);
    expect(isValidCurrency("100.50")).toBe(true);
  });

  it("should reject negative numbers", () => {
    expect(isValidCurrency(-100)).toBe(false);
  });

  it("should reject invalid strings", () => {
    expect(isValidCurrency("abc")).toBe(false);
    expect(isValidCurrency("")).toBe(false);
  });

  it("should reject null and undefined", () => {
    expect(isValidCurrency(null)).toBe(false);
    expect(isValidCurrency(undefined)).toBe(false);
  });

  it("should reject NaN", () => {
    expect(isValidCurrency(NaN)).toBe(false);
  });

  it("should reject Infinity", () => {
    expect(isValidCurrency(Infinity)).toBe(false);
    expect(isValidCurrency(-Infinity)).toBe(false);
  });
});

describe("getCurrencyValue", () => {
  it("should extract numeric value", () => {
    const curr = parseCurrency(1234.56);
    expect(getCurrencyValue(curr)).toBe(1234.56);
  });

  it("should handle string input", () => {
    expect(getCurrencyValue("1234.56")).toBe(1234.56);
  });

  it("should handle zero", () => {
    expect(getCurrencyValue(0)).toBe(0);
  });
});
