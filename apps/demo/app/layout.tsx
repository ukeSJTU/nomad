import "../styles/global.css";
import "@ukesjtu/nomad-ui/globals.css";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Nomad Demo - Product Showcase",
  description:
    "Remotion-powered product demonstration for Nomad flight booking system",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="bg-background text-foreground">{children}</body>
    </html>
  );
}
