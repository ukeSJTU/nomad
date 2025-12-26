/**
 * Email Data Transfer Objects
 *
 * Email-optimized data structures for email templates and rendering
 * Used in email services, templates, and server actions
 *
 * Key characteristics:
 * - Denormalized for email rendering efficiency
 * - Uses ISO string dates for serialization
 * - Uses string types for pricing (consistent with other DTOs)
 * - Structured for email template consumption
 */

/**
 * Flight information for email display
 */
export interface OrderFlightEmailData {
  flightNumber: string;
  airlineName?: string;
  departureAirport: string;
  arrivalAirport: string;
  departureTime: string; // ISO string
  arrivalTime: string; // ISO string
  seatClass: string;
}

/**
 * Passenger information for email display
 */
export interface OrderPassengerEmailData {
  name: string;
  documentType: string;
  documentNumber: string;
}

/**
 * Pricing information for email display
 */
export interface OrderPricingEmailData {
  baseAmount: string; // Decimal string (e.g., "1500.00")
  ancillaryAmount: string; // Decimal string (e.g., "200.00")
  totalAmount: string; // Decimal string (e.g., "1700.00")
}

/**
 * Contact information for email display
 */
export interface OrderContactEmailData {
  phone?: string;
  email?: string;
}

/**
 * User information for email personalization
 */
export interface OrderUserEmailData {
  name?: string;
  email: string;
}

/**
 * Complete order confirmation email data
 *
 * This interface defines all data needed to render
 * an order confirmation email template
 */
export interface OrderConfirmationEmailData {
  // Order metadata
  orderNumber: string;

  // User information for personalization
  user: OrderUserEmailData;

  // Flight information
  outboundFlight: OrderFlightEmailData;
  inboundFlight: OrderFlightEmailData | null;

  // Passenger list
  passengers: OrderPassengerEmailData[];

  // Pricing breakdown
  pricing: OrderPricingEmailData;

  // Contact information
  contact: OrderContactEmailData;
}
