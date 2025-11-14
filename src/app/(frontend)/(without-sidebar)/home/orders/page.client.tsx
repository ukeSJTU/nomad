"use client";

import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { Plane, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { deleteOrderAction } from "@/lib/actions/orders";
import type { OrderListItem } from "@/types/actions/orders";

interface OrdersPageClientProps {
  allOrders: OrderListItem[];
  upcomingOrders: OrderListItem[];
  pendingPaymentOrders: OrderListItem[];
}

/**
 * Orders Page Client Component
 *
 * Features:
 * - Tab navigation: All Orders, Upcoming Trips, Pending Payment
 * - Display order list with flight and passenger information
 * - Delete order functionality with confirmation dialog
 * - Navigate to order details and payment pages
 */
export default function OrdersPageClient({
  allOrders,
  upcomingOrders,
  pendingPaymentOrders,
}: OrdersPageClientProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null);

  // Handle delete order
  const handleDeleteClick = (orderId: string) => {
    setOrderToDelete(orderId);
    setDeleteDialogOpen(true);
  };

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

  // Navigate to order details
  const handleViewDetails = (orderId: string) => {
    router.push(`/home/orders/${orderId}`);
  };

  // Navigate to payment page
  const handlePayment = (orderId: string) => {
    router.push(`/flights/booking/${orderId}/payment`);
  };

  // Get status badge variant
  const getStatusBadge = (status: OrderListItem["status"]) => {
    switch (status) {
      case "PENDING_PAYMENT":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
            待支付
          </Badge>
        );
      case "CONFIRMED":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700">
            已确认
          </Badge>
        );
      case "CANCELLED":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700">
            已取消
          </Badge>
        );
      case "REFUNDED":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            已退款
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Check if order can be deleted
  const canDeleteOrder = (status: OrderListItem["status"]) => {
    return ["CONFIRMED", "CANCELLED", "REFUNDED"].includes(status);
  };

  // Render single order card
  const renderOrderCard = (order: OrderListItem) => {
    const outbound = order.outboundFlight;
    const inbound = order.inboundFlight;

    return (
      <Card key={order.id} className="mb-4">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-sm text-muted-foreground">订单号</p>
                <p className="font-medium">{order.orderNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">预订日期</p>
                <p className="font-medium">
                  {format(new Date(order.createdAt), "yyyy-MM-dd", {
                    locale: zhCN,
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {getStatusBadge(order.status)}
              {canDeleteOrder(order.status) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteClick(order.id)}
                  disabled={isLoading}
                >
                  <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Outbound Flight */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Plane className="h-4 w-4" />
              <span>{inbound ? "去程" : "单程"}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-lg font-semibold">
                  {outbound.departureCityName} → {outbound.arrivalCityName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {format(
                    new Date(outbound.departureDatetime),
                    "yyyy-MM-dd HH:mm",
                    { locale: zhCN }
                  )}{" "}
                  - {outbound.airlineName} {outbound.flightNumber}
                </p>
                <p className="text-sm text-muted-foreground">
                  座位等级: {outbound.seatClassType}
                </p>
              </div>
            </div>
          </div>

          {/* Inbound Flight (if exists) */}
          {inbound && (
            <div className="space-y-2 border-t pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Plane className="h-4 w-4 rotate-180" />
                <span>返程</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-lg font-semibold">
                    {inbound.departureCityName} → {inbound.arrivalCityName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {format(
                      new Date(inbound.departureDatetime),
                      "yyyy-MM-dd HH:mm",
                      { locale: zhCN }
                    )}{" "}
                    - {inbound.airlineName} {inbound.flightNumber}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    座位等级: {inbound.seatClassType}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Passengers */}
          <div className="border-t pt-4">
            <p className="text-sm text-muted-foreground mb-1">出行人</p>
            <p className="text-sm">{order.passengerNames.join("、")}</p>
          </div>

          {/* Actions and Price */}
          <div className="flex items-center justify-between border-t pt-4">
            <div>
              <p className="text-sm text-muted-foreground">订单金额</p>
              <p className="text-xl font-bold text-primary">
                ¥{Number(order.totalAmount).toFixed(2)}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => handleViewDetails(order.id)}
              >
                查看详情
              </Button>
              {order.status === "PENDING_PAYMENT" && (
                <Button onClick={() => handlePayment(order.id)}>去支付</Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  // Render empty state
  const renderEmptyState = (message: string) => (
    <div className="text-center py-12">
      <p className="text-muted-foreground">{message}</p>
    </div>
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">我的订单</h1>
        <p className="text-muted-foreground">查看和管理您的机票订单</p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">全部订单 ({allOrders.length})</TabsTrigger>
          <TabsTrigger value="upcoming">
            未出行 ({upcomingOrders.length})
          </TabsTrigger>
          <TabsTrigger value="pending">
            待支付 ({pendingPaymentOrders.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          {allOrders.length > 0
            ? allOrders.map(renderOrderCard)
            : renderEmptyState("暂时没有订单")}
        </TabsContent>

        <TabsContent value="upcoming" className="mt-6">
          {upcomingOrders.length > 0
            ? upcomingOrders.map(renderOrderCard)
            : renderEmptyState("暂时没有未出行的订单")}
        </TabsContent>

        <TabsContent value="pending" className="mt-6">
          {pendingPaymentOrders.length > 0
            ? pendingPaymentOrders.map(renderOrderCard)
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
