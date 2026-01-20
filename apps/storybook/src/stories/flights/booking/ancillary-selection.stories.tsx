import type { Meta, StoryObj } from "@storybook/react-vite";
import type { AncillaryCategory } from "@ukesjtu/nomad-ui/components/flights/booking";
import { AncillarySelection } from "@ukesjtu/nomad-ui/components/flights/booking";
import { useState } from "react";

// Mock data
const mockCategories: AncillaryCategory[] = [
  {
    category: "INSURANCE",
    services: [
      {
        code: "INSURANCE_BASIC",
        name: "基础旅行险",
        description: "提供基本的旅行意外保障，包括意外伤害和医疗费用",
        price: 50.0,
        category: "INSURANCE",
      },
      {
        code: "INSURANCE_PREMIUM",
        name: "高级旅行险",
        description:
          "提供全面的旅行保障，包括意外伤害、医疗费用、行李丢失和航班延误",
        price: 120.0,
        category: "INSURANCE",
      },
      {
        code: "INSURANCE_FAMILY",
        name: "家庭旅行险",
        description: "适合全家出行，提供全面的家庭旅行保障",
        price: 200.0,
        category: "INSURANCE",
      },
    ],
  },
  {
    category: "AIRPORT_PICKUP",
    services: [
      {
        code: "PICKUP_ECONOMY",
        name: "经济型接送机",
        description: "舒适的经济型车辆接送机服务",
        price: 80.0,
        category: "AIRPORT_PICKUP",
      },
      {
        code: "PICKUP_BUSINESS",
        name: "商务型接送机",
        description: "高端商务车辆接送机服务，提供更舒适的乘坐体验",
        price: 150.0,
        category: "AIRPORT_PICKUP",
      },
      {
        code: "PICKUP_LUXURY",
        name: "豪华型接送机",
        description: "豪华车辆接送机服务，享受尊贵出行体验",
        price: 300.0,
        category: "AIRPORT_PICKUP",
      },
    ],
  },
  {
    category: "MEAL",
    services: [
      {
        code: "MEAL_STANDARD",
        name: "标准餐食",
        description: "提供标准的机上餐食，包括主食、小吃和饮料",
        price: 30.0,
        category: "MEAL",
      },
      {
        code: "MEAL_VEGETARIAN",
        name: "素食餐",
        description: "提供健康的素食餐食选择",
        price: 35.0,
        category: "MEAL",
      },
      {
        code: "MEAL_HALAL",
        name: "清真餐",
        description: "符合清真标准的餐食",
        price: 35.0,
        category: "MEAL",
      },
      {
        code: "MEAL_PREMIUM",
        name: "高级餐食",
        description: "提供精选的高级餐食，包括多道菜品和优质饮料",
        price: 80.0,
        category: "MEAL",
      },
    ],
  },
];

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
      const service = mockCategories
        .flatMap(cat => cat.services)
        .find(s => s.code === code);
      if (!service) return prevSelected;

      // Get all services in the same category
      const categoryServices =
        mockCategories.find(cat => cat.category === service.category)
          ?.services || [];
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
  title: "Flights/Booking/AncillarySelection",
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
    categories: {
      control: "object",
      description: "Ancillary services grouped by category",
    },
    formatPrice: {
      description: "Function to format price",
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

const formatPrice = (price: number) => `¥${price.toFixed(2)}`;

/**
 * Default state with no services selected
 */
export const Default: Story = {
  args: {
    selectedServices: [],
    onToggleService: () => {},
    categories: mockCategories,
    formatPrice,
    title: "选择增值服务",
  },
};

/**
 * Interactive example with state management
 * Try selecting different services within the same category to see the single-selection behavior
 */
export const Interactive: Story = {
  args: {
    selectedServices: [],
    categories: mockCategories,
    formatPrice,
  },
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
  args: {
    categories: mockCategories,
    formatPrice,
  },
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
  args: {
    categories: mockCategories,
    formatPrice,
  },
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
  args: {
    categories: mockCategories,
    formatPrice,
  },
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
  args: {
    categories: mockCategories,
    formatPrice,
  },
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

/**
 * Empty categories showcase
 */
export const EmptyCategories: Story = {
  args: {
    selectedServices: [],
    onToggleService: () => {},
    categories: [],
    formatPrice,
    title: "选择增值服务",
  },
};

/**
 * Single category showcase
 */
export const SingleCategory: Story = {
  args: {
    categories: [mockCategories[0]], // Only insurance
    formatPrice,
  },
  render: args => {
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
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
