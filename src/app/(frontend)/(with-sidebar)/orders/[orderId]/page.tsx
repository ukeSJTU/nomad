import Link from "next/link";
import { notFound } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getOrderDetailById } from "@/lib/queries/orders";
import { requireAuth } from "@/utils/auth-helpers";

import OrderDetailsPageClient from "./page.client";

function BreadCrumbNav() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/home/info">我的携程</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/home/orders">机票订单</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>订单详情</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

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

  // Check authentication (redirects to sign-in with return URL if not authenticated)
  const userId = await requireAuth(`/orders/${orderId}`);

  // Fetch order details
  const order = await getOrderDetailById(orderId, userId);

  // Return 404 if order not found or user doesn't have permission
  if (!order) {
    notFound();
  }

  return (
    <div className="flex flex-col">
      <BreadCrumbNav />
      <OrderDetailsPageClient order={order} />;
    </div>
  );
}
