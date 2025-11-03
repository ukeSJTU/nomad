"use client";

import { Clock, CreditCard, Plane, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

// Mock order data
const MOCK_ORDER = {
  orderNumber: "NMD20251103001",
  flight: {
    airline: "中国东方航空",
    flightNumber: "MU5137",
    departure: {
      time: "08:30",
      airport: "上海浦东国际机场",
      date: "2025-12-15",
    },
    arrival: {
      time: "11:45",
      airport: "北京首都国际机场",
      date: "2025-12-15",
    },
  },
  passengers: [{ name: "张三", documentNumber: "110101199001011234" }],
  contact: {
    name: "张三",
    phone: "13800138000",
    email: "zhangsan@example.com",
  },
  pricing: {
    baseAmount: 850,
    ancillaryAmount: 130,
    totalAmount: 980,
  },
  ancillaryServices: [
    { name: "基础旅行险", price: 50 },
    { name: "经济型接送机", price: 80 },
  ],
};

// Mock user balance
const MOCK_USER_BALANCE = 5000;

export default function BookingPaymentPage() {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("balance");
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  const [isProcessing, setIsProcessing] = useState(false);

  // Countdown timer
  useEffect(() => {
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
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    router.push("/flights/booking/confirmation");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        {/* Countdown Timer */}
        <Alert>
          <Clock className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>请在规定时间内完成支付，超时订单将自动取消</span>
            <span className="font-mono text-lg font-bold text-orange-500">
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
            {/* Flight Info */}
            <div>
              <div className="text-sm text-gray-500 mb-2">航班信息</div>
              <div className="space-y-1">
                <div className="font-medium">
                  {MOCK_ORDER.flight.flightNumber} {MOCK_ORDER.flight.airline}
                </div>
                <div className="text-sm text-gray-600">
                  {MOCK_ORDER.flight.departure.date}{" "}
                  {MOCK_ORDER.flight.departure.time}{" "}
                  {MOCK_ORDER.flight.departure.airport} →{" "}
                  {MOCK_ORDER.flight.arrival.time}{" "}
                  {MOCK_ORDER.flight.arrival.airport}
                </div>
              </div>
            </div>

            <Separator />

            {/* Passengers */}
            <div>
              <div className="text-sm text-gray-500 mb-2">乘机人</div>
              {MOCK_ORDER.passengers.map((passenger, idx) => (
                <div key={idx} className="text-sm">
                  {passenger.name} ({passenger.documentNumber})
                </div>
              ))}
            </div>

            <Separator />

            {/* Contact */}
            <div>
              <div className="text-sm text-gray-500 mb-2">联系人</div>
              <div className="text-sm space-y-1">
                <div>{MOCK_ORDER.contact.name}</div>
                <div>{MOCK_ORDER.contact.phone}</div>
                {MOCK_ORDER.contact.email && (
                  <div>{MOCK_ORDER.contact.email}</div>
                )}
              </div>
            </div>

            {/* Ancillary Services */}
            {MOCK_ORDER.ancillaryServices.length > 0 && (
              <>
                <Separator />
                <div>
                  <div className="text-sm text-gray-500 mb-2">增值服务</div>
                  <div className="space-y-1">
                    {MOCK_ORDER.ancillaryServices.map((service, idx) => (
                      <div
                        key={idx}
                        className="text-sm flex items-center justify-between"
                      >
                        <span>{service.name}</span>
                        <span>¥{service.price}</span>
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
                        可用余额: ¥{MOCK_USER_BALANCE.toFixed(2)}
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
            onClick={() => router.push("/flights/booking/ancillary")}
            disabled={isProcessing}
          >
            上一步
          </Button>
          <Button
            onClick={handlePayment}
            size="lg"
            disabled={isProcessing || timeLeft === 0}
            className="min-w-[200px]"
          >
            {isProcessing
              ? "处理中..."
              : `确认支付 ¥${MOCK_ORDER.pricing.totalAmount}`}
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
                <span className="text-sm font-mono">
                  {MOCK_ORDER.orderNumber}
                </span>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">机票费用</span>
                <span className="font-medium">
                  ¥{MOCK_ORDER.pricing.baseAmount}
                </span>
              </div>

              {MOCK_ORDER.pricing.ancillaryAmount > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">增值服务</span>
                  <span className="font-medium">
                    ¥{MOCK_ORDER.pricing.ancillaryAmount}
                  </span>
                </div>
              )}

              <Separator />

              <div className="flex items-center justify-between text-lg font-bold">
                <span>应付金额</span>
                <span className="text-orange-500">
                  ¥{MOCK_ORDER.pricing.totalAmount}
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
                      <span className="font-medium">¥{MOCK_USER_BALANCE}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>支付后余额</span>
                      <span className="font-medium">
                        ¥{MOCK_USER_BALANCE - MOCK_ORDER.pricing.totalAmount}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
