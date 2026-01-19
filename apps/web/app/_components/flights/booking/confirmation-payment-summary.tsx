import {
  ConfirmationPaymentSummary as ConfirmationPaymentSummaryUI,
  type ConfirmationPaymentSummaryProps as ConfirmationPaymentSummaryUIProps,
} from "@nomad/ui/components/flights/booking/confirmation-payment-summary";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { formatCurrencyWithoutSymbol } from "@/lib/format";

interface ConfirmationPaymentSummaryProps {
  baseAmount: string;
  ancillaryAmount: string;
  totalAmount: string;
  payment: {
    id: string;
    amount: string;
    method: string;
    status: "PENDING" | "SUCCESS" | "FAILED";
    transactionId: string | null;
    createdAt: Date;
  } | null;
}

export function ConfirmationPaymentSummary({
  baseAmount,
  ancillaryAmount,
  totalAmount,
  payment,
}: ConfirmationPaymentSummaryProps) {
  const formattedBaseAmount = formatCurrencyWithoutSymbol(baseAmount);
  const formattedAncillaryAmount = formatCurrencyWithoutSymbol(ancillaryAmount);
  const formattedTotalAmount = formatCurrencyWithoutSymbol(totalAmount);

  const formattedPaymentTime = payment
    ? format(payment.createdAt, "yyyy-MM-dd HH:mm:ss", { locale: zhCN })
    : undefined;

  const uiPayment: ConfirmationPaymentSummaryUIProps["payment"] = payment
    ? {
        id: payment.id,
        amount: payment.amount,
        method: payment.method,
        status: payment.status,
        transactionId: payment.transactionId,
        createdAt: payment.createdAt,
      }
    : null;

  return (
    <ConfirmationPaymentSummaryUI
      baseAmount={formattedBaseAmount}
      ancillaryAmount={formattedAncillaryAmount}
      totalAmount={formattedTotalAmount}
      payment={uiPayment}
      formattedPaymentTime={formattedPaymentTime}
    />
  );
}
