import { Toaster } from "@nomad/ui/components/primitives/sonner";
import { UiProvider } from "@nomad/ui/platform";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import NextImage from "next/image";
import NextLink from "next/link";
import { ThemeProvider } from "@/components/common/theme-provider";

export const metadata: Metadata = {
  title: "Nomad - Your Travel Companion",
  description: "Book flights and manage your travels with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <UiProvider components={{ Link: NextLink, Image: NextImage }}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </UiProvider>
      </body>
    </html>
  );
}
