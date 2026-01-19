"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@nomad/ui/components/primitives/breadcrumb";
import { cn } from "@nomad/ui/lib/utils";
import { useUiComponents } from "@nomad/ui/platform";

export interface BreadcrumbItem {
  /**
   * Display label for the breadcrumb item
   */
  label: string;
  /**
   * Navigation URL - if undefined, item is treated as current page
   */
  href?: string;
  /**
   * Optional click handler for custom navigation logic
   */
  onClick?: () => void;
}

export interface BreadcrumbNavProps {
  /**
   * Array of breadcrumb items to display
   * Last item without href is rendered as current page
   */
  items: BreadcrumbItem[];
  /**
   * Optional aria-label for the navigation landmark
   * @default "Breadcrumb Navigation"
   */
  ariaLabel?: string;
  /**
   * Optional className for the nav wrapper
   */
  className?: string;
}

/**
 * BreadcrumbNav - Generic breadcrumb navigation component
 *
 * Displays a breadcrumb trail with configurable items.
 * Uses Link adapter for navigation links.
 * Last item without href is rendered as non-clickable current page.
 *
 * @example
 * ```tsx
 * <BreadcrumbNav
 *   items={[
 *     { label: "首页", href: "/" },
 *     { label: "订单", href: "/orders" },
 *     { label: "订单详情" }
 *   ]}
 * />
 * ```
 */
export function BreadcrumbNav({
  items,
  ariaLabel = "Breadcrumb Navigation",
  className,
}: BreadcrumbNavProps) {
  const { Link } = useUiComponents();

  if (items.length === 0) {
    return null;
  }

  return (
    <nav aria-label={ariaLabel} className={cn("pt-4 pb-2 px-4", className)}>
      <Breadcrumb>
        <BreadcrumbList className="flex items-center gap-2 text-sm">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const isCurrentPage = isLast || !item.href;

            return (
              <div key={`${item.label}-${index}`} className="contents">
                <BreadcrumbItem>
                  {isCurrentPage ? (
                    <BreadcrumbPage className="text-foreground font-semibold">
                      {item.label}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link
                        href={item.href!}
                        onClick={item.onClick}
                        className="text-primary hover:text-primary/80 transition-colors duration-200 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary focus-visible:rounded-sm font-medium"
                      >
                        {item.label}
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>

                {!isLast && (
                  <BreadcrumbSeparator className="text-muted-foreground" />
                )}
              </div>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </nav>
  );
}
