import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { RegistrationSuccess } from "./registration-success";

describe("RegistrationSuccess", () => {
  it("renders with default text", () => {
    const onStartBooking = vi.fn();
    const onGoToProfile = vi.fn();

    render(
      <RegistrationSuccess
        onStartBooking={onStartBooking}
        onGoToProfile={onGoToProfile}
      />
    );

    expect(screen.getByText("注册成功！")).toBeInTheDocument();
    expect(
      screen.getByText("您的账户已成功创建，欢迎使用 Nomad")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "开始订票" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "前往个人中心" })
    ).toBeInTheDocument();
  });

  it("renders with custom title and description", () => {
    const onStartBooking = vi.fn();
    const onGoToProfile = vi.fn();

    render(
      <RegistrationSuccess
        title="Custom Title"
        description="Custom Description"
        onStartBooking={onStartBooking}
        onGoToProfile={onGoToProfile}
      />
    );

    expect(screen.getByText("Custom Title")).toBeInTheDocument();
    expect(screen.getByText("Custom Description")).toBeInTheDocument();
  });

  it("calls onStartBooking when start booking button is clicked", async () => {
    const user = userEvent.setup();
    const onStartBooking = vi.fn();
    const onGoToProfile = vi.fn();

    render(
      <RegistrationSuccess
        onStartBooking={onStartBooking}
        onGoToProfile={onGoToProfile}
      />
    );

    await user.click(screen.getByRole("button", { name: "开始订票" }));

    expect(onStartBooking).toHaveBeenCalledTimes(1);
    expect(onGoToProfile).not.toHaveBeenCalled();
  });

  it("calls onGoToProfile when profile button is clicked", async () => {
    const user = userEvent.setup();
    const onStartBooking = vi.fn();
    const onGoToProfile = vi.fn();

    render(
      <RegistrationSuccess
        onStartBooking={onStartBooking}
        onGoToProfile={onGoToProfile}
      />
    );

    await user.click(screen.getByRole("button", { name: "前往个人中心" }));

    expect(onGoToProfile).toHaveBeenCalledTimes(1);
    expect(onStartBooking).not.toHaveBeenCalled();
  });

  it("applies custom className", () => {
    const onStartBooking = vi.fn();
    const onGoToProfile = vi.fn();

    const { container } = render(
      <RegistrationSuccess
        className="custom-class"
        onStartBooking={onStartBooking}
        onGoToProfile={onGoToProfile}
      />
    );

    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("renders success icon", () => {
    const onStartBooking = vi.fn();
    const onGoToProfile = vi.fn();

    const { container } = render(
      <RegistrationSuccess
        onStartBooking={onStartBooking}
        onGoToProfile={onGoToProfile}
      />
    );

    const icon = container.querySelector("svg");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("text-green-600");
  });
});
