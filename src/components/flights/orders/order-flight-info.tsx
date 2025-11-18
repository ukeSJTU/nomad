import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { ArrowLeftRight, ArrowRight, Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { OrderDetailFull } from "@/types/dto/orders";

import { getSeatClassName } from "./utils";

export type OrderFlightInfoProps = {
  outboundFlight: OrderDetailFull["outboundFlight"];
  inboundFlight: OrderDetailFull["inboundFlight"];
};

/**
 * Format flight date (e.g., "2026-01-18 周日")
 */
function formatFlightDate(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return format(dateObj, "yyyy-MM-dd EEEE", { locale: zhCN });
}

/**
 * Format time (HH:mm)
 */
function formatTime(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return format(dateObj, "HH:mm");
}

/**
 * Calculate flight duration
 */
function calculateDuration(
  departure: Date | string,
  arrival: Date | string
): string {
  const start = typeof departure === "string" ? new Date(departure) : departure;
  const end = typeof arrival === "string" ? new Date(arrival) : arrival;
  const minutes = Math.floor((end.getTime() - start.getTime()) / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h${mins}m`;
}

/**
 * Flight Info Component
 *
 * Displays a single flight's information with timeline layout
 */
function FlightInfo({
  flight,
  label,
  showLabel,
}: {
  flight: OrderDetailFull["outboundFlight"];
  label: string;
  showLabel: boolean;
}) {
  const duration = calculateDuration(
    flight.departureDatetime,
    flight.arrivalDatetime
  );

  return (
    <div>
      {/* Label (only show for round-trip) */}
      {showLabel && (
        <Badge variant="secondary" className="mb-4">
          {label}
        </Badge>
      )}

      <div className="flex gap-6">
        {/* Left: Date Badge */}
        <div className="shrink-0">
          <Badge variant="outline" className="px-3 py-1 text-sm font-normal">
            {formatFlightDate(flight.departureDatetime)}
          </Badge>
        </div>

        {/* Right: Flight Details */}
        <div className="flex-1 space-y-3">
          {/* Timeline: Departure -> Duration -> Arrival */}
          <div className="flex items-center gap-8">
            {/* Departure */}
            <div className="flex-1">
              <div className="text-2xl font-semibold">
                {formatTime(flight.departureDatetime)}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {flight.departureAirportName}
                {flight.terminal && (
                  <span className="ml-1">{flight.terminal}</span>
                )}
              </div>
            </div>

            {/* Duration */}
            <div className="flex flex-col items-center text-gray-500">
              <Clock className="h-4 w-4 mb-1" />
              <div className="text-xs">{duration}</div>
            </div>

            {/* Arrival */}
            <div className="flex-1">
              <div className="text-2xl font-semibold">
                {formatTime(flight.arrivalDatetime)}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {flight.arrivalAirportName}
                {flight.terminal && (
                  <span className="ml-1">{flight.terminal}</span>
                )}
              </div>
            </div>
          </div>

          {/* Flight Details */}
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>{flight.airlineName}</span>
            <span>{flight.flightNumber}</span>
            <span>
              {getSeatClassName(
                flight.seatClassType as "ECONOMY" | "BUSINESS" | "FIRST"
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Order Flight Information Card Component
 *
 * Displays outbound and optional inbound flight information with clean timeline layout
 */
export function OrderFlightInfo({
  outboundFlight,
  inboundFlight,
}: OrderFlightInfoProps) {
  const isRoundTrip = !!inboundFlight;

  return (
    <Card>
      <CardHeader className="bg-gray-100">
        <CardTitle>
          {/* Header: City Route */}
          <div className="flex items-center gap-3 mb-6">
            <h3 className="text-xl font-semibold">
              {outboundFlight.departureCityName}
            </h3>
            {isRoundTrip ? (
              <ArrowLeftRight className="h-5 w-5 text-gray-400" />
            ) : (
              <ArrowRight className="h-5 w-5 text-gray-400" />
            )}
            <h3 className="text-xl font-semibold">
              {outboundFlight.arrivalCityName}
            </h3>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {/* Outbound Flight */}
        <FlightInfo
          flight={outboundFlight}
          label="去程"
          showLabel={isRoundTrip}
        />

        {/* Inbound Flight (if exists) */}
        {inboundFlight && (
          <>
            <Separator className="my-6" />
            <FlightInfo flight={inboundFlight} label="返程" showLabel={true} />
          </>
        )}
      </CardContent>
    </Card>
  );
}
