import { ArrowRight, Plane } from "lucide-react";

import type { FlightSeatClassDetails } from "@/app/(frontend)/flights/booking/passengers/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDateWithWeekday } from "@/utils/date";

type FlightSummaryCardProps = {
  outboundFlight: FlightSeatClassDetails | null;
  inboundFlight?: FlightSeatClassDetails | null;
  passengerCount?: number;
};

type FlightSegmentProps = {
  flight: FlightSeatClassDetails;
};

/**
 * Format time to HH:mm format
 */
function formatFlightTime(date: Date): string {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

/**
 * Flight segment component - displays a single flight leg information
 * Similar to the screenshot layout: date + route, airline info, time display
 */
function FlightSegment({ flight }: FlightSegmentProps) {
  // Calculate flight duration
  const departure = new Date(flight.flight.departure.datetime);
  const arrival = new Date(flight.flight.arrival.datetime);
  const durationMs = arrival.getTime() - departure.getTime();
  const hours = Math.floor(durationMs / (1000 * 60 * 60));
  const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

  // Format seat class
  const seatClassText =
    flight.classType === "ECONOMY"
      ? "经济舱"
      : flight.classType === "BUSINESS"
        ? "商务舱"
        : "头等舱";

  return (
    <div className="space-y-3 flex flex-col items-center">
      {/* Date and Route Header */}
      <div className="text-base font-medium">
        {formatDateWithWeekday(departure)}
        <span className="mx-2">
          {flight.flight.departure.city.name} →{" "}
          {flight.flight.arrival.city.name}
        </span>
      </div>

      {/* Airline Info */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        {flight.flight.airline.logoUrl && (
          <img
            src={flight.flight.airline.logoUrl}
            alt={flight.flight.airline.name}
            className="h-5 w-5 object-contain"
          />
        )}
        <span className="text-red-500">{flight.flight.airline.name}</span>
        <span>{flight.flight.flightNumber}</span>
        <span>空客{flight.flight.aircraftType || "330"}</span>
        <span>{seatClassText}</span>
      </div>

      {/* Time and Airport Info */}
      <div className="flex items-center justify-between">
        {/* Departure */}
        <div className="flex flex-col items-start">
          <div className="text-2xl font-semibold">
            {formatFlightTime(departure)}
          </div>
          <div className="text-sm text-gray-500">
            {flight.flight.departure.airport.name}
          </div>
        </div>

        {/* Duration */}
        <div className="flex flex-col items-center flex-1 px-4">
          <div className="text-xs text-gray-400 mb-1">
            <Plane className="h-3 w-3 inline" /> {hours}h{minutes}m
          </div>
          <div className="w-full border-t border-gray-300 relative">
            <ArrowRight className="h-4 w-4 text-gray-400 absolute -top-2 left-1/2 -translate-x-1/2 bg-white" />
          </div>
        </div>

        {/* Arrival */}
        <div className="flex flex-col items-end">
          <div className="text-2xl font-semibold">
            {formatFlightTime(arrival)}
          </div>
          <div className="text-sm text-gray-500">
            {flight.flight.arrival.airport.name}
          </div>
        </div>
      </div>
    </div>
  );
}

export function FlightSummaryCard({
  outboundFlight,
  inboundFlight,
  passengerCount = 1,
}: FlightSummaryCardProps) {
  if (!outboundFlight) {
    return null;
  }

  const outboundPrice = parseFloat(outboundFlight.price);
  const inboundPrice = inboundFlight ? parseFloat(inboundFlight.price) : 0;
  const totalPrice = (outboundPrice + inboundPrice) * passengerCount;

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="text-lg">航班信息</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Outbound Flight */}
        <FlightSegment flight={outboundFlight} />

        {/* Inbound Flight */}
        {inboundFlight && (
          <>
            <Separator />
            <FlightSegment flight={inboundFlight} />
          </>
        )}

        <Separator />

        {/* Price Summary */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">去程票价</span>
            <span className="font-medium">¥{outboundPrice.toFixed(2)}</span>
          </div>

          {inboundFlight && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">返程票价</span>
              <span className="font-medium">¥{inboundPrice.toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">乘客人数</span>
            <span className="font-medium">{passengerCount}</span>
          </div>

          <Separator />

          <div className="flex justify-between text-base font-semibold">
            <span>总计</span>
            <span className="text-blue-600">¥{totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
