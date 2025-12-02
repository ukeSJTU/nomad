import { emailSchema, phoneNumberSchema } from "@/types/validations";

export type OtpChannel = "phone" | "email";

export const OTP_COOLDOWN_SECONDS = 60;

const OTP_STORAGE_PREFIX = "otp-countdown";

export function resolveOtpChannelFromAccount(
  account: string
): OtpChannel | null {
  const trimmedAccount = account.trim();
  const withoutCountryCode = trimmedAccount.replace(/^\+86/, "");

  const isPhone = phoneNumberSchema.safeParse(withoutCountryCode).success;
  if (isPhone) {
    return "phone";
  }

  const isEmail = emailSchema.safeParse(trimmedAccount).success;
  if (isEmail) {
    return "email";
  }

  return null;
}

function normalizePhoneNumber(target: string): string {
  const digitsOnly = target.trim().replace(/\D/g, "");

  if (digitsOnly.length > 11 && digitsOnly.startsWith("86")) {
    return digitsOnly.slice(-11);
  }

  return digitsOnly;
}

export function normalizeOtpTarget(
  channel: OtpChannel,
  target: string
): string {
  if (channel === "email") {
    return target.trim().toLowerCase();
  }

  return normalizePhoneNumber(target);
}

export function buildOtpStorageKey(
  channel: OtpChannel,
  target: string
): string {
  const normalizedTarget = normalizeOtpTarget(channel, target);
  return `${OTP_STORAGE_PREFIX}:${channel}:${normalizedTarget}`;
}

export function buildOtpStorageKeyFromAccount(account: string): string | null {
  const channel = resolveOtpChannelFromAccount(account);
  if (!channel) return null;

  return buildOtpStorageKey(channel, account);
}
