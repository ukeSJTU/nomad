import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { LinkButton } from "./link-button";

describe("LinkButton", () => {
  it("renders the button with default text", () => {
    render(<LinkButton onClick={() => {}} />);
    expect(
      screen.getByRole("button", { name: "绑定账号" })
    ).toBeInTheDocument();
  });

  it("calls onClick handler when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<LinkButton onClick={handleClick} />);

    const button = screen.getByRole("button", { name: "绑定账号" });
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("displays loading state", () => {
    render(<LinkButton onClick={() => {}} loading={true} />);
    expect(
      screen.getByRole("button", { name: "绑定中..." })
    ).toBeInTheDocument();
  });

  it("disables button when loading", () => {
    render(<LinkButton onClick={() => {}} loading={true} />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("disables button when disabled prop is true", () => {
    render(<LinkButton onClick={() => {}} disabled={true} />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("does not call onClick when disabled", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<LinkButton onClick={handleClick} disabled={true} />);

    const button = screen.getByRole("button");
    await user.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it("does not call onClick when loading", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<LinkButton onClick={handleClick} loading={true} />);

    const button = screen.getByRole("button");
    await user.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it("applies custom className", () => {
    render(<LinkButton onClick={() => {}} className="custom-class" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
  });
});
