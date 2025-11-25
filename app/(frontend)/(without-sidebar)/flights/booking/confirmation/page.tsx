import { notFound, redirect } from "next/navigation";

import { requireAuth } from "@/domains/auth/utils/helpers";
import { getOrderConfirmation } from "@/domains/booking";

import ConfirmationPageClient from "./page.client";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{
    orderId?: string;
  }>;
};

export default async function BookingConfirmationPage({
  searchParams,
}: PageProps) {
  // Check authentication (redirects to sign-in if not authenticated)
  const userId = await requireAuth();

  // Get orderId from search params
  const params = await searchParams;
  const orderId = params.orderId;

  if (!orderId) {
    redirect("/error?type=missing_order_id");
  }

  // Fetch order confirmation details
  const order = await getOrderConfirmation(orderId, userId);

  if (!order) {
    notFound();
  }

  // Check if order is confirmed (has been paid)
  if (order.status !== "CONFIRMED") {
    // Redirect to payment page if still pending payment
    if (order.status === "PENDING_PAYMENT") {
      redirect(`/flights/booking/payment?orderId=${orderId}`);
    }
    // Redirect to error page for cancelled or refunded orders
    redirect("/error?type=invalid_order_status");
  }

  return <ConfirmationPageClient order={order} />;
}
