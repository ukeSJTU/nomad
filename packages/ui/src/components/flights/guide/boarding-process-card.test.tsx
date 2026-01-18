import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BoardingProcessCard } from "./boarding-process-card";

describe("BoardingProcessCard", () => {
  it("renders default title and subtitle", () => {
    render(<BoardingProcessCard href="/flights/guide/process" />);

    expect(screen.getByText("乘机流程")).toBeInTheDocument();
    expect(screen.getByText("boarding procedures")).toBeInTheDocument();
  });

  it("renders custom title and subtitle", () => {
    render(
      <BoardingProcessCard
        href="/custom"
        title="登机指南"
        subtitle="boarding guide"
      />
    );

    expect(screen.getByText("登机指南")).toBeInTheDocument();
    expect(screen.getByText("boarding guide")).toBeInTheDocument();
  });

  it("renders link with correct href", () => {
    render(<BoardingProcessCard href="/flights/guide/process" />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/flights/guide/process");
  });

  it("renders plane icon", () => {
    const { container } = render(
      <BoardingProcessCard href="/flights/guide/process" />
    );

    const icon = container.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });

  it("renders arrow icon", () => {
    const { container } = render(
      <BoardingProcessCard href="/flights/guide/process" />
    );

    const icons = container.querySelectorAll("svg");
    expect(icons.length).toBe(2); // Plane + ArrowRight
  });
});
