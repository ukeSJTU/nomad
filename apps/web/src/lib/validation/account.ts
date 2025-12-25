import { emailSchema, phoneNumberSchema } from "@/types/validations";

/**
 * Validates if account is a valid phone number or email
 */
export function validateAccount(account: string) {
  const isPhone = phoneNumberSchema.safeParse(account).success;
  const isEmail = emailSchema.safeParse(account).success;

  return {
    isPhone,
    isEmail,
    isValid: isPhone || isEmail,
  };
}
