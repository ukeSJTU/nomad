"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  type ContactInfo,
  ContactInfoCard,
  type ContactInfoValidationErrors,
  validateContactInfo,
} from "@/components/flights/contact-info-card";
import {
  PassengerFormCard,
  type PassengerFormData,
} from "@/components/flights/passenger-form-card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
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
  const [selectedPassengers, setSelectedPassengers] = useState<string[]>([]);
  // Map to track which passenger form is filled by which saved passenger
  const [passengerFormMapping, setPassengerFormMapping] = useState<
    Map<number, string>
  >(new Map());
  const [passengers, setPassengers] = useState<PassengerFormData[]>([
    {
      chineseName: "",
      englishFirstName: "",
      englishLastName: "",
      documentType: "id_card",
      documentNumber: "",
      phone: "",
    },
  ]);
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    method: "email",
    email: "",
    phone: "",
  });
  const [contactErrors, setContactErrors] =
    useState<ContactInfoValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleAddPassenger = () => {
    setPassengers([
      ...passengers,
      {
        chineseName: "",
        englishFirstName: "",
        englishLastName: "",
        documentType: "id_card",
        documentNumber: "",
        phone: "",
      },
    ]);
  };

  const handleRemovePassenger = (index: number) => {
    if (passengers.length > 1) {
      // Check if this form was filled by a saved passenger
      const savedPassengerId = passengerFormMapping.get(index);
      if (savedPassengerId) {
        // Deselect the saved passenger
        setSelectedPassengers(
          selectedPassengers.filter(id => id !== savedPassengerId)
        );
      }

      // Remove the passenger form
      setPassengers(passengers.filter((_, i) => i !== index));

      // Update mapping: remove the deleted index and adjust indices after it
      const newMapping = new Map<number, string>();
      passengerFormMapping.forEach((passengerId, formIndex) => {
        if (formIndex < index) {
          // Keep indices before the deleted one
          newMapping.set(formIndex, passengerId);
        } else if (formIndex > index) {
          // Shift down indices after the deleted one
          newMapping.set(formIndex - 1, passengerId);
        }
        // Skip the deleted index
      });
      setPassengerFormMapping(newMapping);
    }
  };

  const handlePassengerChange = (
    index: number,
    field: keyof PassengerFormData,
    value: string
  ) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);

    // If this form was filled by a saved passenger, unlink it
    const savedPassengerId = passengerFormMapping.get(index);
    if (savedPassengerId) {
      // Remove from selected passengers
      setSelectedPassengers(
        selectedPassengers.filter(id => id !== savedPassengerId)
      );
      // Remove from mapping
      const newMapping = new Map(passengerFormMapping);
      newMapping.delete(index);
      setPassengerFormMapping(newMapping);
    }
  };

  const handleSelectSavedPassenger = (passengerId: string) => {
    const isCurrentlySelected = selectedPassengers.includes(passengerId);

    if (isCurrentlySelected) {
      // Deselect: Remove from selected list and clear the form
      setSelectedPassengers(
        selectedPassengers.filter(id => id !== passengerId)
      );

      // Find which form index was filled by this saved passenger
      const formIndex = Array.from(passengerFormMapping.entries()).find(
        ([, id]) => id === passengerId
      )?.[0];

      if (formIndex !== undefined) {
        // Clear the form
        const updated = [...passengers];
        updated[formIndex] = {
          chineseName: "",
          englishFirstName: "",
          englishLastName: "",
          documentType: "id_card",
          documentNumber: "",
          phone: "",
        };
        setPassengers(updated);

        // Remove from mapping
        const newMapping = new Map(passengerFormMapping);
        newMapping.delete(formIndex);
        setPassengerFormMapping(newMapping);
      }
    } else {
      // Select: Add to selected list and auto-fill a form
      setSelectedPassengers([...selectedPassengers, passengerId]);

      // Find the saved passenger data
      const savedPassenger = savedPassengers.find(p => p.id === passengerId);
      if (!savedPassenger) return;

      // Find the first empty form or create a new one
      let targetFormIndex = passengers.findIndex(
        p =>
          !p.chineseName &&
          !p.englishFirstName &&
          !p.englishLastName &&
          !p.documentNumber
      );

      const newPassengerData: PassengerFormData = {
        chineseName: savedPassenger.chineseName || "",
        englishFirstName: savedPassenger.englishFirstName || "",
        englishLastName: savedPassenger.englishLastName || "",
        documentType: savedPassenger.documentType,
        documentNumber: savedPassenger.documentNumber,
        phone: savedPassenger.phone || "",
      };

      let updatedPassengers: PassengerFormData[];
      if (targetFormIndex === -1) {
        // No empty form found, add a new one with the data
        targetFormIndex = passengers.length;
        updatedPassengers = [...passengers, newPassengerData];
      } else {
        // Fill the existing empty form
        updatedPassengers = [...passengers];
        updatedPassengers[targetFormIndex] = newPassengerData;
      }

      setPassengers(updatedPassengers);

      // Update mapping
      const newMapping = new Map(passengerFormMapping);
      newMapping.set(targetFormIndex, passengerId);
      setPassengerFormMapping(newMapping);
    }
  };

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
