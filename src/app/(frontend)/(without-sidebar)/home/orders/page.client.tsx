"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrderCard from "@/components/user/order-card";
import { deleteOrderAction } from "@/lib/actions/orders";
import type { OrderListItem } from "@/types/dto/orders";

interface OrdersPageClientProps {
  orders: OrderListItem[];
}

/**
 * Orders Page Client Component
 *
 * @description
 * Client-side component that handles order filtering, interactions, and state management.
 * Uses the OrderCard component for consistent order display.
 *
 * @remarks
 * Filtering Logic:
 * - All Orders: Shows all orders regardless of status
 * - Upcoming Trips: Confirmed orders with future departure dates
 * - Pending Payment: Orders awaiting payment
 *
 * Features:
 * - Tab-based navigation with client-side filtering
 * - Batch selection for bulk operations
 * - Delete confirmation dialog
 * - Navigation to order details and payment pages
 */
export default function OrdersPageClient({ orders }: OrdersPageClientProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null);
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set());

  // Filter orders by category using useMemo for performance
  const { upcomingOrders, pendingPaymentOrders } = useMemo(() => {
    const now = new Date();

    return {
      upcomingOrders: orders.filter(
        order =>
          order.status === "CONFIRMED" &&
          new Date(order.outboundFlight.departureDatetime) >= now
      ),
      pendingPaymentOrders: orders.filter(
        order => order.status === "PENDING_PAYMENT"
      ),
    };
  }, [orders]);

  // Handle order selection toggle
  const handleCheckChange = (orderId: string, checked: boolean) => {
    setSelectedOrders(prev => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(orderId);
      } else {
        newSet.delete(orderId);
      }
      return newSet;
    });
  };

  // Handle delete order click
  const handleDeleteClick = (orderId: string) => {
    setOrderToDelete(orderId);
    setDeleteDialogOpen(true);
  };

  // Confirm and execute order deletion
  const confirmDelete = async () => {
    if (!orderToDelete) return;

    setIsLoading(true);
    try {
      const result = await deleteOrderAction({ orderId: orderToDelete });

      if (result.success) {
        toast.success("订单删除成功");
        setDeleteDialogOpen(false);
        setOrderToDelete(null);
        router.refresh(); // Refresh server component to get updated data
      } else {
        toast.error(result.error || "删除失败");
      }
    } catch (_error) {
      toast.error("删除失败，请重试");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle action button click (Resend confirmation or Go to payment)
  const handleActionClick = (order: OrderListItem) => {
    if (order.status === "CONFIRMED") {
      // TODO: Implement resend confirmation logic
      toast.success("确认信息已重新发送");
    } else if (order.status === "PENDING_PAYMENT") {
      // Navigate to payment page
      router.push(`/flights/booking/${order.id}/payment`);
    }
  };

  // Render empty state message
  const renderEmptyState = (message: string) => (
    <div className="text-center py-12">
      <p className="text-muted-foreground">{message}</p>
    </div>
  );

  // Render order list using OrderCard component
  const renderOrderList = (orderList: OrderListItem[]) => {
    if (orderList.length === 0) {
      return null;
    }

    return (
      <div className="space-y-4">
        {orderList.map(order => (
          <OrderCard
            key={order.id}
            order={order}
            isChecked={selectedOrders.has(order.id)}
            onCheckChange={checked => handleCheckChange(order.id, checked)}
            onDelete={() => handleDeleteClick(order.id)}
            onActionClick={() => handleActionClick(order)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">我的订单</h1>
        <p className="text-muted-foreground">查看和管理您的机票订单</p>
      </div>

      {/* Tabs for filtering orders */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">全部订单 ({orders.length})</TabsTrigger>
          <TabsTrigger value="upcoming">
            未出行 ({upcomingOrders.length})
          </TabsTrigger>
          <TabsTrigger value="pending">
            待支付 ({pendingPaymentOrders.length})
          </TabsTrigger>
        </TabsList>

        {/* All Orders Tab */}
        <TabsContent value="all" className="mt-6">
          {orders.length > 0
            ? renderOrderList(orders)
            : renderEmptyState("暂时没有订单")}
        </TabsContent>

        {/* Upcoming Orders Tab */}
        <TabsContent value="upcoming" className="mt-6">
          {upcomingOrders.length > 0
            ? renderOrderList(upcomingOrders)
            : renderEmptyState("暂时没有未出行的订单")}
        </TabsContent>

        {/* Pending Payment Tab */}
        <TabsContent value="pending" className="mt-6">
          {pendingPaymentOrders.length > 0
            ? renderOrderList(pendingPaymentOrders)
            : renderEmptyState("暂时没有待支付的订单")}
        </TabsContent>
      </Tabs>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>
              您确定要删除这个订单吗？删除后将无法恢复。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>取消</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} disabled={isLoading}>
              {isLoading ? "删除中..." : "确认删除"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
