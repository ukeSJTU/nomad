import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { auth } from "@/lib/auth";

import PaymentPageClient from "./page.client";
import { getOrderForPayment, getUserBalance } from "./queries";

type PageProps = {
  searchParams: Promise<{
    orderId?: string;
  }>;
};

export default async function BookingPaymentPage({ searchParams }: PageProps) {
  // Get authentication
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session?.user?.id) {
    redirect("/auth/sign-in");
  }

  // Get orderId from search params
  const params = await searchParams;
  const orderId = params.orderId;

  if (!orderId) {
    redirect("/flights/booking/passengers");
  }

  // Fetch order details and user balance in parallel
  const [order, userBalance] = await Promise.all([
    getOrderForPayment(orderId, session.user.id),
    getUserBalance(session.user.id),
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
