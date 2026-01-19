import { ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../primitives/card";
import { Separator } from "../../primitives/separator";

export type FlightPaymentInfo = {
  depatureCityName: string;
  arrivalCityName: string;
  unitPrice: string;
  passengerCount: number;
};

export type AncillaryService = {
  name: string;
  unitPrice: string;
  quantity: number;
};

export type PaymentData = {
  totalAmount: string;
  createdAt: string;
  outboundFlight: FlightPaymentInfo;
  inboundFlight?: FlightPaymentInfo;
  ancillaryServices: AncillaryService[];
};

export type OrderPaymentDetailsProps = {
  paymentData: PaymentData;
  formatDate?: (date: string) => string;
};

const defaultFormatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  return `${month}-${day} ${hour}:${minute}`;
};

/**
 * Order Payment Details Card Component
 *
 * Displays order payment breakdown and metadata
 *
 * 我们的系统不考虑机建和燃油费用
 */
export function OrderPaymentDetails({
  paymentData,
  formatDate = defaultFormatDate,
}: OrderPaymentDetailsProps) {
  const formattedDate = formatDate(paymentData.createdAt);

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
