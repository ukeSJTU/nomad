import { type ReactNode } from "react";

import { SidebarWrapper } from "./sidebar-wrapper";

export default function WithSidebarLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <SidebarWrapper>{children}</SidebarWrapper>;
}
