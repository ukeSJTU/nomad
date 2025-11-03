"use client";

import { Plus } from "lucide-react";
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
import { Button } from "@/components/ui/button";

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

  const handleNext = () => {
    // Validate contact information
    const errors = validateContactInfo(contactInfo);
    setContactErrors(errors);

    // If there are validation errors, don't proceed
    if (Object.keys(errors).length > 0) {
      return;
    }

    // TODO: Validate passenger data

    // Build URL with flight seat class IDs
    const params = new URLSearchParams();
    if (seatClassId) {
      params.set("seatClassId", seatClassId);
    } else if (outboundSeatClassId) {
      params.set("outboundSeatClassId", outboundSeatClassId);
      if (inboundSeatClassId) {
        params.set("inboundSeatClassId", inboundSeatClassId);
      }
    }

    router.push(`/flights/booking/ancillary?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      {/* Passenger Information Forms */}
      {passengers.map((passenger, index) => (
        <PassengerFormCard
          key={index}
          passengerNumber={index + 1}
          data={passenger}
          savedPassengers={savedPassengers}
          selectedPassengerIds={selectedPassengers}
          onChange={(field, value) =>
            handlePassengerChange(index, field, value)
          }
          onToggleSavedPassenger={handleSelectSavedPassenger}
          onRemove={() => handleRemovePassenger(index)}
          showRemove={passengers.length > 1}
        />
      ))}

      {/* Add Passenger Button */}
      <Button variant="outline" className="w-full" onClick={handleAddPassenger}>
        <Plus className="h-4 w-4 mr-2" />
        添加乘机人
      </Button>

      {/* Contact Information */}
      <ContactInfoCard
        value={contactInfo}
        onChange={setContactInfo}
        errors={contactErrors}
      />

      {/* Action Button */}
      <div className="flex justify-end">
        <Button onClick={handleNext} size="lg">
          下一步
        </Button>
      </div>
    </div>
  );
}
