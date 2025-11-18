import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { OrderListItem } from "@/types/dto/orders";

export interface OrderCardProps {
  order: OrderListItem;

  // UI control
  isChecked: boolean;
  onCheckChange: (checked: boolean) => void;
  onDelete: () => void;
}

function getOrderStatusLabel(orderStatus: OrderListItem["status"]) {
  switch (orderStatus) {
    case "PENDING_PAYMENT":
      return "待支付";
    case "CONFIRMED":
      return "已确认";
    case "CANCELLED":
      return "已取消";
    case "REFUNDED":
      return "已退款";
    default:
      return orderStatus;
  }
}

export default function OrderCard({
  order,
  isChecked = false,
  onCheckChange,
  onDelete,
}: OrderCardProps) {
  return (
    <Card className="w-full">
      {/* 顶部：订单号、日期、状态 */}
      <CardHeader className="bg-gray-50/50">
        <div className="flex items-center gap-2">
          <Checkbox
            id={`order-${order.id}`}
            checked={isChecked}
            onCheckedChange={onCheckChange}
          />
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600">订单号:</span>
            <span className="font-medium text-blue-600">
              {order.orderNumber}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>预订日期:</span>
            <span>{format(new Date(order.createdAt), "yyyy-MM-dd")}</span>
          </div>
          <Button
            variant="link"
            className="text-blue-600 text-sm h-auto p-0"
            onClick={onDelete}
          >
            删除订单
          </Button>
        </div>
      </CardHeader>

      {/* 主体内容 */}
      <CardContent className="px-6 pt-0">
        <div className="flex justify-between">
          {/* Left side: display flight info */}
          <div className="space-y-4">
            {/* Outbound flight */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">
                {order.outboundFlight.departureCityName} —{" "}
                {order.outboundFlight.arrivalCityName}
              </h3>
              <div className="text-sm text-gray-600 space-y-1">
                <div>
                  出发日期:{" "}
                  {format(
                    new Date(order.outboundFlight.departureDatetime),
                    "yyyy-MM-dd HH:mm"
                  )}{" "}
                  至{" "}
                  {format(
                    new Date(order.outboundFlight.arrivalDatetime),
                    "HH:mm"
                  )}{" "}
                  {order.outboundFlight.flightNumber}
                </div>
                <div>出行人：{order.passengerNames.join("、")}</div>
              </div>
            </div>

            {/* Inbound flight */}
            {order.inboundFlight && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">
                  {order.inboundFlight.departureCityName} —{" "}
                  {order.inboundFlight.arrivalCityName}
                </h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>
                    出发日期:{" "}
                    {format(
                      new Date(order.inboundFlight.departureDatetime),
                      "yyyy-MM-dd HH:mm"
                    )}{" "}
                    至{" "}
                    {format(
                      new Date(order.inboundFlight.arrivalDatetime),
                      "HH:mm"
                    )}{" "}
                    {order.inboundFlight.flightNumber}
                  </div>
                  <div>出行人：{order.passengerNames.join("、")}</div>
                </div>
              </div>
            )}
          </div>

          {/* Right side: order status and price */}
          <div className="flex flex-col items-end gap-1">
            <span className="text-blue-500 font-semibold">
              {getOrderStatusLabel(order.status)}
            </span>
            <div className="text-lg font-semibold text-gray-900">
              ¥{order.totalAmount}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
