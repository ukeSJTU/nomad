import { redirect } from "next/navigation";

import { requireAuth } from "@/utils/auth-helpers";

import { BookingAncillaryPageClient } from "./page.client";
import { getOrderById } from "./queries";

interface BookingAncillaryPageProps {
  searchParams: Promise<{
    orderId?: string;
  }>;
}

export default async function BookingAncillaryPage({
  searchParams,
}: BookingAncillaryPageProps) {
  const params = await searchParams;

  // Redirect if no order ID provided
  if (!params.orderId) {
    redirect("/flights");
  }

  // Check authentication (redirects to sign-in if not authenticated)
  const userId = await requireAuth();

  // Fetch order details
  const order = await getOrderById(params.orderId, userId);

  // If order not found or doesn't belong to user, redirect
  if (!order) {
    redirect("/flights");
  }

  return <BookingAncillaryPageClient order={order} />;
}
