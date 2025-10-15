"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { PassengersDataTable } from "@/components/passengers/passengers-data-table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { Passenger } from "@/types/api/passengers";

interface PassengersPageClientProps {
  initialPassengers: Passenger[];
}

export function PassengersPageClient({
  initialPassengers,
}: PassengersPageClientProps) {
  const router = useRouter();
  const [passengers, setPassengers] = useState<Passenger[]>(initialPassengers);
  const [_isLoading, setIsLoading] = useState(false);
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [passengerToDelete, setPassengerToDelete] = useState<string | null>(
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

  // Handle delete passenger - show confirmation dialog
  const handleDelete = (passengerId: string) => {
    setPassengerToDelete(passengerId);
    setDeleteAlertOpen(true);
  };

  // Confirm delete passenger
  const confirmDelete = async () => {
    if (!passengerToDelete) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/passengers/${passengerToDelete}`, {
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
      setDeleteAlertOpen(false);
      setPassengerToDelete(null);
    }
  };

  // Handle batch delete - no confirmation needed here as it's handled in data-table
  const handleBatchDelete = async (passengerIds: string[]) => {
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

  // Handle add new passenger - navigate to new page
  const handleAdd = () => {
    router.push("/home/passengers/new");
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-6">
        <PassengersDataTable
          initialData={passengers}
          onAdd={handleAdd}
          onDelete={handleDelete}
          onBatchDelete={handleBatchDelete}
        />
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteAlertOpen} onOpenChange={setDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>
              您确认要删除这位旅客吗？此操作无法撤销。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>确认</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
