import { Separator } from "../../primitives/separator";

export interface ConfirmationPaymentSummaryPayment {
  id: string;
  amount: string;
  method: string;
  status: "PENDING" | "SUCCESS" | "FAILED";
  transactionId: string | null;
  createdAt: Date;
}

export interface ConfirmationPaymentSummaryProps {
  baseAmount: string;
  ancillaryAmount: string;
  totalAmount: string;
  payment: ConfirmationPaymentSummaryPayment | null;
  /** Formatted payment time string, e.g., "2024-01-18 14:30:00" */
  formattedPaymentTime?: string;
}

export function ConfirmationPaymentSummary({
  baseAmount,
  ancillaryAmount,
  totalAmount,
  payment,
  formattedPaymentTime,
}: ConfirmationPaymentSummaryProps) {
  const showAncillary = ancillaryAmount && parseFloat(ancillaryAmount) > 0;

  return (
    <div>
      <div className="text-sm text-gray-500 mb-2">费用明细</div>
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">机票费用</span>
          <span>¥{baseAmount}</span>
        </div>
        {showAncillary && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">增值服务</span>
            <span>¥{ancillaryAmount}</span>
          </div>
        )}
        <Separator />
        <div className="flex items-center justify-between font-bold text-lg">
          <span>实付金额</span>
          <span className="text-orange-500">¥{totalAmount}</span>
        </div>
        {payment && formattedPaymentTime && (
          <div className="text-xs text-gray-500">
            支付时间：{formattedPaymentTime}
          </div>
        )}
      </div>
    </div>
  );
}
