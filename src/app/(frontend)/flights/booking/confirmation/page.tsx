import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { auth } from "@/lib/auth";

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
    redirect("/");
  }

  // Fetch order confirmation details
  const order = await getOrderConfirmation(orderId, session.user.id);

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
