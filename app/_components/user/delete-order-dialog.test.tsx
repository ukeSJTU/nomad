import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import DeleteOrderDialog from "./delete-order-dialog";

describe("DeleteOrderDialog", () => {
  it("renders nothing when closed", () => {
    const { container } = render(
      <DeleteOrderDialog
        open={false}
        onOpenChange={vi.fn()}
        onConfirm={vi.fn()}
        isLoading={false}
      />
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("renders dialog content when open", () => {
    render(
      <DeleteOrderDialog
        open={true}
        onOpenChange={vi.fn()}
        onConfirm={vi.fn()}
        isLoading={false}
      />
    );

    expect(
      screen.getByRole("heading", { name: "确认删除" })
    ).toBeInTheDocument();
    expect(
      screen.getByText("您确定要删除这个订单吗？删除后将无法恢复。")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "取消" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "确认删除" })
    ).toBeInTheDocument();
  });

  it("calls onOpenChange when cancel button is clicked", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    render(
      <DeleteOrderDialog
        open={true}
        onOpenChange={onOpenChange}
        onConfirm={vi.fn()}
        isLoading={false}
      />
    );

    await user.click(screen.getByRole("button", { name: "取消" }));

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("calls onConfirm when confirm button is clicked", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();

    render(
      <DeleteOrderDialog
        open={true}
        onOpenChange={vi.fn()}
        onConfirm={onConfirm}
        isLoading={false}
      />
    );

    await user.click(screen.getByRole("button", { name: "确认删除" }));

    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("disables buttons when loading", () => {
    render(
      <DeleteOrderDialog
        open={true}
        onOpenChange={vi.fn()}
        onConfirm={vi.fn()}
        isLoading={true}
      />
    );

    expect(screen.getByRole("button", { name: "取消" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "删除中..." })).toBeDisabled();
  });

  it("shows loading text when isLoading is true", () => {
    render(
      <DeleteOrderDialog
        open={true}
        onOpenChange={vi.fn()}
        onConfirm={vi.fn()}
        isLoading={true}
      />
    );

    expect(
      screen.getByRole("button", { name: "删除中..." })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "确认删除" })
    ).not.toBeInTheDocument();
  });
});
