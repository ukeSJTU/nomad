/**
 * Server-side utility functions for masking sensitive passenger data
 */

/**
 * Masks a document number by showing only first 4 and last 3 characters
 * Example: "310115199001011234" -> "3101**************234"
 */
export function maskDocumentNumber(documentNumber: string): string {
  if (!documentNumber || documentNumber.length <= 7) {
    return documentNumber;
  }

  const firstPart = documentNumber.slice(0, 4);
  const lastPart = documentNumber.slice(-3);
  const maskedMiddle = "*".repeat(documentNumber.length - 7);

  return `${firstPart}${maskedMiddle}${lastPart}`;
}

/**
 * Masks a phone number by showing only first 3 and last 4 characters
 * Example: "13812345678" -> "138****5678"
 * Example: "+86 13812345678" -> "138****5678" (removes country code prefix)
 */
export function maskPhoneNumber(phone: string): string {
  if (!phone) {
    return phone;
  }

  // Remove country code prefix if present (e.g., "+86 " or "+86")
  const cleanPhone = phone.replace(/^\+\d+\s*/, "");

  if (cleanPhone.length <= 7) {
    return cleanPhone;
  }

  const firstPart = cleanPhone.slice(0, 3);
  const lastPart = cleanPhone.slice(-4);
  const maskedMiddle = "*".repeat(cleanPhone.length - 7);

  return `${firstPart}${maskedMiddle}${lastPart}`;
}

/**
 * Masks an email address by showing only first 2 characters of local part
 * Example: "user@example.com" -> "us***@example.com"
 */
export function maskEmail(email: string): string {
  if (!email || !email.includes("@")) {
    return email;
  }

  const [localPart, domain] = email.split("@");

  if (localPart.length <= 2) {
    return email;
  }

  const visiblePart = localPart.slice(0, 2);
  const maskedPart = "***";

  return `${visiblePart}${maskedPart}@${domain}`;
}
