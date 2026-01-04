import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@nomad/ui/components/primitives/card";
import { Separator } from "@nomad/ui/components/primitives/separator";
import { Clock, Plane } from "lucide-react";
import {
  addCurrency,
  formatCurrency,
  formatDateWithWeekday,
  getCurrencyValue,
  multiplyCurrency,
  parseCurrency,
} from "@/lib/format";
import type { PassengerPageFlight } from "@/types/dto";

type FlightSummaryCardProps = {
  outboundFlight: PassengerPageFlight | null;
  inboundFlight?: PassengerPageFlight | null;
  passengerCount?: number;
};

type FlightSegmentProps = {
  flight: PassengerPageFlight;
  type?: "outbound" | "inbound";
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
function FlightSegment({ flight, type = "outbound" }: FlightSegmentProps) {
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
    <div className="space-y-4 flex flex-col items-center py-2">
      {/* Date and Route Header */}
      <div className="font-semibold text-lg flex items-center gap-2.5 flex-wrap justify-center">
        <span className="bg-foreground text-background px-2.5 py-1 text-sm rounded-md font-medium">
          {type === "outbound" ? "去" : "返"}
        </span>
        <span className="text-muted-foreground text-base">
          {formatDateWithWeekday(departure)}
        </span>
        <span className="font-bold text-foreground">
          {flight.flight.departure.city.name} →{" "}
          {flight.flight.arrival.city.name}
        </span>
      </div>

      {/* Airline Info */}
      <div className="flex items-center gap-2.5 text-sm text-muted-foreground flex-wrap justify-center">
        {flight.flight.airline.logoUrl && (
          <img
            src={flight.flight.airline.logoUrl}
            alt={flight.flight.airline.name}
            className="h-5 w-5 object-contain"
          />
        )}
        <span className="font-medium text-destructive">
          {flight.flight.airline.name}
        </span>
        <span className="font-medium">{flight.flight.flightNumber}</span>
        <span>空客{flight.flight.aircraftType || "330"}</span>
        <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-md text-xs font-medium">
          {seatClassText}
        </span>
      </div>

      {/* Time and Duration Info */}
      <div className="flex items-center justify-center gap-8 md:gap-12">
        <div className="text-3xl font-bold text-foreground">
          {formatFlightTime(departure)}
        </div>
        <div className="flex flex-col items-center gap-1">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
            {hours}h{minutes}m
          </span>
        </div>
        <div className="text-3xl font-bold text-foreground">
          {formatFlightTime(arrival)}
        </div>
      </div>

      {/* Airport Info */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 w-full max-w-md">
        <div className="text-sm font-semibold text-right text-muted-foreground">
          {flight.flight.departure.airport.name}
        </div>
        <div className="w-32 border-t-2 border-border/60 relative">
          <Plane className="h-6 w-6 text-primary absolute -top-3 left-1/2 -translate-x-1/2 bg-card rotate-45" />
        </div>
        <div className="text-sm font-semibold text-left text-muted-foreground">
          {flight.flight.arrival.airport.name}
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

  const outboundPrice = parseCurrency(outboundFlight.price);
  const inboundPrice = inboundFlight
    ? parseCurrency(inboundFlight.price)
    : parseCurrency(0);
  const totalPricePerTicket = addCurrency(
    getCurrencyValue(outboundPrice),
    getCurrencyValue(inboundPrice)
  );
  const totalPrice = multiplyCurrency(
    getCurrencyValue(totalPricePerTicket),
    passengerCount
  );

  return (
    <Card className="sticky top-4 border-border/60 shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold tracking-tight">
          <span className="bg-linear-to-r from-foreground to-foreground/80 bg-clip-text">
            航班信息
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Outbound Flight */}
        <FlightSegment flight={outboundFlight} type="outbound" />

        {/* Inbound Flight */}
        {inboundFlight && (
          <>
            <Separator className="my-4" />
            <FlightSegment flight={inboundFlight} type="inbound" />
          </>
        )}

        <Separator className="my-4" />

        {/* Price Summary */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">去程票价</span>
            <span className="font-medium">{formatCurrency(outboundPrice)}</span>
          </div>

          {inboundFlight && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">返程票价</span>
              <span className="font-medium">
                {formatCurrency(inboundPrice)}
              </span>
            </div>
          )}

          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">乘客人数</span>
            <span className="font-medium">{passengerCount}</span>
          </div>

          <Separator className="my-3" />

          <div className="flex justify-between items-center text-lg font-semibold pt-2">
            <span>总计</span>
            <span className="text-primary text-xl">
              {formatCurrency(totalPrice)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
