import { Resend } from "resend";

import { OtpEmailTemplate } from "@/components/emails";

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
      console.warn(
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

      console.log(
        `Resend Email config: fromEmail=${fromEmail}, toEmail=${emailAddr}`
      );

      console.log(
        `Sending verification email to ${emailAddr} with code ${code}`
      );

      // Check if email sending is disabled (for testing environments)
      const enableResend = process.env.ENABLE_RESEND !== "false";

      if (!enableResend) {
        console.log(
          `[SIMULATED] Email would be sent to ${emailAddr} with OTP: ${code}`
        );
        console.log("ENABLE_RESEND is false - skipping actual email sending");
        return true;
      }

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
        console.error("Email sending failed:", error);
        return false;
      }

      console.log(
        `Email sent successfully to ${emailAddr}, Email ID: ${data?.id}`
      );
      return true;
    } catch (error: unknown) {
      console.error("Error sending email:", error);

      if (error instanceof Error && error.message) {
        console.error("Error message:", error.message);
      }

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
