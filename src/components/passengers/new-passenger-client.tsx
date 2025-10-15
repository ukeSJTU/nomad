"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { createPassengerAction } from "@/app/home/passengers/actions";
import PassengerForm from "@/components/passengers/forms/passenger-form";

export function NewPassengerClient() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData: unknown) => {
    setIsLoading(true);
    try {
      const result = await createPassengerAction(formData);

      if (result.success) {
        toast.success("旅客信息保存成功");
        router.push("/home/passengers");
        router.refresh();
      } else {
        toast.error(result.error || "保存失败");
      }
    } catch (error) {
      console.error("Failed to create passenger:", error);
      toast.error("保存失败");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/home/passengers");
  };

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">新增常用旅客信息</h1>
        <p className="text-sm text-gray-600 mt-2">
          请填写如下常用旅客信息，<span className="text-red-500">*</span>
          为必选项。
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <PassengerForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
