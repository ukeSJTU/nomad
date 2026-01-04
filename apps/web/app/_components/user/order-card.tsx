import { Button } from "@nomad/ui/components/primitives/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@nomad/ui/components/primitives/card";
import { Checkbox } from "@nomad/ui/components/primitives/checkbox";
import { Separator } from "@nomad/ui/components/primitives/separator";
import { format } from "date-fns";
import Link from "next/link";
import { OrderListItem } from "@/types/dto";

export interface OrderCardProps {
  order: OrderListItem;

  // UI control
  isChecked: boolean;
  onCheckChange: (checked: boolean) => void;
  onDelete: () => void;
  onActionClick?: () => void; // For "Resend Confirmation" or "Go to Payment"
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
  onActionClick,
}: OrderCardProps) {
  // Determine action button text based on order status
  const getActionButton = () => {
    if (order.status === "CONFIRMED") {
      return (
        <Button
          variant="outline"
          size="sm"
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            onActionClick?.();
          }}
          className="w-full text-primary"
        >
          重发确认信息
        </Button>
      );
    }
    if (order.status === "PENDING_PAYMENT") {
      return (
        <Button
          variant="outline"
          size="sm"
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            onActionClick?.();
          }}
          className="w-full text-primary"
        >
          去付款
        </Button>
      );
    }
    return null;
  };

  return (
    <Card className="w-full transition-all hover:border-primary hover:shadow-md py-0 gap-0">
      {/* 顶部：订单号、日期、状态 */}
      <CardHeader className="bg-muted/50 px-4 py-2 gap-0">
        <div className="flex items-center gap-2">
          <Checkbox
            id={`order-${order.id}`}
            checked={isChecked}
            onCheckedChange={onCheckChange}
          />
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">订单号:</span>
            <Link
              href={`/orders/${order.id}`}
              className="font-medium text-primary hover:underline"
              onClick={e => e.stopPropagation()}
            >
              {order.orderNumber}
            </Link>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>预订日期:</span>
            <span>{format(new Date(order.createdAt), "yyyy-MM-dd")}</span>
          </div>
          <Button
            variant="link"
            className="text-destructive text-sm h-auto p-0"
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              onDelete();
            }}
          >
            删除订单
          </Button>
        </div>
      </CardHeader>

      {/* 主体内容 - Clickable area */}
      <Link href={`/orders/${order.id}`} className="block">
        <CardContent className="p-4 cursor-pointer">
          <div className="flex justify-between gap-4 items-stretch pb-2">
            {/* Left side: display flight info */}
            <div className="space-y-4 flex-1">
              {/* Outbound flight */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">
                  {order.outboundFlight.departureCityName} —{" "}
                  {order.outboundFlight.arrivalCityName}
                </h3>
                <div className="text-sm text-muted-foreground space-y-1">
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
                <>
                  <Separator />

                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">
                      {order.inboundFlight.departureCityName} —{" "}
                      {order.inboundFlight.arrivalCityName}
                    </h3>
                    <div className="text-sm text-muted-foreground space-y-1">
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
                </>
              )}
            </div>

            {/* Right side: order status and price */}
            <div className="flex flex-col items-end justify-between">
              <div className="flex flex-col items-end gap-1">
                <span className="text-primary font-semibold">
                  {getOrderStatusLabel(order.status)}
                </span>
                <div className="text-lg font-semibold text-foreground">
                  ¥{order.totalAmount}
                </div>
              </div>
              {/* Action button */}
              <div className="mt-auto pt-4">{getActionButton()}</div>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
