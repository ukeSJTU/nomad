import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { describe, expect, it, vi } from "vitest";
import RegistrationSuccess from "./registration-success";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

describe("RegistrationSuccess Container", () => {
  it("navigates to /flights when start booking button is clicked", async () => {
    const user = userEvent.setup();
    const push = vi.fn();
    vi.mocked(useRouter).mockReturnValue({
      push,
    } as unknown as AppRouterInstance);

    render(<RegistrationSuccess />);

    await user.click(screen.getByRole("button", { name: "开始订票" }));

    expect(push).toHaveBeenCalledWith("/flights");
  });

  it("navigates to /home/info when profile button is clicked", async () => {
    const user = userEvent.setup();
    const push = vi.fn();
    vi.mocked(useRouter).mockReturnValue({
      push,
    } as unknown as AppRouterInstance);

    render(<RegistrationSuccess />);

    await user.click(screen.getByRole("button", { name: "前往个人中心" }));

    expect(push).toHaveBeenCalledWith("/home/info");
  });

  it("passes props to UI component", () => {
    const push = vi.fn();
    vi.mocked(useRouter).mockReturnValue({
      push,
    } as unknown as AppRouterInstance);

    render(
      <RegistrationSuccess
        title="Custom Title"
        description="Custom Description"
        className="custom-class"
      />
    );

    expect(screen.getByText("Custom Title")).toBeInTheDocument();
    expect(screen.getByText("Custom Description")).toBeInTheDocument();
  });
});
