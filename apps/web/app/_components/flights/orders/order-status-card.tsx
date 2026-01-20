"use client";

import {
  OrderStatusCard as OrderStatusCardUI,
  type OrderStatusCardProps as OrderStatusCardUIProps,
} from "@ukesjtu/nomad-ui/components/flights/orders";
import { useEffect, useState } from "react";
import type { OrderStatusCardData } from "@/types/dto";

export type OrderStatusCardProps = {
  data: OrderStatusCardData;
  onGoToPayment?: () => void;
  onCancelOrder?: () => void;
  onResendConfirmation?: () => void;
  onRequestRefund?: () => void;
  isLoading?: boolean;
  canRefund?: boolean;
};

/**
 * Order Status Card Container Component
 *
 * Container that manages countdown timer side effects and passes controlled state to UI component.
 * Handles:
 * - Real-time countdown timer calculation (useEffect + setInterval)
 * - Time left state management
 * - All callbacks from parent (navigation, actions)
 */
export function OrderStatusCard({
  data,
  onGoToPayment,
  onCancelOrder,
  onResendConfirmation,
  onRequestRefund,
  isLoading = false,
  canRefund = true,
}: OrderStatusCardProps) {
  const [timeLeft, setTimeLeft] = useState(0);

  // Calculate initial time left for PENDING_PAYMENT orders
  useEffect(() => {
    if (data.status === "PENDING_PAYMENT") {
      const deadline = new Date(data.paymentDeadline);
      const now = new Date();
      const secondsLeft = Math.max(
        0,
        Math.floor((deadline.getTime() - now.getTime()) / 1000)
      );
      setTimeLeft(secondsLeft);
    }
  }, [data.paymentDeadline, data.status]);

  // Countdown timer - updates every second
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Map container data to UI props
  const uiData: OrderStatusCardUIProps["data"] = {
    id: data.id,
    orderNumber: data.orderNumber,
    status: data.status,
    paymentDeadline: data.paymentDeadline,
    createdAt: data.createdAt,
    cancellationReason: data.cancellationReason,
  };

  return (
    <OrderStatusCardUI
      data={uiData}
      timeLeft={timeLeft}
      onGoToPayment={onGoToPayment}
      onCancelOrder={onCancelOrder}
      onResendConfirmation={onResendConfirmation}
      onRequestRefund={onRequestRefund}
      isLoading={isLoading}
      canRefund={canRefund}
    />
  );
}
