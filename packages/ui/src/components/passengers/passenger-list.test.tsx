import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { PassengerList, type PassengerListItem } from "./passenger-list";

const mockPassengers: PassengerListItem[] = [
  {
    id: "1",
    name: "张三",
    phone: "13800138000",
    documentType: "身份证",
    documentNumber: "110101199001011234",
    nationality: "中国",
    gender: "男",
  },
  {
    id: "2",
    name: "李四",
    phone: "13900139000",
    documentType: "护照",
    documentNumber: "E12345678",
    nationality: "中国",
    gender: "女",
  },
];

describe("PassengerList", () => {
  it("renders passenger list", () => {
    const onEdit = vi.fn();
    const onDelete = vi.fn();
    const onBatchDelete = vi.fn();

    render(
      <PassengerList
        passengers={mockPassengers}
        onEdit={onEdit}
        onDelete={onDelete}
        onBatchDelete={onBatchDelete}
      />
    );

    expect(screen.getByText("张三")).toBeInTheDocument();
    expect(screen.getByText("李四")).toBeInTheDocument();
  });

  it("renders empty state", () => {
    const onEdit = vi.fn();
    const onDelete = vi.fn();
    const onBatchDelete = vi.fn();

    render(
      <PassengerList
        passengers={[]}
        onEdit={onEdit}
        onDelete={onDelete}
        onBatchDelete={onBatchDelete}
        emptyMessage="暂无数据"
      />
    );

    expect(screen.getByText("暂无数据")).toBeInTheDocument();
  });

  it("renders search input and buttons", () => {
    const onEdit = vi.fn();
    const onDelete = vi.fn();
    const onBatchDelete = vi.fn();
    const onAdd = vi.fn();

    render(
      <PassengerList
        passengers={mockPassengers}
        onEdit={onEdit}
        onDelete={onDelete}
        onBatchDelete={onBatchDelete}
        onAdd={onAdd}
      />
    );

    expect(screen.getByPlaceholderText("中文名/英文名")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "查询" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "新增" })).toBeInTheDocument();
  });

  it("calls onAdd when add button clicked", async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();
    const onDelete = vi.fn();
    const onBatchDelete = vi.fn();
    const onAdd = vi.fn();

    render(
      <PassengerList
        passengers={mockPassengers}
        onEdit={onEdit}
        onDelete={onDelete}
        onBatchDelete={onBatchDelete}
        onAdd={onAdd}
      />
    );

    await user.click(screen.getByRole("button", { name: "新增" }));
    expect(onAdd).toHaveBeenCalledTimes(1);
  });

  it("renders action buttons for each passenger", () => {
    const onEdit = vi.fn();
    const onDelete = vi.fn();
    const onBatchDelete = vi.fn();

    render(
      <PassengerList
        passengers={mockPassengers}
        onEdit={onEdit}
        onDelete={onDelete}
        onBatchDelete={onBatchDelete}
      />
    );

    const viewButtons = screen.getAllByRole("button", { name: "查看" });
    const editButtons = screen.getAllByRole("button", { name: "编辑" });
    const deleteButtons = screen.getAllByRole("button", { name: "删除" });

    expect(viewButtons).toHaveLength(2);
    expect(editButtons).toHaveLength(2);
    expect(deleteButtons).toHaveLength(2);
  });
});
