import { Button } from "@nomad/ui/components/primitives/button";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { Stepper } from "@/components/common/stepper";

const meta = {
  title: "Common/Stepper",
  component: Stepper,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    currentStep: {
      control: { type: "number", min: 1, max: 5 },
      description: "The current active step (1-based index)",
    },
    variant: {
      control: "select",
      options: ["default", "compact"],
      description: "The visual variant of the stepper",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample steps data
const threeSteps = [
  {
    id: "step-1",
    label: "Account",
    description: "Create your account",
  },
  {
    id: "step-2",
    label: "Profile",
    description: "Set up your profile",
  },
  {
    id: "step-3",
    label: "Complete",
    description: "Finish setup",
  },
];

const fourSteps = [
  {
    id: "step-1",
    label: "Personal Info",
    description: "Enter your details",
  },
  {
    id: "step-2",
    label: "Address",
    description: "Provide your address",
  },
  {
    id: "step-3",
    label: "Payment",
    description: "Add payment method",
  },
  {
    id: "step-4",
    label: "Review",
    description: "Review and confirm",
  },
];

const fiveSteps = [
  {
    id: "step-1",
    label: "Search",
  },
  {
    id: "step-2",
    label: "Select",
  },
  {
    id: "step-3",
    label: "Details",
  },
  {
    id: "step-4",
    label: "Payment",
  },
  {
    id: "step-5",
    label: "Confirm",
  },
];

// Default stepper on first step
export const Default: Story = {
  args: {
    steps: threeSteps,
    currentStep: 1,
    variant: "default",
  },
};

// Second step active
export const SecondStep: Story = {
  args: {
    steps: threeSteps,
    currentStep: 2,
    variant: "default",
  },
};

// Last step active
export const LastStep: Story = {
  args: {
    steps: threeSteps,
    currentStep: 3,
    variant: "default",
  },
};

// Compact variant
export const Compact: Story = {
  args: {
    steps: threeSteps,
    currentStep: 2,
    variant: "compact",
  },
};

// Compact variant - first step
export const CompactFirstStep: Story = {
  args: {
    steps: threeSteps,
    currentStep: 1,
    variant: "compact",
  },
};

// Compact variant - last step
export const CompactLastStep: Story = {
  args: {
    steps: threeSteps,
    currentStep: 3,
    variant: "compact",
  },
};

// Four steps
export const FourSteps: Story = {
  args: {
    steps: fourSteps,
    currentStep: 2,
    variant: "default",
  },
};

// Four steps compact
export const FourStepsCompact: Story = {
  args: {
    steps: fourSteps,
    currentStep: 3,
    variant: "compact",
  },
};

// Five steps without descriptions
export const FiveStepsNoDescription: Story = {
  args: {
    steps: fiveSteps,
    currentStep: 3,
    variant: "default",
  },
};

// Five steps compact
export const FiveStepsCompact: Story = {
  args: {
    steps: fiveSteps,
    currentStep: 4,
    variant: "compact",
  },
};

// Wide container example
export const WideContainer: Story = {
  args: {
    steps: fourSteps,
    currentStep: 2,
    variant: "default",
  },
  render: args => (
    <div className="w-[800px]">
      <Stepper {...args} />
    </div>
  ),
};

// Narrow container example
export const NarrowContainer: Story = {
  args: {
    steps: threeSteps,
    currentStep: 2,
    variant: "compact",
  },
  render: args => (
    <div className="w-[400px]">
      <Stepper {...args} />
    </div>
  ),
};

// Interactive example showing all states
export const AllStates: Story = {
  args: {
    steps: fourSteps,
    currentStep: 2,
    variant: "default",
  },
  render: args => (
    <div className="space-y-8 w-[800px]">
      <div>
        <h3 className="text-sm font-medium mb-4">Step 1 - First step</h3>
        <Stepper {...args} currentStep={1} />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-4">Step 2 - In progress</h3>
        <Stepper {...args} currentStep={2} />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-4">Step 3 - Almost done</h3>
        <Stepper {...args} currentStep={3} />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-4">Step 4 - Complete</h3>
        <Stepper {...args} currentStep={4} />
      </div>
    </div>
  ),
};

// Comparison of variants
export const VariantComparison: Story = {
  args: {
    steps: fourSteps,
    currentStep: 2,
  },
  render: args => (
    <div className="space-y-8 w-[800px]">
      <div>
        <h3 className="text-sm font-medium mb-4">Default Variant</h3>
        <Stepper {...args} variant="default" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-4">Compact Variant</h3>
        <Stepper {...args} variant="compact" />
      </div>
    </div>
  ),
};

// Interactive animation demo
export const InteractiveAnimation: Story = {
  args: {
    steps: fourSteps,
    currentStep: 1,
    variant: "default",
  },
  render: args => {
    const [currentStep, setCurrentStep] = useState(1);

    const handleNext = () => {
      if (currentStep < args.steps.length) {
        setCurrentStep(currentStep + 1);
      }
    };

    const handlePrevious = () => {
      if (currentStep > 1) {
        setCurrentStep(currentStep - 1);
      }
    };

    const handleReset = () => {
      setCurrentStep(1);
    };

    return (
      <div className="space-y-6 w-[800px]">
        <div>
          <h3 className="text-sm font-medium mb-4">
            Interactive Demo - Click buttons to see animation
          </h3>
          <Stepper {...args} currentStep={currentStep} />
        </div>

        <div className="flex gap-3 items-center justify-center">
          <Button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            variant="outline"
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Step {currentStep} of {args.steps.length}
          </span>
          <Button
            onClick={handleNext}
            disabled={currentStep === args.steps.length}
          >
            Next
          </Button>
          <Button onClick={handleReset} variant="secondary">
            Reset
          </Button>
        </div>
      </div>
    );
  },
};
