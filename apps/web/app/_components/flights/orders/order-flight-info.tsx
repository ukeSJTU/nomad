"use client";

import {
  type OrderFlightInfoFlightData,
  OrderFlightInfo as OrderFlightInfoUI,
} from "@nomad/ui/components/flights/orders";
import type { OrderDetailFull } from "@/types/dto";

export type OrderFlightInfoProps = {
  outboundFlight: OrderDetailFull["outboundFlight"];
  inboundFlight: OrderDetailFull["inboundFlight"];
};

/**
 * Order Flight Information Container Component
 *
 * Container that maps OrderDetailFull flight data to UI component props.
 * All formatting logic is delegated to the UI component's default formatters.
 */
export function OrderFlightInfo({
  outboundFlight,
  inboundFlight,
}: OrderFlightInfoProps) {
  // Map container data to UI props
  const outboundFlightData: OrderFlightInfoFlightData = {
    flightNumber: outboundFlight.flightNumber,
    airlineName: outboundFlight.airlineName,
    airlineIataCode: outboundFlight.airlineIataCode,
    airlineLogoUrl: outboundFlight.airlineLogoUrl,
    departureAirportName: outboundFlight.departureAirportName,
    departureAirportIataCode: outboundFlight.departureAirportIataCode,
    departureCityName: outboundFlight.departureCityName,
    arrivalAirportName: outboundFlight.arrivalAirportName,
    arrivalAirportIataCode: outboundFlight.arrivalAirportIataCode,
    arrivalCityName: outboundFlight.arrivalCityName,
    departureDatetime: outboundFlight.departureDatetime,
    arrivalDatetime: outboundFlight.arrivalDatetime,
    seatClassType: outboundFlight.seatClassType,
    duration: outboundFlight.duration,
    aircraftType: outboundFlight.aircraftType,
    departureTerminal: outboundFlight.departureTerminal,
    arrivalTerminal: outboundFlight.arrivalTerminal,
  };

  const inboundFlightData: OrderFlightInfoFlightData | null = inboundFlight
    ? {
        flightNumber: inboundFlight.flightNumber,
        airlineName: inboundFlight.airlineName,
        airlineIataCode: inboundFlight.airlineIataCode,
        airlineLogoUrl: inboundFlight.airlineLogoUrl,
        departureAirportName: inboundFlight.departureAirportName,
        departureAirportIataCode: inboundFlight.departureAirportIataCode,
        departureCityName: inboundFlight.departureCityName,
        arrivalAirportName: inboundFlight.arrivalAirportName,
        arrivalAirportIataCode: inboundFlight.arrivalAirportIataCode,
        arrivalCityName: inboundFlight.arrivalCityName,
        departureDatetime: inboundFlight.departureDatetime,
        arrivalDatetime: inboundFlight.arrivalDatetime,
        seatClassType: inboundFlight.seatClassType,
        duration: inboundFlight.duration,
        aircraftType: inboundFlight.aircraftType,
        departureTerminal: inboundFlight.departureTerminal,
        arrivalTerminal: inboundFlight.arrivalTerminal,
      }
    : null;

  return (
    <OrderFlightInfoUI
      outboundFlight={outboundFlightData}
      inboundFlight={inboundFlightData}
    />
  );
}
