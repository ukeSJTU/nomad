import { FlightSummaryCard as UiFlightSummaryCard } from "@nomad/ui/components/flights/booking";
import { formatCurrency, formatDateWithWeekday } from "@/lib/format";
import type { PassengerPageFlight } from "@/types/dto";

export type FlightSummaryCardProps = {
  outboundFlight: PassengerPageFlight | null;
  inboundFlight?: PassengerPageFlight | null;
  passengerCount?: number;
};

export function FlightSummaryCard({
  outboundFlight,
  inboundFlight,
  passengerCount = 1,
}: FlightSummaryCardProps) {
  return (
    <UiFlightSummaryCard
      outboundFlight={outboundFlight}
      inboundFlight={inboundFlight}
      passengerCount={passengerCount}
      formatCurrency={formatCurrency}
      formatDateWithWeekday={formatDateWithWeekday}
    />
  );
}
