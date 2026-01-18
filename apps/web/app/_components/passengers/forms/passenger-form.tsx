"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PassengerForm as PassengerFormUI } from "@nomad/ui/components/passengers";
import { useForm } from "react-hook-form";
import {
  type PassengerFormData,
  passengerFormSchema,
} from "@/types/validations";

interface PassengerFormProps {
  onSubmit: (data: PassengerFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
  initialData?: Partial<PassengerFormData>;
}

export default function PassengerForm({
  onSubmit,
  onCancel,
  isLoading = false,
  initialData,
}: PassengerFormProps) {
  const form = useForm<PassengerFormData>({
    resolver: zodResolver(passengerFormSchema),
    defaultValues: {
      name: initialData?.name ?? "",
      nationality: initialData?.nationality ?? "",
      gender: initialData?.gender,
      dateOfBirth: initialData?.dateOfBirth,
      placeOfBirth: initialData?.placeOfBirth ?? "",
      phone: initialData?.phone ?? "",
      email: initialData?.email ?? "",
      documentType: initialData?.documentType ?? "id_card",
      documentNumber: initialData?.documentNumber ?? "",
      documentExpiryDate: initialData?.documentExpiryDate,
    },
  });

  return (
    <PassengerFormUI
      form={form}
      onSubmit={onSubmit}
      onCancel={onCancel}
      isLoading={isLoading}
    />
  );
}
