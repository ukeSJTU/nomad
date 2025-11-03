import { redirect } from "next/navigation";

import { FlightSummaryCard } from "@/components/flights/flight-summary-card";

import { BookingPassengersPageClient } from "./page.client";
import { getFlightSeatClassById, getFlightSeatClassesByIds } from "./queries";

interface BookingPassengersPageProps {
  searchParams: Promise<{
    seatClassId?: string;
    outboundSeatClassId?: string;
    inboundSeatClassId?: string;
  }>;
}

export default async function BookingPassengersPage({
  searchParams,
}: BookingPassengersPageProps) {
  const params = await searchParams;

  // Redirect if no flight seat class IDs provided
  if (!params.seatClassId && !params.outboundSeatClassId) {
    redirect("/flights");
  }

  // Fetch flight details based on trip type
  let outboundFlight = null;
  let inboundFlight = null;

  if (params.seatClassId) {
    // One-way flight
    outboundFlight = await getFlightSeatClassById(params.seatClassId);
  } else if (params.outboundSeatClassId) {
    // Round-trip flight
    const flights = await getFlightSeatClassesByIds([
      params.outboundSeatClassId,
      ...(params.inboundSeatClassId ? [params.inboundSeatClassId] : []),
    ]);

    outboundFlight = flights[0] || null;
    inboundFlight = flights[1] || null;
  }

  // If flight data not found, redirect back to search
  if (!outboundFlight) {
    redirect("/flights");
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Content - Left Side */}
      <div className="lg:col-span-2">
        <BookingPassengersPageClient
          seatClassId={params.seatClassId}
          outboundSeatClassId={params.outboundSeatClassId}
          inboundSeatClassId={params.inboundSeatClassId}
        />
      </div>

      {/* Right Sidebar - Flight Summary */}
      <div className="lg:col-span-1">
        <FlightSummaryCard
          outboundFlight={outboundFlight}
          inboundFlight={inboundFlight}
          passengerCount={1}
        />
      </div>
    </div>
  );
}
