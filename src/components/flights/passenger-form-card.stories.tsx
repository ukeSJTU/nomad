import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

import {
  PassengerFormCard,
  type PassengerFormData,
} from "./passenger-form-card";

const meta: Meta<typeof PassengerFormCard> = {
  title: "Flights/PassengerFormCard",
  component: PassengerFormCard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PassengerFormCard>;

// Mock saved passengers data
const mockSavedPassengers = [
  {
    id: "1",
    name: "张三",
    chineseName: "张三",
    englishFirstName: "San",
    englishLastName: "Zhang",
    documentType: "id_card" as const,
    documentNumber: "110101199001011234",
    phone: "13800138000",
  },
  {
    id: "2",
    name: "李四",
    chineseName: "李四",
    englishFirstName: "Si",
    englishLastName: "Li",
    documentType: "passport" as const,
    documentNumber: "E12345678",
    phone: "13900139000",
  },
  {
    id: "3",
    name: "王五",
    chineseName: "王五",
    englishFirstName: "Wu",
    englishLastName: "Wang",
    documentType: "id_card" as const,
    documentNumber: "110101199101011234",
    phone: null,
  },
];

/**
 * Wrapper component to manage state for the story
 */
function PassengerFormCardWrapper({
  initialData,
  savedPassengers,
  passengerNumber = 1,
  showRemove = false,
}: {
  initialData: PassengerFormData;
  savedPassengers: typeof mockSavedPassengers;
  passengerNumber?: number;
  showRemove?: boolean;
}) {
  const [data, setData] = useState<PassengerFormData>(initialData);
  const [selectedPassengerIds, setSelectedPassengerIds] = useState<string[]>(
    []
  );

  const handleChange = (field: keyof PassengerFormData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleToggleSavedPassenger = (passengerId: string) => {
    if (selectedPassengerIds.includes(passengerId)) {
      // Deselect: remove from list and clear form
      setSelectedPassengerIds(prev => prev.filter(id => id !== passengerId));
      setData({
        chineseName: "",
        englishFirstName: "",
        englishLastName: "",
        documentType: "id_card",
        documentNumber: "",
        phone: "",
      });
    } else {
      // Select: add to list and fill form
      setSelectedPassengerIds(prev => [...prev, passengerId]);
      const savedPassenger = savedPassengers.find(p => p.id === passengerId);
      if (savedPassenger) {
        setData({
          chineseName: savedPassenger.chineseName || "",
          englishFirstName: savedPassenger.englishFirstName || "",
          englishLastName: savedPassenger.englishLastName || "",
          documentType: savedPassenger.documentType,
          documentNumber: savedPassenger.documentNumber,
          phone: savedPassenger.phone || "",
        });
      }
    }
  };

  return (
    <PassengerFormCard
      passengerNumber={passengerNumber}
      data={data}
      savedPassengers={savedPassengers}
      selectedPassengerIds={selectedPassengerIds}
      onChange={handleChange}
      onToggleSavedPassenger={handleToggleSavedPassenger}
      onRemove={() => alert("Remove passenger")}
      showRemove={showRemove}
    />
  );
}

/**
 * Default state - Empty form with saved passengers
 */
export const Default: Story = {
  render: () => (
    <PassengerFormCardWrapper
      initialData={{
        chineseName: "",
        englishFirstName: "",
        englishLastName: "",
        documentType: "id_card",
        documentNumber: "",
        phone: "",
      }}
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
      initialData={{
        chineseName: "",
        englishFirstName: "",
        englishLastName: "",
        documentType: "id_card",
        documentNumber: "",
        phone: "",
      }}
      savedPassengers={[]}
    />
  ),
};

/**
 * Form with pre-filled data
 */
export const PreFilled: Story = {
  render: () => (
    <PassengerFormCardWrapper
      initialData={{
        chineseName: "张三",
        englishFirstName: "San",
        englishLastName: "Zhang",
        documentType: "id_card",
        documentNumber: "110101199001011234",
        phone: "13800138000",
      }}
      savedPassengers={mockSavedPassengers}
    />
  ),
};

/**
 * Second passenger with remove button
 */
export const SecondPassengerWithRemove: Story = {
  render: () => (
    <PassengerFormCardWrapper
      initialData={{
        chineseName: "",
        englishFirstName: "",
        englishLastName: "",
        documentType: "id_card",
        documentNumber: "",
        phone: "",
      }}
      savedPassengers={mockSavedPassengers}
      passengerNumber={2}
      showRemove={true}
    />
  ),
};

/**
 * Multiple passengers in a list
 */
export const MultiplePassengers: Story = {
  render: () => (
    <div className="space-y-6">
      <PassengerFormCardWrapper
        initialData={{
          chineseName: "张三",
          englishFirstName: "San",
          englishLastName: "Zhang",
          documentType: "id_card",
          documentNumber: "110101199001011234",
          phone: "13800138000",
        }}
        savedPassengers={mockSavedPassengers}
        passengerNumber={1}
        showRemove={false}
      />
      <PassengerFormCardWrapper
        initialData={{
          chineseName: "",
          englishFirstName: "",
          englishLastName: "",
          documentType: "id_card",
          documentNumber: "",
          phone: "",
        }}
        savedPassengers={mockSavedPassengers}
        passengerNumber={2}
        showRemove={true}
      />
    </div>
  ),
};
