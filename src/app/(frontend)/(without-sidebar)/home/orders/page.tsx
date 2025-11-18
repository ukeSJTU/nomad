import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { getAllOrdersByUserId } from "@/lib/queries/orders";

import OrdersPageClient from "./page.client";

/**
 * Orders Management Page (Server Component)
 *
 * @description
 * Server-side page component that handles user authentication and initial data fetching
 * for the orders management interface. Implements the server-client component pattern
 * for optimal performance and user experience.
 *
 * @remarks
 * Authentication Flow:
 * - Validates user session using Better Auth
 * - Redirects unauthenticated users to sign-in page
 *
 * Data Fetching Strategy:
 * - Fetches all orders in a single database query for optimal performance
 * - Client-side filtering provides instant tab switching without re-fetching
 * - Reduces database load by eliminating redundant queries
 *
 * Route: /home/orders
 */
export default async function OrdersPage() {
  const headersList = await headers();
  const session = await auth.api.getSession({ headers: headersList });

  if (!session?.user?.id) {
    redirect("/auth/sign-in");
  }

  const allOrders = await getAllOrdersByUserId(session.user.id);

  return <OrdersPageClient orders={allOrders} />;
}
