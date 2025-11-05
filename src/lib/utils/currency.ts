/**
 * Currency Utility Module
 *
 * This module provides a unified interface for handling monetary values in the application.
 * It uses currency.js to ensure precision in financial calculations and avoid JavaScript
 * floating-point arithmetic issues.
 *
 * Key Features:
 * - Precision: Handles decimal arithmetic correctly (e.g., 0.1 + 0.2 = 0.3)
 * - Formatting: Consistent currency display with CNY symbol and thousands separators
 * - Database Integration: Seamless conversion to/from PostgreSQL NUMERIC(10,2)
 * - Type Safety: TypeScript support for better developer experience
 *
 * @see ADR: openspec/specs/adr-currency-handling.md
 */

import currency from "currency.js";

/**
 * Currency configuration for CNY (Chinese Yuan)
 * - symbol: ¥
 * - precision: 2 decimal places
 * - separator: comma for thousands
 * - decimal: period for decimal point
 */
const CNY_CONFIG = {
  symbol: "¥",
  precision: 2,
  separator: ",",
  decimal: ".",
} as const;

/**
 * Type alias for currency.js values
 * This can be used for type annotations in function parameters and return types
 */
export type CurrencyValue = currency;

/**
 * Type for values that can be converted to currency
 * Includes: number, string, currency object
 */
export type CurrencyInput = currency.Any;

/**
 * Create a currency object with CNY configuration
 *
 * @param value - The value to convert to currency (number, string, or currency object)
 * @returns A currency object configured for CNY
 *
 * @example
 * const price = CNY(100);
 * const total = CNY("1234.56");
 */
function CNY(value: CurrencyInput): currency {
  return currency(value, CNY_CONFIG);
}

/**
 * Parse a value into a currency object
 *
 * @param value - The value to parse (number, string, or currency object)
 * @returns A currency object
 *
 * @example
 * const price = parseCurrency("1234.56");
 * const total = parseCurrency(1234.56);
 */
export function parseCurrency(value: CurrencyInput): currency {
  return CNY(value);
}

/**
 * Format a currency value with symbol and thousands separators
 *
 * @param value - The value to format
 * @returns Formatted string (e.g., "¥1,234.56")
 *
 * @example
 * formatCurrency(1234.56) // "¥1,234.56"
 * formatCurrency("1234.56") // "¥1,234.56"
 */
export function formatCurrency(value: CurrencyInput): string {
  return CNY(value).format();
}

/**
 * Format a currency value without the currency symbol
 *
 * @param value - The value to format
 * @returns Formatted string without symbol (e.g., "1,234.56")
 *
 * @example
 * formatCurrencyWithoutSymbol(1234.56) // "1,234.56"
 */
export function formatCurrencyWithoutSymbol(value: CurrencyInput): string {
  return CNY(value).format({ symbol: "" });
}

/**
 * Add multiple currency values together
 *
 * @param values - Values to add (at least one required)
 * @returns Sum of all values as a currency object
 *
 * @example
 * addCurrency(100, 200, 300) // currency(600)
 * addCurrency("100.50", "200.25") // currency(300.75)
 */
export function addCurrency(...values: CurrencyInput[]): currency {
  if (values.length === 0) {
    return CNY(0);
  }

  return values.reduce<currency>((sum, value) => sum.add(value), CNY(0));
}

/**
 * Subtract one currency value from another
 *
 * @param minuend - The value to subtract from
 * @param subtrahend - The value to subtract
 * @returns Difference as a currency object
 *
 * @example
 * subtractCurrency(500, 200) // currency(300)
 * subtractCurrency("500.75", "200.25") // currency(300.50)
 */
export function subtractCurrency(
  minuend: CurrencyInput,
  subtrahend: CurrencyInput
): currency {
  return CNY(minuend).subtract(subtrahend);
}

/**
 * Multiply a currency value by a number
 *
 * @param value - The currency value
 * @param multiplier - The number to multiply by
 * @returns Product as a currency object
 *
 * @example
 * multiplyCurrency(100, 3) // currency(300)
 * multiplyCurrency("100.50", 2) // currency(201.00)
 */
