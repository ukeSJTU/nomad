"use client";

import { useState } from "react";
import { Button } from "../primitives/button";
import { Checkbox } from "../primitives/checkbox";
import { Input } from "../primitives/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../primitives/table";

export interface PassengerListItem {
  id: string;
  name: string;
  phone: string | null;
  documentType: string;
  documentNumber: string;
  nationality: string | null;
  gender: string | null;
}

export interface PassengerListProps {
  passengers: PassengerListItem[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onBatchDelete: (ids: string[]) => void;
  onAdd?: () => void;
  onSearch?: (query: string) => void;
  isLoading?: boolean;
  searchPlaceholder?: string;
  emptyMessage?: string;
}

export function PassengerList({
  passengers,
  onEdit,
  onDelete,
  onBatchDelete,
  onAdd,
  onSearch,
  isLoading = false,
  searchPlaceholder = "中文名/英文名",
  emptyMessage = "暂无旅客信息",
}: PassengerListProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  // Handle select all checkbox
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(passengers.map(p => p.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  // Handle individual checkbox
  const handleSelectOne = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedIds);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedIds(newSelected);
  };

  // Handle batch delete
  const handleBatchDelete = () => {
    if (selectedIds.size > 0) {
      onBatchDelete(Array.from(selectedIds));
      setSelectedIds(new Set());
    }
  };

  // Handle search
  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const allSelected =
    passengers.length > 0 && selectedIds.size === passengers.length;

  return (
    <div className="space-y-4">
      {/* Header with search and actions */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-semibold">旅客姓名</span>
          <Input
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-64"
          />
          <Button variant="outline" size="sm" onClick={handleSearch}>
            查询
          </Button>
          {onAdd && (
            <Button variant="outline" size="sm" onClick={onAdd}>
              新增
            </Button>
          )}
        </div>
      </div>

      {/* Batch actions */}
      {selectedIds.size > 0 && (
        <div className="flex items-center gap-2 text-sm">
          <Checkbox
            checked={allSelected}
            onCheckedChange={handleSelectAll}
            aria-label="全选"
          />
          <span>全选</span>
          <Button
            variant="link"
            size="sm"
            className="text-blue-600 h-auto p-0"
            onClick={handleBatchDelete}
            disabled={isLoading}
          >
            ✕ 删除
          </Button>
        </div>
      )}

      {/* Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-12">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={handleSelectAll}
                  aria-label="全选"
                />
              </TableHead>
              <TableHead>全选</TableHead>
              <TableHead>姓名</TableHead>
              <TableHead>手机/电话</TableHead>
              <TableHead>证件类型</TableHead>
              <TableHead>证件号码</TableHead>
              <TableHead>国籍(国家/地区)</TableHead>
              <TableHead>性别</TableHead>
              <TableHead>常旅客卡</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {passengers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={10}
                  className="text-center py-8 text-gray-500"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              passengers.map(passenger => (
                <TableRow key={passenger.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedIds.has(passenger.id)}
                      onCheckedChange={checked =>
                        handleSelectOne(passenger.id, checked as boolean)
                      }
                      aria-label={`选择 ${passenger.name}`}
                    />
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      checked={selectedIds.has(passenger.id)}
                      onCheckedChange={checked =>
                        handleSelectOne(passenger.id, checked as boolean)
                      }
                      aria-label={`选择 ${passenger.name}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {passenger.name}
                  </TableCell>
                  <TableCell>{passenger.phone || "-"}</TableCell>
                  <TableCell>{passenger.documentType}</TableCell>
                  <TableCell className="font-mono">
                    {passenger.documentNumber}
                  </TableCell>
                  <TableCell>{passenger.nationality || "-"}</TableCell>
                  <TableCell>{passenger.gender || "-"}</TableCell>
                  <TableCell>无</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="link"
                        size="sm"
                        className="text-blue-600 h-auto p-0"
                        onClick={() => onEdit(passenger.id)}
                        disabled={isLoading}
                      >
                        查看
                      </Button>
                      <Button
                        variant="link"
                        size="sm"
                        className="text-blue-600 h-auto p-0"
                        onClick={() => onEdit(passenger.id)}
                        disabled={isLoading}
                      >
                        编辑
                      </Button>
                      <Button
                        variant="link"
                        size="sm"
                        className="text-blue-600 h-auto p-0"
                        onClick={() => onDelete(passenger.id)}
                        disabled={isLoading}
                      >
                        删除
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Batch delete button at bottom */}
      {selectedIds.size > 0 && (
        <div className="flex items-center gap-2 text-sm">
          <Checkbox
            checked={allSelected}
            onCheckedChange={handleSelectAll}
            aria-label="全选"
          />
          <span>全选</span>
          <Button
            variant="link"
            size="sm"
            className="text-blue-600 h-auto p-0"
            onClick={handleBatchDelete}
            disabled={isLoading}
          >
            ✕ 删除
          </Button>
        </div>
      )}
    </div>
  );
}
