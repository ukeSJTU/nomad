import { notFound } from "next/navigation";

import { getOrderDetailAction } from "@/actions/orders";
import { BreadCrumbNav } from "@/components/common/bread-crumb-nav";

import OrderDetailsPageClient from "./page.client";

export const dynamic = "force-dynamic";

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
export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{
    orderId: string;
  }>;
}) {
  // Get orderId from params
  const resolvedParams = await params;
  const orderId = resolvedParams.orderId;

  const order = await getOrderDetailAction(orderId, `/orders/${orderId}`);

  // Return 404 if order not found or user doesn't have permission
  if (!order) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-0">
      <BreadCrumbNav />
      <OrderDetailsPageClient order={order} />
    </div>
  );
}
