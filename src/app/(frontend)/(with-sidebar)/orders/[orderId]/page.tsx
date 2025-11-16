import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { auth } from "@/lib/auth";

import OrderDetailsPageClient from "./page.client";
import { getOrderDetails } from "./queries";

type PageProps = {
  params: Promise<{
    orderId: string;
  }>;
};

/**
 * Order Details Page - Server Component
 *
 * This page displays the complete order information including:
 * - Order status and actions
 * - Flight information (outbound and inbound if applicable)
 * - Passenger information
 * - Contact information
 * - Payment details
 *
 * Access Control:
 * - Requires authentication (handled by middleware)
 * - Only order owner can view the order
 */
export default async function OrderDetailsPage({ params }: PageProps) {
  // Get authentication
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList,
  });

  // Redirect to sign-in if not authenticated
  // This is a fallback - middleware should handle this
  if (!session?.user?.id) {
    const resolvedParams = await params;
    redirect(`/auth/sign-in?redirect=/orders/${resolvedParams.orderId}`);
  }

  // Get orderId from params
  const resolvedParams = await params;
  const orderId = resolvedParams.orderId;

  // Fetch order details
  const order = await getOrderDetails(orderId, session.user.id);

  // Return 404 if order not found or user doesn't have permission
  if (!order) {
    notFound();
  }

  return <OrderDetailsPageClient order={order} />;
}
