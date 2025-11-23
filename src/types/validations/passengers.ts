/**
 * Passenger validation schemas (Zod)
 *
 * Runtime validation schemas for passenger forms and server actions.
 * Used in validation layer: forms, API routes, server actions.
 */

import { z } from "zod";

import { emailSchema, phoneNumberSchema } from "@/types/validations/auth";

/**
 * Document number validation pattern
 * - Length: 1-50 characters
 */
export const documentNumberSchema = z
  .string()
  .min(1, "请输入证件号码")
  .max(50, "证件号码不能超过50个字符");

/**
 * Schema for creating a new passenger
 */
export const createPassengerSchema = z.object({
  name: z.string().min(1, "请输入姓名").max(100, "姓名不能超过100个字符"),
  nationality: z.string().max(100).optional().nullable(),
  gender: z.enum(["male", "female", "other"]).optional().nullable(),
  dateOfBirth: z.string().optional().nullable(),
  placeOfBirth: z.string().max(255).optional().nullable(),
  phone: phoneNumberSchema,
  email: emailSchema,
  documentType: z.enum(["id_card", "passport", "other"], {
    message: "请选择证件类型",
  }),
  documentNumber: documentNumberSchema,
  documentExpiryDate: z.string().optional().nullable(),
});

/**
 * Schema for updating an existing passenger
 */
export const updatePassengerSchema = createPassengerSchema.partial();

/**
 * Type inferred from createPassengerSchema
 */
export type CreatePassengerData = z.infer<typeof createPassengerSchema>;

/**
 * Type inferred from updatePassengerSchema
 */
export type UpdatePassengerData = z.infer<typeof updatePassengerSchema>;

/**
 * Schema for passenger form
 */
export const passengerFormSchema = z.object({
  name: z.string().min(1, "请输入姓名").max(100, "姓名不能超过100个字符"),
  nationality: z.string().optional(),
  gender: z.enum(["male", "female", "other"]).optional(),
  dateOfBirth: z.date({ message: "请选择出生日期" }).optional(),
  placeOfBirth: z.string().optional(),
  phone: z.string().optional(),
  email: z
    .union([
      z.string().email({ message: "请输入有效的邮箱地址" }),
      z.literal(""),
    ])
    .optional(),
  documentType: z.enum(["id_card", "passport", "other"], {
    message: "请选择证件类型",
  }),
  documentNumber: documentNumberSchema,
  documentExpiryDate: z.date({ message: "请选择证件有效期" }).optional(),
});

/**
 * Type inferred from passengerFormSchema
 */
export type PassengerFormData = z.infer<typeof passengerFormSchema>;
