"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@ukesjtu/nomad-ui/components/primitives/alert-dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import {
  batchDeletePassengersAction,
  deletePassengerAction,
} from "@/app/_actions";
import { PassengersDataTable } from "@/components/passengers/passengers-data-table";
import { createClientLogger } from "@/infra/logging/client-logger";
import type { PassengerDTO } from "@/types/dto";

const logger = createClientLogger({ module: "passengers-page" });

interface PassengersPageClientProps {
  initialPassengers: PassengerDTO[];
}

export function PassengersPageClient({
  initialPassengers,
}: PassengersPageClientProps) {
  const router = useRouter();
  const [_isLoading, setIsLoading] = useState(false);
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [passengerToDelete, setPassengerToDelete] = useState<string | null>(
    null
  );

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
      const result = await deletePassengerAction(passengerToDelete);

      if (result.success) {
        toast.success("旅客删除成功");
        router.refresh(); // Refresh server component to get updated data
      } else {
        toast.error(result.error || "删除失败");
      }
    } catch (error) {
      logger.error({ err: error }, "Failed to delete passenger");
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
      const result = await batchDeletePassengersAction(passengerIds);

      if (result.success) {
        toast.success("批量删除成功");
        router.refresh(); // Refresh server component to get updated data
      } else {
        toast.error(result.error || "删除失败");
      }
    } catch (error) {
      logger.error(
        { err: error, passengerIds },
        "Failed to batch delete passengers"
      );
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
          initialData={initialPassengers}
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
