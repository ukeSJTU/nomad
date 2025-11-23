/**
 * Email Data Transformers
 *
 * Utility functions for transforming database/DTO types
 * into email-specific data structures
 */

import type {
  OrderConfirmationEmailData,
  OrderFlightEmailData,
  OrderPassengerEmailData,
  OrderUserEmailData,
} from "@/types/dto/emails";
import type { OrderDetailFull } from "@/types/dto/orders";

/**
 * Transform OrderDetailFull to OrderConfirmationEmailData
 *
 * Converts the frontend-optimized DTO structure into
 * email template-ready format
 *
 * @param orderDetail - Full order details from query layer
 * @param user - User information for email personalization
 * @returns Email-ready order data
 */
export function transformOrderDetailToEmailData(
  orderDetail: OrderDetailFull,
  user: OrderUserEmailData
): OrderConfirmationEmailData {
  return {
    orderNumber: orderDetail.status.orderNumber,
    user,
    outboundFlight: transformFlightToEmailData(orderDetail.outboundFlight),
    inboundFlight: orderDetail.inboundFlight
      ? transformFlightToEmailData(orderDetail.inboundFlight)
      : null,
    passengers: orderDetail.passengers.map(transformPassengerToEmailData),
    pricing: {
      baseAmount: orderDetail.payment.baseAmount,
      ancillaryAmount: orderDetail.payment.ancillaryAmount,
      totalAmount: orderDetail.payment.totalAmount,
    },
    contact: {
      phone: orderDetail.contact.contactPhone,
      email: orderDetail.contact.contactEmail,
    },
  };
}

/**
 * Transform flight card data to email flight data
 *
 * Extracts essential flight information needed for email display
 *
 * @param flight - Flight data from OrderFlightCardData
 * @returns Email-ready flight data
 */
function transformFlightToEmailData(
  flight: OrderDetailFull["outboundFlight"]
): OrderFlightEmailData {
  return {
    flightNumber: flight.flightNumber,
    airlineName: flight.airlineName,
    departureAirport: flight.departureAirportName,
    arrivalAirport: flight.arrivalAirportName,
    departureTime: flight.departureDatetime,
    arrivalTime: flight.arrivalDatetime,
    seatClass: getSeatClassDisplayName(flight.seatClassType),
  };
}

/**
 * Transform passenger data to email passenger data
 *
 * @param passenger - Passenger data from OrderPassengerCardData
 * @returns Email-ready passenger data
 */
function transformPassengerToEmailData(
  passenger: OrderDetailFull["passengers"][0]
): OrderPassengerEmailData {
  return {
    name: passenger.name,
    documentType: getDocumentTypeDisplayName(passenger.idType),
    documentNumber: passenger.idNumber,
  };
}

/**
 * Get display name for seat class type
 *
 * @param classType - Seat class type from database
 * @returns Human-readable seat class name
 */
function getSeatClassDisplayName(classType: string): string {
  const classMap: Record<string, string> = {
    economy: "经济舱",
    business: "商务舱",
    first: "头等舱",
  };

  return classMap[classType] || classType;
}

/**
 * Get display name for document type
 *
 * @param idType - Identity document type from database
 * @returns Human-readable document type name
 */
function getDocumentTypeDisplayName(idType: string): string {
  const typeMap: Record<string, string> = {
    id_card: "身份证",
    passport: "护照",
    other: "其他证件",
  };

  return typeMap[idType] || idType;
}
