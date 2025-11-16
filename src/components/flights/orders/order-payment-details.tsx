import type { OrderDetailsWithAirports } from "@/app/(frontend)/(with-sidebar)/orders/[orderId]/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getAncillaryServiceByCode } from "@/lib/schema/ancillary";
import { formatCurrency } from "@/lib/utils/currency";

export type OrderPaymentDetailsProps = {
  order: OrderDetailsWithAirports;
};

/**
 * Order Payment Details Card Component
 *
 * Displays order payment breakdown and metadata (sticky on desktop)
 */
export function OrderPaymentDetails({ order }: OrderPaymentDetailsProps) {
  // Get ancillary services details
  const ancillaryServices = (order.ancillaryDetails || [])
    .map(code => getAncillaryServiceByCode(code))
    .filter((service): service is NonNullable<typeof service> => !!service);

  return (
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
                  {ancillaryServices.map(service => (
                    <div
                      key={service.code}
                      className="flex justify-between text-xs text-gray-500"
                    >
                      <span>• {service.name}</span>
                      <span>¥{service.price}</span>
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
            <span>{new Date(order.createdAt).toLocaleString("zh-CN")}</span>
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
  );
}
