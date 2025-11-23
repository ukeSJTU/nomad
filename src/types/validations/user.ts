import { z } from "zod";

/**
 * User Profile Validation Schemas
 *
 * This file contains Zod validation schemas for user profile management.
 *
 * Naming conventions:
 * - Schemas: camelCase ending with "Schema" (e.g., userInfoUpdateSchema)
 * - Types: PascalCase ending with "Data" (e.g., UserInfoUpdateData)
 *
 * Note: These schemas align with the user table in auth-schema.ts
 */

// ============================================================================
// User Profile Update Schemas
// ============================================================================

/**
 * User information update schema
 *
 * Used when users update their profile information.
 * All fields are optional - users can update only specific fields they want to change.
 * Empty strings are allowed to clear optional fields.
 *
 * Field constraints match the database schema:
 * - nickname: max 50 characters (optional, can be cleared)
 * - name: max 50 characters (optional, can be cleared)
 * - gender: one of "male", "female", or "other" (optional)
 * - birthday: YYYY-MM-DD format (optional, can be cleared)
 *
 * @property nickname - User's display name (max 50 chars, can be empty to clear)
 * @property name - User's real name (max 50 chars, can be empty to clear)
 * @property gender - User's gender (male/female/other)
 * @property birthday - User's birth date in YYYY-MM-DD format (can be empty to clear)
 */
export const userInfoUpdateSchema = z.object({
  nickname: z
    .union([
      z.string().max(50, "Nickname cannot exceed 50 characters"),
      z.literal(""),
    ])
    .optional(),

  name: z
    .union([
      z.string().max(50, "Name cannot exceed 50 characters"),
      z.literal(""),
    ])
    .optional(),

  gender: z
    .enum(["male", "female", "other"], {
      message: "Gender must be male, female, or other",
    })
    .optional(),

  birthday: z
    .union([
      z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Birthday must be in yyyy-mm-dd format"),
      z.literal(""),
    ])
    .optional(),
});

// ============================================================================
// TypeScript Type Exports
// ============================================================================

/**
 * Inferred TypeScript type from userInfoUpdateSchema
 * This type is automatically generated and should not be manually modified
 */
export type UserInfoUpdateData = z.infer<typeof userInfoUpdateSchema>;

// ============================================================================
// Wallet/Balance Management Schemas
// ============================================================================

/**
 * Recharge balance schema
 *
 * Used when users recharge their account balance.
 * Amount must be between 1 and 10000 (inclusive).
 *
 * @property amount - Recharge amount in CNY (1-10000)
 */
export const rechargeBalanceSchema = z.object({
  amount: z
    .number({
      message: "充值金额必须是数字",
    })
    .min(1, "充值金额最少为 1 元")
    .max(10000, "充值金额最多为 10000 元")
    .positive({ message: "充值金额必须是正数" }),
});

/**
 * Inferred TypeScript type from rechargeBalanceSchema
 */
export type RechargeBalanceData = z.infer<typeof rechargeBalanceSchema>;
