/**
 * Flight List One-Way Component
 *
 * Displays list of one-way flight search results
 */

"use client";

import { useRouter } from "next/navigation";

import { FlightCard } from "@/components/flights/results";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

  const handleBooking = (seatClassId: string) => {
    router.push(`/flights/booking/passengers?seatClassId=${seatClassId}`);
  };

  const handleSeatClassClick = (seatClassId: string) => {
    router.push(`/flights/booking/passengers?seatClassId=${seatClassId}`);
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
            buttonText={FLIGHT_UI_TEXT.BOOK_BUTTON}
            onButtonClick={
              selectedSeatClass
                ? () => handleBooking(selectedSeatClass.id)
                : undefined
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
