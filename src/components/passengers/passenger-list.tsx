"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Passenger } from "@/types/dto/passengers";

interface PassengerListProps {
  passengers: Passenger[];
  onEdit: (passenger: Passenger) => void;
  onDelete: (passengerId: string) => void;
  onBatchDelete: (passengerIds: string[]) => void;
  isLoading?: boolean;
}

export default function PassengerList({
  passengers,
  onEdit,
  onDelete,
  onBatchDelete,
  isLoading = false,
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

  // Mask phone number (show only last 4 digits)
  const maskPhone = (phone: string | null) => {
    if (!phone) return "";
    if (phone.length <= 4) return phone;
    return `${phone.slice(0, 3)}****${phone.slice(-4)}`;
  };

  // Mask document number (show only last 3 digits)
  const maskDocumentNumber = (docNumber: string) => {
    if (docNumber.length <= 3) return docNumber;
    return (
      docNumber.slice(0, 4) +
      "*".repeat(docNumber.length - 7) +
      docNumber.slice(-3)
    );
  };

  // Get document type display
  const getDocumentTypeDisplay = (type: string) => {
    const typeMap: Record<string, string> = {
      id_card: "身份证",
      passport: "护照",
      other: "其他",
    };
    return typeMap[type] || type;
  };

  // Get gender display
  const getGenderDisplay = (gender: string | null) => {
    if (!gender) return "";
    const genderMap: Record<string, string> = {
      male: "男",
      female: "女",
      other: "未知",
    };
    return genderMap[gender] || gender;
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
            placeholder="中文名/英文名"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-64"
          />
          <Button variant="outline" size="sm">
            查询
          </Button>
          <Button variant="outline" size="sm">
            新增
          </Button>
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
                  暂无旅客信息
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
                  <TableCell>{maskPhone(passenger.phone)}</TableCell>
                  <TableCell>
                    {getDocumentTypeDisplay(passenger.documentType)}
                  </TableCell>
                  <TableCell>
                    {maskDocumentNumber(passenger.documentNumber)}
                  </TableCell>
                  <TableCell>{passenger.nationality || "-"}</TableCell>
                  <TableCell>{getGenderDisplay(passenger.gender)}</TableCell>
                  <TableCell>无</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="link"
                        size="sm"
                        className="text-blue-600 h-auto p-0"
                        onClick={() => onEdit(passenger)}
                        disabled={isLoading}
                      >
                        查看
                      </Button>
                      <Button
                        variant="link"
                        size="sm"
                        className="text-blue-600 h-auto p-0"
                        onClick={() => onEdit(passenger)}
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
