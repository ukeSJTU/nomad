"use client";

import {
  type BatchAction,
  type ColumnDefinition,
  DataTableWithActions,
  type RowAction,
} from "../common/data-table-with-actions";
import { Input } from "../primitives/input";

export interface PassengerDataItem {
  id: string;
  name: string;
  phone: string | null;
  documentType: string;
  documentNumber: string;
  nationality: string | null;
  gender: string | null;
}

export interface PassengersDataTableProps {
  data: PassengerDataItem[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onBatchDelete: (ids: string[]) => void;
  onAdd: () => void;
  onSearch?: () => void;
  searchQuery?: string;
  onSearchQueryChange?: (query: string) => void;
  loading?: boolean;
  emptyMessage?: string;
  searchPlaceholder?: string;
  addButtonText?: string;
  searchButtonText?: string;
}

export function PassengersDataTable({
  data,
  onView,
  onEdit,
  onDelete,
  onBatchDelete,
  onAdd,
  onSearch,
  searchQuery = "",
  onSearchQueryChange,
  loading = false,
  emptyMessage = "暂无旅客信息",
  searchPlaceholder = "中文名/英文名",
  addButtonText = "新增",
  searchButtonText = "查询",
}: PassengersDataTableProps) {
  // Column definitions
  const columns: ColumnDefinition<PassengerDataItem>[] = [
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
        <div className="text-center">{(value as string | null) || "-"}</div>
      ),
      width: "130px",
    },
    {
      key: "documentType",
      header: () => <div className="text-center">证件类型</div>,
      cell: ({ value }) => <div className="text-center">{value as string}</div>,
      width: "100px",
    },
    {
      key: "documentNumber",
      header: "证件号码",
      cell: ({ value }) => (
        <div className="font-mono text-center">{value as string}</div>
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
        <div className="text-center">{(value as string | null) || "-"}</div>
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
  const rowActions: RowAction<PassengerDataItem>[] = [
    {
      label: "查看",
      onClick: row => onView(row.id),
      variant: "link",
      className: "text-blue-600 h-auto p-0",
    },
    {
      label: "编辑",
      onClick: row => onEdit(row.id),
      variant: "link",
      className: "text-blue-600 h-auto p-0",
    },
    {
      label: "删除",
      onClick: row => onDelete(row.id),
      variant: "link",
      className: "text-blue-600 h-auto p-0",
    },
  ];

  // Batch actions
  const batchActions: BatchAction<PassengerDataItem>[] = [
    {
      label: "✕ 删除",
      onClick: selectedRows => {
        const ids = selectedRows.map(row => row.id);
        onBatchDelete(ids);
      },
      variant: "default",
    },
  ];

  // Filter slot with search input
  const filterSlot = (
    <div className="flex items-center gap-2">
      <span className="font-semibold whitespace-nowrap">旅客姓名</span>
      <Input
        placeholder={searchPlaceholder}
        value={searchQuery}
        onChange={e => onSearchQueryChange?.(e.target.value)}
        className="w-64"
      />
    </div>
  );

  return (
    <DataTableWithActions
      data={data}
      columns={columns}
      keyExtractor={row => row.id}
      filterSlot={filterSlot}
      onSearch={onSearch}
      onAdd={onAdd}
      addButtonText={addButtonText}
      searchButtonText={searchButtonText}
      showAddButton={true}
      showSearchButton={true}
      rowActions={rowActions}
      batchActions={batchActions}
      enableSelection={true}
      loading={loading}
      emptyMessage={emptyMessage}
      variant="default"
    />
  );
}
