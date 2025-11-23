import { format } from "date-fns";
import { zhCN } from "date-fns/locale";

import { Separator } from "@/components/ui/separator";
import { ConfirmationPageFlightDTO } from "@/types/dto/booking";

// Seat class type mapping
const SEAT_CLASS_MAP = {
  economy: "经济舱",
  business: "商务舱",
  first: "头等舱",
} as const;

interface ConfirmationFlightDetailsProps {
  outboundFlight: ConfirmationPageFlightDTO;
  inboundFlight: ConfirmationPageFlightDTO | null;
}

export function ConfirmationFlightDetails({
  outboundFlight,
  inboundFlight,
}: ConfirmationFlightDetailsProps) {
  return (
    <div className="space-y-4">
      {/* Outbound Flight Information */}
      <div>
        <div className="text-sm text-gray-500 mb-3">
          {inboundFlight ? "去程航班" : "航班信息"}
        </div>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-gray-500">航班号</div>
              <div className="font-medium">{outboundFlight.flightNumber}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">航空公司</div>
              <div className="font-medium">{outboundFlight.airline.name}</div>
            </div>
            {outboundFlight.aircraftType && (
              <div>
                <div className="text-xs text-gray-500">机型</div>
                <div className="font-medium">{outboundFlight.aircraftType}</div>
              </div>
            )}
            <div>
              <div className="text-xs text-gray-500">舱位</div>
              <div className="font-medium">
                {SEAT_CLASS_MAP[outboundFlight.seatClass.classType]}
              </div>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-gray-500 mb-1">出发</div>
              <div className="font-medium">
                {format(outboundFlight.departureDatetime, "yyyy-MM-dd HH:mm", {
                  locale: zhCN,
                })}
              </div>
              <div className="text-sm text-gray-600">
                {outboundFlight.departureAirport.name}
                {outboundFlight.departureTerminal &&
                  ` ${outboundFlight.departureTerminal}`}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">到达</div>
              <div className="font-medium">
                {format(outboundFlight.arrivalDatetime, "yyyy-MM-dd HH:mm", {
                  locale: zhCN,
                })}
              </div>
              <div className="text-sm text-gray-600">
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
            <div className="text-sm text-gray-500 mb-3">返程航班</div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-500">航班号</div>
                  <div className="font-medium">
                    {inboundFlight.flightNumber}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">航空公司</div>
                  <div className="font-medium">
                    {inboundFlight.airline.name}
                  </div>
                </div>
                {inboundFlight.aircraftType && (
                  <div>
                    <div className="text-xs text-gray-500">机型</div>
                    <div className="font-medium">
                      {inboundFlight.aircraftType}
                    </div>
                  </div>
                )}
                <div>
                  <div className="text-xs text-gray-500">舱位</div>
                  <div className="font-medium">
                    {SEAT_CLASS_MAP[inboundFlight.seatClass.classType]}
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-500 mb-1">出发</div>
                  <div className="font-medium">
                    {format(
                      inboundFlight.departureDatetime,
                      "yyyy-MM-dd HH:mm",
                      {
                        locale: zhCN,
                      }
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    {inboundFlight.departureAirport.name}
                    {inboundFlight.departureTerminal &&
                      ` ${inboundFlight.departureTerminal}`}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">到达</div>
                  <div className="font-medium">
                    {format(inboundFlight.arrivalDatetime, "yyyy-MM-dd HH:mm", {
                      locale: zhCN,
                    })}
                  </div>
                  <div className="text-sm text-gray-600">
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
