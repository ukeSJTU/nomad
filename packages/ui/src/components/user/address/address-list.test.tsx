import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  AddressList,
  type AddressListItem,
  type AddressListProps,
} from "./address-list";

// Mock addresses data
const mockAddresses: AddressListItem[] = [
  {
    id: "1",
    recipientName: "张三",
    phoneNumber: "13800138000",
    province: "北京市",
    city: "北京市",
    district: "朝阳区",
    town: "望京街道",
    detailAddress: "100号",
    isDefault: true,
  },
  {
    id: "2",
    recipientName: "李四",
    phoneNumber: "13900139000",
    province: "上海市",
    city: "上海市",
    district: "浦东新区",
    town: null,
    detailAddress: "陆家嘴200号",
    isDefault: false,
  },
];

const defaultProps: AddressListProps = {
  addresses: mockAddresses,
  onDelete: vi.fn(),
  onSetDefault: vi.fn(),
  onCancelDefault: vi.fn(),
  onEdit: vi.fn(),
  isAddOpen: false,
  onAddOpenChange: vi.fn(),
  isEditOpen: false,
  onEditOpenChange: vi.fn(),
  renderAddForm: () => <div>Add Form</div>,
  renderEditForm: () => <div>Edit Form</div>,
};

describe("AddressList", () => {
  it("renders address list with header and add button", () => {
    render(<AddressList {...defaultProps} />);

    expect(screen.getByText("常用地址")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /增加/i })).toBeInTheDocument();
  });

  it("renders table headers correctly", () => {
    render(<AddressList {...defaultProps} />);

    expect(screen.getByText("序号")).toBeInTheDocument();
    expect(screen.getByText("收件人")).toBeInTheDocument();
    expect(screen.getByText("地址")).toBeInTheDocument();
    expect(screen.getByText("手机")).toBeInTheDocument();
    expect(screen.getByText("是否默认")).toBeInTheDocument();
    expect(screen.getByText("操作")).toBeInTheDocument();
  });

  it("renders empty state when no addresses", () => {
    render(<AddressList {...defaultProps} addresses={[]} />);

    expect(screen.getByText("暂无保存的地址")).toBeInTheDocument();
  });

  it("renders address rows with correct data", () => {
    render(<AddressList {...defaultProps} />);

    // Check first address
    expect(screen.getByText("张三")).toBeInTheDocument();
    expect(screen.getByText("13800138000")).toBeInTheDocument();
    expect(
      screen.getByText("北京市北京市朝阳区望京街道100号")
    ).toBeInTheDocument();

    // Check second address
    expect(screen.getByText("李四")).toBeInTheDocument();
    expect(screen.getByText("13900139000")).toBeInTheDocument();
    expect(
      screen.getByText("上海市上海市浦东新区陆家嘴200号")
    ).toBeInTheDocument();
  });

  it("shows default badge for default address", () => {
    render(<AddressList {...defaultProps} />);

    const badges = screen.getAllByText("默认");
    expect(badges).toHaveLength(1);
  });

  it("shows '取消默认' button for default address", () => {
    render(<AddressList {...defaultProps} />);

    const rows = screen.getAllByRole("row");
    const firstAddressRow = rows[1]; // Skip header row

    expect(
      within(firstAddressRow).getByRole("button", { name: "取消默认" })
    ).toBeInTheDocument();
  });

  it("shows '设为默认' button for non-default address", () => {
    render(<AddressList {...defaultProps} />);

    const rows = screen.getAllByRole("row");
    const secondAddressRow = rows[2]; // Skip header row and first data row

    expect(
      within(secondAddressRow).getByRole("button", { name: "设为默认" })
    ).toBeInTheDocument();
  });

  it("calls onSetDefault when clicking '设为默认' button", async () => {
    const user = userEvent.setup();
    const onSetDefault = vi.fn();

    render(<AddressList {...defaultProps} onSetDefault={onSetDefault} />);

    const setDefaultButton = screen.getByRole("button", { name: "设为默认" });
    await user.click(setDefaultButton);

    expect(onSetDefault).toHaveBeenCalledWith("2");
  });

  it("calls onCancelDefault when clicking '取消默认' button", async () => {
    const user = userEvent.setup();
    const onCancelDefault = vi.fn();

    render(<AddressList {...defaultProps} onCancelDefault={onCancelDefault} />);

    const cancelDefaultButton = screen.getByRole("button", {
      name: "取消默认",
    });
    await user.click(cancelDefaultButton);

    expect(onCancelDefault).toHaveBeenCalledWith("1");
  });

  it("calls onEdit when clicking edit button", async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();

    render(<AddressList {...defaultProps} onEdit={onEdit} />);

    // Get all edit buttons (there should be 2, one for each address)
    const editButtons = screen.getAllByRole("button", { name: "" });
    const editButton = editButtons.find(btn =>
      btn.querySelector('svg[class*="lucide-edit"]')
    );

    if (editButton) {
      await user.click(editButton);
      expect(onEdit).toHaveBeenCalledWith(mockAddresses[0]);
    }
  });

  it("shows delete confirmation dialog when clicking delete button", async () => {
    const user = userEvent.setup();

    render(<AddressList {...defaultProps} />);

    // Find delete button by icon (Trash2)
    const deleteButtons = screen.getAllByRole("button", { name: "" });
    const deleteButton = deleteButtons.find(btn =>
      btn.querySelector('svg[class*="lucide-trash"]')
    );

    if (deleteButton) {
      await user.click(deleteButton);

      // Check for confirmation dialog
      expect(screen.getByText("确认删除?")).toBeInTheDocument();
      expect(
        screen.getByText("此操作无法撤销。这将永久删除该地址。")
      ).toBeInTheDocument();
    }
  });

  it("calls onDelete when confirming delete in dialog", async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();

    render(<AddressList {...defaultProps} onDelete={onDelete} />);

    // Find and click delete button
    const deleteButtons = screen.getAllByRole("button", { name: "" });
    const deleteButton = deleteButtons.find(btn =>
      btn.querySelector('svg[class*="lucide-trash"]')
    );

    if (deleteButton) {
      await user.click(deleteButton);

      // Click confirm button in dialog
      const confirmButton = screen.getByRole("button", { name: "删除" });
      await user.click(confirmButton);

      expect(onDelete).toHaveBeenCalledWith("1");
    }
  });

  it("opens add dialog when clicking add button", async () => {
    const user = userEvent.setup();
    const onAddOpenChange = vi.fn();

    render(<AddressList {...defaultProps} onAddOpenChange={onAddOpenChange} />);

    const addButton = screen.getByRole("button", { name: /增加/i });
    await user.click(addButton);

    expect(onAddOpenChange).toHaveBeenCalledWith(true);
  });

  it("renders add form when add dialog is open", () => {
    render(<AddressList {...defaultProps} isAddOpen={true} />);

    expect(screen.getByText("新增地址")).toBeInTheDocument();
    expect(screen.getByText("Add Form")).toBeInTheDocument();
  });

  it("renders edit form when edit dialog is open", () => {
    render(<AddressList {...defaultProps} isEditOpen={true} />);

    expect(screen.getByText("编辑地址")).toBeInTheDocument();
    expect(screen.getByText("Edit Form")).toBeInTheDocument();
  });

  it("renders row numbers correctly", () => {
    render(<AddressList {...defaultProps} />);

    const rows = screen.getAllByRole("row");
    const firstRow = rows[1]; // Skip header
    const secondRow = rows[2];

    expect(within(firstRow).getByText("1")).toBeInTheDocument();
    expect(within(secondRow).getByText("2")).toBeInTheDocument();
  });

  it("handles address with null town field", () => {
    render(<AddressList {...defaultProps} />);

    // Second address has null town, should still render correctly
    expect(
      screen.getByText("上海市上海市浦东新区陆家嘴200号")
    ).toBeInTheDocument();
  });
});
