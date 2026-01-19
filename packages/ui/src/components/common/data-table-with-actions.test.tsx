import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  type BatchAction,
  type ColumnDefinition,
  DataTableWithActions,
  type RowAction,
} from "./data-table-with-actions";

interface TestData {
  id: string;
  name: string;
  age: number;
  status: string;
}

const mockData: TestData[] = [
  { id: "1", name: "Alice", age: 25, status: "active" },
  { id: "2", name: "Bob", age: 30, status: "inactive" },
  { id: "3", name: "Charlie", age: 35, status: "active" },
];

const mockColumns: ColumnDefinition<TestData>[] = [
  { key: "name", header: "Name" },
  { key: "age", header: "Age" },
  { key: "status", header: "Status" },
];

describe("DataTableWithActions", () => {
  it("renders table with data", () => {
    render(
      <DataTableWithActions
        data={mockData}
        columns={mockColumns}
        keyExtractor={row => row.id}
      />
    );

    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText("Charlie")).toBeInTheDocument();
  });

  it("renders column headers", () => {
    render(
      <DataTableWithActions
        data={mockData}
        columns={mockColumns}
        keyExtractor={row => row.id}
      />
    );

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
  });

  it("renders empty state when no data", () => {
    render(
      <DataTableWithActions
        data={[]}
        columns={mockColumns}
        keyExtractor={row => row.id}
        emptyMessage="No data available"
      />
    );

    expect(screen.getByText("No data available")).toBeInTheDocument();
  });

  it("renders loading skeleton", () => {
    render(
      <DataTableWithActions
        data={[]}
        columns={mockColumns}
        keyExtractor={row => row.id}
        loading={true}
      />
    );

    // Check for skeleton rows (5 by default)
    const skeletonRows = screen.getAllByRole("row").slice(1); // Skip header row
    expect(skeletonRows).toHaveLength(5);
  });

  it("renders error message", () => {
    const error = new Error("Failed to load data");
    render(
      <DataTableWithActions
        data={[]}
        columns={mockColumns}
        keyExtractor={row => row.id}
        error={error}
      />
    );

    expect(screen.getByText("Failed to load data")).toBeInTheDocument();
  });

  it("renders custom cell content", () => {
    const customColumns: ColumnDefinition<TestData>[] = [
      {
        key: "name",
        header: "Name",
        cell: ({ row }) => <strong>{row.name.toUpperCase()}</strong>,
      },
    ];

    render(
      <DataTableWithActions
        data={mockData}
        columns={customColumns}
        keyExtractor={row => row.id}
      />
    );

    expect(screen.getByText("ALICE")).toBeInTheDocument();
  });

  it("renders title and filter slot", () => {
    const filterSlot = <input placeholder="Search..." />;

    render(
      <DataTableWithActions
        data={mockData}
        columns={mockColumns}
        keyExtractor={row => row.id}
        title="User List"
        filterSlot={filterSlot}
      />
    );

    expect(screen.getByText("User List")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  it("renders add and search buttons", () => {
    const onAdd = vi.fn();
    const onSearch = vi.fn();

    render(
      <DataTableWithActions
        data={mockData}
        columns={mockColumns}
        keyExtractor={row => row.id}
        onAdd={onAdd}
        onSearch={onSearch}
        addButtonText="Add User"
        searchButtonText="Search"
      />
    );

    expect(screen.getByText("Add User")).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
  });

  it("calls onAdd when add button is clicked", async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();

    render(
      <DataTableWithActions
        data={mockData}
        columns={mockColumns}
        keyExtractor={row => row.id}
        onAdd={onAdd}
      />
    );

    await user.click(screen.getByText("新增"));
    expect(onAdd).toHaveBeenCalledTimes(1);
  });

  it("renders row actions", () => {
    const rowActions: RowAction<TestData>[] = [
      { label: "Edit", onClick: vi.fn() },
      { label: "Delete", onClick: vi.fn(), variant: "danger" },
    ];

    render(
      <DataTableWithActions
        data={mockData}
        columns={mockColumns}
        keyExtractor={row => row.id}
        rowActions={rowActions}
      />
    );

    // Each row should have Edit and Delete buttons
    expect(screen.getAllByText("Edit")).toHaveLength(3);
    expect(screen.getAllByText("Delete")).toHaveLength(3);
  });

  it("calls row action onClick", async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();

    const rowActions: RowAction<TestData>[] = [
      { label: "Edit", onClick: onEdit },
    ];

    render(
      <DataTableWithActions
        data={mockData}
        columns={mockColumns}
        keyExtractor={row => row.id}
        rowActions={rowActions}
      />
    );

    const editButtons = screen.getAllByText("Edit");
    await user.click(editButtons[0]);

    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(onEdit).toHaveBeenCalledWith(mockData[0]);
  });

  it("handles row selection", async () => {
    const user = userEvent.setup();
    const onSelectionChange = vi.fn();

    render(
      <DataTableWithActions
        data={mockData}
        columns={mockColumns}
        keyExtractor={row => row.id}
        enableSelection={true}
        onSelectionChange={onSelectionChange}
      />
    );

    const checkboxes = screen.getAllByRole("checkbox");
    // First checkbox is "select all", rest are row checkboxes
    await user.click(checkboxes[1]); // Select first row

    expect(onSelectionChange).toHaveBeenCalledWith(new Set(["1"]));
  });

  it("handles select all", async () => {
    const user = userEvent.setup();
    const onSelectionChange = vi.fn();

    render(
      <DataTableWithActions
        data={mockData}
        columns={mockColumns}
        keyExtractor={row => row.id}
        enableSelection={true}
        onSelectionChange={onSelectionChange}
      />
    );

    const selectAllCheckbox = screen.getAllByLabelText("全选")[0];
    await user.click(selectAllCheckbox);

    expect(onSelectionChange).toHaveBeenCalledWith(new Set(["1", "2", "3"]));
  });

  it("renders batch actions", () => {
    const batchActions: BatchAction<TestData>[] = [
      { label: "Delete Selected", onClick: vi.fn(), variant: "danger" },
    ];

    render(
      <DataTableWithActions
        data={mockData}
        columns={mockColumns}
        keyExtractor={row => row.id}
        enableSelection={true}
        batchActions={batchActions}
      />
    );

    expect(screen.getByText("Delete Selected")).toBeInTheDocument();
  });

  it("calls batch action with selected rows", async () => {
    const user = userEvent.setup();
    const onBatchDelete = vi.fn();

    const batchActions: BatchAction<TestData>[] = [
      { label: "✕ 删除", onClick: onBatchDelete },
    ];

    render(
      <DataTableWithActions
        data={mockData}
        columns={mockColumns}
        keyExtractor={row => row.id}
        enableSelection={true}
        batchActions={batchActions}
      />
    );

    // Select first row
    const checkboxes = screen.getAllByRole("checkbox");
    await user.click(checkboxes[1]);

    // Click batch delete
    const batchDeleteButton = screen.getByText("✕ 删除");
    await user.click(batchDeleteButton);

    // Confirm in dialog
    const confirmButton = screen.getByText("确认");
    await user.click(confirmButton);

    expect(onBatchDelete).toHaveBeenCalledWith([mockData[0]]);
  });

  it("shows alert when no rows selected for batch action", async () => {
    const user = userEvent.setup();
    const onBatchDelete = vi.fn();

    const batchActions: BatchAction<TestData>[] = [
      { label: "✕ 删除", onClick: onBatchDelete },
    ];

    render(
      <DataTableWithActions
        data={mockData}
        columns={mockColumns}
        keyExtractor={row => row.id}
        enableSelection={true}
        batchActions={batchActions}
      />
    );

    // Click batch delete without selecting any rows
    const batchDeleteButton = screen.getByText("✕ 删除");
    await user.click(batchDeleteButton);

    // Should show alert
    expect(screen.getByText("请先选择要删除的选项")).toBeInTheDocument();
    expect(onBatchDelete).not.toHaveBeenCalled();
  });

  it("renders pagination controls", () => {
    const onPageChange = vi.fn();

    render(
      <DataTableWithActions
        data={mockData}
        columns={mockColumns}
        keyExtractor={row => row.id}
        pagination={{
          page: 1,
          pageSize: 10,
          total: 30,
          onPageChange,
        }}
      />
    );

    expect(screen.getByText("上一页")).toBeInTheDocument();
    expect(screen.getByText("下一页")).toBeInTheDocument();
    expect(screen.getByText(/第 1 页/)).toBeInTheDocument();
  });

  it("calls pagination onPageChange", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(
      <DataTableWithActions
        data={mockData}
        columns={mockColumns}
        keyExtractor={row => row.id}
        pagination={{
          page: 2,
          pageSize: 10,
          total: 30,
          onPageChange,
        }}
      />
    );

    await user.click(screen.getByText("上一页"));
    expect(onPageChange).toHaveBeenCalledWith(1);

    await user.click(screen.getByText("下一页"));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("disables pagination buttons at boundaries", () => {
    render(
      <DataTableWithActions
        data={mockData}
        columns={mockColumns}
        keyExtractor={row => row.id}
        pagination={{
          page: 1,
          pageSize: 10,
          total: 10,
          onPageChange: vi.fn(),
        }}
      />
    );

    const prevButton = screen.getByText("上一页");
    const nextButton = screen.getByText("下一页");

    expect(prevButton).toBeDisabled();
    expect(nextButton).toBeDisabled();
  });

  it("renders compact variant", () => {
    const { container } = render(
      <DataTableWithActions
        data={mockData}
        columns={mockColumns}
        keyExtractor={row => row.id}
        variant="compact"
      />
    );

    const rows = container.querySelectorAll("tbody tr");
    expect(rows[0]).toHaveClass("h-12");
  });

  it("applies custom className", () => {
    const { container } = render(
      <DataTableWithActions
        data={mockData}
        columns={mockColumns}
        keyExtractor={row => row.id}
        className="custom-table"
      />
    );

    expect(container.firstChild).toHaveClass("custom-table");
  });

  it("applies custom aria-label", () => {
    render(
      <DataTableWithActions
        data={mockData}
        columns={mockColumns}
        keyExtractor={row => row.id}
        ariaLabel="User management table"
      />
    );

    expect(screen.getByLabelText("User management table")).toBeInTheDocument();
  });

  it("shows selected row count", async () => {
    const user = userEvent.setup();

    render(
      <DataTableWithActions
        data={mockData}
        columns={mockColumns}
        keyExtractor={row => row.id}
        enableSelection={true}
      />
    );

    // Select first two rows
    const checkboxes = screen.getAllByRole("checkbox");
    await user.click(checkboxes[1]);
    await user.click(checkboxes[2]);

    expect(screen.getByText("已选择 2 项")).toBeInTheDocument();
  });

  it("hides actions when show condition is false", () => {
    const rowActions: RowAction<TestData>[] = [
      {
        label: "Edit",
        onClick: vi.fn(),
        show: row => row.status === "active",
      },
    ];

    render(
      <DataTableWithActions
        data={mockData}
        columns={mockColumns}
        keyExtractor={row => row.id}
        rowActions={rowActions}
      />
    );

    // Only 2 active users should show Edit button
    expect(screen.getAllByText("Edit")).toHaveLength(2);
  });

  it("renders function-based column headers", () => {
    const customColumns: ColumnDefinition<TestData>[] = [
      {
        key: "name",
        header: () => <div className="text-center">Full Name</div>,
      },
    ];

    render(
      <DataTableWithActions
        data={mockData}
        columns={customColumns}
        keyExtractor={row => row.id}
      />
    );

    expect(screen.getByText("Full Name")).toBeInTheDocument();
  });

  it("handles null/undefined cell values", () => {
    const dataWithNull: TestData[] = [
      { id: "1", name: "Alice", age: 25, status: "active" },
      { id: "2", name: "Bob", age: null as unknown as number, status: "" },
    ];

    render(
      <DataTableWithActions
        data={dataWithNull}
        columns={mockColumns}
        keyExtractor={row => row.id}
      />
    );

    // Null/undefined values should render as "-"
    const cells = screen.getAllByText("-");
    expect(cells.length).toBeGreaterThan(0);
  });

  it("maintains selection state when controlled", async () => {
    const user = userEvent.setup();
    const selectedRows = new Set(["1"]);
    const onSelectionChange = vi.fn();

    render(
      <DataTableWithActions
        data={mockData}
        columns={mockColumns}
        keyExtractor={row => row.id}
        enableSelection={true}
        selectedRows={selectedRows}
        onSelectionChange={onSelectionChange}
      />
    );

    // First row should be checked
    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes[1]).toBeChecked();

    // Click to deselect
    await user.click(checkboxes[1]);
    expect(onSelectionChange).toHaveBeenCalledWith(new Set());
  });
});
