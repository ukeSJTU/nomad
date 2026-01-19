import {
  FlightCard as FlightCardUi,
  type FlightCardProps as FlightCardUiProps,
  type SeatClassOption,
} from "@nomad/ui/components/flights/results";
import { formatCurrency } from "@/lib/format";

export type { SeatClassOption };

export interface FlightCardProps
  extends Omit<FlightCardUiProps, "formatCurrency"> {
  /** Airline logo URL */
  airlineLogo?: string;
  /** Airline name */
  airlineName: string;
  /** Flight number */
  flightNumber: string;
  /** Aircraft type */
  aircraftType: string;
  /** Departure time (HH:mm format) */
  departureTime: string;
  /** Departure airport */
  departureAirport: string;
  /** Arrival time (HH:mm format) */
  arrivalTime: string;
  /** Arrival airport */
  arrivalAirport: string;
  /** Days offset (optional, e.g., +1, +2) */
  daysOffset?: number;
  /** Total duration (e.g., "2h 55m") */
  duration: string;
  /** Price (number, in CNY) - for backward compatibility */
  price?: number;
  /** Seat class options - for new expandable card */
  seatClasses?: SeatClassOption[];
  /** Lowest price (number, in CNY) - for new expandable card */
  lowestPrice?: number;
  /** Button text */
  buttonText?: string;
  /** Button click handler - for backward compatibility (single price mode) */
  onButtonClick?: () => void;
  /** Seat class button click handler - for new expandable card */
  onSeatClassClick?: (seatClass: SeatClassOption) => void;
  /** Custom className */
  className?: string;
}

export function FlightCard(props: FlightCardProps) {
  return <FlightCardUi {...props} formatCurrency={formatCurrency} />;
}
