"use client";

import { Button } from "@ukesjtu/nomad-ui/components/primitives/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@ukesjtu/nomad-ui/components/primitives/collapsible";
import { ChevronDown } from "lucide-react";
import * as React from "react";
import type {
  UserSidebarMenuItem,
  UserSidebarProps,
} from "./user-sidebar-types";

export function UserSidebar({
  items,
  onNavigate,
  onUnimplementedClick,
}: UserSidebarProps) {
  // Determine if parent should be open based on active children
  const shouldBeOpen = (item: UserSidebarMenuItem): boolean => {
    if (!item.children) return false;
    return item.children.some(child => child.isActive);
  };

  // Render menu item with optional children (recursive)
  const renderMenuItem = (item: UserSidebarMenuItem): React.ReactNode => {
    const hasChildren = item.children && item.children.length > 0;

    if (hasChildren) {
      const isOpen = shouldBeOpen(item);

      // Parent item with children - only expand/collapse, no navigation
      return (
        <Collapsible
          key={item.title}
          className="group/collapsible"
          defaultOpen={isOpen}
        >
          <div>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between font-medium px-4!"
              >
                <span>{item.title}</span>
                <ChevronDown className="ml-auto h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="ml-2 space-y-1 mt-1">
                {item.children?.map(child => renderMenuItem(child))}
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      );
    }

    // Leaf item without children
    const isActive = item.isActive;
    const isImplemented = item.isImplemented !== false;

    // If not implemented, use Button with onClick
    if (!isImplemented) {
      return (
        <Button
          key={item.title}
          variant="ghost"
          className="w-full justify-start px-4"
          onClick={() => onUnimplementedClick(item.title)}
        >
          <span>{item.title}</span>
        </Button>
      );
    }

    // If implemented and has href, use Button with onClick for navigation
    if (item.href) {
      return (
        <Button
          key={item.title}
          variant={isActive ? "default" : "ghost"}
          className="w-full justify-start px-4"
          onClick={() => onNavigate(item.href as string)}
        >
          <span>{item.title}</span>
        </Button>
      );
    }

    // Fallback (shouldn't happen)
    return null;
  };

  return <div className="space-y-1">{items.map(renderMenuItem)}</div>;
}
