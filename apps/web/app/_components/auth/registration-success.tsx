"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export interface RegistrationSuccessProps {
  /** Success title */
  title?: string;

  /** Success description */
  description?: string;

  /** Custom className */
  className?: string;
}

/**
 * Registration success component
 * Shows success message with navigation options
 */
export default function RegistrationSuccess({
  title = "注册成功！",
  description = "您的账户已成功创建，欢迎使用 Nomad",
  className,
}: RegistrationSuccessProps) {
  const router = useRouter();

  const handleGoToFlights = () => {
    router.push("/flights");
  };

  const handleGoToProfile = () => {
    router.push("/home/info");
  };

  return (
    <div className={className}>
      <div className="text-center py-8">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {/* Title */}
        <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-6">{description}</p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 max-w-sm mx-auto">
          <Button
            onClick={handleGoToFlights}
            className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-medium"
          >
            开始订票
          </Button>
          <Button
            onClick={handleGoToProfile}
            variant="outline"
            className="w-full h-12 border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            前往个人中心
          </Button>
        </div>
      </div>
    </div>
  );
}
