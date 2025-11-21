import { notFound, redirect } from "next/navigation";

import { requireAuth } from "@/utils/auth-helpers";

import ConfirmationPageClient from "./page.client";
import { getOrderConfirmation } from "./queries";

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
    redirect("/");
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
    // Redirect to home for cancelled or refunded orders
    redirect("/");
  }

  return <ConfirmationPageClient order={order} />;
}
