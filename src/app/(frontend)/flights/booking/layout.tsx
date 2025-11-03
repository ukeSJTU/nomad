"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { Stepper, type StepperStep } from "@/components/common/stepper";

// Define the 4 booking steps
const BOOKING_STEPS: StepperStep[] = [
  {
    id: "passengers",
    label: "填写信息",
    description: "乘机人与联系人",
  },
  {
    id: "ancillary",
    label: "增值服务",
    description: "保险、接送机等",
  },
  {
    id: "payment",
    label: "支付",
    description: "确认订单并支付",
  },
  {
    id: "confirmation",
    label: "完成",
    description: "预订成功",
  },
];

// Map pathname to step number (1-based)
const getStepFromPathname = (pathname: string): number => {
  if (pathname.includes("/passengers")) return 1;
  if (pathname.includes("/ancillary")) return 2;
  if (pathname.includes("/payment")) return 3;
  if (pathname.includes("/confirmation")) return 4;
  return 1; // Default to first step
};

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Determine current step based on pathname
  const currentStep = useMemo(() => getStepFromPathname(pathname), [pathname]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Stepper - Top Progress Indicator */}
        <div className="mb-8">
          <Stepper steps={BOOKING_STEPS} currentStep={currentStep} />
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm p-6">{children}</div>
      </div>
    </div>
  );
}
