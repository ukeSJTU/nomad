import { Separator } from "@nomad/ui/components/separator";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { createClientLogger } from "@/infra/logging/client-logger";
import { ConfirmationPageFlight } from "@/types/dto";

const logger = createClientLogger({
  module: "confirmation-flight-details",
});

// Seat class type mapping
const SEAT_CLASS_MAP = {
  economy: "经济舱",
  business: "商务舱",
  first: "头等舱",
} as const;

interface ConfirmationFlightDetailsProps {
  outboundFlight: ConfirmationPageFlight;
  inboundFlight: ConfirmationPageFlight | null;
}

export function ConfirmationFlightDetails({
  outboundFlight,
  inboundFlight,
}: ConfirmationFlightDetailsProps) {
  logger.debug({ outboundFlight }, "Rendering confirmation flight details");
  return (
    <div className="space-y-4">
      {/* Outbound Flight Information */}
      <div>
        <div className="text-sm text-muted-foreground mb-3">
          {inboundFlight ? "去程航班" : "航班信息"}
        </div>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-muted-foreground">航班号</div>
              <div className="font-medium">{outboundFlight.flightNumber}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">航空公司</div>
              <div className="font-medium">{outboundFlight.airline.name}</div>
            </div>
            {outboundFlight.aircraftType && (
              <div>
                <div className="text-xs text-muted-foreground">机型</div>
                <div className="font-medium">{outboundFlight.aircraftType}</div>
              </div>
            )}
            <div>
              <div className="text-xs text-muted-foreground">舱位</div>
              <div className="font-medium">
                {SEAT_CLASS_MAP[outboundFlight.seatClass.classType]}
              </div>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-muted-foreground mb-1">出发</div>
              <div className="font-medium">
                {format(outboundFlight.departureDatetime, "yyyy-MM-dd HH:mm", {
                  locale: zhCN,
                })}
              </div>
              <div className="text-sm text-muted-foreground">
                {outboundFlight.departureAirport.name}
                {outboundFlight.departureTerminal &&
                  ` ${outboundFlight.departureTerminal}`}
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">到达</div>
              <div className="font-medium">
                {format(outboundFlight.arrivalDatetime, "yyyy-MM-dd HH:mm", {
                  locale: zhCN,
                })}
              </div>
              <div className="text-sm text-muted-foreground">
                {outboundFlight.arrivalAirport.name}
                {outboundFlight.arrivalTerminal &&
                  ` ${outboundFlight.arrivalTerminal}`}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inbound Flight Information */}
      {inboundFlight && (
        <>
          <Separator />
          <div>
            <div className="text-sm text-muted-foreground mb-3">返程航班</div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-muted-foreground">航班号</div>
                  <div className="font-medium">
                    {inboundFlight.flightNumber}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">航空公司</div>
                  <div className="font-medium">
                    {inboundFlight.airline.name}
                  </div>
                </div>
                {inboundFlight.aircraftType && (
                  <div>
                    <div className="text-xs text-muted-foreground">机型</div>
                    <div className="font-medium">
                      {inboundFlight.aircraftType}
                    </div>
                  </div>
                )}
                <div>
                  <div className="text-xs text-muted-foreground">舱位</div>
                  <div className="font-medium">
                    {SEAT_CLASS_MAP[inboundFlight.seatClass.classType]}
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">出发</div>
                  <div className="font-medium">
                    {format(
                      inboundFlight.departureDatetime,
                      "yyyy-MM-dd HH:mm",
                      {
                        locale: zhCN,
                      }
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {inboundFlight.departureAirport.name}
                    {inboundFlight.departureTerminal &&
                      ` ${inboundFlight.departureTerminal}`}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">到达</div>
                  <div className="font-medium">
                    {format(inboundFlight.arrivalDatetime, "yyyy-MM-dd HH:mm", {
                      locale: zhCN,
                    })}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {inboundFlight.arrivalAirport.name}
                    {inboundFlight.arrivalTerminal &&
                      ` ${inboundFlight.arrivalTerminal}`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
