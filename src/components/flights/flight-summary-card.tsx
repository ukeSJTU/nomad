import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { Plane } from "lucide-react";

import type { FlightSeatClassDetails } from "@/app/(frontend)/flights/booking/passengers/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type FlightSummaryCardProps = {
  outboundFlight: FlightSeatClassDetails | null;
  inboundFlight?: FlightSeatClassDetails | null;
  passengerCount?: number;
};

/**
 * Format datetime to local time in the city's timezone
 */
function formatFlightTime(datetime: string, timezone: string): string {
  const date = new Date(datetime);
  const zonedDate = toZonedTime(date, timezone);
  return format(zonedDate, "HH:mm");
}

/**
 * Format date to display format
 */
function formatFlightDate(datetime: string, timezone: string): string {
  const date = new Date(datetime);
  const zonedDate = toZonedTime(date, timezone);
  return format(zonedDate, "yyyy-MM-dd");
}

/**
 * Get seat class display name in Chinese
 */
function getSeatClassDisplayName(classType: string): string {
  const classNames: Record<string, string> = {
    ECONOMY: "经济舱",
    BUSINESS: "商务舱",
    FIRST: "头等舱",
  };
  return classNames[classType] || classType;
}

/**
 * Flight Summary Card Component
 * Displays flight information in the booking flow sidebar
 */
export function FlightSummaryCard({
  outboundFlight,
  inboundFlight,
  passengerCount = 1,
}: FlightSummaryCardProps) {
  if (!outboundFlight) {
    return (
      <Card className="sticky top-4">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Plane className="h-5 w-5" />
            航班信息
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">加载中...</p>
        </CardContent>
      </Card>
    );
  }

  const calculateTotal = () => {
    const outboundPrice = parseFloat(outboundFlight.price);
    const inboundPrice = inboundFlight ? parseFloat(inboundFlight.price) : 0;
    return ((outboundPrice + inboundPrice) * passengerCount).toFixed(2);
  };

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Plane className="h-5 w-5" />
          航班信息
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Outbound Flight */}
        <div className="space-y-3">
          <div className="font-medium text-sm text-gray-500">
            {inboundFlight ? "去程航班" : "航班"}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">航班号</span>
            <span className="font-medium">
              {outboundFlight.flight.flightNumber}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">航空公司</span>
            <span className="font-medium">
              {outboundFlight.flight.airline.name}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">机型</span>
            <span className="font-medium">
              {outboundFlight.flight.aircraftType || "N/A"}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">舱位</span>
            <span className="font-medium">
              {getSeatClassDisplayName(outboundFlight.classType)}
            </span>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">出发</span>
              <div className="text-right">
                <div className="font-medium">
                  {formatFlightTime(
                    outboundFlight.flight.departure.datetime,
                    outboundFlight.flight.departure.city.timezone
                  )}
                </div>
                <div className="text-xs text-gray-500">
                  {formatFlightDate(
                    outboundFlight.flight.departure.datetime,
                    outboundFlight.flight.departure.city.timezone
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                {outboundFlight.flight.departure.city.name}
              </span>
              <span className="text-xs text-gray-500">
                {outboundFlight.flight.departure.airport.name}
                {outboundFlight.flight.departure.terminal &&
                  ` ${outboundFlight.flight.departure.terminal}`}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">到达</span>
              <div className="text-right">
                <div className="font-medium">
                  {formatFlightTime(
                    outboundFlight.flight.arrival.datetime,
                    outboundFlight.flight.arrival.city.timezone
                  )}
                </div>
                <div className="text-xs text-gray-500">
                  {formatFlightDate(
                    outboundFlight.flight.arrival.datetime,
                    outboundFlight.flight.arrival.city.timezone
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                {outboundFlight.flight.arrival.city.name}
              </span>
              <span className="text-xs text-gray-500">
                {outboundFlight.flight.arrival.airport.name}
                {outboundFlight.flight.arrival.terminal &&
                  ` ${outboundFlight.flight.arrival.terminal}`}
              </span>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">票价</span>
            <span className="font-medium text-lg">
              ¥{parseFloat(outboundFlight.price).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Inbound Flight (if round-trip) */}
        {inboundFlight && (
          <>
            <Separator className="my-4" />

            <div className="space-y-3">
              <div className="font-medium text-sm text-gray-500">返程航班</div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">航班号</span>
                <span className="font-medium">
                  {inboundFlight.flight.flightNumber}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">航空公司</span>
                <span className="font-medium">
                  {inboundFlight.flight.airline.name}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">舱位</span>
                <span className="font-medium">
                  {getSeatClassDisplayName(inboundFlight.classType)}
                </span>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">出发</span>
                  <div className="text-right">
                    <div className="font-medium">
                      {formatFlightTime(
                        inboundFlight.flight.departure.datetime,
                        inboundFlight.flight.departure.city.timezone
                      )}
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatFlightDate(
                        inboundFlight.flight.departure.datetime,
                        inboundFlight.flight.departure.city.timezone
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {inboundFlight.flight.departure.city.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {inboundFlight.flight.departure.airport.name}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">到达</span>
                  <div className="text-right">
                    <div className="font-medium">
                      {formatFlightTime(
                        inboundFlight.flight.arrival.datetime,
                        inboundFlight.flight.arrival.city.timezone
                      )}
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatFlightDate(
                        inboundFlight.flight.arrival.datetime,
                        inboundFlight.flight.arrival.city.timezone
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {inboundFlight.flight.arrival.city.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {inboundFlight.flight.arrival.airport.name}
                  </span>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">票价</span>
                <span className="font-medium text-lg">
                  ¥{parseFloat(inboundFlight.price).toFixed(2)}
                </span>
              </div>
            </div>
          </>
        )}

        {/* Total Price */}
        <Separator className="my-4" />

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">乘客人数</span>
            <span>{passengerCount}</span>
          </div>

          <div className="flex items-center justify-between font-semibold text-lg">
            <span>总计</span>
            <span className="text-primary">¥{calculateTotal()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
