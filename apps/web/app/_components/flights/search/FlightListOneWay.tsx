/**
 * Flight List One-Way Container Component
 *
 * Container for one-way flight search results list.
 * Handles data transformation and navigation logic.
 */

"use client";

import type { FlightCardProps } from "@nomad/ui/components/flights/results";
import { FlightListOneWay as FlightListOneWayUi } from "@nomad/ui/components/flights/search";
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

interface FlightListOneWayProps {
  /**
   * Array of flight search results
   */
  flights: FlightSearchResult[];

  /**
   * Selected seat class filter
   */
  seatClass: SeatClass;
}

export function FlightListOneWay({
  flights,
  seatClass,
}: FlightListOneWayProps) {
  const router = useRouter();

  const handleBooking = (seatClassId: string) => {
    router.push(`/flights/booking/passengers?seatClassId=${seatClassId}`);
  };

  const handleSeatClassClick = (seatClassId: string) => {
    router.push(`/flights/booking/passengers?seatClassId=${seatClassId}`);
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
      buttonText: FLIGHT_UI_TEXT.BOOK_BUTTON,
      onButtonClick: selectedSeatClass
        ? () => handleBooking(selectedSeatClass.id)
        : undefined,
      onSeatClassClick: seatClassOption => {
        handleSeatClassClick(seatClassOption.id);
      },
    };
  });

  return (
    <FlightListOneWayUi
      flights={transformedFlights}
      noFlightsTitle={FLIGHT_UI_TEXT.NO_FLIGHTS_FOUND}
      noFlightsDescription={FLIGHT_UI_TEXT.NO_FLIGHTS_DESCRIPTION}
      className="space-y-4"
    />
  );
}
