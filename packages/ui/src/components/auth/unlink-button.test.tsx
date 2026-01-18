import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { UnlinkButton } from "./unlink-button";

describe("UnlinkButton", () => {
  it("renders the button with default text", () => {
    render(<UnlinkButton onClick={() => {}} />);
    expect(
      screen.getByRole("button", { name: "取消绑定" })
    ).toBeInTheDocument();
  });

  it("calls onClick handler when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<UnlinkButton onClick={handleClick} />);

    const button = screen.getByRole("button", { name: "取消绑定" });
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("displays loading state", () => {
    render(<UnlinkButton onClick={() => {}} loading={true} />);
    expect(
      screen.getByRole("button", { name: "解绑中..." })
    ).toBeInTheDocument();
  });

  it("disables button when loading", () => {
    render(<UnlinkButton onClick={() => {}} loading={true} />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("disables button when disabled prop is true", () => {
    render(<UnlinkButton onClick={() => {}} disabled={true} />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("does not call onClick when disabled", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<UnlinkButton onClick={handleClick} disabled={true} />);

    const button = screen.getByRole("button");
    await user.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it("does not call onClick when loading", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<UnlinkButton onClick={handleClick} loading={true} />);

    const button = screen.getByRole("button");
    await user.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it("applies custom className", () => {
    render(<UnlinkButton onClick={() => {}} className="custom-class" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
  });
});
