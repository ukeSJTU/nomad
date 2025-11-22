"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import {
  CancelOrderDialog,
  OrderContactInfo,
  OrderFlightInfo,
  OrderPassengerInfo,
  OrderPaymentDetails,
  OrderStatusCard,
  OrderSuccessDialog,
  RefundOrderDialog,
} from "@/components/flights/orders";
import { resendOrderConfirmationAction } from "@/lib/actions/emails";
import { cancelOrderAction, refundOrderAction } from "@/lib/actions/orders";
import { OrderDetailFull } from "@/types/dto/orders";

type OrderDetailsPageClientProps = {
  order: OrderDetailFull;
};

/**
 * Order Details Page - Client Component
 *
 * Displays order information with left-right layout:
 * - Left: Order status, flight info, passenger info, contact info
 * - Right: Payment details (sticky)
 *
 * Features:
 * - Payment countdown timer for PENDING_PAYMENT status
 * - Action buttons based on order status
 * - Cancel order functionality
 */
export default function OrderDetailsPageClient({
  order,
}: OrderDetailsPageClientProps) {
  const router = useRouter();
  const [isCancelling, setIsCancelling] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [isRefunding, setIsRefunding] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showRefundDialog, setShowRefundDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  // Handle cancel order confirmation
  const handleCancelOrderClick = () => {
    setShowCancelDialog(true);
  };

  // Handle resend confirmation email
  const handleResendConfirmation = async () => {
    setIsResending(true);

    try {
      const result = await resendOrderConfirmationAction(order.status.id);

      if (result.success) {
        toast.success("确认邮件已重新发送");
      } else {
        toast.error(result.error || "发送邮件失败，请重试");
      }
    } catch (_error) {
      toast.error("发送邮件时发生错误，请重试");
    } finally {
      setIsResending(false);
    }
  };

  // Handle actual cancel order
  const handleConfirmCancel = async () => {
    setIsCancelling(true);

    try {
      const result = await cancelOrderAction(order.status.id);

      if (result.success) {
        setShowCancelDialog(false);
        setShowSuccessDialog(true);
        // Refresh the page to show updated order status
        router.refresh();
      } else {
        setShowCancelDialog(false);
        toast.error(result.error || "取消订单失败，请重试");
      }
    } catch (_error) {
      setShowCancelDialog(false);
      toast.error("取消订单时发生错误，请重试");
    } finally {
      setIsCancelling(false);
    }
  };

  // Handle refund order confirmation
  const handleRequestRefund = () => {
    setShowRefundDialog(true);
  };

  // Handle actual refund order
  const handleConfirmRefund = async () => {
    setIsRefunding(true);

    try {
      const result = await refundOrderAction(order.status.id);

      if (result.success) {
        setShowRefundDialog(false);
        toast.success("退款申请成功，款项将退回到您的账户余额");
        // Refresh the page to show updated order status
        router.refresh();
      } else {
        setShowRefundDialog(false);
        toast.error(result.error || "退款失败，请重试");
      }
    } catch (_error) {
      setShowRefundDialog(false);
      toast.error("退款时发生错误，请重试");
    } finally {
      setIsRefunding(false);
    }
  };

  // Handle success dialog confirm
  const handleSuccessConfirm = () => {
    setShowSuccessDialog(false);
  };

  // Handle go to payment
  const handleGoToPayment = () => {
    router.push(`/flights/booking/payment?orderId=${order.status.id}`);
  };

  // Check if order can be refunded (flight hasn't departed)
  const canRefund = () => {
    if (order.status.status !== "CONFIRMED") return false;

    const now = new Date();
    const outboundDeparted =
      new Date(order.outboundFlight.departureDatetime) <= now;
    const inboundDeparted =
      order.inboundFlight &&
      new Date(order.inboundFlight.departureDatetime) <= now;

    return !outboundDeparted && !inboundDeparted;
  };

  return (
    <>
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Side - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status Card */}
            <OrderStatusCard
              data={order.status}
              onGoToPayment={handleGoToPayment}
              onCancelOrder={handleCancelOrderClick}
              onResendConfirmation={handleResendConfirmation}
              onRequestRefund={handleRequestRefund}
              isLoading={isCancelling || isResending || isRefunding}
              canRefund={canRefund()}
            />

            {/* Flight Information Card */}
            <OrderFlightInfo
              outboundFlight={order.outboundFlight}
              inboundFlight={order.inboundFlight}
            />

            {/* Passenger Information Card */}
            <OrderPassengerInfo passengers={order.passengers} />

            {/* Contact Information Card */}
            <OrderContactInfo contactInfo={order.contact} />
          </div>

          {/* Right Side - Payment Details (Sticky) */}
          <div className="lg:col-span-1">
            <OrderPaymentDetails paymentData={order.payment} />
          </div>
        </div>
      </div>

      {/* Cancel Order Confirmation Dialog */}
      <CancelOrderDialog
        open={showCancelDialog}
        onOpenChange={setShowCancelDialog}
        onConfirm={handleConfirmCancel}
        isLoading={isCancelling}
      />

      {/* Refund Order Confirmation Dialog */}
      <RefundOrderDialog
        open={showRefundDialog}
        onOpenChange={setShowRefundDialog}
        onConfirm={handleConfirmRefund}
        isLoading={isRefunding}
        refundAmount={order.payment.totalAmount}
      />

      {/* Success Dialog */}
      <OrderSuccessDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
        onConfirm={handleSuccessConfirm}
      />
    </>
  );
}
