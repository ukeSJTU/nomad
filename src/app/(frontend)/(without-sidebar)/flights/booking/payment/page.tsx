import { notFound, redirect } from "next/navigation";

import { getOrderForPayment, getUserBalance } from "@/lib/queries";
import { requireAuth } from "@/utils/auth-helpers";

import PaymentPageClient from "./page.client";

export default async function BookingPaymentPage({
  searchParams,
}: {
  searchParams: Promise<{
    orderId?: string;
  }>;
}) {
  // Check authentication (redirects to sign-in if not authenticated)
  const userId = await requireAuth();

  // Get orderId from search params
  const params = await searchParams;
  const orderId = params.orderId;

  if (!orderId) {
    redirect("/flights/booking/passengers");
  }

  // Fetch order details and user balance in parallel
  const [order, userBalance] = await Promise.all([
    getOrderForPayment(orderId, userId),
    getUserBalance(userId),
  ]);

  if (!order) {
    notFound();
  }

  // Check if order is in correct status
  if (order.status !== "PENDING_PAYMENT") {
    // Redirect to confirmation page if already paid
    if (order.status === "CONFIRMED") {
      redirect(`/flights/booking/confirmation?orderId=${orderId}`);
    }
    // Redirect to home if cancelled or refunded
    redirect("/");
  }

  // Check if payment deadline has passed
  if (new Date() > order.paymentDeadline) {
    redirect("/");
  }

  return <PaymentPageClient order={order} userBalance={userBalance} />;
}
