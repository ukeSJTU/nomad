import { Plane } from "lucide-react";
import { Alert, AlertDescription } from "../../primitives/alert";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../primitives/card";
import { Separator } from "../../primitives/separator";

export interface PaymentPriceBreakdownProps {
  /**
   * Order number
   */
  orderNumber: string;

  /**
   * Base ticket amount (pre-formatted currency string)
   */
  baseAmount: string;

  /**
   * Ancillary services amount (pre-formatted currency string)
   */
  ancillaryAmount: string;

  /**
   * Whether to show ancillary amount (ancillaryAmount > 0)
   */
  showAncillary: boolean;

  /**
   * Total amount to pay (pre-formatted currency string)
   */
  totalAmount: string;

  /**
   * Payment method selected
   */
  paymentMethod: string;

  /**
   * User's current balance (pre-formatted currency string)
   * Only displayed when paymentMethod is "balance"
   */
  userBalance: string;

  /**
   * Balance after payment (pre-formatted currency string)
   * Only displayed when paymentMethod is "balance"
   */
  balanceAfterPayment: string;

  /**
   * Whether the balance is insufficient
   */
  isBalanceInsufficient: boolean;
}

export function PaymentPriceBreakdown({
  orderNumber,
  baseAmount,
  ancillaryAmount,
  showAncillary,
  totalAmount,
  paymentMethod,
  userBalance,
  balanceAfterPayment,
  isBalanceInsufficient,
}: PaymentPriceBreakdownProps) {
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
            <span className="font-medium">{baseAmount}</span>
          </div>

          {showAncillary && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">增值服务</span>
              <span className="font-medium">{ancillaryAmount}</span>
            </div>
          )}

          <Separator />

          <div className="flex items-center justify-between text-lg font-bold">
            <span>应付金额</span>
            <span className="text-orange-500">{totalAmount}</span>
          </div>
        </div>

        {paymentMethod === "balance" && (
          <>
            <Separator />
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="text-sm text-blue-900">
                <div className="flex items-center justify-between mb-1">
                  <span>账户余额</span>
                  <span className="font-medium">{userBalance}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>支付后余额</span>
                  <span
                    className={`font-medium ${
                      isBalanceInsufficient ? "text-red-600" : "text-blue-900"
                    }`}
                  >
                    {balanceAfterPayment}
                  </span>
                </div>
              </div>
            </div>
            {isBalanceInsufficient && (
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
