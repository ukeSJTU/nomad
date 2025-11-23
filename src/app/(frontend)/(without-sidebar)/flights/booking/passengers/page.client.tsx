"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

import {
  type ContactInfo,
  ContactInfoCard,
  type ContactInfoValidationErrors,
  FlightSummaryCard,
  PassengerFormCard,
  validateContactInfo,
} from "@/components/flights/booking";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { usePassengerForms } from "@/hooks/use-passenger-forms";
import { createOrderAction } from "@/lib/actions";
import type { CreateOrderResult } from "@/types/actions";
import type { PassengerPageFlightDTO, SavedPassengerDTO } from "@/types/dto";

interface BookingPassengersPageClientProps {
  seatClassId?: string;
  outboundSeatClassId?: string;
  inboundSeatClassId?: string;
  savedPassengers: SavedPassengerDTO[];
  outboundFlight: PassengerPageFlightDTO;
  inboundFlight: PassengerPageFlightDTO | null;
}

export function BookingPassengersPageClient({
  seatClassId,
  outboundSeatClassId,
  inboundSeatClassId,
  savedPassengers,
  outboundFlight,
  inboundFlight,
}: BookingPassengersPageClientProps) {
  const router = useRouter();

  // Use custom hook for passenger form management
  const {
    passengers,
    selectedPassengerIds,
    handleAddPassenger,
    handleRemovePassenger,
    handlePassengerChange,
    handleSelectSavedPassenger,
  } = usePassengerForms(savedPassengers);

  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    method: "email",
    email: "",
    phone: "",
  });
  const [contactErrors, setContactErrors] =
    useState<ContactInfoValidationErrors>({});
  const [state, setState] = useState<CreateOrderResult | null>(null);
  const [isPending, startTransition] = useTransition();

  // Navigate on successful order creation
  useEffect(() => {
    if (state?.success && state.data?.orderId) {
      const params = new URLSearchParams();
      params.set("orderId", state.data.orderId);
      router.push(`/flights/booking/ancillary?${params.toString()}`);
    }
  }, [state, router]);

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    startTransition(async () => {
      // Clear previous errors
      setContactErrors({});

      // Validate contact information
      const errors = validateContactInfo(contactInfo);
      setContactErrors(errors);

      // If there are validation errors, don't proceed
      if (Object.keys(errors).length > 0) {
        setState({ success: false, error: "请检查联系人信息" });
        return;
      }

      // Validate passenger data
      const hasEmptyFields = passengers.some(
        p => !p.name || !p.documentType || !p.documentNumber
      );

      if (hasEmptyFields) {
        setState({
          success: false,
          error: "请填写所有乘客信息",
        });
        return;
      }

      // Create order
      const result = await createOrderAction({
        outboundSeatClassId: seatClassId || outboundSeatClassId!,
        inboundSeatClassId,
        passengers,
        contactInfo,
      });

      setState(result);
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* Main Content - Left Side */}
      <div className="lg:col-span-3">
        <div className="space-y-6">
          {/* Passenger Information Section */}
          <PassengerFormCard
            passengers={passengers}
            savedPassengers={savedPassengers}
            selectedPassengerIds={selectedPassengerIds}
            onChange={handlePassengerChange}
            onToggleSavedPassenger={handleSelectSavedPassenger}
            onRemovePassenger={handleRemovePassenger}
            onAddPassenger={handleAddPassenger}
          />

          {/* Contact Information */}
          <ContactInfoCard
            value={contactInfo}
            onChange={setContactInfo}
            errors={contactErrors}
          />

          {/* Error Message */}
          {state?.error && (
            <Alert variant="destructive">
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}

          {/* Action Button */}
          <div className="flex justify-end">
            <Button onClick={handleNext} size="lg" disabled={isPending}>
              {isPending ? "创建订单中..." : "下一步"}
            </Button>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Flight Summary */}
      <div className="lg:col-span-2">
        <FlightSummaryCard
          outboundFlight={outboundFlight}
          inboundFlight={inboundFlight}
          passengerCount={passengers.length}
        />
      </div>
    </div>
  );
}
