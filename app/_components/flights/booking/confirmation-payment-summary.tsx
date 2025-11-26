import { format } from "date-fns";
import { zhCN } from "date-fns/locale";

import { Separator } from "@/components/ui/separator";
import {
  formatCurrencyWithoutSymbol,
  getCurrencyValue,
  parseCurrency,
} from "@/lib/format/currency";

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
  return (
    <div>
      <div className="text-sm text-gray-500 mb-2">费用明细</div>
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">机票费用</span>
          <span>¥{formatCurrencyWithoutSymbol(baseAmount)}</span>
        </div>
        {getCurrencyValue(parseCurrency(ancillaryAmount)) > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">增值服务</span>
            <span>¥{formatCurrencyWithoutSymbol(ancillaryAmount)}</span>
          </div>
        )}
        <Separator />
        <div className="flex items-center justify-between font-bold text-lg">
          <span>实付金额</span>
          <span className="text-orange-500">
            ¥{formatCurrencyWithoutSymbol(totalAmount)}
          </span>
        </div>
        {payment && (
          <div className="text-xs text-gray-500">
            支付时间：
            {format(payment.createdAt, "yyyy-MM-dd HH:mm:ss", {
              locale: zhCN,
            })}
          </div>
        )}
      </div>
    </div>
  );
}
