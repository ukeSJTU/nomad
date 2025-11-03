"use client";

import { CheckCircle2, FileText, Home, Plane } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Mock order data
const MOCK_ORDER = {
  orderNumber: "NMD20251103001",
  status: "已支付",
  paymentTime: "2025-11-03 14:30:25",
  flight: {
    airline: "中国东方航空",
    flightNumber: "MU5137",
    aircraft: "空客 A320",
    departure: {
      time: "08:30",
      airport: "上海浦东国际机场",
      terminal: "T2",
      date: "2025-12-15",
    },
    arrival: {
      time: "11:45",
      airport: "北京首都国际机场",
      terminal: "T3",
      date: "2025-12-15",
    },
    classType: "经济舱",
  },
  passengers: [
    {
      name: "张三",
      documentType: "身份证",
      documentNumber: "110101199001011234",
    },
  ],
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

export default function BookingConfirmationPage() {
  const router = useRouter();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-6">
        {/* Success Message */}
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <CheckCircle2 className="h-16 w-16 text-green-600" />
              <div>
                <h1 className="text-2xl font-bold text-green-900 mb-2">
                  预订成功！
                </h1>
                <p className="text-green-700">
                  您的订单已确认，我们已向您的邮箱发送确认邮件
                </p>
              </div>
              <div className="bg-white px-6 py-3 rounded-lg border border-green-200">
                <div className="text-sm text-gray-600 mb-1">订单号</div>
                <div className="text-xl font-mono font-bold text-gray-900">
                  {MOCK_ORDER.orderNumber}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Plane className="h-5 w-5" />
              订单详情
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Flight Information */}
            <div>
              <div className="text-sm text-gray-500 mb-3">航班信息</div>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-gray-500">航班号</div>
                    <div className="font-medium">
                      {MOCK_ORDER.flight.flightNumber}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">航空公司</div>
                    <div className="font-medium">
                      {MOCK_ORDER.flight.airline}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">机型</div>
                    <div className="font-medium">
                      {MOCK_ORDER.flight.aircraft}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">舱位</div>
                    <div className="font-medium">
                      {MOCK_ORDER.flight.classType}
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">出发</div>
                    <div className="font-medium">
                      {MOCK_ORDER.flight.departure.date}{" "}
                      {MOCK_ORDER.flight.departure.time}
                    </div>
                    <div className="text-sm text-gray-600">
                      {MOCK_ORDER.flight.departure.airport}{" "}
                      {MOCK_ORDER.flight.departure.terminal}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">到达</div>
                    <div className="font-medium">
                      {MOCK_ORDER.flight.arrival.date}{" "}
                      {MOCK_ORDER.flight.arrival.time}
                    </div>
                    <div className="text-sm text-gray-600">
                      {MOCK_ORDER.flight.arrival.airport}{" "}
                      {MOCK_ORDER.flight.arrival.terminal}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Passengers */}
            <div>
              <div className="text-sm text-gray-500 mb-2">乘机人信息</div>
              <div className="space-y-2">
                {MOCK_ORDER.passengers.map((passenger, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{passenger.name}</div>
                      <div className="text-sm text-gray-600">
                        {passenger.documentType} {passenger.documentNumber}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Contact Information */}
            <div>
              <div className="text-sm text-gray-500 mb-2">联系人信息</div>
              <div className="space-y-1 text-sm">
                <div>
                  <span className="text-gray-600">姓名：</span>
                  {MOCK_ORDER.contact.name}
                </div>
                <div>
                  <span className="text-gray-600">电话：</span>
                  {MOCK_ORDER.contact.phone}
                </div>
                {MOCK_ORDER.contact.email && (
                  <div>
                    <span className="text-gray-600">邮箱：</span>
                    {MOCK_ORDER.contact.email}
                  </div>
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
                        className="flex items-center justify-between text-sm"
                      >
                        <span>{service.name}</span>
                        <span className="font-medium">¥{service.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            <Separator />

            {/* Payment Summary */}
            <div>
              <div className="text-sm text-gray-500 mb-2">费用明细</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">机票费用</span>
                  <span>¥{MOCK_ORDER.pricing.baseAmount}</span>
                </div>
                {MOCK_ORDER.pricing.ancillaryAmount > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">增值服务</span>
                    <span>¥{MOCK_ORDER.pricing.ancillaryAmount}</span>
                  </div>
                )}
                <Separator />
                <div className="flex items-center justify-between font-bold text-lg">
                  <span>实付金额</span>
                  <span className="text-orange-500">
                    ¥{MOCK_ORDER.pricing.totalAmount}
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  支付时间：{MOCK_ORDER.paymentTime}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Notice */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-blue-900 mb-2">温馨提示</h3>
            <ul className="space-y-1 text-sm text-blue-800">
              <li>• 请至少提前2小时到达机场办理值机手续</li>
              <li>• 请携带有效身份证件原件</li>
              <li>• 如需改签或退票，请在航班起飞前联系客服</li>
              <li>• 订单详情已发送至您的邮箱，请注意查收</li>
            </ul>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => router.push("/")}
            className="gap-2"
          >
            <Home className="h-4 w-4" />
            返回首页
          </Button>
          <Button
            size="lg"
            onClick={() => router.push("/orders")}
            className="gap-2"
          >
            <FileText className="h-4 w-4" />
            查看订单详情
          </Button>
        </div>
      </div>
    </div>
  );
}
