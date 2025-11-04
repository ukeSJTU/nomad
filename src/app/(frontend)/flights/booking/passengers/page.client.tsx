"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleNext = async () => {
    // Clear previous errors
    setSubmitError(null);

    // Validate contact information
    const errors = validateContactInfo(contactInfo);
    setContactErrors(errors);

    // If there are validation errors, don't proceed
    if (Object.keys(errors).length > 0) {
      return;
    }

    // TODO: Validate passenger data
    // For now, basic validation: check if all required fields are filled
    const hasEmptyFields = passengers.some(
      p =>
        !p.englishFirstName ||
        !p.englishLastName ||
        !p.documentType ||
        !p.documentNumber
    );

    if (hasEmptyFields) {
      setSubmitError("Please fill in all required passenger information");
      return;
    }

    // Create order
    setIsSubmitting(true);

    try {
      const result = await createOrderAction({
        outboundSeatClassId: seatClassId || outboundSeatClassId!,
        inboundSeatClassId,
        passengers,
        contactInfo,
      });

      if (!result.success) {
        setSubmitError(result.error || "Failed to create order");
        setIsSubmitting(false);
        return;
      }

      // Navigate to ancillary page with order ID
      const params = new URLSearchParams();
      params.set("orderId", result.data!.orderId);

      router.push(`/flights/booking/ancillary?${params.toString()}`);
    } catch (error) {
      console.error("Error creating order:", error);
      setSubmitError("An unexpected error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
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
      {submitError && (
        <Alert variant="destructive">
          <AlertDescription>{submitError}</AlertDescription>
        </Alert>
      )}

      {/* Action Button */}
      <div className="flex justify-end">
        <Button onClick={handleNext} size="lg" disabled={isSubmitting}>
          {isSubmitting ? "创建订单中..." : "下一步"}
        </Button>
      </div>
    </div>
  );
}
