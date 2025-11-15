"use client";

import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

import type { OrderDetailsWithAirports } from "@/app/(frontend)/(with-sidebar)/orders/[orderId]/queries";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { formatTime, getOrderStatusDisplay } from "./utils";

export type OrderStatusCardProps = {
  order: OrderDetailsWithAirports;
  onCancelOrder?: () => void;
  onGoToPayment?: () => void;
  isCancelling?: boolean;
};

/**
 * Order Status Card Component
 *
 * Displays order status with icon, order number, and action buttons.
 * Includes countdown timer for PENDING_PAYMENT status.
 */
export function OrderStatusCard({
  order,
  onCancelOrder,
  onGoToPayment,
  isCancelling = false,
}: OrderStatusCardProps) {
  const [timeLeft, setTimeLeft] = useState(0);

  // Calculate initial time left for PENDING_PAYMENT orders
  useEffect(() => {
    if (order.status === "PENDING_PAYMENT") {
      const deadline = new Date(order.paymentDeadline);
      const now = new Date();
      const secondsLeft = Math.max(
        0,
        Math.floor((deadline.getTime() - now.getTime()) / 1000)
      );
      setTimeLeft(secondsLeft);
    }
  }, [order.paymentDeadline, order.status]);

  // Countdown timer
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

  const statusDisplay = getOrderStatusDisplay(order.status);
  const StatusIcon = statusDisplay.icon;
  const isPaymentExpired = order.status === "PENDING_PAYMENT" && timeLeft === 0;

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-full ${statusDisplay.bgColor}`}>
              <StatusIcon className={`h-8 w-8 ${statusDisplay.color}`} />
            </div>
            <div>
              <h1 className={`text-2xl font-bold ${statusDisplay.color}`}>
                {statusDisplay.text}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                订单号: {order.orderNumber}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          {order.status === "PENDING_PAYMENT" && !isPaymentExpired && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={onCancelOrder}
                disabled={isCancelling}
              >
                取消订单
              </Button>
              <Button onClick={onGoToPayment}>去支付</Button>
            </div>
          )}
        </div>

        {/* Payment Countdown Timer */}
        {order.status === "PENDING_PAYMENT" && (
          <Alert className="mt-4">
            <Clock className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              {isPaymentExpired ? (
                <span className="text-red-600 font-medium">
                  订单已超时，请重新下单
                </span>
              ) : (
                <>
                  <span>请在规定时间内完成支付，超时订单将自动取消</span>
                  <span
                    className={`font-mono text-lg font-bold ${
                      timeLeft <= 60 ? "text-red-500" : "text-orange-500"
                    }`}
                  >
                    {formatTime(timeLeft)}
                  </span>
                </>
              )}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
