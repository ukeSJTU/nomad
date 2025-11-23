import { redirect } from "next/navigation";

import { getOrderForAncillary } from "@/lib/queries/booking";
import { requireAuth } from "@/utils/auth-helpers";

import { BookingAncillaryPageClient } from "./page.client";

export const dynamic = "force-dynamic";

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
    redirect("/error?type=missing_order_id");
  }

  // Check authentication (redirects to sign-in if not authenticated)
  const userId = await requireAuth();

  // Fetch order details
  const order = await getOrderForAncillary(params.orderId, userId);

  // If order not found or doesn't belong to user, redirect
  if (!order) {
    redirect("/error?type=order_not_found");
  }

  return <BookingAncillaryPageClient order={order} />;
}
