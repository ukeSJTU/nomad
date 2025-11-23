import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

/**
 * Breadcrumb Navigation Component
 *
 * Displays a breadcrumb navigation trail for the order details page.
 * Uses semantic HTML (nav element) through the Breadcrumb component.
 *
 * Navigation hierarchy:
 * - 我的携程 (My Ctrip) -> /home/info
 * - 机票订单 (Flight Orders) -> /home/orders
 * - 订单详情 (Order Details) - Current page
 */
export function BreadCrumbNav() {
  return (
    <nav aria-label="Breadcrumb Navigation" className="pt-4 pb-2 px-4">
      <Breadcrumb>
        <BreadcrumbList className="flex items-center gap-2 text-sm">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                href="/home/info"
                className="text-primary hover:text-primary/80 transition-colors duration-200 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary focus-visible:rounded-sm font-medium"
              >
                我的携程
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-muted-foreground" />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                href="/home/orders"
                className="text-primary hover:text-primary/80 transition-colors duration-200 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary focus-visible:rounded-sm font-medium"
              >
                机票订单
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-muted-foreground" />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-foreground font-semibold">
              订单详情
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </nav>
  );
}
