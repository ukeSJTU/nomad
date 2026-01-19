"use client";

import { PassengerList as PassengerListUI } from "@nomad/ui/components/passengers";
import type { PassengerDTO } from "@/types/dto";

interface PassengerListProps {
  passengers: PassengerDTO[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onBatchDelete: (ids: string[]) => void;
  onAdd?: () => void;
  onSearch?: (query: string) => void;
  isLoading?: boolean;
}

// Utility functions
const maskPhone = (phone: string | null) => {
  if (!phone) return "";
  if (phone.length <= 4) return phone;
  return `${phone.slice(0, 3)}****${phone.slice(-4)}`;
};

const maskDocumentNumber = (docNumber: string) => {
  if (docNumber.length <= 3) return docNumber;
  return (
    docNumber.slice(0, 4) +
    "*".repeat(docNumber.length - 7) +
    docNumber.slice(-3)
  );
};

const getDocumentTypeDisplay = (type: string) => {
  const typeMap: Record<string, string> = {
    id_card: "身份证",
    passport: "护照",
    other: "其他",
  };
  return typeMap[type] || type;
};

const getGenderDisplay = (gender: string | null) => {
  if (!gender) return "";
  const genderMap: Record<string, string> = {
    male: "男",
    female: "女",
    other: "未知",
  };
  return genderMap[gender] || gender;
};

export default function PassengerList({
  passengers,
  onEdit,
  onDelete,
  onBatchDelete,
  onAdd,
  onSearch,
  isLoading = false,
}: PassengerListProps) {
  // Map data to UI component format
  const passengerListItems = passengers.map(passenger => ({
    id: passenger.id,
    name: passenger.name,
    phone: maskPhone(passenger.phone),
    documentType: getDocumentTypeDisplay(passenger.documentType),
    documentNumber: maskDocumentNumber(passenger.documentNumber),
    nationality: passenger.nationality,
    gender: getGenderDisplay(passenger.gender),
  }));

  return (
    <PassengerListUI
      passengers={passengerListItems}
      onEdit={onEdit}
      onDelete={onDelete}
      onBatchDelete={onBatchDelete}
      onAdd={onAdd}
      onSearch={onSearch}
      isLoading={isLoading}
    />
  );
}
