import { useState } from "react";

import type { PassengerFormData } from "@/components/flights/passenger-form-card";

export interface SavedPassenger {
  id: string;
  name: string;
  chineseName: string | null;
  englishFirstName: string | null;
  englishLastName: string | null;
  documentType: "passport" | "id_card" | "other";
  documentNumber: string;
  phone: string | null;
}

const EMPTY_PASSENGER_FORM: PassengerFormData = {
  chineseName: "",
  englishFirstName: "",
  englishLastName: "",
  documentType: "id_card",
  documentNumber: "",
  phone: "",
};

/**
 * Custom hook for managing passenger forms with saved passenger selection
 *
 * Handles:
 * - Adding/removing passenger forms
 * - Selecting/deselecting saved passengers
 * - Auto-filling forms from saved passengers
 * - Tracking which form is filled by which saved passenger
 * - Unlinking saved passengers when forms are manually edited
 */
export function usePassengerForms(savedPassengers: SavedPassenger[]) {
  const [selectedPassengers, setSelectedPassengers] = useState<string[]>([]);

  // Map to track which passenger form is filled by which saved passenger
  const [passengerFormMapping, setPassengerFormMapping] = useState<
    Map<number, string>
  >(new Map());

  const [passengers, setPassengers] = useState<PassengerFormData[]>([
    { ...EMPTY_PASSENGER_FORM },
  ]);

  /**
   * Add a new empty passenger form
   */
  const handleAddPassenger = () => {
    setPassengers([...passengers, { ...EMPTY_PASSENGER_FORM }]);
  };

  /**
   * Remove a passenger form by index
   * Also handles deselecting the saved passenger if the form was filled by one
   */
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

  /**
   * Update a field in a passenger form
   * If the form was filled by a saved passenger, unlink it
   */
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

  /**
   * Toggle selection of a saved passenger
   * When selected: auto-fills an empty form or creates a new one
   * When deselected: clears the form that was filled by this saved passenger
   */
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
        updated[formIndex] = { ...EMPTY_PASSENGER_FORM };
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

  return {
    passengers,
    selectedPassengers,
    handleAddPassenger,
    handleRemovePassenger,
    handlePassengerChange,
    handleSelectSavedPassenger,
  };
}
