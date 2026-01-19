import {
  type BreadcrumbItem,
  BreadcrumbNav as BreadcrumbNavUI,
} from "@nomad/ui/components/common";

/**
 * Breadcrumb Navigation Container
 *
 * Provides breadcrumb navigation for the order details page.
 * This container is responsible for configuring the breadcrumb items
 * specific to this page context.
 *
 * Navigation hierarchy:
 * - 我的携程 (My Ctrip) -> /home/info
 * - 机票订单 (Flight Orders) -> /home/orders
 * - 订单详情 (Order Details) - Current page
 */
export function BreadCrumbNav() {
  const items: BreadcrumbItem[] = [
    {
      label: "我的携程",
      href: "/home/info",
    },
    {
      label: "机票订单",
      href: "/home/orders",
    },
    {
      label: "订单详情",
      // No href - renders as current page
    },
  ];

  return <BreadcrumbNavUI items={items} ariaLabel="Breadcrumb Navigation" />;
}
