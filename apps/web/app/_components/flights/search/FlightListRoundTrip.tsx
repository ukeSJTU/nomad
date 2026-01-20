/**
 * Flight List Round-Trip Container Component
 *
 * Container for round-trip flight search results list.
 * Handles data transformation, outbound/return selection, and navigation logic.
 */

"use client";

import type { FlightCardProps } from "@ukesjtu/nomad-ui/components/flights/results";
import { FlightListRoundTrip as FlightListRoundTripUi } from "@ukesjtu/nomad-ui/components/flights/search";
import { useRouter } from "next/navigation";
import { FLIGHT_UI_TEXT } from "@/config/ui";
import {
  calculateDaysOffset,
  calculateFlightDuration,
  formatAirportDisplay,
  formatDuration,
  formatFlightTime,
} from "@/lib/flights";
import { formatCurrency } from "@/lib/format";
import type { FlightSearchResult } from "@/types/dto";
import type { SeatClass } from "@/types/validations";

interface FlightListRoundTripProps {
  /**
   * Array of flight search results (outbound or return based on active tab)
   */
  flights: FlightSearchResult[];

  /**
   * Active tab (outbound or return)
   */
  activeTab: "outbound" | "return";

  /**
   * Selected seat class filter
   */
  seatClass: SeatClass;

  /**
   * Selected outbound seat class ID (used when booking return flight)
   */
  selectedOutboundSeatClassId: string | null;

  /**
   * Callback when outbound flight is selected
   */
  onOutboundSelect: (seatClassId: string) => void;
}

export function FlightListRoundTrip({
  flights,
  activeTab,
  seatClass,
  selectedOutboundSeatClassId,
  onOutboundSelect,
}: FlightListRoundTripProps) {
  const router = useRouter();

  const handleOutboundSelection = (seatClassId: string) => {
    onOutboundSelect(seatClassId);
  };

  const handleReturnSelection = (returnSeatClassId: string) => {
    if (!selectedOutboundSeatClassId) {
      return;
    }

    router.push(
      `/flights/booking/passengers?outboundSeatClassId=${selectedOutboundSeatClassId}&inboundSeatClassId=${returnSeatClassId}`
    );
  };

  const handleSeatClassClick = (seatClassId: string) => {
    if (activeTab === "outbound") {
      handleOutboundSelection(seatClassId);
    } else {
      handleReturnSelection(seatClassId);
    }
  };

  // Transform FlightSearchResult[] to FlightCardProps[]
  const transformedFlights: FlightCardProps[] = flights.map(flight => {
    const durationMinutes = calculateFlightDuration(
      flight.departure.datetime,
      flight.arrival.datetime
    );
    const daysOffset = calculateDaysOffset(
      flight.departure.datetime,
      flight.arrival.datetime
    );

    // Find seat class matching the selected filter
    const selectedSeatClass =
      seatClass !== "any"
        ? flight.seatClasses.find(
            sc => sc.classType === seatClass.toUpperCase()
          )
        : undefined;

    return {
      airlineLogo: flight.airline.logoUrl || undefined,
      airlineName: flight.airline.name,
      flightNumber: flight.flightNumber,
      aircraftType: flight.aircraftType || "N/A",
      departureTime: formatFlightTime(flight.departure.datetime),
      departureAirport: formatAirportDisplay(
        flight.departure.airport.name,
        flight.departure.terminal
      ),
      arrivalTime: formatFlightTime(flight.arrival.datetime),
      arrivalAirport: formatAirportDisplay(
        flight.arrival.airport.name,
        flight.arrival.terminal
      ),
      daysOffset: daysOffset > 0 ? daysOffset : undefined,
      duration: formatDuration(durationMinutes),
      seatClasses: flight.seatClasses.map(sc => ({
        id: sc.id,
        classType: sc.classType,
        totalSeats: sc.totalSeats,
        availableSeats: sc.availableSeats,
        price: parseFloat(sc.price),
      })),
      lowestPrice: flight.lowestPrice,
      formatCurrency,
      buttonText:
        activeTab === "outbound"
          ? FLIGHT_UI_TEXT.SELECT_OUTBOUND
          : FLIGHT_UI_TEXT.SELECT_RETURN,
      onButtonClick: selectedSeatClass
        ? () => handleSeatClassClick(selectedSeatClass.id)
        : undefined,
      onSeatClassClick: seatClassOption => {
        handleSeatClassClick(seatClassOption.id);
      },
    };
  });

  return (
    <FlightListRoundTripUi
      flights={transformedFlights}
      activeTab={activeTab}
      noFlightsTitle={FLIGHT_UI_TEXT.NO_FLIGHTS_FOUND}
      noFlightsDescription={FLIGHT_UI_TEXT.NO_FLIGHTS_DESCRIPTION}
      className="space-y-4"
    />
  );
}
