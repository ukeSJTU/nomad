"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { updatePassengerAction } from "@/app/_actions";
import PassengerForm from "@/components/passengers/forms/passenger-form";
import { createClientLogger } from "@/infra/logging/client-logger";
import type { PassengerDTO } from "@/types/dto";

const logger = createClientLogger({ module: "passengers-edit-page" });

interface EditPassengerClientProps {
  passenger: PassengerDTO;
}

export function EditPassengerClient({ passenger }: EditPassengerClientProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData: unknown) => {
    setIsLoading(true);
    try {
      const result = await updatePassengerAction(passenger.id, formData);

      if (result.success) {
        toast.success("旅客信息更新成功");
        router.push("/home/passengers");
        router.refresh();
      } else {
        toast.error(result.error || "更新失败");
      }
    } catch (error) {
      logger.error(
        { err: error, passengerId: passenger.id },
        "Failed to update passenger"
      );
      toast.error("更新失败");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/home/passengers");
  };

  // Convert passenger data to form format
  const convertPassengerToFormData = (passenger: PassengerDTO) => ({
    name: passenger.name,
    nationality: passenger.nationality ?? undefined,
    gender: passenger.gender ?? undefined,
    dateOfBirth: passenger.dateOfBirth
      ? new Date(passenger.dateOfBirth)
      : undefined,
    placeOfBirth: passenger.placeOfBirth ?? undefined,
    phone: passenger.phone ?? undefined,
    email: passenger.email ?? undefined,
    documentType: passenger.documentType,
    documentNumber: passenger.documentNumber,
    documentExpiryDate: passenger.documentExpiryDate
      ? new Date(passenger.documentExpiryDate)
      : undefined,
  });

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">编辑常用旅客信息</h1>
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
          initialData={convertPassengerToFormData(passenger)}
        />
      </div>
    </div>
  );
}
