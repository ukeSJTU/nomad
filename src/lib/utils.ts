import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Checks if the current environment is production.
 * @returns True if NODE_ENV is set to "production"
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === "production";
}

/**
 * Checks if the current environment is development.
 * @returns True if NODE_ENV is set to "development"
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === "development";
}

/**
 * Checks if the current environment is test.
 * @returns True if NODE_ENV is set to "test"
 */
export function isTest(): boolean {
  return process.env.NODE_ENV === "test";
}
