import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  type PassengerDataItem,
  PassengersDataTable,
} from "./passengers-data-table";

const mockData: PassengerDataItem[] = [
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
    phone: null,
    documentType: "护照",
    documentNumber: "E12345678",
    nationality: "中国",
    gender: "女",
  },
];

describe("PassengersDataTable", () => {
  it("renders data table with passengers", () => {
    const onView = vi.fn();
    const onEdit = vi.fn();
    const onDelete = vi.fn();
    const onBatchDelete = vi.fn();
    const onAdd = vi.fn();

    render(
      <PassengersDataTable
        data={mockData}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
        onBatchDelete={onBatchDelete}
        onAdd={onAdd}
      />
    );

    expect(screen.getByText("张三")).toBeInTheDocument();
    expect(screen.getByText("李四")).toBeInTheDocument();
  });

  it("renders empty state", () => {
    const onView = vi.fn();
    const onEdit = vi.fn();
    const onDelete = vi.fn();
    const onBatchDelete = vi.fn();
    const onAdd = vi.fn();

    render(
      <PassengersDataTable
        data={[]}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
        onBatchDelete={onBatchDelete}
        onAdd={onAdd}
        emptyMessage="暂无旅客信息"
      />
    );

    expect(screen.getByText("暂无旅客信息")).toBeInTheDocument();
  });

  it("renders search input with custom placeholder", () => {
    const onView = vi.fn();
    const onEdit = vi.fn();
    const onDelete = vi.fn();
    const onBatchDelete = vi.fn();
    const onAdd = vi.fn();

    render(
      <PassengersDataTable
        data={mockData}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
        onBatchDelete={onBatchDelete}
        onAdd={onAdd}
        searchPlaceholder="搜索姓名"
      />
    );

    expect(screen.getByPlaceholderText("搜索姓名")).toBeInTheDocument();
  });

  it("renders action buttons", () => {
    const onView = vi.fn();
    const onEdit = vi.fn();
    const onDelete = vi.fn();
    const onBatchDelete = vi.fn();
    const onAdd = vi.fn();
    const onSearch = vi.fn();

    render(
      <PassengersDataTable
        data={mockData}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
        onBatchDelete={onBatchDelete}
        onAdd={onAdd}
        onSearch={onSearch}
        addButtonText="添加"
        searchButtonText="搜索"
      />
    );

    expect(screen.getByRole("button", { name: "添加" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "搜索" })).toBeInTheDocument();
  });

  it("displays null phone as dash", () => {
    const onView = vi.fn();
    const onEdit = vi.fn();
    const onDelete = vi.fn();
    const onBatchDelete = vi.fn();
    const onAdd = vi.fn();

    render(
      <PassengersDataTable
        data={mockData}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
        onBatchDelete={onBatchDelete}
        onAdd={onAdd}
      />
    );

    const dashes = screen.getAllByText("-");
    expect(dashes.length).toBeGreaterThan(0);
  });
});
