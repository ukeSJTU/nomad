"use client";

import {
  type ContactInfo,
  ContactInfoCard as ContactInfoCardUI,
  type ContactInfoValidationErrors,
} from "@ukesjtu/nomad-ui/components/flights/booking";
import { emailSchema, phoneNumberSchema } from "@/types/validations";

export type { ContactInfo, ContactInfoValidationErrors };

interface ContactInfoCardProps {
  value: ContactInfo;
  onChange: (value: ContactInfo) => void;
  errors?: ContactInfoValidationErrors;
}

/**
 * Validate contact information using Zod schemas
 */
export function validateContactInfo(
  contactInfo: ContactInfo
): ContactInfoValidationErrors {
  const errors: ContactInfoValidationErrors = {};

  // Validate based on selected method
  if (contactInfo.method === "email") {
    if (!contactInfo.email.trim()) {
      errors.email = "请输入联系邮箱";
    } else {
      const result = emailSchema.safeParse(contactInfo.email);
      if (!result.success) {
        errors.email = result.error.issues[0]?.message || "邮箱格式不正确";
      }
    }
  } else if (contactInfo.method === "phone") {
    if (!contactInfo.phone.trim()) {
      errors.phone = "请输入联系电话";
    } else {
      const result = phoneNumberSchema.safeParse(contactInfo.phone);
      if (!result.success) {
        errors.phone = result.error.issues[0]?.message || "手机号格式不正确";
      }
    }
  }

  return errors;
}

/**
 * Contact Information Card Container Component
 * Provides validation logic for the contact information form
 */
export function ContactInfoCard(props: ContactInfoCardProps) {
  return <ContactInfoCardUI {...props} />;
}
