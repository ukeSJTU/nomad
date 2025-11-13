import type { TurnstileVerificationResult } from "@/types";
import logger from "@/utils/logger";

const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/**
 * Map Cloudflare Turnstile error codes to localized messages.
 */
function mapTurnstileError(errorCodes: string[] = []): string {
  if (errorCodes.includes("timeout-or-duplicate")) {
    return "验证已过期，请重新验证";
  }
  if (
    errorCodes.includes("missing-input-secret") ||
    errorCodes.includes("invalid-input-secret")
  ) {
    return "人机验证配置错误，请联系管理员";
  }
  if (
    errorCodes.includes("missing-input-response") ||
    errorCodes.includes("invalid-input-response")
  ) {
    return "请完成人机验证";
  }

  return "人机验证失败，请刷新页面重试";
}

/**
 * Verify Cloudflare Turnstile token on the server.
 */
export async function verifyTurnstileToken(
  token?: string | null,
  remoteIp?: string | null
): Promise<TurnstileVerificationResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      logger.error(
        "TURNSTILE_SECRET_KEY not configured in production environment"
      );
      return {
        success: false,
        error: "Turnstile 未配置，请联系管理员",
        errorCodes: ["missing-input-secret"],
      };
    }

    logger.warn(
      { env: process.env.NODE_ENV },
      "TURNSTILE_SECRET_KEY not configured, bypassing verification"
    );
    return { success: true, bypassed: true };
  }

  if (!token) {
    return {
      success: false,
      error: "请完成人机验证",
      errorCodes: ["missing-input-response"],
    };
  }

  try {
    const body = new URLSearchParams({
      secret,
      response: token,
    });

    if (remoteIp) {
      body.append("remoteip", remoteIp);
    }

    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });

    const data = (await response.json()) as {
      success: boolean;
      challenge_ts?: string;
      hostname?: string;
      "error-codes"?: string[];
    };

    if (!data.success) {
      const errorCodes = data["error-codes"] ?? [];
      const message = mapTurnstileError(errorCodes);
      logger.warn({ errorCodes }, "Cloudflare Turnstile verification failed");
      return {
        success: false,
        error: message,
        errorCodes,
      };
    }

    return { success: true };
  } catch (error) {
    logger.error({ error }, "Failed to verify Cloudflare Turnstile token");
    return {
      success: false,
      error: "验证服务暂时不可用，请稍后重试",
      errorCodes: ["network-error"],
    };
  }
}
