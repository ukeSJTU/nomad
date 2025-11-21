"use client";

import { Clock, CreditCard, Plane, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { processPaymentAction } from "@/lib/actions/payments";
import { getAncillaryServiceByCode } from "@/lib/schema/ancillary";
import { formatCurrency } from "@/utils/currency";

import type { OrderWithDetails } from "./queries";

type PaymentPageClientProps = {
  order: OrderWithDetails;
  userBalance: string;
};

export default function PaymentPageClient({
  order,
  userBalance,
}: PaymentPageClientProps) {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("balance");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculate initial time left
  useEffect(() => {
    const deadline = new Date(order.paymentDeadline);
    const now = new Date();
    const secondsLeft = Math.max(
      0,
      Math.floor((deadline.getTime() - now.getTime()) / 1000)
    );
    setTimeLeft(secondsLeft);
  }, [order.paymentDeadline]);

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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

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

  // Get ancillary services details
  const ancillaryServices = (order.ancillaryDetails || [])
    .map(code => getAncillaryServiceByCode(code))
    .filter(Boolean);

  const balanceAfterPayment =
    parseFloat(userBalance) - parseFloat(order.totalAmount);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        {/* Countdown Timer */}
        <Alert>
          <Clock className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>请在规定时间内完成支付，超时订单将自动取消</span>
            <span
              className={`font-mono text-lg font-bold ${
                timeLeft <= 60 ? "text-red-500" : "text-orange-500"
              }`}
            >
              {formatTime(timeLeft)}
            </span>
          </AlertDescription>
        </Alert>

        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">订单信息</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Outbound Flight Info */}
            <div>
              <div className="text-sm text-gray-500 mb-2">去程航班</div>
              <div className="space-y-1">
                <div className="font-medium">
                  {order.outboundFlight.flightNumber}{" "}
                  {order.outboundFlight.airline.name}
                </div>
                <div className="text-sm text-gray-600">
                  {formatFlightDate(order.outboundFlight.departureDatetime)}{" "}
                  {formatFlightTime(order.outboundFlight.departureDatetime)}{" "}
                  {order.outboundFlight.departureAirport.name} →{" "}
                  {formatFlightTime(order.outboundFlight.arrivalDatetime)}{" "}
                  {order.outboundFlight.arrivalAirport.name}
                </div>
              </div>
            </div>

            {/* Inbound Flight Info (if exists) */}
            {order.inboundFlight && (
              <>
                <Separator />
                <div>
                  <div className="text-sm text-gray-500 mb-2">返程航班</div>
                  <div className="space-y-1">
                    <div className="font-medium">
                      {order.inboundFlight.flightNumber}{" "}
                      {order.inboundFlight.airline.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {formatFlightDate(order.inboundFlight.departureDatetime)}{" "}
                      {formatFlightTime(order.inboundFlight.departureDatetime)}{" "}
                      {order.inboundFlight.departureAirport.name} →{" "}
                      {formatFlightTime(order.inboundFlight.arrivalDatetime)}{" "}
                      {order.inboundFlight.arrivalAirport.name}
                    </div>
                  </div>
                </div>
              </>
            )}

            <Separator />

            {/* Passengers */}
            <div>
              <div className="text-sm text-gray-500 mb-2">乘机人</div>
              {order.passengers.map((passenger, idx) => (
                <div key={idx} className="text-sm">
                  {passenger.name} ({passenger.identityNumber})
                </div>
              ))}
            </div>

            <Separator />

            {/* Contact */}
            <div>
              <div className="text-sm text-gray-500 mb-2">联系人</div>
              <div className="text-sm space-y-1">
                {order.contactPhone && <div>{order.contactPhone}</div>}
                {order.contactEmail && <div>{order.contactEmail}</div>}
              </div>
            </div>

            {/* Ancillary Services */}
            {ancillaryServices.length > 0 && (
              <>
                <Separator />
                <div>
                  <div className="text-sm text-gray-500 mb-2">增值服务</div>
                  <div className="space-y-1">
                    {ancillaryServices.map((service, idx) => (
                      <div
                        key={idx}
                        className="text-sm flex items-center justify-between"
                      >
                        <span>{service!.name}</span>
                        <span>¥{service!.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">支付方式</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="balance" id="balance" />
                <Label
                  htmlFor="balance"
                  className="flex-1 cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <Wallet className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium">平台余额</div>
                      <div className="text-sm text-gray-500">
                        可用余额: {formatCurrency(userBalance)}
                      </div>
                    </div>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 opacity-50">
                <RadioGroupItem value="wechat" id="wechat" disabled />
                <Label
                  htmlFor="wechat"
                  className="flex-1 cursor-not-allowed flex items-center gap-3"
                >
                  <CreditCard className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-medium">微信支付</div>
                    <div className="text-sm text-gray-500">暂不可用</div>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 opacity-50">
                <RadioGroupItem value="alipay" id="alipay" disabled />
                <Label
                  htmlFor="alipay"
                  className="flex-1 cursor-not-allowed flex items-center gap-3"
                >
                  <CreditCard className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium">支付宝</div>
                    <div className="text-sm text-gray-500">暂不可用</div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

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
      <div className="lg:col-span-1">
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
                <span className="text-sm font-mono">{order.orderNumber}</span>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">机票费用</span>
                <span className="font-medium">
                  {formatCurrency(order.baseAmount)}
                </span>
              </div>

              {parseFloat(order.ancillaryAmount) > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">增值服务</span>
                  <span className="font-medium">
                    {formatCurrency(order.ancillaryAmount)}
                  </span>
                </div>
              )}

              <Separator />

              <div className="flex items-center justify-between text-lg font-bold">
                <span>应付金额</span>
                <span className="text-orange-500">
                  {formatCurrency(order.totalAmount)}
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
                          balanceAfterPayment < 0
                            ? "text-red-600"
                            : "text-blue-900"
                        }`}
                      >
                        {formatCurrency(balanceAfterPayment.toFixed(2))}
                      </span>
                    </div>
                  </div>
                </div>
                {balanceAfterPayment < 0 && (
                  <Alert variant="destructive">
                    <AlertDescription>
                      余额不足，请充值后再支付
                    </AlertDescription>
                  </Alert>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
