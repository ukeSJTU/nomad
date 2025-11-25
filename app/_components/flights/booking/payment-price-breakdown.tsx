import { Plane } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/utils/currency";

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

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Plane className="h-5 w-5" />
          费用明细
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">订单号</span>
            <span className="text-sm font-mono">{orderNumber}</span>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">机票费用</span>
            <span className="font-medium">{formatCurrency(baseAmount)}</span>
          </div>

          {parseFloat(ancillaryAmount) > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">增值服务</span>
              <span className="font-medium">
                {formatCurrency(ancillaryAmount)}
              </span>
            </div>
          )}

          <Separator />

          <div className="flex items-center justify-between text-lg font-bold">
            <span>应付金额</span>
            <span className="text-orange-500">
              {formatCurrency(totalAmount)}
            </span>
          </div>
        </div>

        {paymentMethod === "balance" && (
          <>
            <Separator />
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="text-sm text-blue-900">
                <div className="flex items-center justify-between mb-1">
                  <span>账户余额</span>
                  <span className="font-medium">
                    {formatCurrency(userBalance)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>支付后余额</span>
                  <span
                    className={`font-medium ${
                      balanceAfterPayment < 0 ? "text-red-600" : "text-blue-900"
                    }`}
                  >
                    {formatCurrency(balanceAfterPayment.toFixed(2))}
                  </span>
                </div>
              </div>
            </div>
            {balanceAfterPayment < 0 && (
              <Alert variant="destructive">
                <AlertDescription>余额不足，请充值后再支付</AlertDescription>
              </Alert>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
