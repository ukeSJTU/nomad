import { z } from "zod";

import { phoneNumberSchema } from "@/types/validations";

/**
 * Schema for creating a new address
 */
export const createAddressSchema = z.object({
  recipientName: z
    .string()
    .min(1, "请输入收件人姓名")
    .max(100, "姓名不能超过100个字符"),
  phoneNumber: phoneNumberSchema,
  province: z.string().min(1, "请选择省份"),
  city: z.string().min(1, "请选择城市"),
  district: z.string().min(1, "请选择区县"),
  town: z.string().optional(),
  detailAddress: z.string().min(1, "请输入详细地址"),
  isDefault: z.boolean().optional().default(false),
});

/**
 * Schema for updating an address
 */
export const updateAddressSchema = createAddressSchema.partial();

export type CreateAddressData = z.infer<typeof createAddressSchema>;
export type UpdateAddressData = z.infer<typeof updateAddressSchema>;
