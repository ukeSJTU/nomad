import { notFound, redirect } from "next/navigation";

import { getPaymentPageDataAction } from "@/actions/orders";

import PaymentPageClient from "./page.client";
export const dynamic = "force-dynamic";

export default async function BookingPaymentPage({
  searchParams,
}: {
  searchParams: Promise<{
    orderId?: string;
  }>;
}) {
  // Get orderId from search params
  const params = await searchParams;
  const orderId = params.orderId;

  if (!orderId) {
    redirect("/error?type=missing_order_id");
  }

  const paymentData = await getPaymentPageDataAction(orderId);

  if (!paymentData) {
    notFound();
  }

  const { order, balance: userBalance } = paymentData;

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
