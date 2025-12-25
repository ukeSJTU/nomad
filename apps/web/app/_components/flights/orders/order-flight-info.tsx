import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { ArrowLeftRight, ArrowRight } from "lucide-react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { OrderDetailFull } from "@/types/dto";

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
        <span className="font-medium text-sm md:text-base">
          {formatFlightDate(flight.departureDatetime)}
        </span>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between gap-4 md:gap-0">
        {/* Flight Timeline */}
        <div className="flex flex-col flex-1 gap-0">
          {/* Top Part: Departure */}
          <div className="flex flex-row items-center gap-2 md:gap-3">
            {/* Left: Departure Time */}
            <div className="text-sm md:text-base font-medium min-w-[45px] md:min-w-[50px] text-right">
              {formatTime(flight.departureDatetime)}
            </div>

            {/* Middle: Top Circle */}
            <div className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />

            {/* Right: Departure Airport */}
            <div className="flex-1">
              <div className="font-medium text-sm md:text-base">
                {flight.departureCityName} {flight.departureAirportName}
                {flight.departureTerminal && (
                  <span className="ml-0.5">{flight.departureTerminal}</span>
                )}
              </div>
            </div>
          </div>

          {/* Middle Part: Duration & Timeline */}
          <div className="flex flex-row items-stretch gap-2 md:gap-3">
            {/* Left: Duration */}
            <div className="min-w-[45px] md:min-w-[50px] text-right flex items-center justify-end">
              <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded">
                {duration}
              </span>
            </div>

            {/* Middle: Vertical Line */}
            <div className="flex flex-col items-center shrink-0">
              <div className="w-px flex-1 bg-gray-300 min-h-[50px] md:min-h-[60px]" />
            </div>

            {/* Right: Empty */}
            <div className="flex-1" />
          </div>

          {/* Bottom Part: Arrival */}
          <div className="flex flex-row items-center gap-2 md:gap-3">
            {/* Left: Arrival Time */}
            <div className="text-sm md:text-base font-medium min-w-[45px] md:min-w-[50px] text-right">
              {formatTime(flight.arrivalDatetime)}
            </div>

            {/* Middle: Bottom Circle */}
            <div className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />

            {/* Right: Arrival Airport */}
            <div className="flex-1">
              <div className="font-medium text-sm md:text-base">
                {flight.arrivalCityName} {flight.arrivalAirportName}
                {flight.arrivalTerminal && (
                  <span className="ml-0.5">{flight.arrivalTerminal}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Airplane Info */}
        <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-2 md:gap-3 text-sm md:text-base text-muted-foreground md:text-foreground">
          <div className="flex flex-row gap-2 items-center">
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
