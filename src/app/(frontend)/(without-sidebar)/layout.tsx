import { type ReactNode } from "react";

export default function WithoutSidebarLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
