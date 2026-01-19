import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Stepper, type StepperStep } from "./stepper";

const mockSteps: StepperStep[] = [
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

describe("Stepper", () => {
  it("renders all steps", () => {
    render(<Stepper steps={mockSteps} currentStep={1} />);

    expect(screen.getByText("Personal Info")).toBeInTheDocument();
    expect(screen.getByText("Address")).toBeInTheDocument();
    expect(screen.getByText("Payment")).toBeInTheDocument();
    expect(screen.getByText("Review")).toBeInTheDocument();
  });

  it("renders step descriptions in default variant", () => {
    render(<Stepper steps={mockSteps} currentStep={1} variant="default" />);

    expect(screen.getByText("Enter your details")).toBeInTheDocument();
    expect(screen.getByText("Provide your address")).toBeInTheDocument();
    expect(screen.getByText("Add payment method")).toBeInTheDocument();
    expect(screen.getByText("Review and confirm")).toBeInTheDocument();
  });

  it("does not render step descriptions in compact variant", () => {
    render(<Stepper steps={mockSteps} currentStep={1} variant="compact" />);

    expect(screen.queryByText("Enter your details")).not.toBeInTheDocument();
    expect(screen.queryByText("Provide your address")).not.toBeInTheDocument();
  });

  it("displays step numbers correctly", () => {
    render(<Stepper steps={mockSteps} currentStep={1} />);

    // First step should be active (numbered)
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
  });

  it("shows checkmark for completed steps", () => {
    const { container } = render(<Stepper steps={mockSteps} currentStep={3} />);

    // First two steps should be completed (checkmarks via SVG elements)
    const checkmarks = container.querySelectorAll("svg");
    expect(checkmarks).toHaveLength(2);

    // Step 3 should show number
    expect(screen.getByText("3")).toBeInTheDocument();
    // Step 4 should show number
    expect(screen.getByText("4")).toBeInTheDocument();
  });

  it("applies active styles to current step", () => {
    const { container } = render(<Stepper steps={mockSteps} currentStep={2} />);

    const stepCircles = container.querySelectorAll(
      ".flex.items-center.justify-center"
    );

    // Second step should have active styles (ring-4)
    expect(stepCircles[1]).toHaveClass("ring-4");
  });

  it("applies completed styles to previous steps", () => {
    const { container } = render(<Stepper steps={mockSteps} currentStep={3} />);

    const stepCircles = container.querySelectorAll(
      ".flex.items-center.justify-center"
    );

    // First two steps should have primary background
    expect(stepCircles[0]).toHaveClass("bg-primary");
    expect(stepCircles[1]).toHaveClass("bg-primary");
  });

  it("renders connector lines between steps", () => {
    const { container } = render(<Stepper steps={mockSteps} currentStep={2} />);

    // Should have 3 connector lines for 4 steps
    const connectors = container.querySelectorAll(".flex-1.mx-4");
    expect(connectors).toHaveLength(3);
  });

  it("fills connector lines for completed steps", () => {
    const { container } = render(<Stepper steps={mockSteps} currentStep={3} />);

    const progressBars = container.querySelectorAll(
      ".absolute.inset-0.transition-all"
    );

    // First two connectors should be filled (w-full)
    expect(progressBars[0]).toHaveClass("w-full");
    expect(progressBars[1]).toHaveClass("w-full");
    // Third connector should not be filled (w-0)
    expect(progressBars[2]).toHaveClass("w-0");
  });

  it("handles steps without descriptions", () => {
    const stepsNoDesc: StepperStep[] = [
      { id: "1", label: "Step 1" },
      { id: "2", label: "Step 2" },
      { id: "3", label: "Step 3" },
    ];

    render(<Stepper steps={stepsNoDesc} currentStep={1} />);

    expect(screen.getByText("Step 1")).toBeInTheDocument();
    expect(screen.getByText("Step 2")).toBeInTheDocument();
    expect(screen.getByText("Step 3")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <Stepper
        steps={mockSteps}
        currentStep={1}
        className="custom-stepper-class"
      />
    );

    const stepper = container.firstChild;
    expect(stepper).toHaveClass("custom-stepper-class");
    expect(stepper).toHaveClass("w-full");
  });

  it("handles single step", () => {
    const singleStep: StepperStep[] = [
      { id: "only", label: "Only Step", description: "The only step" },
    ];

    const { container } = render(
      <Stepper steps={singleStep} currentStep={1} />
    );

    expect(screen.getByText("Only Step")).toBeInTheDocument();
    // Should have no connector lines
    const connectors = container.querySelectorAll(".flex-1.mx-4");
    expect(connectors).toHaveLength(0);
  });

  it("handles last step as current", () => {
    const { container } = render(<Stepper steps={mockSteps} currentStep={4} />);

    // All previous steps should show checkmarks (SVG elements)
    const checkmarks = container.querySelectorAll("svg");
    expect(checkmarks).toHaveLength(3);

    // Last step should show number
    expect(screen.getByText("4")).toBeInTheDocument();
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(<Stepper ref={ref} steps={mockSteps} currentStep={1} />);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
