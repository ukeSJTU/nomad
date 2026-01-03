import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@nomad/ui/components/primitives/card";
import { Separator } from "@nomad/ui/components/primitives/separator";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { ArrowRight } from "lucide-react";
import { OrderDetailFull } from "@/types/dto";

export type OrderPaymentDetailsProps = {
  paymentData: OrderDetailFull["payment"];
};

/**
 * Order Payment Details Card Component
 *
 * Displays order payment breakdown and metadata
 *
 * 我们的系统不考虑机建和燃油费用
 */
export function OrderPaymentDetails({ paymentData }: OrderPaymentDetailsProps) {
  // Format date
  const formattedDate = format(new Date(paymentData.createdAt), "MM-dd HH:mm", {
    locale: zhCN,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>订单支付明细</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Order Metadata */}
        <div className="flex justify-between items-start pt-2">
          <div>
            <div className="text-lg font-semibold">下单金额</div>
            <div className="text-sm mt-1">{formattedDate}</div>
          </div>
          <div className="text-right text-xl font-semibold text-blue-500">
            ¥{paymentData.totalAmount}
          </div>
        </div>

        {/* Payment Breakdown */}
        <div className="space-y-4 bg-gray-100 rounded-xl p-4">
          {/* Outbound Flight */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <span>{paymentData.outboundFlight.depatureCityName}</span>
              <ArrowRight className="h-4 w-4 text-gray-400" />
              <span>{paymentData.outboundFlight.arrivalCityName}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>成人</span>
              <span>
                ¥{paymentData.outboundFlight.unitPrice} ×{" "}
                {paymentData.outboundFlight.passengerCount}人
              </span>
            </div>
          </div>

          {/* Inbound Flight (if exists) */}
          {paymentData.inboundFlight && (
            <>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <span>{paymentData.inboundFlight.depatureCityName}</span>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                  <span>{paymentData.inboundFlight.arrivalCityName}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>成人</span>
                  <span>
                    ¥{paymentData.inboundFlight.unitPrice} ×{" "}
                    {paymentData.inboundFlight.passengerCount}人
                  </span>
                </div>
              </div>
            </>
          )}

          {/* Ancillary Services */}
          {paymentData.ancillaryServices.length > 0 && (
            <>
              <Separator />
              <div className="space-y-2">
                {paymentData.ancillaryServices.map((service, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{service.name}</span>
                      <span>
                        ¥{service.unitPrice} × {service.quantity}份
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
