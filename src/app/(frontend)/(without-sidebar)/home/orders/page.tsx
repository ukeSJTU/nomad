import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import {
  getPendingPaymentOrders,
  getUpcomingOrders,
  getUserOrders,
} from "@/lib/queries/orders";

import OrdersPageClient from "./page.client";

/**
 * Orders Page (Server Component)
 *
 * Purpose:
 * - Verify user authentication
 * - Fetch initial order data for all tabs
 * - Pass data to client component for rendering and interaction
 *
 * Route: /home/orders
 */
export default async function OrdersPage() {
  // Step 1: Verify authentication
  const headersList = await headers();
  const session = await auth.api.getSession({ headers: headersList });

  if (!session?.user?.id) {
    redirect("/auth/sign-in");
  }

  // Step 2: Fetch order data for all tabs in parallel
  const [allOrders, upcomingOrders, pendingPaymentOrders] = await Promise.all([
    getUserOrders(session.user.id),
    getUpcomingOrders(session.user.id),
    getPendingPaymentOrders(session.user.id),
  ]);

  // Step 3: Pass data to client component
  return (
    <OrdersPageClient
      allOrders={allOrders}
      upcomingOrders={upcomingOrders}
      pendingPaymentOrders={pendingPaymentOrders}
    />
  );
}
