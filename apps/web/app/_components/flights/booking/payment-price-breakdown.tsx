import { PaymentPriceBreakdown as PaymentPriceBreakdownUI } from "@ukesjtu/nomad-ui/components/flights/booking";
import { formatCurrency } from "@/lib/format";

interface PaymentPriceBreakdownProps {
  orderNumber: string;
  baseAmount: string;
  ancillaryAmount: string;
  totalAmount: string;
  paymentMethod: string;
  userBalance: string;
}

export function PaymentPriceBreakdown({
  orderNumber,
  baseAmount,
  ancillaryAmount,
  totalAmount,
  paymentMethod,
  userBalance,
}: PaymentPriceBreakdownProps) {
  const balanceAfterPayment = parseFloat(userBalance) - parseFloat(totalAmount);
  const isBalanceInsufficient = balanceAfterPayment < 0;
  const showAncillary = parseFloat(ancillaryAmount) > 0;

  return (
    <PaymentPriceBreakdownUI
      orderNumber={orderNumber}
      baseAmount={formatCurrency(baseAmount)}
      ancillaryAmount={formatCurrency(ancillaryAmount)}
      showAncillary={showAncillary}
      totalAmount={formatCurrency(totalAmount)}
      paymentMethod={paymentMethod}
      userBalance={formatCurrency(userBalance)}
      balanceAfterPayment={formatCurrency(balanceAfterPayment.toFixed(2))}
      isBalanceInsufficient={isBalanceInsufficient}
    />
  );
}
