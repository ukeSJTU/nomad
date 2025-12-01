/**
 * Checks if the current environment is production.
 * @returns True if NODE_ENV is set to "production"
 */
import { z } from "zod";

function valueEnabled(v: string | undefined): boolean {
  const s = v?.toLowerCase();
  return s === "enabled" || s === "true";
}

const envSchema = z
  .object({
    NODE_ENV: z.enum(["development", "test", "production"]).optional(),
    NEXT_RUNTIME: z
      .string()
      .optional()
      .transform(v => {
        const s = v?.trim().toLowerCase();
        return s === "nodejs" || s === "edge" ? s : undefined;
      }),
    LOG_LEVEL: z
      .string()
      .optional()
      .transform(v => {
        const s = v?.trim().toLowerCase();
        return s &&
          [
            "fatal",
            "error",
            "warn",
            "info",
            "debug",
            "trace",
            "silent",
          ].includes(s)
          ? (s as typeof s)
          : undefined;
      }),
    CI: z.string().optional(),
    DEBUG: z.string().optional(),
    BASE_PATH: z.string().optional(),
    BRANCH_NAME: z.string().optional(),
    GITHUB_REF_NAME: z.string().optional(),
    BETTER_AUTH_SECRET: z.string().optional(),
    BETTER_AUTH_URL: z.string().optional(),
    DATABASE_URL: z
      .string()
      .refine(v => /^postgres(ql)?:\/\//.test(v), {
        message: "DATABASE_URL must start with postgres:// or postgresql://",
      })
      .optional(),
    DATABASE_SSL: z
      .string()
      .optional()
      .transform(v => {
        const s = v?.trim().toLowerCase();
        return s && ["enabled", "disabled", "true", "false"].includes(s)
          ? s
          : undefined;
      }),
    ENABLE_RESEND: z.string().optional(),
    RESEND_API_KEY: z.string().optional(),
    RESEND_FROM_EMAIL: z.string().optional(),
    ENABLE_ALIYUN_SMS: z.string().optional(),
    ALIBABA_CLOUD_SMS_SIGN_NAME: z.string().optional(),
    ALIBABA_CLOUD_SMS_TEMPLATE_CODE: z.string().optional(),
    TURNSTILE_SECRET_KEY: z.string().optional(),
    GITHUB_CLIENT_ID: z.string().optional(),
    GITHUB_CLIENT_SECRET: z.string().optional(),
    CRON_SECRET: z.string().optional(),
    INKEEP_API_KEY: z.string().optional(),
  })
  .refine(v => !(valueEnabled(v.ENABLE_RESEND) && !v.RESEND_API_KEY), {
    message: "RESEND_API_KEY is required when ENABLE_RESEND=enabled",
  })
  .refine(
    v =>
      !(
        valueEnabled(v.ENABLE_ALIYUN_SMS) &&
        (!v.ALIBABA_CLOUD_SMS_SIGN_NAME || !v.ALIBABA_CLOUD_SMS_TEMPLATE_CODE)
      ),
    { message: "Aliyun SMS requires SIGN_NAME and TEMPLATE_CODE when enabled" }
  );

export const env = envSchema.parse(process.env);

type NodeEnv = "development" | "test" | "production";

function getNodeEnv(): NodeEnv | undefined {
  const s = process.env.NODE_ENV?.trim().toLowerCase();
  return s === "development" || s === "test" || s === "production"
    ? (s as NodeEnv)
    : undefined;
}

export function isProduction(): boolean {
  return getNodeEnv() === "production";
}

export function isDevelopment(): boolean {
  return getNodeEnv() === "development";
}

export function isTest(): boolean {
  return getNodeEnv() === "test";
}

const publicEnvSchema = z.object({
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string().optional(),
});

export const publicEnv = publicEnvSchema.parse(process.env);

export const features = {
  email: (() => {
    const v = env.ENABLE_RESEND?.toLowerCase();
    if (v === "enabled" || v === "true") return true;
    if (v === "disabled" || v === "false") return false;
    return isProduction();
  })(),
  sms: (() => {
    const v = env.ENABLE_ALIYUN_SMS?.toLowerCase();
    if (v === "enabled" || v === "true") return true;
    if (v === "disabled" || v === "false") return false;
    return isProduction();
  })(),
};
