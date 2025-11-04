import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

import { AncillarySelection } from "@/components/flights/ancillary-selection";

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
 */
export const Interactive: Story = {
  render: args => {
    const [selectedServices, setSelectedServices] = useState<string[]>([]);

    const handleToggleService = (code: string) => {
      if (selectedServices.includes(code)) {
        setSelectedServices(selectedServices.filter(c => c !== code));
      } else {
        setSelectedServices([...selectedServices, code]);
      }
    };

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
 * With some services pre-selected
 */
export const WithPreselectedServices: Story = {
  render: args => {
    const [selectedServices, setSelectedServices] = useState<string[]>([
      "INSURANCE_BASIC",
      "MEAL_STANDARD",
    ]);

    const handleToggleService = (code: string) => {
      if (selectedServices.includes(code)) {
        setSelectedServices(selectedServices.filter(c => c !== code));
      } else {
        setSelectedServices([...selectedServices, code]);
      }
    };

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
 * With all premium services selected
 */
export const AllPremiumSelected: Story = {
  render: args => {
    const [selectedServices, setSelectedServices] = useState<string[]>([
      "INSURANCE_PREMIUM",
      "PICKUP_LUXURY",
      "MEAL_PREMIUM",
    ]);

    const handleToggleService = (code: string) => {
      if (selectedServices.includes(code)) {
        setSelectedServices(selectedServices.filter(c => c !== code));
      } else {
        setSelectedServices([...selectedServices, code]);
      }
    };

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

    const handleToggleService = (code: string) => {
      if (selectedServices.includes(code)) {
        setSelectedServices(selectedServices.filter(c => c !== code));
      } else {
        setSelectedServices([...selectedServices, code]);
      }
    };

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

    const handleToggleService = (code: string) => {
      if (selectedServices.includes(code)) {
        setSelectedServices(selectedServices.filter(c => c !== code));
      } else {
        setSelectedServices([...selectedServices, code]);
      }
    };

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