export function multiplyCurrency(
  value: CurrencyInput,
  multiplier: number
): currency {
  return CNY(value).multiply(multiplier);
}

/**
 * Divide a currency value by a number
 *
 * @param value - The currency value
 * @param divisor - The number to divide by
 * @returns Quotient as a currency object
 *
 * @example
 * divideCurrency(300, 3) // currency(100)
 * divideCurrency("100.50", 2) // currency(50.25)
 */
export function divideCurrency(
  value: CurrencyInput,
  divisor: number
): currency {
  return CNY(value).divide(divisor);
}

/**
 * Convert a currency value to a string suitable for database storage
 * Returns a string with exactly 2 decimal places
 *
 * @param value - The currency value to convert
 * @returns String representation (e.g., "1234.56")
 *
 * @example
 * toDatabaseValue(1234.56) // "1234.56"
 * toDatabaseValue("1234.5") // "1234.50"
 */
export function toDatabaseValue(value: CurrencyInput): string {
  return CNY(value).value.toFixed(2);
}

/**
 * Convert a database value (string or number) to a currency object
 *
 * @param value - The database value (typically a string from NUMERIC column)
 * @returns A currency object
 *
 * @example
 * fromDatabaseValue("1234.56") // currency(1234.56)
 * fromDatabaseValue(1234.56) // currency(1234.56)
 */
export function fromDatabaseValue(value: string | number): currency {
  return CNY(value);
}

/**
 * Compare two currency values
 *
 * @param a - First value
 * @param b - Second value
 * @returns -1 if a < b, 0 if a === b, 1 if a > b
 *
 * @example
 * compareCurrency(100, 200) // -1
 * compareCurrency(200, 100) // 1
 * compareCurrency(100, 100) // 0
 */
export function compareCurrency(
  a: CurrencyInput,
  b: CurrencyInput
): -1 | 0 | 1 {
  const currencyA = CNY(a);
  const currencyB = CNY(b);

  if (currencyA.value < currencyB.value) return -1;
  if (currencyA.value > currencyB.value) return 1;
  return 0;
}

/**
 * Check if two currency values are equal
 *
 * @param a - First value
 * @param b - Second value
 * @returns True if values are equal
 *
 * @example
 * isEqualCurrency(100, 100) // true
 * isEqualCurrency("100.00", 100) // true
 * isEqualCurrency(100, 200) // false
 */
export function isEqualCurrency(a: CurrencyInput, b: CurrencyInput): boolean {
  return compareCurrency(a, b) === 0;
}

/**
 * Validate if a value is a valid currency amount
 * Checks for:
 * - Non-negative values
 * - Finite numbers
 * - Valid numeric strings
 *
 * @param value - The value to validate
 * @returns True if valid, false otherwise
 *
 * @example
 * isValidCurrency(100) // true
 * isValidCurrency("100.50") // true
 * isValidCurrency(-100) // false
 * isValidCurrency("abc") // false
 */
export function isValidCurrency(value: unknown): boolean {
  // Reject null and undefined
  if (value === null || value === undefined) {
    return false;
  }

  // Reject non-numeric strings
  if (typeof value === "string") {
    // Empty string is invalid
    if (value.trim() === "") {
      return false;
    }
    // Check if string can be parsed as a number
    const num = Number(value);
    if (isNaN(num)) {
      return false;
    }
  }

  try {
    const curr = CNY(value as CurrencyInput);
    // Check if the value is finite and non-negative
    return Number.isFinite(curr.value) && curr.value >= 0;
  } catch {
    return false;
  }
}

/**
 * Get the numeric value from a currency object
 *
 * @param value - The currency value
 * @returns The numeric value
 *
 * @example
 * getCurrencyValue(CNY(100)) // 100
 * getCurrencyValue("1234.56") // 1234.56
 */
export function getCurrencyValue(value: CurrencyInput): number {
  return CNY(value).value;
}
