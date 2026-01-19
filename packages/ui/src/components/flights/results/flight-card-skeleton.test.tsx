import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FlightCardSkeleton } from "./flight-card-skeleton";

describe("FlightCardSkeleton", () => {
  it("should render without crashing", () => {
    const { container } = render(<FlightCardSkeleton />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("should render Card with CardContent", () => {
    const { container } = render(<FlightCardSkeleton />);
    // Card and CardContent render as divs
    expect(container.querySelector("div")).toBeInTheDocument();
  });

  it("should apply custom className", () => {
    const { container } = render(
      <FlightCardSkeleton className="custom-class" />
    );
    const card = container.querySelector(".custom-class");
    expect(card).toBeInTheDocument();
  });

  it("should have hover and transition styles", () => {
    const { container } = render(<FlightCardSkeleton />);
    const card = container.querySelector(".hover\\:shadow-lg");
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass("transition-shadow");
  });

  it("should render airline skeleton section", () => {
    const { container } = render(<FlightCardSkeleton />);
    // Airline logo skeleton (h-12 w-12 rounded-full)
    const logoSkeleton = container.querySelector(".h-12.w-12.rounded-full");
    expect(logoSkeleton).toBeInTheDocument();
  });

  it("should render flight itinerary skeleton section", () => {
    const { container } = render(<FlightCardSkeleton />);
    // Multiple skeletons for departure, duration, and arrival
    const skeletons = container.querySelectorAll(".h-8.w-16");
    expect(skeletons.length).toBeGreaterThanOrEqual(2); // At least departure and arrival time
  });

  it("should render price and action skeleton section", () => {
    const { container } = render(<FlightCardSkeleton />);
    // Price skeleton (h-8 w-20)
    const priceSkeleton = container.querySelector(".h-8.w-20");
    expect(priceSkeleton).toBeInTheDocument();
    // Button skeleton (h-10 w-16)
    const buttonSkeleton = container.querySelector(".h-10.w-16");
    expect(buttonSkeleton).toBeInTheDocument();
  });

  it("should have proper layout structure", () => {
    const { container } = render(<FlightCardSkeleton />);
    // Main flex container for the entire card content
    const mainFlex = container.querySelector(".flex.items-center.gap-6");
    expect(mainFlex).toBeInTheDocument();
  });
});
