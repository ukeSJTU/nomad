import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../primitives/card";
import { Separator } from "../../primitives/separator";

export interface PaymentOrderSummaryFlightProps {
  flightNumber: string;
  airlineName: string;
  departureDate: string;
  departureTime: string;
  departureAirport: string;
  arrivalTime: string;
  arrivalAirport: string;
}

export interface PaymentOrderSummaryPassengerProps {
  name: string;
  identityNumber: string;
}

export interface PaymentOrderSummaryAncillaryProps {
  name: string;
  price: string;
}

export interface PaymentOrderSummaryProps {
  outboundFlight: PaymentOrderSummaryFlightProps;
  inboundFlight?: PaymentOrderSummaryFlightProps | null;
  passengers: PaymentOrderSummaryPassengerProps[];
  contactPhone?: string | null;
  contactEmail?: string | null;
  ancillaryServices?: PaymentOrderSummaryAncillaryProps[];
}

export function PaymentOrderSummary({
  outboundFlight,
  inboundFlight,
  passengers,
  contactPhone,
  contactEmail,
  ancillaryServices = [],
}: PaymentOrderSummaryProps) {
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
              {outboundFlight.flightNumber} {outboundFlight.airlineName}
            </div>
            <div className="text-sm text-gray-600">
              {outboundFlight.departureDate} {outboundFlight.departureTime}{" "}
              {outboundFlight.departureAirport} → {outboundFlight.arrivalTime}{" "}
              {outboundFlight.arrivalAirport}
            </div>
          </div>
        </div>

        {/* Inbound Flight Info (if exists) */}
        {inboundFlight && (
          <>
            <Separator />
            <div>
              <div className="text-sm text-gray-500 mb-2">返程航班</div>
              <div className="space-y-1">
                <div className="font-medium">
                  {inboundFlight.flightNumber} {inboundFlight.airlineName}
                </div>
                <div className="text-sm text-gray-600">
                  {inboundFlight.departureDate} {inboundFlight.departureTime}{" "}
                  {inboundFlight.departureAirport} → {inboundFlight.arrivalTime}{" "}
                  {inboundFlight.arrivalAirport}
                </div>
              </div>
            </div>
          </>
        )}

        <Separator />

        {/* Passengers */}
        <div>
          <div className="text-sm text-gray-500 mb-2">乘机人</div>
          {passengers.map((passenger, idx) => (
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
            {contactPhone && <div>{contactPhone}</div>}
            {contactEmail && <div>{contactEmail}</div>}
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
  );
}
