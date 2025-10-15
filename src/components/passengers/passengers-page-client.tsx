"use client";

import { useState } from "react";
import { toast } from "sonner";

import PassengerForm from "@/components/passengers/forms/passenger-form";
import { PassengersDataTable } from "@/components/passengers/passengers-data-table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Passenger } from "@/types/api/passengers";

interface PassengersPageClientProps {
  initialPassengers: Passenger[];
}

export function PassengersPageClient({
  initialPassengers,
}: PassengersPageClientProps) {
  const [passengers, setPassengers] = useState<Passenger[]>(initialPassengers);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPassenger, setEditingPassenger] = useState<Passenger | null>(
    null
  );

  // Fetch passengers from API
  const fetchPassengers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/passengers");
      const data = await response.json();

      if (data.success) {
        setPassengers(data.data.items);
      } else {
        toast.error("获取旅客列表失败");
      }
    } catch (error) {
      console.error("Failed to fetch passengers:", error);
      toast.error("获取旅客列表失败");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle create passenger
  const handleCreate = async (formData: unknown) => {
    setIsLoading(true);
    try {
      // Convert form data to API format
      const apiData = convertFormDataToApiFormat(formData);

      const response = await fetch("/api/passengers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("旅客信息保存成功");
        setIsFormOpen(false);
        fetchPassengers();
      } else {
        toast.error(data.error?.message || "保存失败");
      }
    } catch (error) {
      console.error("Failed to create passenger:", error);
      toast.error("保存失败");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle update passenger
  const handleUpdate = async (formData: unknown) => {
    if (!editingPassenger) return;

    setIsLoading(true);
    try {
      // Convert form data to API format
      const apiData = convertFormDataToApiFormat(formData);

      const response = await fetch(`/api/passengers/${editingPassenger.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("旅客信息更新成功");
        setIsFormOpen(false);
        setEditingPassenger(null);
        fetchPassengers();
      } else {
        toast.error(data.error?.message || "更新失败");
      }
    } catch (error) {
      console.error("Failed to update passenger:", error);
      toast.error("更新失败");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle delete passenger
  const handleDelete = async (passengerId: string) => {
    if (!confirm("确定要删除这位旅客吗？")) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/passengers/${passengerId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        toast.success("旅客删除成功");
        fetchPassengers();
      } else {
        toast.error(data.error?.message || "删除失败");
      }
    } catch (error) {
      console.error("Failed to delete passenger:", error);
      toast.error("删除失败");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle batch delete
  const handleBatchDelete = async (passengerIds: string[]) => {
    if (!confirm(`确定要删除选中的 ${passengerIds.length} 位旅客吗？`)) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/passengers/batch-delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: passengerIds }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("批量删除成功");
        fetchPassengers();
      } else {
        toast.error(data.error?.message || "删除失败");
      }
    } catch (error) {
      console.error("Failed to batch delete passengers:", error);
      toast.error("删除失败");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle add new passenger
  const handleAdd = () => {
    setEditingPassenger(null);
    setIsFormOpen(true);
  };

  // Handle edit passenger
  const handleEdit = (passenger: Passenger) => {
    setEditingPassenger(passenger);
    setIsFormOpen(true);
  };

  // Handle form submit
  const handleFormSubmit = (formData: unknown) => {
    if (editingPassenger) {
      handleUpdate(formData);
    } else {
      handleCreate(formData);
    }
  };

  // Handle form cancel
  const handleFormCancel = () => {
    setIsFormOpen(false);
    setEditingPassenger(null);
  };

  // Convert form data to API format
  const convertFormDataToApiFormat = (formData: any) => {
    return {
      chineseName: formData.chineseName || undefined,
      englishFirstName: formData.englishFirstName || undefined,
      englishLastName: formData.englishLastName || undefined,
      nationality: formData.nationality || undefined,
      gender: formData.gender || undefined,
      dateOfBirth: formData.dateOfBirth
        ? formData.dateOfBirth.toISOString().split("T")[0]
        : undefined,
      placeOfBirth: formData.placeOfBirth || undefined,
      phone: formData.phone || undefined,
      fax:
        formData.faxAreaCode && formData.faxPhone
          ? `${formData.faxAreaCode}-${formData.faxPhone}${formData.faxExtension ? `-${formData.faxExtension}` : ""}`
          : undefined,
      email: formData.email || undefined,
      documentType: formData.documentType,
      documentNumber: formData.documentNumber,
      documentExpiryDate: formData.documentExpiryDate
        ? formData.documentExpiryDate.toISOString().split("T")[0]
        : undefined,
    };
  };

  // Convert passenger data to form format
  const convertPassengerToFormData = (passenger: Passenger) => {
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
      email: passenger.email || undefined,
      documentType: passenger.documentType,
      documentNumber: passenger.documentNumber,
      documentExpiryDate: passenger.documentExpiryDate
        ? new Date(passenger.documentExpiryDate)
        : undefined,
    };
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-6">
        <PassengersDataTable
          initialData={passengers}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onBatchDelete={handleBatchDelete}
        />
      </div>

      {/* Passenger Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingPassenger ? "编辑常用旅客信息" : "新增常用旅客信息"}
            </DialogTitle>
            <DialogDescription>
              请填写如下常用旅客信息，<span className="text-red-500">*</span>
              为必选项。
            </DialogDescription>
          </DialogHeader>
          <PassengerForm
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
            isLoading={isLoading}
            initialData={
              editingPassenger
                ? convertPassengerToFormData(editingPassenger)
                : undefined
            }
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
