import { z } from "zod";

/**
 * Example validation schemas demonstrating basic Zod features
 * These schemas showcase common validation patterns that can be reused across the application
 */

// Basic string validation with length constraints
export const usernameSchema = z
  .string()
  .min(3, "Username must be at least 3 characters")
  .max(20, "Username cannot exceed 20 characters")
  .regex(
    /^[a-zA-Z0-9_]+$/,
    "Username can only contain letters, numbers, and underscores"
  );

// Email validation
export const emailSchema = z
  .string()
  .min(1, "Email is required")
  .email("Please enter a valid email address");

// Password validation with multiple constraints
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

// Number validation with range
export const ageSchema = z
  .number()
  .min(13, "Must be at least 13 years old")
  .max(120, "Age cannot exceed 120");

// Optional field with default value
export const roleSchema = z
  .enum(["user", "admin", "moderator"])
  .default("user");

// Object schema combining multiple fields
export const userSchema = z.object({
  username: usernameSchema,
  email: emailSchema,
  age: ageSchema,
  role: roleSchema,
});

// Array validation
export const tagsSchema = z
  .array(z.string().min(1, "Tag cannot be empty"))
  .min(1, "At least one tag is required")
  .max(5, "Cannot have more than 5 tags");

// Union type validation
export const statusSchema = z.union([
  z.literal("active"),
  z.literal("inactive"),
  z.literal("pending"),
]);

// Conditional validation using refine
export const passwordConfirmSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Transform example - converting string to number
export const stringToNumberSchema = z
  .string()
  .transform(val => parseInt(val, 10))
  .pipe(z.number().min(1, "Must be a positive number"));

// Example type inference
export type User = z.infer<typeof userSchema>;
export type PasswordConfirm = z.infer<typeof passwordConfirmSchema>;
