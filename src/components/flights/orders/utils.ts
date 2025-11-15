/**
 * Utility functions for order components
 */

import { CheckCircle2, Clock, XCircle } from "lucide-react";

import type { OrderDetailsWithAirports } from "@/app/(frontend)/(with-sidebar)/orders/[orderId]/queries";

/**
 * Format time in seconds to MM:SS format
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

/**
 * Format flight time (HH:MM)
 */
export function formatFlightTime(datetime: Date): string {
  return new Date(datetime).toLocaleTimeString("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Format flight date (YYYY/MM/DD)
 */
export function formatFlightDate(datetime: Date): string {
  return new Date(datetime).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

/**
 * Get seat class display name
 */
export function getSeatClassName(
  classType: "ECONOMY" | "BUSINESS" | "FIRST"
): string {
  const classNames = {
    ECONOMY: "经济舱",
    BUSINESS: "商务舱",
    FIRST: "头等舱",
  };
  return classNames[classType];
}

/**
 * Get identity type display name
 */
export function getIdentityTypeName(
  identityType: "passport" | "id_card" | "other"
): string {
  const typeNames = {
    passport: "护照",
    id_card: "身份证",
    other: "其他",
  };
  return typeNames[identityType];
}

/**
 * Order status configuration
 */
export type OrderStatusConfig = {
  text: string;
  icon: typeof Clock;
  color: string;
  bgColor: string;
};

/**
 * Get order status display configuration
 */
export function getOrderStatusDisplay(
  status: OrderDetailsWithAirports["status"]
): OrderStatusConfig {
  const statusConfig: Record<
    OrderDetailsWithAirports["status"],
    OrderStatusConfig
  > = {
    PENDING_PAYMENT: {
      text: "待支付",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    CONFIRMED: {
      text: "已确认",
      icon: CheckCircle2,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    CANCELLED: {
      text: "已取消",
      icon: XCircle,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
    },
    REFUNDED: {
      text: "已退款",
      icon: CheckCircle2,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
  };
  return statusConfig[status];
}
