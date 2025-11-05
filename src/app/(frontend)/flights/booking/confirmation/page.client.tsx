"use client";

import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { CheckCircle2, FileText, Home, Plane } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  formatCurrencyWithoutSymbol,
  getCurrencyValue,
  parseCurrency,
} from "@/lib/utils/currency";

import type { OrderConfirmationDetails } from "./queries";

// Ancillary service definitions (same as payment page)
const ANCILLARY_SERVICES = [
  { code: "insurance_basic", name: "基础旅行险", price: 50 },
  { code: "insurance_premium", name: "高级旅行险", price: 150 },
  { code: "meal_standard", name: "标准餐食", price: 50 },
  { code: "meal_premium", name: "高级餐食", price: 100 },
  { code: "transfer_economy", name: "经济型接送机", price: 80 },
  { code: "transfer_business", name: "商务型接送机", price: 200 },
  { code: "lounge", name: "贵宾休息室", price: 120 },
  { code: "priority_boarding", name: "优先登机", price: 30 },
  { code: "extra_baggage", name: "额外行李额", price: 100 },
];

// Identity type mapping
const IDENTITY_TYPE_MAP = {
  passport: "护照",
  id_card: "身份证",
  other: "其他",
} as const;

// Seat class type mapping
const SEAT_CLASS_MAP = {
  economy: "经济舱",
  business: "商务舱",
  first: "头等舱",
} as const;

type Props = {
  order: OrderConfirmationDetails;
};

export default function ConfirmationPageClient({ order }: Props) {
  const router = useRouter();

  // Parse ancillary services
  const ancillaryServices =
    order.ancillaryDetails?.map(code => {
      const service = ANCILLARY_SERVICES.find(s => s.code === code);
      return service || { code, name: code, price: 0 };
    }) || [];

  // Format contact name (use first passenger's name if no contact phone)
  const contactName = order.passengers[0]?.name || "未提供";

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
                  {order.orderNumber}
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
            {/* Outbound Flight Information */}
            <div>
              <div className="text-sm text-gray-500 mb-3">
                {order.inboundFlight ? "去程航班" : "航班信息"}
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-gray-500">航班号</div>
                    <div className="font-medium">
                      {order.outboundFlight.flightNumber}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">航空公司</div>
                    <div className="font-medium">
                      {order.outboundFlight.airline.name}
                    </div>
                  </div>
                  {order.outboundFlight.aircraftType && (
                    <div>
                      <div className="text-xs text-gray-500">机型</div>
                      <div className="font-medium">
                        {order.outboundFlight.aircraftType}
                      </div>
                    </div>
                  )}
                  <div>
                    <div className="text-xs text-gray-500">舱位</div>
                    <div className="font-medium">
                      {SEAT_CLASS_MAP[order.outboundFlight.seatClass.classType]}
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">出发</div>
                    <div className="font-medium">
                      {format(
                        order.outboundFlight.departureDatetime,
                        "yyyy-MM-dd HH:mm",
                        { locale: zhCN }
                      )}
                    </div>
                    <div className="text-sm text-gray-600">
                      {order.outboundFlight.departureAirport.name}
                      {order.outboundFlight.departureTerminal &&
                        ` ${order.outboundFlight.departureTerminal}`}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">到达</div>
                    <div className="font-medium">
                      {format(
                        order.outboundFlight.arrivalDatetime,
                        "yyyy-MM-dd HH:mm",
                        { locale: zhCN }
                      )}
                    </div>
                    <div className="text-sm text-gray-600">
                      {order.outboundFlight.arrivalAirport.name}
                      {order.outboundFlight.arrivalTerminal &&
                        ` ${order.outboundFlight.arrivalTerminal}`}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Inbound Flight Information */}
            {order.inboundFlight && (
              <>
                <Separator />
                <div>
                  <div className="text-sm text-gray-500 mb-3">返程航班</div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-gray-500">航班号</div>
                        <div className="font-medium">
                          {order.inboundFlight.flightNumber}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">航空公司</div>
                        <div className="font-medium">
                          {order.inboundFlight.airline.name}
                        </div>
                      </div>
                      {order.inboundFlight.aircraftType && (
                        <div>
                          <div className="text-xs text-gray-500">机型</div>
                          <div className="font-medium">
                            {order.inboundFlight.aircraftType}
                          </div>
                        </div>
                      )}
                      <div>
                        <div className="text-xs text-gray-500">舱位</div>
                        <div className="font-medium">
                          {
                            SEAT_CLASS_MAP[
                              order.inboundFlight.seatClass.classType
                            ]
                          }
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">出发</div>
                        <div className="font-medium">
                          {format(
                            order.inboundFlight.departureDatetime,
                            "yyyy-MM-dd HH:mm",
                            { locale: zhCN }
                          )}
                        </div>
                        <div className="text-sm text-gray-600">
                          {order.inboundFlight.departureAirport.name}
                          {order.inboundFlight.departureTerminal &&
                            ` ${order.inboundFlight.departureTerminal}`}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">到达</div>
                        <div className="font-medium">
                          {format(
                            order.inboundFlight.arrivalDatetime,
                            "yyyy-MM-dd HH:mm",
                            { locale: zhCN }
                          )}
                        </div>
                        <div className="text-sm text-gray-600">
                          {order.inboundFlight.arrivalAirport.name}
                          {order.inboundFlight.arrivalTerminal &&
                            ` ${order.inboundFlight.arrivalTerminal}`}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            <Separator />

            {/* Passengers */}
            <div>
              <div className="text-sm text-gray-500 mb-2">乘机人信息</div>
              <div className="space-y-2">
                {order.passengers.map(passenger => (
                  <div
                    key={passenger.id}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <div className="font-medium">{passenger.name}</div>
                      <div className="text-sm text-gray-600">
                        {IDENTITY_TYPE_MAP[passenger.identityType]}{" "}
                        {passenger.identityNumber}
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
                  {contactName}
                </div>
                {order.contactPhone && (
                  <div>
                    <span className="text-gray-600">电话：</span>
                    {order.contactPhone}
                  </div>
                )}
                {order.contactEmail && (
                  <div>
                    <span className="text-gray-600">邮箱：</span>
                    {order.contactEmail}
                  </div>
                )}
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
                  <span>¥{formatCurrencyWithoutSymbol(order.baseAmount)}</span>
                </div>
                {getCurrencyValue(parseCurrency(order.ancillaryAmount)) > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">增值服务</span>
                    <span>
                      ¥{formatCurrencyWithoutSymbol(order.ancillaryAmount)}
                    </span>
                  </div>
                )}
                <Separator />
                <div className="flex items-center justify-between font-bold text-lg">
                  <span>实付金额</span>
                  <span className="text-orange-500">
                    ¥{formatCurrencyWithoutSymbol(order.totalAmount)}
                  </span>
                </div>
                {order.payment && (
                  <div className="text-xs text-gray-500">
                    支付时间：
                    {format(order.payment.createdAt, "yyyy-MM-dd HH:mm:ss", {
                      locale: zhCN,
                    })}
                  </div>
                )}
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
