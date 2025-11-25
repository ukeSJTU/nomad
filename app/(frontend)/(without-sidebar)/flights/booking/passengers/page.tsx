import { redirect } from "next/navigation";

import { requireAuth } from "@/domains/auth/utils/helpers";
import { getFlightSeatClassById, getSavedPassengers } from "@/domains/booking";

import { BookingPassengersPageClient } from "./page.client";
export const dynamic = "force-dynamic";

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
    redirect("/error?type=missing_seat_class");
  }

  // Check authentication (redirects to sign-in if not authenticated)
  const userId = await requireAuth();

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
      getSavedPassengers(userId),
    ]);

  const outboundFlight = outboundFlightData;
  const inboundFlight = inboundFlightData;

  // If flight data not found, redirect to error page
  if (!outboundFlight) {
    redirect("/error?type=flight_not_found");
  }

  return (
    <BookingPassengersPageClient
      seatClassId={params.seatClassId}
      outboundSeatClassId={params.outboundSeatClassId}
      inboundSeatClassId={params.inboundSeatClassId}
      savedPassengers={savedPassengers}
      outboundFlight={outboundFlight}
      inboundFlight={inboundFlight}
    />
  );
}
