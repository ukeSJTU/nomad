import { getAllOrdersByUserId } from "@/domains/booking/orders.repository";
import { requireAuth } from "@/utils/auth-helpers";

import OrdersPageClient from "./page.client";

export const dynamic = "force-dynamic";

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
  // Check authentication (redirects to sign-in if not authenticated)
  const userId = await requireAuth();

  const allOrders = await getAllOrdersByUserId(userId);

  return <OrdersPageClient orders={allOrders} />;
}
