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

  /**
   * Get HTML template for verification email
   * @param code Verification code
   * @returns HTML string
   */
  private getVerificationEmailTemplate(code: string): string {
    return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>验证您的邮箱</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px 40px; text-align: center;">
              <h1 style="margin: 0; font-size: 28px; font-weight: bold; color: #111827;">Nomad</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 20px 40px;">
              <h2 style="margin: 0 0 20px 0; font-size: 24px; font-weight: 600; color: #111827;">验证您的邮箱</h2>
              <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 24px; color: #4b5563;">
                感谢您注册 Nomad！请使用以下验证码完成注册：
              </p>
              
              <!-- Verification Code -->
              <div style="background-color: #f9fafb; border: 2px solid #e5e7eb; border-radius: 8px; padding: 24px; text-align: center; margin: 30px 0;">
                <div style="font-size: 14px; color: #6b7280; margin-bottom: 8px;">您的验证码</div>
                <div style="font-size: 36px; font-weight: bold; color: #2563eb; letter-spacing: 8px; font-family: 'Courier New', monospace;">
                  ${code}
                </div>
              </div>
              
              <p style="margin: 20px 0 0 0; font-size: 14px; line-height: 20px; color: #6b7280;">
                此验证码将在 <strong>5 分钟</strong>后失效。如果您没有请求此验证码，请忽略此邮件。
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 20px 40px 40px 40px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; font-size: 12px; line-height: 18px; color: #9ca3af; text-align: center;">
                此邮件由 Nomad 自动发送，请勿回复。<br>
                © ${new Date().getFullYear()} Nomad. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();
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
