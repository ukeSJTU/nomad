"use client";

import { CheckCircle2, Clock, Mail, Phone, Plane, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cancelOrderAction } from "@/lib/actions/orders";
import { getAncillaryServiceByCode } from "@/lib/schema/ancillary";
import { formatCurrency } from "@/lib/utils/currency";

import type { OrderDetailsWithAirports } from "./queries";

type OrderDetailsPageClientProps = {
  order: OrderDetailsWithAirports;
};

/**
 * Order Details Page - Client Component
 *
 * Displays order information with left-right layout:
 * - Left: Order status, flight info, passenger info, contact info
 * - Right: Payment details (sticky)
 *
 * Features:
 * - Payment countdown timer for PENDING_PAYMENT status
 * - Action buttons based on order status
 * - Cancel order functionality
 */
export default function OrderDetailsPageClient({
  order,
}: OrderDetailsPageClientProps) {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(0);
  const [isCancelling, setIsCancelling] = useState(false);

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

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Format flight datetime
  const formatFlightTime = (datetime: Date) => {
    return new Date(datetime).toLocaleTimeString("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatFlightDate = (datetime: Date) => {
    return new Date(datetime).toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  // Get seat class display name
  const getSeatClassName = (classType: "ECONOMY" | "BUSINESS" | "FIRST") => {
    const classNames = {
      ECONOMY: "经济舱",
      BUSINESS: "商务舱",
      FIRST: "头等舱",
    };
    return classNames[classType];
  };

  // Get identity type display name
  const getIdentityTypeName = (
    identityType: "passport" | "id_card" | "other"
  ) => {
    const typeNames = {
      passport: "护照",
      id_card: "身份证",
      other: "其他",
    };
    return typeNames[identityType];
  };

  // Get order status display
  const getOrderStatusDisplay = () => {
    const statusConfig = {
      PENDING_PAYMENT: {
        text: "待支付",
        icon: Clock,
        color: "text-orange-600",
        bgColor: "bg-orange-50",
      },
      CONFIRMED: {
        text: "已确认",
        icon: CheckCircle2,
        color: "text-green-600",
        bgColor: "bg-green-50",
      },
      CANCELLED: {
        text: "已取消",
        icon: XCircle,
        color: "text-gray-600",
        bgColor: "bg-gray-50",
      },
      REFUNDED: {
        text: "已退款",
        icon: CheckCircle2,
        color: "text-blue-600",
        bgColor: "bg-blue-50",
      },
    };
    return statusConfig[order.status];
  };

  // Handle cancel order
  const handleCancelOrder = async () => {
    if (!confirm("确定要取消此订单吗？取消后将释放座位，订单无法恢复。")) {
      return;
    }

    setIsCancelling(true);

    try {
      const result = await cancelOrderAction(order.id);

      if (result.success) {
        toast.success("订单已成功取消");
        // Refresh the page to show updated order status
        router.refresh();
      } else {
        toast.error(result.error);
      }
    } catch (_error) {
      toast.error("取消订单时发生错误，请重试");
    } finally {
      setIsCancelling(false);
    }
  };

  // Handle go to payment
  const handleGoToPayment = () => {
    router.push(`/flights/booking/payment?orderId=${order.id}`);
  };

  // Get ancillary services details
  const ancillaryServices = (order.ancillaryDetails || [])
    .map(code => getAncillaryServiceByCode(code))
    .filter(Boolean);

  const statusDisplay = getOrderStatusDisplay();
  const StatusIcon = statusDisplay.icon;
  const isPaymentExpired = order.status === "PENDING_PAYMENT" && timeLeft === 0;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Status Card */}
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
                      onClick={handleCancelOrder}
                      disabled={isCancelling}
                    >
                      取消订单
                    </Button>
                    <Button onClick={handleGoToPayment}>去支付</Button>
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

          {/* Flight Information Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plane className="h-5 w-5" />
                航班信息
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Outbound Flight */}
              <div>
                <div className="text-sm text-gray-500 mb-3">去程航班</div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-lg">
                      {order.outboundFlight.flightNumber}
                    </div>
                    <div className="text-sm text-gray-600">
                      {order.outboundFlight.airline.name}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-500">出发</div>
                      <div className="font-medium">
                        {order.outboundFlight.departureAirport.name} (
                        {order.outboundFlight.departureAirport.iataCode})
                      </div>
                      <div className="text-gray-600">
                        {formatFlightDate(
                          order.outboundFlight.departureDatetime
                        )}{" "}
                        {formatFlightTime(
                          order.outboundFlight.departureDatetime
                        )}
                      </div>
                      {order.outboundFlight.departureTerminal && (
                        <div className="text-gray-500">
                          {order.outboundFlight.departureTerminal}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="text-gray-500">到达</div>
                      <div className="font-medium">
                        {order.outboundFlight.arrivalAirport.name} (
                        {order.outboundFlight.arrivalAirport.iataCode})
                      </div>
                      <div className="text-gray-600">
                        {formatFlightDate(order.outboundFlight.arrivalDatetime)}{" "}
                        {formatFlightTime(order.outboundFlight.arrivalDatetime)}
                      </div>
                      {order.outboundFlight.arrivalTerminal && (
                        <div className="text-gray-500">
                          {order.outboundFlight.arrivalTerminal}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    座位等级:{" "}
                    {getSeatClassName(order.outboundFlight.seatClass.classType)}
                  </div>
                </div>
              </div>

              {/* Inbound Flight (if exists) */}
              {order.inboundFlight && (
                <>
                  <Separator />
                  <div>
                    <div className="text-sm text-gray-500 mb-3">返程航班</div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-lg">
                          {order.inboundFlight.flightNumber}
                        </div>
                        <div className="text-sm text-gray-600">
                          {order.inboundFlight.airline.name}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-500">出发</div>
                          <div className="font-medium">
                            {order.inboundFlight.departureAirport.name} (
                            {order.inboundFlight.departureAirport.iataCode})
                          </div>
                          <div className="text-gray-600">
                            {formatFlightDate(
                              order.inboundFlight.departureDatetime
                            )}{" "}
                            {formatFlightTime(
                              order.inboundFlight.departureDatetime
                            )}
                          </div>
                          {order.inboundFlight.departureTerminal && (
                            <div className="text-gray-500">
                              {order.inboundFlight.departureTerminal}
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="text-gray-500">到达</div>
                          <div className="font-medium">
                            {order.inboundFlight.arrivalAirport.name} (
                            {order.inboundFlight.arrivalAirport.iataCode})
                          </div>
                          <div className="text-gray-600">
                            {formatFlightDate(
                              order.inboundFlight.arrivalDatetime
                            )}{" "}
                            {formatFlightTime(
                              order.inboundFlight.arrivalDatetime
                            )}
                          </div>
                          {order.inboundFlight.arrivalTerminal && (
                            <div className="text-gray-500">
                              {order.inboundFlight.arrivalTerminal}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        座位等级:{" "}
                        {getSeatClassName(
                          order.inboundFlight.seatClass.classType
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Passenger Information Card */}
          <Card>
            <CardHeader>
              <CardTitle>乘机人信息</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {order.passengers.map((passenger, idx) => (
                  <div
                    key={passenger.id}
                    className="flex items-start justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="space-y-1">
                      <div className="font-medium">
                        乘客 {idx + 1}: {passenger.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {getIdentityTypeName(passenger.identityType)}:{" "}
                        {passenger.identityNumber}
                      </div>
                      {passenger.phone && (
                        <div className="text-sm text-gray-600">
                          手机号: {passenger.phone}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact Information Card */}
          <Card>
            <CardHeader>
              <CardTitle>联系人信息</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {order.contactPhone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>{order.contactPhone}</span>
                  </div>
                )}
                {order.contactEmail && (
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span>{order.contactEmail}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Payment Details (Sticky) */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>订单支付明细</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">订单号</span>
                  <span className="font-mono text-xs">{order.orderNumber}</span>
                </div>

                <Separator />

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">机票费用</span>
                  <span>{formatCurrency(order.baseAmount)}</span>
                </div>

                {parseFloat(order.ancillaryAmount) > 0 && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">增值服务费用</span>
                      <span>{formatCurrency(order.ancillaryAmount)}</span>
                    </div>

                    {/* Ancillary Services Details */}
                    {ancillaryServices.length > 0 && (
                      <div className="pl-4 space-y-1">
                        {ancillaryServices.map((service, idx) => (
                          <div
                            key={idx}
                            className="flex justify-between text-xs text-gray-500"
                          >
                            <span>• {service!.name}</span>
                            <span>¥{service!.price}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}

                <Separator />

                <div className="flex justify-between items-center pt-2">
                  <span className="font-medium">总金额</span>
                  <span className="text-2xl font-bold text-orange-600">
                    {formatCurrency(order.totalAmount)}
                  </span>
                </div>
              </div>

              {/* Order Metadata */}
              <Separator />
              <div className="space-y-1 text-xs text-gray-500">
                <div className="flex justify-between">
                  <span>创建时间</span>
                  <span>
                    {new Date(order.createdAt).toLocaleString("zh-CN")}
                  </span>
                </div>
                {order.status === "PENDING_PAYMENT" && (
                  <div className="flex justify-between">
                    <span>支付截止</span>
                    <span>
                      {new Date(order.paymentDeadline).toLocaleString("zh-CN")}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
