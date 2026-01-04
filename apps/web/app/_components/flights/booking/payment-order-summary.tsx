import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@nomad/ui/components/primitives/card";
import { Separator } from "@nomad/ui/components/primitives/separator";
import { getAncillaryServiceByCode } from "@/db/schema/ancillary";
import { PaymentPageOrder } from "@/types/dto";

interface PaymentOrderSummaryProps {
  order: PaymentPageOrder;
}

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

export function PaymentOrderSummary({ order }: PaymentOrderSummaryProps) {
  // Get ancillary services details
  const ancillaryServices = (order.ancillaryDetails || [])
    .map(code => getAncillaryServiceByCode(code))
    .filter(Boolean);

  return (
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
                    <span>{service?.name}</span>
                    <span>¥{service?.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
