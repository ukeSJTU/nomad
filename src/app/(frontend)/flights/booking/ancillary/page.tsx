import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

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

  // Get user session
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList,
  });

  // Redirect to sign-in if not authenticated
  if (!session?.user?.id) {
    redirect("/auth/sign-in");
  }

  // Fetch order details
  const order = await getOrderById(params.orderId, session.user.id);

  // If order not found or doesn't belong to user, redirect
  if (!order) {
    redirect("/flights");
  }

  return <BookingAncillaryPageClient order={order} />;
}
