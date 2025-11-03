import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { FlightSummaryCard } from "@/components/flights/flight-summary-card";
import { auth } from "@/lib/auth";

import { BookingPassengersPageClient } from "./page.client";
import { getFlightSeatClassById, getSavedPassengers } from "./queries";

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

  // Get user session
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList,
  });

  // Redirect to sign-in if not authenticated
  if (!session?.user?.id) {
    redirect("/auth/sign-in");
  }

  // Fetch flight details and saved passengers in parallel
  const [outboundFlightData, inboundFlightData, savedPassengers] =
    await Promise.all([
      params.seatClassId
        ? getFlightSeatClassById(params.seatClassId)
        : params.outboundSeatClassId
          ? getFlightSeatClassById(params.outboundSeatClassId)
          : null,
      params.inboundSeatClassId
        ? getFlightSeatClassById(params.inboundSeatClassId)
        : null,
      getSavedPassengers(session.user.id),
    ]);

  const outboundFlight = outboundFlightData;
  const inboundFlight = inboundFlightData;

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
          savedPassengers={savedPassengers}
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
