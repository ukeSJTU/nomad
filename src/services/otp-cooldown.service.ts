import "server-only";

import { eq, sql } from "drizzle-orm";

import { db } from "@/db";
import { rateLimit } from "@/db/schema/auth";
import {
  OTP_COOLDOWN_SECONDS,
  type OtpChannel,
  buildOtpStorageKey,
} from "@/lib/otp";

const OTP_COOLDOWN_MS = OTP_COOLDOWN_SECONDS * 1000;

export interface OtpCooldownState {
  key: string;
  remainingSeconds: number;
}

export async function getOtpCooldownState(
  channel: OtpChannel,
  target: string
): Promise<OtpCooldownState> {
  const key = buildOtpStorageKey(channel, target);
  const record = await db.query.rateLimit.findFirst({
    columns: {
      lastRequest: true,
    },
    where: eq(rateLimit.id, key),
  });

  const lastRequest = record?.lastRequest;
  if (!lastRequest) {
    return { key, remainingSeconds: 0 };
  }

  const now = Date.now();
  const elapsedMs = now - Number(lastRequest);
  const remainingMs = OTP_COOLDOWN_MS - elapsedMs;

  if (remainingMs <= 0) {
    return { key, remainingSeconds: 0 };
  }

  return {
    key,
    remainingSeconds: Math.ceil(remainingMs / 1000),
  };
}

export async function markOtpCooldown(key: string): Promise<void> {
  const now = Date.now();

  await db
    .insert(rateLimit)
    .values({
      id: key,
      key,
      count: 1,
      lastRequest: now,
    })
    .onConflictDoUpdate({
      target: rateLimit.id,
      set: {
        lastRequest: now,
        count: sql<number>`coalesce(${rateLimit.count}, 0) + 1`,
      },
    });
}
