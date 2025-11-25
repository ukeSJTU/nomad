import { notFound, redirect } from "next/navigation";

import { requireAuth } from "@/domains/auth/utils/helpers";
import { getOrderForPayment } from "@/domains/booking/payment.repository";
import { getUserBalance } from "@/domains/user/user.repository";

import PaymentPageClient from "./page.client";
export const dynamic = "force-dynamic";

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
    redirect("/error?type=missing_order_id");
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
    // Redirect to error page if cancelled or refunded
    redirect("/error?type=invalid_order_status");
  }

  // Check if payment deadline has passed
  if (new Date() > order.paymentDeadline) {
    redirect("/error?type=payment_deadline_passed");
  }

  return <PaymentPageClient order={order} userBalance={userBalance} />;
}
