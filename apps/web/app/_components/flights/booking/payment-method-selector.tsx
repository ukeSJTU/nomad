"use client";

import { PaymentMethodSelector as PaymentMethodSelectorUI } from "@ukesjtu/nomad-ui/components/flights/booking";
import { formatCurrency } from "@/lib/format";

interface PaymentMethodSelectorProps {
  paymentMethod: string;
  userBalance: string;
  onPaymentMethodChange: (method: string) => void;
}

export function PaymentMethodSelector({
  paymentMethod,
  userBalance,
  onPaymentMethodChange,
}: PaymentMethodSelectorProps) {
  // Format the user balance for display
  const formattedBalance = formatCurrency(userBalance);

  return (
    <PaymentMethodSelectorUI
      paymentMethod={paymentMethod}
      userBalance={formattedBalance}
      onPaymentMethodChange={onPaymentMethodChange}
    />
  );
}
