import { Plane } from "lucide-react";

import type { OrderDetailsWithAirports } from "@/app/(frontend)/(with-sidebar)/orders/[orderId]/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { formatFlightDate, formatFlightTime, getSeatClassName } from "./utils";

export type OrderFlightInfoProps = {
  outboundFlight: OrderDetailsWithAirports["outboundFlight"];
  inboundFlight: OrderDetailsWithAirports["inboundFlight"];
};

/**
 * Flight Info Component
 *
 * Displays a single flight's information including departure and arrival details
 */
function FlightInfo({
  flight,
  label,
}: {
  flight: OrderDetailsWithAirports["outboundFlight"];
  label: string;
}) {
  return (
    <div>
      <div className="text-sm text-gray-500 mb-3">{label}</div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="font-medium text-lg">{flight.flightNumber}</div>
          <div className="text-sm text-gray-600">{flight.airline.name}</div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-gray-500">出发</div>
            <div className="font-medium">
              {flight.departureAirport.name} ({flight.departureAirport.iataCode}
              )
            </div>
            <div className="text-gray-600">
              {formatFlightDate(flight.departureDatetime)}{" "}
              {formatFlightTime(flight.departureDatetime)}
            </div>
            {flight.departureTerminal && (
              <div className="text-gray-500">{flight.departureTerminal}</div>
            )}
          </div>
          <div>
            <div className="text-gray-500">到达</div>
            <div className="font-medium">
              {flight.arrivalAirport.name} ({flight.arrivalAirport.iataCode})
            </div>
            <div className="text-gray-600">
              {formatFlightDate(flight.arrivalDatetime)}{" "}
              {formatFlightTime(flight.arrivalDatetime)}
            </div>
            {flight.arrivalTerminal && (
              <div className="text-gray-500">{flight.arrivalTerminal}</div>
            )}
          </div>
        </div>
        <div className="text-sm text-gray-600">
          座位等级: {getSeatClassName(flight.seatClass.classType)}
        </div>
      </div>
    </div>
  );
}

/**
 * Order Flight Information Card Component
 *
 * Displays outbound and optional inbound flight information
 */
export function OrderFlightInfo({
  outboundFlight,
  inboundFlight,
}: OrderFlightInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plane className="h-5 w-5" />
          航班信息
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Outbound Flight */}
        <FlightInfo flight={outboundFlight} label="去程航班" />

        {/* Inbound Flight (if exists) */}
        {inboundFlight && (
          <>
            <Separator />
            <FlightInfo flight={inboundFlight} label="返程航班" />
          </>
        )}
      </CardContent>
    </Card>
  );
}
