"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import PassengerForm from "@/components/passengers/forms/passenger-form";
import { updatePassengerAction } from "@/lib/actions";
import type { Passenger } from "@/types/api/passengers";

interface EditPassengerClientProps {
  passenger: Passenger;
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
      console.error("Failed to update passenger:", error);
      toast.error("更新失败");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/home/passengers");
  };

  // Convert passenger data to form format
  const convertPassengerToFormData = (passenger: Passenger) => {
    // Parse fax if it exists
    let faxAreaCode, faxPhone, faxExtension;
    if (passenger.fax) {
      const faxParts = passenger.fax.split("-");
      faxAreaCode = faxParts[0] || undefined;
      faxPhone = faxParts[1] || undefined;
      faxExtension = faxParts[2] || undefined;
    }

    return {
      chineseName: passenger.chineseName || undefined,
      englishFirstName: passenger.englishFirstName || undefined,
      englishLastName: passenger.englishLastName || undefined,
      nationality: passenger.nationality || undefined,
      gender: passenger.gender || undefined,
      dateOfBirth: passenger.dateOfBirth
        ? new Date(passenger.dateOfBirth)
        : undefined,
      placeOfBirth: passenger.placeOfBirth || undefined,
      phone: passenger.phone || undefined,
      faxAreaCode,
      faxPhone,
      faxExtension,
      email: passenger.email || undefined,
      documentType: passenger.documentType,
      documentNumber: passenger.documentNumber,
      documentExpiryDate: passenger.documentExpiryDate
        ? new Date(passenger.documentExpiryDate)
        : undefined,
    };
  };

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
