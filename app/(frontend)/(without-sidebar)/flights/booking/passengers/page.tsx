import { redirect } from "next/navigation";

import { getBookingPassengersDataAction } from "@/actions/orders";

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

  const { outboundFlight, inboundFlight, savedPassengers } =
    await getBookingPassengersDataAction({
      seatClassId: params.seatClassId,
      outboundSeatClassId: params.outboundSeatClassId,
      inboundSeatClassId: params.inboundSeatClassId,
    });

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
