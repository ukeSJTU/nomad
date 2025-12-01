import "server-only";

import Credential from "@alicloud/credentials";
import Dypnsapi20170525, * as $Dypnsapi20170525 from "@alicloud/dypnsapi20170525";
import * as $OpenApi from "@alicloud/openapi-client";
import * as $Util from "@alicloud/tea-util";

import { phoneNumberSchema } from "@/types/validations";

/**
 * Aliyun SMS service client class
 * Uses singleton pattern and default credential chain for secure and convenient authentication
 */
class AliyunSmsClient {
  private static instance: AliyunSmsClient;
  private client: Dypnsapi20170525;

  private constructor() {
    // Initialize with default credential chain, which is the most secure and convenient approach
    // It automatically reads credentials from secure locations like environment variables, config files, etc.
    const credential = new Credential();

    const config = new $OpenApi.Config({
      credential,
    });

    // Set the correct endpoint according to official documentation
    config.endpoint = "dypnsapi.aliyuncs.com";

    this.client = new Dypnsapi20170525(config);
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): AliyunSmsClient {
    if (!AliyunSmsClient.instance) {
      AliyunSmsClient.instance = new AliyunSmsClient();
    }
    return AliyunSmsClient.instance;
  }

  /**
   * Validate phone number format (11 digits, no country prefix)
   * @param phoneNumber Original phone number input
   * @returns Normalized phone number
   */
  private normalizePhoneNumber(phoneNumber: string): string {
    const parsed = phoneNumberSchema.safeParse(phoneNumber);

    if (!parsed.success) {
      throw new Error(
        "Invalid phone number format. Expect 11-digit number without country code."
      );
    }

    return parsed.data;
  }

  /**
   * Send SMS verification code
   * @param phoneNumber Phone number
   * @param code Verification code
   * @returns Promise<boolean> Whether sending was successful
   */
  public async sendSms(phoneNumber: string, code: string): Promise<boolean> {
    try {
      const signName = process.env.ALIBABA_CLOUD_SMS_SIGN_NAME;
      const templateCode = process.env.ALIBABA_CLOUD_SMS_TEMPLATE_CODE;

      console.log(
        `Aliyun SMS config: signName=${signName}, templateCode=${templateCode}`
      );

      // Validate phone number before sending
      const normalizedPhoneNumber = this.normalizePhoneNumber(phoneNumber);
      console.log(
        `Sending SMS to ${normalizedPhoneNumber} (original: ${phoneNumber}) with code ${code}`
      );

      if (!signName || !templateCode) {
        throw new Error(
          "Missing required SMS configuration: ALIBABA_CLOUD_SMS_SIGN_NAME or ALIBABA_CLOUD_SMS_TEMPLATE_CODE"
        );
      }

      // Construct request according to official example code
      const sendSmsVerifyCodeRequest =
        new $Dypnsapi20170525.SendSmsVerifyCodeRequest({
          phoneNumber: normalizedPhoneNumber,
          signName,
          templateCode,
          templateParam: JSON.stringify({ code, min: "5" }),
          countryCode: "86", // Explicitly specify country code as 86 (China)
        });

      const runtime = new $Util.RuntimeOptions({});

      // Use official example API calling method
      const response = await this.client.sendSmsVerifyCodeWithOptions(
        sendSmsVerifyCodeRequest,
        runtime
      );

      // Check response status
      if (response.body?.code === "OK") {
        console.log(
          `SMS sent successfully to ${phoneNumber}, RequestId: ${response.body.requestId}`
        );
        return true;
      } else {
        console.error(
          `SMS sending failed: ${response.body?.message}, Code: ${response.body?.code}`
        );
        return false;
      }
    } catch (error: unknown) {
      console.error("Error sending SMS:", error);

      // Handle error information according to official example
      if (error instanceof Error && error.message) {
        console.error("Error message:", error.message);
      }
      if (error && typeof error === "object" && "data" in error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const errorData = error.data as any;
        if (errorData && errorData["Recommend"]) {
          console.error("Diagnostic URL:", errorData["Recommend"]);
        }
      }

      return false;
    }
  }
}

/**
 * Convenient function for sending SMS verification code
 * @param phoneNumber Phone number
 * @param code Verification code
 * @returns Promise<boolean> Whether sending was successful
 */
export async function sendSmsOtp(
  phoneNumber: string,
  code: string
): Promise<boolean> {
  const client = AliyunSmsClient.getInstance();
  return await client.sendSms(phoneNumber, code);
}
