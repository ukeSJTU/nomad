"use client";

import { usePathname, useRouter } from "next/navigation";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function FlightsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // Determine current tab based on pathname
  const getCurrentTab = () => {
    if (pathname === "/flights") return "domestic";
    if (pathname.startsWith("/flights/special")) return "special";
    if (pathname.startsWith("/flights/status")) return "status";
    if (pathname.startsWith("/flights/seat")) return "seat";
    if (pathname.startsWith("/flights/refund")) return "refund";
    if (pathname.startsWith("/flights/more")) return "more";
    // Don't highlight any tab for /flights/search or other routes
    return null;
  };

  const handleTabChange = (value: string) => {
    const routes: Record<string, string> = {
      domestic: "/flights",
      special: "/flights/special",
      status: "/flights/status",
      seat: "/flights/seat",
      refund: "/flights/refund",
      more: "/flights/more",
    };
    router.push(routes[value]);
  };

  const currentTab = getCurrentTab();

  return (
    <div className="container mx-auto px-4 py-8 max-w-8xl">
      {/* Only show tabs for main flight pages, not for search results */}
      {currentTab && (
        <Tabs value={currentTab} onValueChange={handleTabChange}>
          <TabsList className="w-full h-12 grid grid-cols-6 rounded-t-lg rounded-b-none">
            <TabsTrigger
              value="domestic"
              className="rounded-t-md rounded-b-none data-[state=active]:font-semibold data-[state=active]:text-foreground text-muted-foreground"
            >
              国内、国际/中国港澳台
            </TabsTrigger>
            <TabsTrigger
              value="special"
              className="rounded-t-md rounded-b-none data-[state=active]:font-semibold data-[state=active]:text-foreground text-muted-foreground"
            >
              特价机票
            </TabsTrigger>
            <TabsTrigger
              value="status"
              className="rounded-t-md rounded-b-none data-[state=active]:font-semibold data-[state=active]:text-foreground text-muted-foreground"
            >
              航班动态
            </TabsTrigger>
            <TabsTrigger
              value="seat"
              className="rounded-t-md rounded-b-none data-[state=active]:font-semibold data-[state=active]:text-foreground text-muted-foreground"
            >
              在线选座
            </TabsTrigger>
            <TabsTrigger
              value="refund"
              className="rounded-t-md rounded-b-none data-[state=active]:font-semibold data-[state=active]:text-foreground text-muted-foreground"
            >
              退票改签
            </TabsTrigger>
            <TabsTrigger
              value="more"
              className="rounded-t-md rounded-b-none data-[state=active]:font-semibold data-[state=active]:text-foreground text-muted-foreground"
            >
              更多服务
            </TabsTrigger>
          </TabsList>
        </Tabs>
      )}
      {children}
    </div>
  );
}
