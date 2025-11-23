"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import {
  PaymentCountdownTimer,
  PaymentMethodSelector,
  PaymentOrderSummary,
  PaymentPriceBreakdown,
} from "@/components/flights/booking";
import { Button } from "@/components/ui/button";
import { processPaymentAction } from "@/lib/actions/payments";
import { PaymentPageOrderDTO } from "@/types/dto";
import { formatCurrency } from "@/utils/currency";

type PaymentPageClientProps = {
  order: PaymentPageOrderDTO;
  userBalance: string;
};

export default function PaymentPageClient({
  order,
  userBalance,
}: PaymentPageClientProps) {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("balance");
  const [isProcessing, setIsProcessing] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      const result = await processPaymentAction({
        orderId: order.id,
        paymentMethod,
      });

      if (result.success) {
        toast.success(`订单 ${order.orderNumber} 已支付成功`);
        router.push(`/flights/booking/confirmation?orderId=${order.id}`);
      } else {
        toast.error(result.error);
      }
    } catch (_error) {
      toast.error("处理支付时发生错误，请重试");
    } finally {
      setIsProcessing(false);
    }
  };

  const balanceAfterPayment =
    parseFloat(userBalance) - parseFloat(order.totalAmount);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        <PaymentOrderSummary order={order} />
        <PaymentMethodSelector
          paymentMethod={paymentMethod}
          userBalance={userBalance}
          onPaymentMethodChange={setPaymentMethod}
        />

        {/* Action Buttons */}
        <div className="flex justify-between gap-4">
          <Button
            variant="outline"
            onClick={() =>
              router.push(`/flights/booking/ancillary?orderId=${order.id}`)
            }
            disabled={isProcessing}
          >
            上一步
          </Button>
          <Button
            onClick={handlePayment}
            size="lg"
            disabled={isProcessing || timeLeft === 0 || balanceAfterPayment < 0}
            className="min-w-[200px]"
          >
            {isProcessing
              ? "处理中..."
              : `确认支付 ${formatCurrency(order.totalAmount)}`}
          </Button>
        </div>
      </div>

      {/* Right Sidebar - Price Summary */}
      <div className="lg:col-span-1 flex flex-col space-y-2">
        <PaymentCountdownTimer
          paymentDeadline={order.paymentDeadline}
          onTimeLeftChange={setTimeLeft}
        />
        <PaymentPriceBreakdown
          orderNumber={order.orderNumber}
          baseAmount={order.baseAmount}
          ancillaryAmount={order.ancillaryAmount}
          totalAmount={order.totalAmount}
          paymentMethod={paymentMethod}
          userBalance={userBalance}
        />
      </div>
    </div>
  );
}
