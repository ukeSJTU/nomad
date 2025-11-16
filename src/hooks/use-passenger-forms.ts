import { useMemo, useState } from "react";

import type { PassengerFormData } from "@/components/flights/booking/passenger-form-card";

export interface SavedPassenger {
  id: string;
  name: string;
  documentType: "passport" | "id_card" | "other";
  documentNumber: string;
  phone: string | null;
}

const EMPTY_PASSENGER_FORM: PassengerFormData = {
  name: "",
  documentType: "id_card",
  documentNumber: "",
  phone: "",
  linkedSavedPassengerId: undefined,
};

/**
 * Check if a passenger form is empty (no user input in text fields)
 * Note: Select fields (documentType) are not checked as they have default values
 */
export function isFormEmpty(form: PassengerFormData): boolean {
  return !form.name && !form.documentNumber && !form.phone;
}

/**
 * Convert a saved passenger to form data
 */
export function savedPassengerToFormData(
  savedPassenger: SavedPassenger,
  linkId?: string
): PassengerFormData {
  return {
    name: savedPassenger.name,
    documentType: savedPassenger.documentType,
    documentNumber: savedPassenger.documentNumber,
    phone: savedPassenger.phone || "",
    linkedSavedPassengerId: linkId,
  };
}

/**
 * Determine if delete button should be shown for a passenger form
 */
export function shouldShowDeleteButton(
  passengers: PassengerFormData[]
): boolean {
  if (passengers.length === 1) {
    // Single form: show delete only if it has data
    return !isFormEmpty(passengers[0]);
  }
  // Multiple forms: always show delete
  return true;
}

/**
 * Custom hook for managing passenger forms with saved passenger selection
 *
 * Handles:
 * - Adding/removing passenger forms
 * - Selecting/deselecting saved passengers
 * - Auto-filling forms from saved passengers
 * - Tracking which form is filled by which saved passenger (via linkedSavedPassengerId)
 * - Unlinking saved passengers when forms are manually edited
 *
 * Design: Uses passengers array as single source of truth.
 * Each PassengerFormData has an optional linkedSavedPassengerId field.
 * selectedPassengerIds is derived from passengers array.
 */
export function usePassengerForms(savedPassengers: SavedPassenger[]) {
  const [passengers, setPassengers] = useState<PassengerFormData[]>([
    { ...EMPTY_PASSENGER_FORM },
  ]);

  // Derive selected passenger IDs from passengers array
  const selectedPassengerIds = useMemo(
    () =>
      passengers
        .map(p => p.linkedSavedPassengerId)
        .filter((id): id is string => id !== undefined),
    [passengers]
  );

  /**
   * Add a new empty passenger form
   */
  const handleAddPassenger = () => {
    setPassengers(prev => [...prev, { ...EMPTY_PASSENGER_FORM }]);
  };

  /**
   * Remove a passenger form by index
   * If it's the last form, clear it instead of removing
   */
  const handleRemovePassenger = (index: number) => {
    setPassengers(prev => {
      if (prev.length === 1) {
        // Last form: clear data but keep the form
        return [{ ...EMPTY_PASSENGER_FORM }];
      } else {
        // Multiple forms: remove this form
        return prev.filter((_, i) => i !== index);
      }
    });
  };

  /**
   * Update a field in a passenger form
   * If the form was filled by a saved passenger and a text input field is changed, unlink it
   */
  const handlePassengerChange = (
    index: number,
    field: keyof PassengerFormData,
    value: string
  ) => {
    setPassengers(prevPassengers => {
      const updated = [...prevPassengers];
      const currentForm = updated[index];

      // Only unlink if a text input field is changed (not documentType)
      const textInputFields: (keyof PassengerFormData)[] = [
        "name",
        "documentNumber",
        "phone",
      ];
      const shouldUnlink =
        textInputFields.includes(field) && currentForm.linkedSavedPassengerId;

      updated[index] = {
        ...currentForm,
        [field]: value,
        // If this form was linked to a saved passenger and a text field changed, unlink it
        linkedSavedPassengerId: shouldUnlink
          ? undefined
          : currentForm.linkedSavedPassengerId,
      };
      return updated;
    });
  };

  /**
   * Toggle selection of a saved passenger
   * When selected: auto-fills an empty form or creates a new one
   * When deselected: removes/clears the form that was filled by this saved passenger
   */
  const handleSelectSavedPassenger = (passengerId: string) => {
    setPassengers(prev => {
      const isCurrentlySelected = prev.some(
        p => p.linkedSavedPassengerId === passengerId
      );

      if (isCurrentlySelected) {
        // Deselect: find and remove/clear the linked form
        const formIndex = prev.findIndex(
          p => p.linkedSavedPassengerId === passengerId
        );

        if (formIndex !== -1) {
          if (prev.length === 1) {
            // Last form: clear data but keep the form
            return [{ ...EMPTY_PASSENGER_FORM }];
          } else {
            // Multiple forms: remove this form
            return prev.filter((_, i) => i !== formIndex);
          }
        }
        return prev;
      } else {
        // Select: fill first empty form or create new one
        const savedPassenger = savedPassengers.find(p => p.id === passengerId);
        if (!savedPassenger) return prev;

        const emptyFormIndex = prev.findIndex(isFormEmpty);
        const newFormData = savedPassengerToFormData(
          savedPassenger,
          passengerId
        );

        if (emptyFormIndex !== -1) {
          // Fill the existing empty form
          const updated = [...prev];
          updated[emptyFormIndex] = newFormData;
          return updated;
        } else {
          // No empty form found, add a new one
          return [...prev, newFormData];
        }
      }
    });
  };

  return {
    passengers,
    selectedPassengerIds,
    handleAddPassenger,
    handleRemovePassenger,
    handlePassengerChange,
    handleSelectSavedPassenger,
  };
}
