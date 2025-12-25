/**
 * Payment Service Types
 *
 * Type definitions for the payment processing workflow.
 */

/**
 * Parameters for processing a payment
 */
export interface ProcessPaymentParams {
  orderId: string;
  paymentMethod: string;
  returnUrl?: string;
  userEmail?: string;
  userName?: string;
}

/**
 * Data returned after successful payment processing
 */
export type ProcessPaymentData = {
  paymentId: string;
  transactionId?: string;
  amount: string;
  currency?: string;
  status?: "PENDING" | "SUCCESS" | "FAILED";
  redirectUrl?: string;
  clientSecret?: string; // For client-side SDKs (e.g., Stripe)

  // Additional fields returned by balance payment
  orderId?: string;
  orderNumber?: string;
  remainingBalance?: string;
};

/**
 * Payment provider configuration (if needed in future)
 */
export interface PaymentProviderConfig {
  providerId: string;
  apiKey: string;
  webhookSecret: string;
}
