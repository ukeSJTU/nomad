import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

let mod: any;
try {
  mod = await import("../src/config/env");
} catch (e) {
  console.error("Environment validation failed");
  console.error(e instanceof Error ? e.message : String(e));
  process.exit(1);
}

const { env, features, publicEnv } = mod;

if (env.NODE_ENV === "development") {
  const url = env.DATABASE_URL ? new URL(env.DATABASE_URL) : null;
  const sslRaw = env.DATABASE_SSL?.toLowerCase();
  const ssl =
    sslRaw === "true" || sslRaw === "enabled"
      ? "enabled"
      : sslRaw === "false" || sslRaw === "disabled"
        ? "disabled"
        : env.DATABASE_URL?.includes("sslmode=require")
          ? "enabled"
          : env.DATABASE_URL?.includes("sslmode=disable")
            ? "disabled"
            : env.NODE_ENV === "production"
              ? "enabled"
              : "disabled";

  console.log("[Env Summary]");
  console.log(`NODE_ENV=${env.NODE_ENV}`);
  console.log(
    `Database host=${url?.hostname ?? ""} port=${url?.port || ""} name=${url?.pathname?.slice(1) ?? ""} ssl=${ssl}`
  );
  console.log(
    `Email feature=${features.email} from=${env.RESEND_FROM_EMAIL ?? ""} apiKey=${env.RESEND_API_KEY ? "set" : "missing"}`
  );
  console.log(
    `SMS feature=${features.sms} signName=${env.ALIBABA_CLOUD_SMS_SIGN_NAME ? "set" : "missing"} templateCode=${env.ALIBABA_CLOUD_SMS_TEMPLATE_CODE ? "set" : "missing"}`
  );
  console.log(
    `Turnstile siteKey=${publicEnv.NEXT_PUBLIC_TURNSTILE_SITE_KEY ? "set" : "missing"} secretKey=${env.TURNSTILE_SECRET_KEY ? "set" : "missing"}`
  );
}
