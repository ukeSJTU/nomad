import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { ArrowLeftRight, ArrowRight } from "lucide-react";
import Image from "next/image";

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
    <div className="space-y-4">
      {/* Upper Part: Label + Date */}
      <div className="flex flex-row justify-start items-center gap-2">
        {/* Label (only show for round-trip) */}
        {showLabel && (
          <Badge className="text-white bg-blue-500 font-normal px-2 py-0.5">
            {label}
          </Badge>
        )}
        <span className="font-medium text-base">
          {formatFlightDate(flight.departureDatetime)}
        </span>
      </div>

      <div className="flex flex-row justify-between">
        {/* Flight Timeline */}
        <div className="flex items-start gap-3">
          {/* Left: Time Column */}
          <div className="flex flex-col items-end min-w-[50px] pt-1">
            <div className="text-base font-medium mb-1">
              {formatTime(flight.departureDatetime)}
            </div>
            <div className="text-xs text-gray-500 my-4">{duration}</div>
            <div className="text-base font-medium mt-1">
              {formatTime(flight.arrivalDatetime)}
            </div>
          </div>

          {/* Middle: Timeline Indicator */}
          <div className="flex flex-col items-center pt-2">
            {/* Top Circle */}
            <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />

            {/* Vertical Line */}
            <div className="w-px h-16 bg-gray-300 my-1" />

            {/* Bottom Circle */}
            <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
          </div>

          {/* Right: Airport and Flight Info */}
          <div className="flex-1 pt-0.5">
            {/* Departure Info */}
            <div className="mb-6">
              <div className="font-medium text-base mb-1">
                {flight.departureCityName} {flight.departureAirportName}
                {flight.departureTerminal && (
                  <span className="ml-0.5">{flight.departureTerminal}</span>
                )}
              </div>
            </div>

            {/* Arrival Info */}
            <div>
              <div className="font-medium text-base mb-1">
                {flight.arrivalCityName} {flight.arrivalAirportName}
                {flight.arrivalTerminal && (
                  <span className="ml-0.5">{flight.arrivalTerminal}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Airplane Info */}
        <div className="flex flex-col items-start justify-start gap-3">
          <div className="flex flex-row gap-2">
            {/* Airline Logo */}
            {flight.airlineLogoUrl && (
              <div className="relative w-5 h-5">
                <Image
                  src={flight.airlineLogoUrl}
                  alt={flight.airlineName}
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <span>
              {flight.airlineName} {flight.flightNumber}
            </span>
          </div>
          {/* Flight Details */}
          <div className="flex flex-row gap-1">
            <span>{getSeatClassName(flight.seatClassType)}</span>|
            <span>{flight.aircraftType}</span>
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
      <CardHeader>
        {/* Header: City Route */}
        <CardTitle>
          <div className="flex items-center">
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
      <CardContent>
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
