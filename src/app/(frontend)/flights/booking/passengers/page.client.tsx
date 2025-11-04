"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

import {
  type ContactInfo,
  ContactInfoCard,
  type ContactInfoValidationErrors,
  validateContactInfo,
} from "@/components/flights/contact-info-card";
import { PassengerFormCard } from "@/components/flights/passenger-form-card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { usePassengerForms } from "@/hooks/use-passenger-forms";
import { createOrderAction } from "@/lib/actions/orders";

import type { SavedPassenger } from "./queries";

interface BookingPassengersPageClientProps {
  seatClassId?: string;
  outboundSeatClassId?: string;
  inboundSeatClassId?: string;
  savedPassengers: SavedPassenger[];
}

export function BookingPassengersPageClient({
  seatClassId,
  outboundSeatClassId,
  inboundSeatClassId,
  savedPassengers,
}: BookingPassengersPageClientProps) {
  const router = useRouter();

  // Use custom hook for passenger form management
  const {
    passengers,
    selectedPassengers,
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

  // Use useActionState for form submission
  const [state, formAction, isPending] = useActionState(
    async (_prevState: unknown, _formData: FormData) => {
      // Clear previous errors
      setContactErrors({});

      // Validate contact information
      const errors = validateContactInfo(contactInfo);
      setContactErrors(errors);

      // If there are validation errors, don't proceed
      if (Object.keys(errors).length > 0) {
        return { success: false, error: "Please check contact information" };
      }

      // Validate passenger data
      const hasEmptyFields = passengers.some(
        p =>
          !p.englishFirstName ||
          !p.englishLastName ||
          !p.documentType ||
          !p.documentNumber
      );

      if (hasEmptyFields) {
        return {
          success: false,
          error: "Please fill in all required passenger information",
        };
      }

      // Create order
      const result = await createOrderAction({
        outboundSeatClassId: seatClassId || outboundSeatClassId!,
        inboundSeatClassId,
        passengers,
        contactInfo,
      });

      return result;
    },
    null
  );

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
    // Trigger the form action
    const form = e.currentTarget.form;
    if (form) {
      form.requestSubmit();
    }
  };

  return (
    <form action={formAction}>
      <div className="space-y-6">
        {/* Passenger Information Section */}
        <PassengerFormCard
          passengers={passengers}
          savedPassengers={savedPassengers}
          selectedPassengerIds={selectedPassengers}
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
    </form>
  );
}
