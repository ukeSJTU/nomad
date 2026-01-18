import { AirportGuide } from "@nomad/ui/components/flights/guide";

export function AirportSidebar() {
  const links = [
    { href: "/flights/guide", label: "返回机场攻略首页" },
    { href: "/flights", label: "特价机票查询" },
  ];

  return <AirportGuide links={links} />;
}
