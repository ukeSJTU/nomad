import "server-only";

import { Resend } from "resend";

import { OrderConfirmationEmail, OtpEmailTemplate } from "@/components/emails";
import { createScopedLogger } from "@/infra/logging/logger";
import type { OrderConfirmationEmailData } from "@/types/dto";

const logger = createScopedLogger({ module: "resend-client" });

/**
 * Resend Email Client for sending verification emails
 * Singleton pattern to ensure only one instance is created
 */
export class ResendEmailClient {
  private static instance: ResendEmailClient;
  private client: Resend;

  private constructor() {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      logger.warn(
        "RESEND_API_KEY is not set. Email sending will be simulated in console."
      );
      // Create a dummy client - we'll handle the missing key in sendEmail
      this.client = new Resend("dummy-key");
    } else {
      this.client = new Resend(apiKey);
    }
  }

  /**
   * Get singleton instance of ResendEmailClient
   * @returns ResendEmailClient instance
   */
  public static getInstance(): ResendEmailClient {
    if (!ResendEmailClient.instance) {
      ResendEmailClient.instance = new ResendEmailClient();
    }
    return ResendEmailClient.instance;
  }

  /**
   * Send email verification code
   * @param emailAddr Email address
   * @param code Verification code
   * @returns Promise<boolean> Whether sending was successful
   */
  public async sendVerificationEmail(
    emailAddr: string,
    code: string
  ): Promise<boolean> {
    try {
      const fromEmail =
        process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

      logger.debug(
        { fromEmail, email: emailAddr },
        "Sending verification email"
      );

      if (!process.env.RESEND_API_KEY) {
        throw new Error("Missing required email configuration: RESEND_API_KEY");
      }

      // Send email using Resend
      const { data, error } = await this.client.emails.send({
        from: fromEmail,
        to: emailAddr,
        subject: "Nomad - 验证您的邮箱",
        react: <OtpEmailTemplate otp={code} />,
      });

      if (error) {
        logger.error({ err: error }, "Email sending failed");
        return false;
      }

      logger.info(
        { email: emailAddr, emailId: data?.id },
        "Email sent successfully"
      );
      return true;
    } catch (error: unknown) {
      logger.error({ err: error }, "Error sending verification email");

      return false;
    }
  }

  /**
   * Send order confirmation email
   * @param orderData Order confirmation email data
   * @returns Promise<boolean> Whether sending was successful
   */
  public async sendOrderConfirmationEmail(
    orderData: OrderConfirmationEmailData
  ): Promise<boolean> {
    try {
      const fromEmail =
        process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

      logger.info(
        {
          email: orderData.user.email,
          orderNumber: orderData.orderNumber,
        },
        "Sending order confirmation email"
      );

      if (!process.env.RESEND_API_KEY) {
        throw new Error("Missing required email configuration: RESEND_API_KEY");
      }

      // Send email using Resend
      const { data, error } = await this.client.emails.send({
        from: fromEmail,
        to: orderData.user.email,
        subject: `订单确认 - ${orderData.orderNumber}`,
        react: (
          <OrderConfirmationEmail
            orderNumber={orderData.orderNumber}
            userName={orderData.user.name}
            outboundFlight={orderData.outboundFlight}
            inboundFlight={orderData.inboundFlight ?? undefined}
            passengers={orderData.passengers}
            baseAmount={orderData.pricing.baseAmount}
            ancillaryAmount={orderData.pricing.ancillaryAmount}
            totalAmount={orderData.pricing.totalAmount}
            contactEmail={orderData.contact.email}
            contactPhone={orderData.contact.phone}
          />
        ),
      });

      if (error) {
        logger.error(
          { err: error, orderNumber: orderData.orderNumber },
          "Order confirmation email sending failed"
        );
        return false;
      }

      logger.info(
        {
          email: orderData.user.email,
          orderNumber: orderData.orderNumber,
          emailId: data?.id,
        },
        "Order confirmation email sent successfully"
      );
      return true;
    } catch (error: unknown) {
      logger.error(
        { err: error, orderNumber: orderData.orderNumber },
        "Error sending order confirmation email"
      );

      return false;
    }
  }
}

/**
 * Convenient function for sending email verification code
 * @param email Email address
 * @param code Verification code
 * @returns Promise<boolean> Whether sending was successful
 */
export async function sendEmailOtp(
  email: string,
  code: string
): Promise<boolean> {
  const client = ResendEmailClient.getInstance();
  return await client.sendVerificationEmail(email, code);
}

/**
 * Convenient function for sending order confirmation email
 * @param orderData Order confirmation email data
 * @returns Promise<boolean> Whether sending was successful
 */
export async function sendOrderConfirmationEmail(
  orderData: OrderConfirmationEmailData
): Promise<boolean> {
  const client = ResendEmailClient.getInstance();
  return await client.sendOrderConfirmationEmail(orderData);
}
