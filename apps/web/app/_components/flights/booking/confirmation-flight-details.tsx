import { ConfirmationFlightDetails as UiConfirmationFlightDetails } from "@ukesjtu/nomad-ui/components/flights/booking";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { createClientLogger } from "@/infra/logging/client-logger";
import { ConfirmationPageFlight } from "@/types/dto";

const logger = createClientLogger({
  module: "confirmation-flight-details",
});

interface ConfirmationFlightDetailsProps {
  outboundFlight: ConfirmationPageFlight;
  inboundFlight: ConfirmationPageFlight | null;
}

export function ConfirmationFlightDetails({
  outboundFlight,
  inboundFlight,
}: ConfirmationFlightDetailsProps) {
  logger.debug({ outboundFlight }, "Rendering confirmation flight details");

  // Format outbound flight for UI
  const formattedOutbound = {
    id: outboundFlight.id,
    flightNumber: outboundFlight.flightNumber,
    departureDatetime: format(
      outboundFlight.departureDatetime,
      "yyyy-MM-dd HH:mm",
      {
        locale: zhCN,
      }
    ),
    arrivalDatetime: format(
      outboundFlight.arrivalDatetime,
      "yyyy-MM-dd HH:mm",
      {
        locale: zhCN,
      }
    ),
    departureTerminal: outboundFlight.departureTerminal,
    arrivalTerminal: outboundFlight.arrivalTerminal,
    aircraftType: outboundFlight.aircraftType,
    airline: outboundFlight.airline,
    departureAirport: outboundFlight.departureAirport,
    arrivalAirport: outboundFlight.arrivalAirport,
    seatClass: outboundFlight.seatClass,
  };

  // Format inbound flight for UI if exists
  const formattedInbound = inboundFlight
    ? {
        id: inboundFlight.id,
        flightNumber: inboundFlight.flightNumber,
        departureDatetime: format(
          inboundFlight.departureDatetime,
          "yyyy-MM-dd HH:mm",
          {
            locale: zhCN,
          }
        ),
        arrivalDatetime: format(
          inboundFlight.arrivalDatetime,
          "yyyy-MM-dd HH:mm",
          {
            locale: zhCN,
          }
        ),
        departureTerminal: inboundFlight.departureTerminal,
        arrivalTerminal: inboundFlight.arrivalTerminal,
        aircraftType: inboundFlight.aircraftType,
        airline: inboundFlight.airline,
        departureAirport: inboundFlight.departureAirport,
        arrivalAirport: inboundFlight.arrivalAirport,
        seatClass: inboundFlight.seatClass,
      }
    : null;

  return (
    <UiConfirmationFlightDetails
      outboundFlight={formattedOutbound}
      inboundFlight={formattedInbound}
    />
  );
}
