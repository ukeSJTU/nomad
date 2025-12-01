import { z } from "zod";

function valueEnabled(v: string | undefined): boolean {
  const s = v?.toLowerCase();
  return s === "enabled" || s === "true";
}

const envSchema = z
  .object({
    // 不再用 enum，任意字符串都让它通过，逻辑判断放在运行时
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

/**
 * Lazy caches
 */
let envLoaded = false;
let cachedEnv: AppEnv | null = null;
let cachedPublicEnv: PublicEnv | null = null;
let cachedFeatures: Features | null = null;

/**
 * 在 Node 环境里尝试加载 .env
 * 浏览器 / Storybook / Playwright 等环境下 require 不存在，会直接被 catch 吃掉
 */
function ensureEnvLoaded() {
  if (envLoaded) return;

  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { loadEnvConfig } = require("@next/env") as typeof import(
      "@next/env"
    );
    loadEnvConfig(process.cwd());
  } catch {
    // 非 Node CJS 环境（浏览器、ESM）下不用额外处理
  }

  envLoaded = true;
}

function getParsedEnv(): AppEnv {
  if (!cachedEnv) {
    ensureEnvLoaded();
    cachedEnv = envSchema.parse(process.env);
  }
  return cachedEnv;
}

function getParsedPublicEnv(): PublicEnv {
  if (!cachedPublicEnv) {
    cachedPublicEnv = publicEnvSchema.parse(process.env);
  }
  return cachedPublicEnv;
}

function getNodeEnvFromEnv(e: AppEnv): NodeEnv | undefined {
  const s = e.NODE_ENV?.trim().toLowerCase();
  return s === "development" || s === "test" || s === "production"
    ? (s as NodeEnv)
    : undefined;
}

function buildFeatures(e: AppEnv): Features {
  const nodeEnv = getNodeEnvFromEnv(e);
  const isProd = nodeEnv === "production";

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

/**
 * Public API
 */
export function getEnv(): AppEnv {
  return getParsedEnv();
}

export function getPublicEnv(): PublicEnv {
  return getParsedPublicEnv();
}

export function getFeatures(): Features {
  if (!cachedFeatures) {
    cachedFeatures = buildFeatures(getParsedEnv());
  }
  return cachedFeatures;
}

/**
 * 兼容导出：老代码可以继续用，之后可以逐步删
 * @deprecated Prefer getEnv()
 */
export const env = getEnv();
/** @deprecated Prefer getPublicEnv() */
export const publicEnv = getPublicEnv();
/** @deprecated Prefer getFeatures() */
export const features = getFeatures();

/**
 * 环境判断工具函数
 */
export function isProduction(): boolean {
  const nodeEnv = getNodeEnvFromEnv(getParsedEnv());
  return nodeEnv === "production";
}

export function isDevelopment(): boolean {
  const nodeEnv = getNodeEnvFromEnv(getParsedEnv());
  return nodeEnv === "development";
}

export function isTest(): boolean {
  const nodeEnv = getNodeEnvFromEnv(getParsedEnv());
  return nodeEnv === "test";
}

/**
 * 测试专用：清理缓存，让 vi.stubEnv 后能重新解析 env
 */
export function __resetEnvForTests() {
  cachedEnv = null;
  cachedPublicEnv = null;
  cachedFeatures = null;
  envLoaded = false;
}
