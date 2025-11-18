import { headers } from "next/headers";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { auth } from "@/lib/auth";
import { getOrderDetailById } from "@/lib/queries/orders";

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
  const order = await getOrderDetailById(orderId, session.user.id);

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
