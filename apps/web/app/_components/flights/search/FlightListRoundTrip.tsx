/**
 * Flight List Round-Trip Component
 *
 * Displays list of round-trip flight search results with outbound/return selection
 */

"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@nomad/ui/components/primitives/card";
import { useRouter } from "next/navigation";
import { FlightCard } from "@/components/flights/results";
import { FLIGHT_UI_TEXT } from "@/config/ui";
import {
  calculateDaysOffset,
  calculateFlightDuration,
  formatAirportDisplay,
  formatDuration,
  formatFlightTime,
} from "@/lib/flights";
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

  if (flights.length === 0) {
    return (
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>{FLIGHT_UI_TEXT.NO_FLIGHTS_FOUND}</CardTitle>
          <CardDescription>
            {FLIGHT_UI_TEXT.NO_FLIGHTS_DESCRIPTION}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

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

  const handleButtonClick = (flight: FlightSearchResult) => {
    // Find seat class matching the selected filter
    const selectedSeatClassForFlight =
      seatClass !== "any"
        ? flight.seatClasses.find(
            sc => sc.classType === seatClass.toUpperCase()
          )
        : undefined;

    if (!selectedSeatClassForFlight) {
      return;
    }

    if (activeTab === "outbound") {
      handleOutboundSelection(selectedSeatClassForFlight.id);
    } else {
      handleReturnSelection(selectedSeatClassForFlight.id);
    }
  };

  const handleSeatClassClick = (seatClassId: string) => {
    if (activeTab === "outbound") {
      handleOutboundSelection(seatClassId);
    } else {
      handleReturnSelection(seatClassId);
    }
  };

  return (
    <div className="space-y-4">
      {flights.map(flight => {
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

        return (
          <FlightCard
            key={flight.id}
            airlineLogo={flight.airline.logoUrl || undefined}
            airlineName={flight.airline.name}
            flightNumber={flight.flightNumber}
            aircraftType={flight.aircraftType || "N/A"}
            departureTime={formatFlightTime(flight.departure.datetime)}
            departureAirport={formatAirportDisplay(
              flight.departure.airport.name,
              flight.departure.terminal
            )}
            arrivalTime={formatFlightTime(flight.arrival.datetime)}
            arrivalAirport={formatAirportDisplay(
              flight.arrival.airport.name,
              flight.arrival.terminal
            )}
            daysOffset={daysOffset > 0 ? daysOffset : undefined}
            duration={formatDuration(durationMinutes)}
            seatClasses={flight.seatClasses.map(sc => ({
              id: sc.id,
              classType: sc.classType,
              totalSeats: sc.totalSeats,
              availableSeats: sc.availableSeats,
              price: parseFloat(sc.price),
            }))}
            lowestPrice={flight.lowestPrice}
            buttonText={
              activeTab === "outbound"
                ? FLIGHT_UI_TEXT.SELECT_OUTBOUND
                : FLIGHT_UI_TEXT.SELECT_RETURN
            }
            onButtonClick={
              selectedSeatClass ? () => handleButtonClick(flight) : undefined
            }
            onSeatClassClick={seatClassOption => {
              handleSeatClassClick(seatClassOption.id);
            }}
          />
        );
      })}
    </div>
  );
}
