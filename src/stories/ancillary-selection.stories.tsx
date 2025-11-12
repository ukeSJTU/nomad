import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

import { AncillarySelection } from "@/components/flights/ancillary-selection";
import {
  getAncillaryServiceByCode,
  getAncillaryServicesByCategory,
} from "@/lib/schema/ancillary";

// Helper function to create the toggle handler with single-selection logic
const createToggleHandler = (
  setSelectedServices: React.Dispatch<React.SetStateAction<string[]>>
) => {
  return (code: string) => {
    setSelectedServices(prevSelected => {
      // If already selected, deselect it
      if (prevSelected.includes(code)) {
        return prevSelected.filter(c => c !== code);
      }

      // Get the service being selected
      const service = getAncillaryServiceByCode(code);
      if (!service) return prevSelected;

      // Get all services in the same category
      const categoryServices = getAncillaryServicesByCategory(service.category);
      const categoryServiceCodes = categoryServices.map(s => s.code);

      // Remove any previously selected service from the same category
      const filteredServices = prevSelected.filter(
        c => !categoryServiceCodes.includes(c)
      );

      // Add the new service
      return [...filteredServices, code];
    });
  };
};

const meta = {
  title: "Flights/AncillarySelection",
  component: AncillarySelection,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    selectedServices: {
      control: "object",
      description: "Array of selected service codes",
    },
    onToggleService: {
      action: "toggled",
      description: "Callback when a service is toggled",
    },
    title: {
      control: "text",
      description: "Optional title for the card",
    },
    className: {
      control: "text",
      description: "Optional className for the card",
    },
  },
} satisfies Meta<typeof AncillarySelection>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default state with no services selected
 */
export const Default: Story = {
  args: {
    selectedServices: [],
    title: "选择增值服务",
  },
};

/**
 * Interactive example with state management
 * Try selecting different services within the same category to see the single-selection behavior
 */
export const Interactive: Story = {
  render: args => {
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const handleToggleService = createToggleHandler(setSelectedServices);

    return (
      <div className="space-y-4">
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-800">
            <strong>Try it:</strong> Select different services within the same
            category (e.g., Basic Insurance → Premium Insurance) to see how the
            component automatically deselects the previous choice.
          </p>
        </div>
        <AncillarySelection
          {...args}
          selectedServices={selectedServices}
          onToggleService={handleToggleService}
        />
        {selectedServices.length > 0 && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800 font-medium mb-2">
              Selected Services:
            </p>
            <ul className="text-sm text-green-700 list-disc list-inside">
              {selectedServices.map(code => (
                <li key={code}>{code}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  },
};

/**
 * With some services pre-selected (one per category)
 * Note: Only one service can be selected per category
 */
export const WithPreselectedServices: Story = {
  render: args => {
    const [selectedServices, setSelectedServices] = useState<string[]>([
      "INSURANCE_BASIC",
      "MEAL_STANDARD",
    ]);
    const handleToggleService = createToggleHandler(setSelectedServices);

    return (
      <div className="space-y-4">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Only one service can be selected per
            category. Selecting a different service in the same category will
            automatically deselect the previous one.
          </p>
        </div>
        <AncillarySelection
          {...args}
          selectedServices={selectedServices}
          onToggleService={handleToggleService}
        />
      </div>
    );
  },
};

/**
 * With all premium services selected
 */
export const AllPremiumSelected: Story = {
  render: args => {
    const [selectedServices, setSelectedServices] = useState<string[]>([
      "INSURANCE_PREMIUM",
      "PICKUP_LUXURY",
      "MEAL_PREMIUM",
    ]);
    const handleToggleService = createToggleHandler(setSelectedServices);

    return (
      <AncillarySelection
        {...args}
        selectedServices={selectedServices}
        onToggleService={handleToggleService}
      />
    );
  },
};

/**
 * With custom title
 */
export const CustomTitle: Story = {
  render: args => {
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const handleToggleService = createToggleHandler(setSelectedServices);

    return (
      <AncillarySelection
        {...args}
        selectedServices={selectedServices}
        onToggleService={handleToggleService}
        title="为您的旅程添加额外服务"
      />
    );
  },
};

/**
 * With custom className for styling
 */
export const WithCustomStyling: Story = {
  render: args => {
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const handleToggleService = createToggleHandler(setSelectedServices);

    return (
      <AncillarySelection
        {...args}
        selectedServices={selectedServices}
        onToggleService={handleToggleService}
        className="border-2 border-primary shadow-lg"
      />
    );
  },
};
