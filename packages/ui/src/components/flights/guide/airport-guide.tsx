"use client";

import { useUiComponents } from "../../../platform";
import { Card, CardContent } from "../../primitives/card";

export type AirportGuideLink = {
  href: string;
  label: string;
};

export type AirportGuideProps = {
  links: AirportGuideLink[];
  title?: string;
};

export function AirportGuide({ links, title = "相关链接" }: AirportGuideProps) {
  const { Link } = useUiComponents();

  return (
    <aside className="w-full lg:w-[280px] space-y-4">
      <Card className="bg-accent/50 border-accent">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold text-foreground">{title}</span>
          </div>
          <div className="space-y-2 text-sm">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-primary hover:underline transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
