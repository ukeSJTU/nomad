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
 * Masks a phone number by showing only first 5 and last 4 characters
 * Example: "13812345678" -> "13812**5678"
 * Example: "+8613812345678" -> "+8613*****5678"
 */
export function maskPhoneNumber(phone: string): string {
  if (!phone || phone.length <= 7) {
    return phone;
  }

  if (phone.length <= 7) {
    return phone;
  }

  const firstPart = phone.slice(0, 5);
  const lastPart = phone.slice(-4);
  const maskedMiddle = "*".repeat(phone.length - 9);

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
