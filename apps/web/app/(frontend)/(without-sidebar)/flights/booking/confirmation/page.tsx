import { notFound, redirect } from "next/navigation";

import { getOrderConfirmationAction } from "@/actions/orders";

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
  // Get orderId from search params
  const params = await searchParams;
  const orderId = params.orderId;

  if (!orderId) {
    redirect("/error?type=missing_order_id");
  }

  const order = await getOrderConfirmationAction(orderId);

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
