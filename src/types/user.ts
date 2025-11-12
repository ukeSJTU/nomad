import { z } from "zod";

/**
 * User info update schema
 * All fields are optional - users can update only specific fields
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

export type UserInfoUpdateData = z.infer<typeof userInfoUpdateSchema>;
