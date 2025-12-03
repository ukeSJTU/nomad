import { z } from "zod";

const envSchema = z
  .object({
    NODE_ENV: z.enum(["development", "test", "production"]),
    NEXT_RUNTIME: z.preprocess(val => {
      if (typeof val === "string" && val.trim() === "") return undefined;
      return val;
    }, z.enum(["nodejs", "edge"]).optional()),
    BASE_PATH: z.string().default(""),
    LOG_LEVEL: z.preprocess(val => {
      if (typeof val === "string" && val.trim() === "") return undefined;
      return val;
    }, z
      .union([
        z.literal("fatal"),
        z.literal("error"),
        z.literal("warn"),
        z.literal("info"),
        z.literal("debug"),
        z.literal("trace"),
        z.literal("silent"),
      ])
      .optional()),
    DATABASE_URL: z.string().min(1),
    DATABASE_SSL: z.preprocess(val => {
      if (typeof val === "string") {
        const s = val.toLowerCase();
        if (s === "true" || s === "enabled") return true;
        if (s === "false" || s === "disabled") return false;
        return undefined;
      }
      if (typeof val === "boolean") return val;
      return undefined;
    }, z.boolean().optional()),
    BETTER_AUTH_SECRET: z.preprocess(val => {
      if (typeof val === "string" && val.trim() === "") return undefined;
      return val;
    }, z.string().min(1).optional()),
    BETTER_AUTH_URL: z.string().min(1).default("http://localhost:3000"),
    ENABLE_ALIYUN_SMS: z
      .union([
        z.literal("enabled"),
        z.literal("disabled"),
        z.literal("true"),
        z.literal("false"),
        z.literal(""),
      ])
      .optional(),
    ALIBABA_CLOUD_SMS_SIGN_NAME: z.preprocess(val => {
      if (typeof val === "string" && val.trim() === "") return undefined;
      return val;
    }, z.string().min(1).optional()),
    ALIBABA_CLOUD_SMS_TEMPLATE_CODE: z.preprocess(val => {
      if (typeof val === "string" && val.trim() === "") return undefined;
      return val;
    }, z.string().min(1).optional()),
    ENABLE_RESEND: z
      .union([
        z.literal("enabled"),
        z.literal("disabled"),
        z.literal("true"),
        z.literal("false"),
        z.literal(""),
      ])
      .optional(),
    RESEND_API_KEY: z.preprocess(val => {
      if (typeof val === "string" && val.trim() === "") return undefined;
      return val;
    }, z.string().min(1).optional()),
    RESEND_FROM_EMAIL: z.preprocess(val => {
      if (typeof val === "string" && val.trim() === "") return undefined;
      return val;
    }, z.string().min(1).default("onboarding@resend.dev")),
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.preprocess(val => {
      if (typeof val === "string" && val.trim() === "") return undefined;
      return val;
    }, z.string().min(1).default("1x00000000000000000000AA")),
    TURNSTILE_SECRET_KEY: z.preprocess(val => {
      if (typeof val === "string" && val.trim() === "") return undefined;
      return val;
    }, z.string().min(1).default("1x0000000000000000000000000000000AA")),
    CRON_SECRET: z.preprocess(val => {
      if (typeof val === "string" && val.trim() === "") return undefined;
      return val;
    }, z.string().min(1).optional()),
    GITHUB_CLIENT_ID: z.preprocess(val => {
      if (typeof val === "string" && val.trim() === "") return undefined;
      return val;
    }, z.string().min(1).optional()),
    GITHUB_CLIENT_SECRET: z.preprocess(val => {
      if (typeof val === "string" && val.trim() === "") return undefined;
      return val;
    }, z.string().min(1).optional()),
  })
  .superRefine((data, ctx) => {
    const smsEnabled = (data.ENABLE_ALIYUN_SMS ?? "").toLowerCase();
    if (smsEnabled === "enabled" || smsEnabled === "true") {
      if (!data.ALIBABA_CLOUD_SMS_SIGN_NAME) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["ALIBABA_CLOUD_SMS_SIGN_NAME"],
          message:
            "ALIBABA_CLOUD_SMS_SIGN_NAME is required when ENABLE_ALIYUN_SMS=enabled",
        });
      }
      if (!data.ALIBABA_CLOUD_SMS_TEMPLATE_CODE) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["ALIBABA_CLOUD_SMS_TEMPLATE_CODE"],
          message:
            "ALIBABA_CLOUD_SMS_TEMPLATE_CODE is required when ENABLE_ALIYUN_SMS=enabled",
        });
      }
    }
    const emailEnabled = (data.ENABLE_RESEND ?? "").toLowerCase();
    if (emailEnabled === "enabled" || emailEnabled === "true") {
      if (!data.RESEND_API_KEY) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["RESEND_API_KEY"],
          message: "RESEND_API_KEY is required when ENABLE_RESEND=enabled",
        });
      }
      if (!data.RESEND_FROM_EMAIL) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["RESEND_FROM_EMAIL"],
          message: "RESEND_FROM_EMAIL is required when ENABLE_RESEND=enabled",
        });
      }
    }
  });

export type EnvType = z.infer<typeof envSchema>;

export function getParsedEnv(): EnvType {
  const parsed = envSchema.parse(process.env as Record<string, unknown>);
  return parsed as EnvType;
}

