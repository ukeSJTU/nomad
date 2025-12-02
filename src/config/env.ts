import { z } from "zod";

function valueEnabled(v: string | undefined): boolean {
  const s = v?.toLowerCase();
  return s === "enabled" || s === "true";
}

const envSchema = z
  .object({
    NODE_ENV: z.string().optional(),

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

const publicEnvSchema = z.object({
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string().optional(),
});

export type AppEnv = z.infer<typeof envSchema>;
export type PublicEnv = z.infer<typeof publicEnvSchema>;

type NodeEnv = "development" | "test" | "production";

type Features = {
  email: boolean;
  sms: boolean;
};

export function getParsedEnv(): AppEnv {
  return envSchema.parse(process.env);
}

export function getPublicEnv(): PublicEnv {
  return publicEnvSchema.parse(process.env);
}

function getNodeEnvFromRaw(): NodeEnv | undefined {
  const s = process.env.NODE_ENV?.trim().toLowerCase();
  return s === "development" || s === "test" || s === "production"
    ? (s as NodeEnv)
    : undefined;
}

export function getFeatures(): Features {
  const e = getParsedEnv();
  const isProd = getNodeEnvFromRaw() === "production";

  const emailValue = e.ENABLE_RESEND?.toLowerCase();
  const smsValue = e.ENABLE_ALIYUN_SMS?.toLowerCase();

  const email =
    emailValue === "enabled" || emailValue === "true"
      ? true
      : emailValue === "disabled" || emailValue === "false"
        ? false
        : isProd;

  const sms =
    smsValue === "enabled" || smsValue === "true"
      ? true
      : smsValue === "disabled" || smsValue === "false"
        ? false
        : isProd;

  return { email, sms };
}

export function getEnv(): AppEnv {
  return getParsedEnv();
}

export const env = getEnv();
export const publicEnv = getPublicEnv();
export const features = getFeatures();

export function isProduction(): boolean {
  const s = process.env.NODE_ENV?.trim().toLowerCase();
  return s === "production";
}

export function isDevelopment(): boolean {
  const s = process.env.NODE_ENV?.trim().toLowerCase();
  return s === "development";
}

export function isTest(): boolean {
  const s = process.env.NODE_ENV?.trim().toLowerCase();
  return s === "test";
}

export function __resetEnvForTests() {
  // no-op: 保留测试调用兼容性
}
