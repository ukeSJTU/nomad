import {
  PassengerFormCard,
  type PassengerFormData,
  type SavedPassenger,
} from "@nomad/ui/components/flights/booking";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

const meta: Meta<typeof PassengerFormCard> = {
  title: "Flights/Booking/PassengerFormCard",
  component: PassengerFormCard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PassengerFormCard>;

// Mock saved passengers data
const mockSavedPassengers: SavedPassenger[] = [
  {
    id: "1",
    name: "张三",
    documentType: "id_card",
    documentNumber: "110101199001011234",
    phone: "13800138000",
  },
  {
    id: "2",
    name: "李四",
    documentType: "passport",
    documentNumber: "E12345678",
    phone: "13900139000",
  },
  {
    id: "3",
    name: "王五",
    documentType: "id_card",
    documentNumber: "110101199101011234",
    phone: null,
  },
];

/**
 * Wrapper component to manage state for the story
 */
function PassengerFormCardWrapper({
  initialPassengers,
  savedPassengers,
}: {
  initialPassengers: PassengerFormData[];
  savedPassengers: SavedPassenger[];
}) {
  const [passengers, setPassengers] =
    useState<PassengerFormData[]>(initialPassengers);
  const [selectedPassengerIds, setSelectedPassengerIds] = useState<string[]>(
    []
  );

  const handleChange = (
    index: number,
    field: keyof PassengerFormData,
    value: string
  ) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
  };

  const handleToggleSavedPassenger = (passengerId: string) => {
    if (selectedPassengerIds.includes(passengerId)) {
      // Deselect: remove from list
      setSelectedPassengerIds(prev => prev.filter(id => id !== passengerId));
    } else {
      // Select: add to list and fill first empty form
      setSelectedPassengerIds(prev => [...prev, passengerId]);
      const savedPassenger = savedPassengers.find(p => p.id === passengerId);
      if (savedPassenger) {
        const emptyIndex = passengers.findIndex(
          p => !p.name && !p.documentNumber
        );
        if (emptyIndex !== -1) {
          const updated = [...passengers];
          updated[emptyIndex] = {
            name: savedPassenger.name,
            documentType: savedPassenger.documentType,
            documentNumber: savedPassenger.documentNumber,
            phone: savedPassenger.phone || "",
          };
          setPassengers(updated);
        }
      }
    }
  };

  const handleAddPassenger = () => {
    setPassengers([
      ...passengers,
      {
        name: "",
        documentType: "id_card",
        documentNumber: "",
        phone: "",
      },
    ]);
  };

  const handleRemovePassenger = (index: number) => {
    if (passengers.length > 1) {
      setPassengers(passengers.filter((_, i) => i !== index));
    }
  };

  const showDeleteButton = (forms: PassengerFormData[]): boolean => {
    if (forms.length === 1) {
      return Boolean(
        forms[0].name || forms[0].documentNumber || forms[0].phone
      );
    }
    return true;
  };

  return (
    <PassengerFormCard
      passengers={passengers}
      savedPassengers={savedPassengers}
      selectedPassengerIds={selectedPassengerIds}
      onChange={handleChange}
      onToggleSavedPassenger={handleToggleSavedPassenger}
      onRemovePassenger={handleRemovePassenger}
      onAddPassenger={handleAddPassenger}
      showDeleteButton={showDeleteButton}
    />
  );
}

/**
 * Default state - Single empty passenger with saved passengers
 */
export const Default: Story = {
  render: () => (
    <PassengerFormCardWrapper
      initialPassengers={[
        {
          name: "",
          documentType: "id_card",
          documentNumber: "",
          phone: "",
        },
      ]}
      savedPassengers={mockSavedPassengers}
    />
  ),
};

/**
 * Empty form without saved passengers
 */
export const NoSavedPassengers: Story = {
  render: () => (
    <PassengerFormCardWrapper
      initialPassengers={[
        {
          name: "",
          documentType: "id_card",
          documentNumber: "",
          phone: "",
        },
      ]}
      savedPassengers={[]}
    />
  ),
};

/**
 * Single passenger with pre-filled data
 */
export const PreFilled: Story = {
  render: () => (
    <PassengerFormCardWrapper
      initialPassengers={[
        {
          name: "张三",
          documentType: "id_card",
          documentNumber: "110101199001011234",
          phone: "13800138000",
        },
      ]}
      savedPassengers={mockSavedPassengers}
    />
  ),
};

/**
 * Multiple passengers - one filled, one empty
 */
export const MultiplePassengers: Story = {
  render: () => (
    <PassengerFormCardWrapper
      initialPassengers={[
        {
          name: "张三",
          documentType: "id_card",
          documentNumber: "110101199001011234",
          phone: "13800138000",
        },
        {
          name: "李四",
          documentType: "passport",
          documentNumber: "E12345678",
          phone: "13900139000",
        },
      ]}
      savedPassengers={mockSavedPassengers}
    />
  ),
};
