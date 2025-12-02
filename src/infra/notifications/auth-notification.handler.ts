import "server-only";

import { Resend } from "resend";

import { getParsedEnv } from "@/config/env";
import { logger } from "@/infra/logging";
import { onAuthEvent } from "@/services/auth-events";

const env = getParsedEnv();
const resendApiKey = env.RESEND_API_KEY;
const resendFrom = (env as any).RESEND_FROM_EMAIL || "onboarding@resend.dev";
const resendClient = resendApiKey ? new Resend(resendApiKey) : null;

async function sendSecurityNotificationEmail(
  to: string | null | undefined,
  subject: string,
  message: string
) {
  if (!to) {
    logger.info(
      "[Auth Notification] No recipient email configured. Skipping send."
    );
    return;
  }

  if (!resendClient) {
    logger.info(
      `[Auth Notification] ${subject} -> ${to}: ${message} (simulated, missing RESEND_API_KEY)`
    );
    return;
  }

  try {
    await resendClient.emails.send({
      from: resendFrom,
      to,
      subject,
      text: message,
    });
  } catch (error) {
    logger.error({ error }, "[Auth Notification] Failed to send email");
  }
}

let handlersRegistered = false;

export function registerAuthNotificationHandlers(): void {
  if (handlersRegistered) {
    return;
  }

  handlersRegistered = true;

  onAuthEvent("emailUpdated", async ({ email, userName }) => {
    const subject = "账户安全通知：邮箱已更新";
    const message = `您的 Nomad 账户邮箱已更新为 ${email}${
      userName ? `，用户：${userName}` : ""
    }。如非本人操作，请尽快联系客服。`;

    await sendSecurityNotificationEmail(email, subject, message);
  });

  onAuthEvent(
    "phoneNumberUpdated",
    async ({ phoneNumber, userEmail, userName }) => {
      const subject = "账户安全通知：手机号已更新";
      const message = `您的 Nomad 账户手机号已更新为 ${phoneNumber}${
        userName ? `，用户：${userName}` : ""
      }。如非本人操作，请尽快联系客服。`;

      await sendSecurityNotificationEmail(userEmail, subject, message);
    }
  );
}

registerAuthNotificationHandlers();
