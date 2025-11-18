"use client";

import { AlertCircle, CheckCircle, Clock, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { OrderStatusCardData } from "@/types/dto/orders";

export type OrderStatusCardProps = {
  data: OrderStatusCardData;
  onGoToPayment?: () => void;
  onResendConfirmation?: () => void;
  isLoading?: boolean;
};

/**
 * Order Status Card Component
 *
 * Displays order status with visual indicators, order information, and action buttons.
 * Features:
 * - Status-specific color themes and icons
 * - Real-time countdown timer for pending payments
 * - Cancellation reason display for cancelled orders
 * - Context-aware action buttons based on order status
 *
 * @example
 * ```tsx
 * <OrderStatusCard
 *   data={orderStatusData}
 *   onGoToPayment={() => router.push('/payment')}
 *   onResendConfirmation={() => resendEmail()}
 * />
 * ```
 */
export function OrderStatusCard({
  data,
  onGoToPayment,
  onResendConfirmation,
  isLoading = false,
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

  // Format time as MM:SS
  const formatCountdown = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Get status-specific styling and content
  const getStatusConfig = () => {
    switch (data.status) {
      case "PENDING_PAYMENT":
        return {
          title: "待支付",
          icon: Clock,
          titleColor: "text-orange-600",
          bgColor: "bg-orange-50",
          iconColor: "text-orange-600",
        };
      case "CONFIRMED":
        return {
          title: "已确认",
          icon: CheckCircle,
          titleColor: "text-green-600",
          bgColor: "bg-green-50",
          iconColor: "text-green-600",
        };
      case "CANCELLED":
        return {
          title: "已取消",
          icon: XCircle,
          titleColor: "text-gray-600",
          bgColor: "bg-gray-50",
          iconColor: "text-gray-600",
        };
      case "REFUNDED":
        return {
          title: "已退款",
          icon: CheckCircle,
          titleColor: "text-blue-600",
          bgColor: "bg-blue-50",
          iconColor: "text-blue-600",
        };
      default:
        return {
          title: data.status,
          icon: AlertCircle,
          titleColor: "text-gray-600",
          bgColor: "bg-gray-50",
          iconColor: "text-gray-600",
        };
    }
  };

  const statusConfig = getStatusConfig();
  const StatusIcon = statusConfig.icon;
  const isPaymentExpired = data.status === "PENDING_PAYMENT" && timeLeft === 0;

  return (
    <Card>
      <CardContent className="pt-6">
        {/* Header: Status icon, title, and order number */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-full ${statusConfig.bgColor}`}>
              <StatusIcon className={`h-8 w-8 ${statusConfig.iconColor}`} />
            </div>
            <div>
              <h1 className={`text-2xl font-bold ${statusConfig.titleColor}`}>
                {statusConfig.title}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                订单号: {data.orderNumber}
              </p>
            </div>
          </div>

          {/* Action Button - Only for PENDING_PAYMENT and CONFIRMED */}
          {data.status === "PENDING_PAYMENT" && !isPaymentExpired && (
            <Button onClick={onGoToPayment} disabled={isLoading}>
              去付款
            </Button>
          )}
          {data.status === "CONFIRMED" && (
            <Button
              variant="outline"
              onClick={onResendConfirmation}
              disabled={isLoading}
            >
              重发确认信息
            </Button>
          )}
        </div>

        {/* Status-specific content */}
        <div className="space-y-3">
          {/* PENDING_PAYMENT: Countdown timer and warning */}
          {data.status === "PENDING_PAYMENT" && (
            <Alert
              className={
                isPaymentExpired ? "border-red-200" : "border-orange-200"
              }
            >
              <Clock className="h-4 w-4" />
              <AlertDescription>
                {isPaymentExpired ? (
                  <span className="text-red-600 font-medium">
                    支付时间已过期，订单将自动取消
                  </span>
                ) : (
                  <div className="flex items-center justify-between">
                    <span className="text-sm">
                      请在最晚支付时间前完成支付，超时订单将自动取消
                    </span>
                    <span
                      className={`font-mono text-lg font-bold ml-4 ${
                        timeLeft <= 60 ? "text-red-500" : "text-orange-500"
                      }`}
                    >
                      {formatCountdown(timeLeft)}
                    </span>
                  </div>
                )}
              </AlertDescription>
            </Alert>
          )}

          {/* CONFIRMED: Success message */}
          {data.status === "CONFIRMED" && (
            <Alert className="border-green-200 bg-green-50/50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                订单预订成功，确认信息已发送至您的邮箱
              </AlertDescription>
            </Alert>
          )}

          {/* CANCELLED: Cancellation reason */}
          {data.status === "CANCELLED" && (
            <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4">
              <div className="flex items-start gap-2">
                <span className="text-sm font-medium text-gray-700">
                  取消原因：
                </span>
                <span className="text-sm text-gray-600">
                  {data.cancellationReason || "用户主动取消"}
                </span>
              </div>
            </div>
          )}

          {/* REFUNDED: Refund completion message */}
          {data.status === "REFUNDED" && (
            <Alert className="border-blue-200 bg-blue-50/50">
              <CheckCircle className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                退款已完成，预计 1-7 个工作日到账，请注意查收
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
