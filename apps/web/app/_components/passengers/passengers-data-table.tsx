"use client";

import { Input } from "@nomad/ui/components/input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  type BatchAction,
  type ColumnDefinition,
  DataTableWithActions,
  type RowAction,
} from "@/components/common/data-table-with-actions";
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
  return (
    <div className="text-right font-bold">{genderMap[gender] || gender}</div>
  );
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

  // Column definitions
  const columns: ColumnDefinition<PassengerDTO>[] = [
    {
      key: "name",
      header: "姓名",
      cell: ({ row }) => <div className="text-center">{row.name}</div>,
      width: "150px",
    },
    {
      key: "phone",
      header: "手机/电话",
      cell: ({ value }) => (
        <div className="text-center">{maskPhone(value as string | null)}</div>
      ),
      width: "130px",
    },
    {
      key: "documentType",
      header: () => <div className="text-center">证件类型</div>,
      cell: ({ value }) => (
        <div className="text-center">
          {getDocumentTypeDisplay(value as string)}
        </div>
      ),
      width: "100px",
    },
    {
      key: "documentNumber",
      header: "证件号码",
      cell: ({ value }) => (
        <div className="font-mono text-center">
          {maskDocumentNumber(value as string)}
        </div>
      ),
      width: "180px",
    },
    {
      key: "nationality",
      header: "国籍(国家/地区)",
      cell: ({ value }) => (
        <div className="text-center">{(value as string | null) || "-"}</div>
      ),
      width: "150px",
    },
    {
      key: "gender",
      header: () => <div className="text-center">性别</div>,
      cell: ({ value }) => (
        <div className="text-center">
          {getGenderDisplay(value as string | null)}
        </div>
      ),
      width: "80px",
    },
    {
      key: "frequentFlyerCard",
      header: () => <div className="text-center">常旅客卡</div>,
      cell: () => <div className="text-center">无</div>,
      width: "100px",
    },
  ];

  // Row actions
  const rowActions: RowAction<PassengerDTO>[] = [
    {
      label: "查看",
      onClick: row => {
        router.push(`/home/passengers/${row.id}`);
      },
      variant: "link",
      className: "text-blue-600 h-auto p-0",
    },
    {
      label: "编辑",
      onClick: row => {
        router.push(`/home/passengers/${row.id}/edit`);
      },
      variant: "link",
      className: "text-blue-600 h-auto p-0",
    },
    {
      label: "删除",
      onClick: row => {
        onDelete(row.id);
      },
      variant: "link",
      className: "text-blue-600 h-auto p-0",
    },
  ];

  // Batch actions
  const batchActions: BatchAction<PassengerDTO>[] = [
    {
      label: "✕ 删除",
      onClick: selectedRows => {
        const ids = selectedRows.map(row => row.id);
        onBatchDelete(ids);
      },
      variant: "default",
    },
  ];

  // Handle search
  const handleSearch = () => {
    // Search is handled by filtering the data
    // This function is called when the search button is clicked
    // The actual filtering happens in the filteredData computation
  };

  // Filter slot with search input
  const filterSlot = (
    <div className="flex items-center gap-2">
      <span className="font-semibold whitespace-nowrap">旅客姓名</span>
      <Input
        placeholder="中文名/英文名"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        className="w-64"
      />
    </div>
  );

  return (
    <DataTableWithActions
      data={filteredData}
      columns={columns}
      keyExtractor={row => row.id}
      filterSlot={filterSlot}
      onSearch={handleSearch}
      onAdd={onAdd}
      addButtonText="新增"
      searchButtonText="查询"
      showAddButton={true}
      showSearchButton={true}
      rowActions={rowActions}
      batchActions={batchActions}
      enableSelection={true}
      loading={isLoading}
      emptyMessage="暂无旅客信息"
      variant="default"
    />
  );
}
