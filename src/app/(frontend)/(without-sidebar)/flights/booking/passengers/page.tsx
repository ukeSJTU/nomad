import { redirect } from "next/navigation";

import { requireAuth } from "@/utils/auth-helpers";

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

  // If flight data not found, redirect back to search
  if (!outboundFlight) {
    redirect("/flights");
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
