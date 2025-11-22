"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  CancelOrderDialog,
  OrderContactInfo,
  OrderErrorDialog,
  OrderFlightInfo,
  OrderPassengerInfo,
  OrderPaymentDetails,
  OrderStatusCard,
  OrderSuccessDialog,
} from "@/components/flights/orders";
import { cancelOrderAction } from "@/lib/actions/orders";
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
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Handle cancel order confirmation
  const handleCancelOrderClick = () => {
    setShowCancelDialog(true);
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
        setErrorMessage(result.error || "取消订单失败，请重试");
        setShowErrorDialog(true);
      }
    } catch (_error) {
      setShowCancelDialog(false);
      setErrorMessage("取消订单时发生错误，请重试");
      setShowErrorDialog(true);
    } finally {
      setIsCancelling(false);
    }
  };

  // Handle success dialog confirm
  const handleSuccessConfirm = () => {
    setShowSuccessDialog(false);
  };

  // Handle error dialog confirm
  const handleErrorConfirm = () => {
    setShowErrorDialog(false);
  };

  // Handle go to payment
  const handleGoToPayment = () => {
    router.push(`/flights/booking/payment?orderId=${order.status.id}`);
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
              onResendConfirmation={handleCancelOrderClick}
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

      {/* Success Dialog */}
      <OrderSuccessDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
        onConfirm={handleSuccessConfirm}
      />

      {/* Error Dialog */}
      <OrderErrorDialog
        open={showErrorDialog}
        onOpenChange={setShowErrorDialog}
        onConfirm={handleErrorConfirm}
        errorMessage={errorMessage}
      />
    </>
  );
}
