import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { UnderConstruction } from "./under-construction";

describe("UnderConstruction", () => {
  it("renders with title and description", () => {
    render(
      <UnderConstruction
        title="Under Construction"
        description="This page is being built"
      />
    );

    expect(screen.getByText("Under Construction")).toBeInTheDocument();
    expect(screen.getByText("This page is being built")).toBeInTheDocument();
  });

  it("renders without children when not provided", () => {
    const { container } = render(
      <UnderConstruction title="Coming Soon" description="Check back later" />
    );

    // Should not render EmptyContent wrapper when children is undefined
    const emptyContent = container.querySelector('[class*="empty-content"]');
    expect(emptyContent).not.toBeInTheDocument();
  });

  it("renders with children when provided", () => {
    render(
      <UnderConstruction
        title="Under Development"
        description="Feature coming soon"
      >
        <button type="button">Notify Me</button>
      </UnderConstruction>
    );

    expect(
      screen.getByRole("button", { name: "Notify Me" })
    ).toBeInTheDocument();
  });

  it("displays construction icon", () => {
    const { container } = render(
      <UnderConstruction title="Work in Progress" description="Please wait" />
    );

    // Check for the presence of an svg (icon)
    const icon = container.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });

  it("renders custom title text", () => {
    render(
      <UnderConstruction
        title="Exciting Feature Ahead"
        description="We're building something great"
      />
    );

    expect(screen.getByText("Exciting Feature Ahead")).toBeInTheDocument();
  });

  it("renders custom description text", () => {
    render(
      <UnderConstruction
        title="Please Wait"
        description="This section is temporarily unavailable"
      />
    );

    expect(
      screen.getByText("This section is temporarily unavailable")
    ).toBeInTheDocument();
  });

  it("renders complex children content", () => {
    render(
      <UnderConstruction title="New Feature" description="Coming very soon">
        <div>
          <p>Additional information</p>
          <button type="button">Learn More</button>
        </div>
      </UnderConstruction>
    );

    expect(screen.getByText("Additional information")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Learn More" })
    ).toBeInTheDocument();
  });

  it("maintains proper structure with Empty components", () => {
    const { container } = render(
      <UnderConstruction title="Maintenance" description="Undergoing updates" />
    );

    // Should render the Empty wrapper structure
    const emptyElement = container.firstChild;
    expect(emptyElement).toBeInTheDocument();
  });
});
