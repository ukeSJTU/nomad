"use client";

import { PassengersDataTable as PassengersDataTableUI } from "@nomad/ui/components/passengers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { PassengerDTO } from "@/types/dto";

interface PassengersDataTableProps {
  initialData: PassengerDTO[];
  onAdd: () => void;
  onDelete: (passengerId: string) => void;
  onBatchDelete: (passengerIds: string[]) => void;
}

// Utility functions
const maskPhone = (phone: string | null) => {
  if (!phone) return "-";
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
  if (!gender) return "-";
  const genderMap: Record<string, string> = {
    male: "男",
    female: "女",
    other: "未知",
  };
  return genderMap[gender] || gender;
};

export function PassengersDataTable({
  initialData,
  onAdd,
  onDelete,
  onBatchDelete,
}: PassengersDataTableProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState<PassengerDTO[]>(initialData);
  const [isLoading, _setIsLoading] = useState(false);

  // Sync data with initialData when it changes
  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  // Filter data based on search query
  const filteredData = data.filter(passenger => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    const name = passenger.name.toLowerCase();
    const phone = passenger.phone?.toLowerCase() || "";
    const docNumber = passenger.documentNumber.toLowerCase();
    return (
      name.includes(query) || phone.includes(query) || docNumber.includes(query)
    );
  });

  // Map data to UI component format
  const passengerDataItems = filteredData.map(passenger => ({
    id: passenger.id,
    name: passenger.name,
    phone: maskPhone(passenger.phone),
    documentType: getDocumentTypeDisplay(passenger.documentType),
    documentNumber: maskDocumentNumber(passenger.documentNumber),
    nationality: passenger.nationality,
    gender: getGenderDisplay(passenger.gender),
  }));

  // Navigation handlers
  const handleView = (id: string) => {
    router.push(`/home/passengers/${id}`);
  };

  const handleEdit = (id: string) => {
    router.push(`/home/passengers/${id}/edit`);
  };

  const handleSearch = () => {
    // Search is handled by filtering the data
    // This function is called when the search button is clicked
    // The actual filtering happens in the filteredData computation
  };

  return (
    <PassengersDataTableUI
      data={passengerDataItems}
      onView={handleView}
      onEdit={handleEdit}
      onDelete={onDelete}
      onBatchDelete={onBatchDelete}
      onAdd={onAdd}
      onSearch={handleSearch}
      searchQuery={searchQuery}
      onSearchQueryChange={setSearchQuery}
      loading={isLoading}
    />
  );
}