export function getFeatures(): { sms: boolean; email: boolean } {
  const env = getParsedEnv();
  const normalize = (v: string | undefined) => {
    const s = (v ?? "").toLowerCase();
    if (s === "enabled" || s === "true") return true;
    if (s === "disabled" || s === "false") return false;
    return env.NODE_ENV === "production";
  };

  const sms = normalize(env.ENABLE_ALIYUN_SMS as unknown as string | undefined);
  if (sms) {
    const issues: z.ZodIssue[] = [];
    if (!(env as any).ALIBABA_CLOUD_SMS_SIGN_NAME)
      issues.push({
        code: z.ZodIssueCode.custom,
        path: ["ALIYUN_SMS_SIGN_NAME"],
        message: "Aliyun SMS requires SIGN_NAME when enabled",
      });
    if (!(env as any).ALIBABA_CLOUD_SMS_TEMPLATE_CODE)
      issues.push({
        code: z.ZodIssueCode.custom,
        path: ["ALIYUN_SMS_TEMPLATE_CODE"],
        message: "Aliyun SMS requires TEMPLATE_CODE when enabled",
      });
    if (issues.length) throw new z.ZodError(issues);
  }

  const email = normalize(env.ENABLE_RESEND as unknown as string | undefined);
  if (email) {
    const issues: z.ZodIssue[] = [];
    if (!env.RESEND_API_KEY)
      issues.push({
        code: z.ZodIssueCode.custom,
        path: ["RESEND_API_KEY"],
        message: "RESEND_API_KEY is required when ENABLE_RESEND=enabled",
      });
    if (!(env as any).RESEND_FROM_EMAIL)
      issues.push({
        code: z.ZodIssueCode.custom,
        path: ["RESEND_FROM_EMAIL"],
        message: "RESEND_FROM_EMAIL is required when ENABLE_RESEND=enabled",
      });
    if (issues.length) throw new z.ZodError(issues);
  }

  return { sms, email };
}

// Lightweight feature toggles without strict cross-field validation
export function getFeatureToggles(): { sms: boolean; email: boolean } {
  const nodeEnv = process.env.NODE_ENV;
  const isProd = nodeEnv === "production";
  const normalize = (v: string | undefined) => {
    const s = (v ?? "").toLowerCase();
    if (s === "enabled" || s === "true") return true;
    if (s === "disabled" || s === "false") return false;
    return isProd;
  };

  const sms = normalize(process.env.ENABLE_ALIYUN_SMS);
  const email = normalize(process.env.ENABLE_RESEND);
  return { sms, email };
}

export function isProduction(): boolean {
  return process.env.NODE_ENV === "production";
}

export function isDevelopment(): boolean {
  return process.env.NODE_ENV === "development";
}

export function isTest(): boolean {
  return process.env.NODE_ENV === "test";
}

const dbEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).optional(),
  DATABASE_URL: z.string().min(1),
  DATABASE_SSL: z.preprocess(val => {
    if (typeof val === "string") {
      const s = val.toLowerCase();
      if (s === "true" || s === "enabled") return true;
      if (s === "false" || s === "disabled") return false;
      return undefined;
    }
    if (typeof val === "boolean") return val;
    return undefined;
  }, z.boolean().optional()),
});

export type DbEnvType = z.infer<typeof dbEnvSchema>;

export function getDbEnv(): DbEnvType {
  return dbEnvSchema.parse(process.env as Record<string, unknown>);
}

export function isNodeRuntime(): boolean {
  return getParsedEnv().NEXT_RUNTIME === "nodejs";
}

export function isEdgeRuntime(): boolean {
  return getParsedEnv().NEXT_RUNTIME === "edge";
}

export function getLogLevel():
  | "fatal"
  | "error"
  | "warn"
  | "info"
  | "debug"
  | "trace"
  | "silent" {
  const env = getParsedEnv();
  const defaults = {
    test: "silent",
    development: "debug",
    production: "info",
  } as const;
  return env.LOG_LEVEL ?? defaults[env.NODE_ENV] ?? "info";
}

export function isDatabaseSSL(): boolean {
  const v = getParsedEnv().DATABASE_SSL;
  return v === true;
}

export function getDatabaseUrl(): string {
  return getParsedEnv().DATABASE_URL;
}

export function getBasePath(): string {
  return getParsedEnv().BASE_PATH ?? "";
}

export function hasResendConfig(): boolean {
  const env = getParsedEnv();
  const enabled = (
    env.ENABLE_RESEND as unknown as string | undefined
  )?.toLowerCase();
  const isEnabled = enabled === "enabled" || enabled === "true";
  return Boolean(
    isEnabled && env.RESEND_API_KEY && (env as any).RESEND_FROM_EMAIL
  );
}

export function hasAliyunSmsConfig(): boolean {
  const env = getParsedEnv();
  const enabled = (
    env.ENABLE_ALIYUN_SMS as unknown as string | undefined
  )?.toLowerCase();
  const isEnabled = enabled === "enabled" || enabled === "true";
  return Boolean(
    isEnabled &&
      (env as any).ALIBABA_CLOUD_SMS_SIGN_NAME &&
      (env as any).ALIBABA_CLOUD_SMS_TEMPLATE_CODE
  );
}

export function hasTurnstileConfig(): boolean {
  const env = getParsedEnv();
  return Boolean(
    env.TURNSTILE_SECRET_KEY && env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  );
}

export function getBetterAuthUrl(): string | undefined {
  return getParsedEnv().BETTER_AUTH_URL;
}
