import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import {
  PassengerFormCard,
  type PassengerFormData,
  PassengerInfoForm,
  QuickPassengerSelect,
  type SavedPassenger,
} from "./passenger-form-card";

describe("QuickPassengerSelect", () => {
  const mockSavedPassengers: SavedPassenger[] = [
    {
      id: "1",
      name: "张三",
      documentType: "id_card",
      documentNumber: "110101199001011234",
      phone: "13800138000",
    },
    {
      id: "2",
      name: "李四",
      documentType: "passport",
      documentNumber: "E12345678",
      phone: null,
    },
  ];

  it("renders nothing when no saved passengers", () => {
    const { container } = render(
      <QuickPassengerSelect
        savedPassengers={[]}
        selectedPassengerIds={[]}
        onTogglePassenger={vi.fn()}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders saved passengers as selectable chips", () => {
    render(
      <QuickPassengerSelect
        savedPassengers={mockSavedPassengers}
        selectedPassengerIds={[]}
        onTogglePassenger={vi.fn()}
      />
    );

    expect(screen.getByText("张三")).toBeInTheDocument();
    expect(screen.getByText("李四")).toBeInTheDocument();
  });

  it("marks selected passengers as checked", () => {
    render(
      <QuickPassengerSelect
        savedPassengers={mockSavedPassengers}
        selectedPassengerIds={["1"]}
        onTogglePassenger={vi.fn()}
      />
    );

    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[1]).not.toBeChecked();
  });

  it("calls onTogglePassenger when clicking a passenger", async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();

    render(
      <QuickPassengerSelect
        savedPassengers={mockSavedPassengers}
        selectedPassengerIds={[]}
        onTogglePassenger={onToggle}
      />
    );

    await user.click(screen.getByText("张三"));
    expect(onToggle).toHaveBeenCalledWith("1");
  });

  it("shows 'more passengers' button when more than 5 passengers", () => {
    const manyPassengers = Array.from({ length: 6 }, (_, i) => ({
      id: `${i + 1}`,
      name: `乘客${i + 1}`,
      documentType: "id_card",
      documentNumber: `11010119900101${i}`,
      phone: null,
    }));

    render(
      <QuickPassengerSelect
        savedPassengers={manyPassengers}
        selectedPassengerIds={[]}
        onTogglePassenger={vi.fn()}
      />
    );

    expect(screen.getByText("更多常用乘机人")).toBeInTheDocument();
    // Only first 5 displayed
    expect(screen.queryByText("乘客6")).not.toBeInTheDocument();
  });
});

describe("PassengerInfoForm", () => {
  const mockData: PassengerFormData = {
    name: "张三",
    documentType: "id_card",
    documentNumber: "110101199001011234",
    phone: "13800138000",
  };

  it("renders passenger form with data", () => {
    render(
      <PassengerInfoForm
        passengerNumber={1}
        data={mockData}
        onChange={vi.fn()}
        showRemove={false}
      />
    );

    expect(screen.getByDisplayValue("张三")).toBeInTheDocument();
    expect(screen.getByDisplayValue("110101199001011234")).toBeInTheDocument();
    expect(screen.getByDisplayValue("13800138000")).toBeInTheDocument();
  });

  it("displays passenger number", () => {
    render(
      <PassengerInfoForm
        passengerNumber={2}
        data={mockData}
        onChange={vi.fn()}
        showRemove={false}
      />
    );

    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("乘机人 2")).toBeInTheDocument();
  });

  it("shows delete button when showRemove is true", () => {
    render(
      <PassengerInfoForm
        passengerNumber={1}
        data={mockData}
        onChange={vi.fn()}
        onRemove={vi.fn()}
        showRemove={true}
      />
    );

    expect(screen.getByText("删除")).toBeInTheDocument();
  });

  it("hides delete button when showRemove is false", () => {
    render(
      <PassengerInfoForm
        passengerNumber={1}
        data={mockData}
        onChange={vi.fn()}
        showRemove={false}
      />
    );

    expect(screen.queryByText("删除")).not.toBeInTheDocument();
  });

  it("calls onChange when name input changes", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <PassengerInfoForm
        passengerNumber={1}
        data={{ ...mockData, name: "" }}
        onChange={onChange}
        showRemove={false}
      />
    );

    const nameInput = screen.getByPlaceholderText("请输入姓名");
    await user.type(nameInput, "李");

    expect(onChange).toHaveBeenCalledWith("name", "李");
  });

  it("calls onChange when document number changes", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <PassengerInfoForm
        passengerNumber={1}
        data={{ ...mockData, documentNumber: "" }}
        onChange={onChange}
        showRemove={false}
      />
    );

    const docInput = screen.getByPlaceholderText("登机证件号码");
    await user.type(docInput, "1");

    expect(onChange).toHaveBeenCalledWith("documentNumber", "1");
  });

  it("calls onChange when phone changes", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <PassengerInfoForm
        passengerNumber={1}
        data={{ ...mockData, phone: "" }}
        onChange={onChange}
        showRemove={false}
      />
    );

    const phoneInput = screen.getByPlaceholderText("乘机人手机号码");
    await user.type(phoneInput, "1");

    expect(onChange).toHaveBeenCalledWith("phone", "1");
  });

  it("calls onRemove when delete button clicked", async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();

    render(
      <PassengerInfoForm
        passengerNumber={1}
        data={mockData}
        onChange={vi.fn()}
        onRemove={onRemove}
        showRemove={true}
      />
    );

    await user.click(screen.getByText("删除"));
    expect(onRemove).toHaveBeenCalled();
  });
});

describe("PassengerFormCard", () => {
  const mockSavedPassengers: SavedPassenger[] = [
    {
      id: "1",
      name: "张三",
      documentType: "id_card",
      documentNumber: "110101199001011234",
      phone: "13800138000",
    },
  ];

  const mockPassengers: PassengerFormData[] = [
    {
      name: "",
      documentType: "id_card",
      documentNumber: "",
      phone: "",
    },
  ];

  it("renders card with title", () => {
    render(
      <PassengerFormCard
        passengers={mockPassengers}
        savedPassengers={[]}
        selectedPassengerIds={[]}
        onChange={vi.fn()}
        onToggleSavedPassenger={vi.fn()}
        onRemovePassenger={vi.fn()}
        onAddPassenger={vi.fn()}
      />
    );

    expect(screen.getByText("乘机人信息")).toBeInTheDocument();
  });

  it("renders quick passenger select when saved passengers exist", () => {
    render(
      <PassengerFormCard
        passengers={mockPassengers}
        savedPassengers={mockSavedPassengers}
        selectedPassengerIds={[]}
        onChange={vi.fn()}
        onToggleSavedPassenger={vi.fn()}
        onRemovePassenger={vi.fn()}
        onAddPassenger={vi.fn()}
      />
    );

    expect(screen.getByText("张三")).toBeInTheDocument();
  });

  it("does not render quick select when no saved passengers", () => {
    render(
      <PassengerFormCard
        passengers={mockPassengers}
        savedPassengers={[]}
        selectedPassengerIds={[]}
        onChange={vi.fn()}
        onToggleSavedPassenger={vi.fn()}
        onRemovePassenger={vi.fn()}
        onAddPassenger={vi.fn()}
      />
    );

    expect(screen.queryByText("张三")).not.toBeInTheDocument();
  });

  it("renders all passenger forms", () => {
    const multiplePassengers: PassengerFormData[] = [
      {
        name: "张三",
        documentType: "id_card",
        documentNumber: "123",
        phone: "",
      },
      {
        name: "李四",
        documentType: "id_card",
        documentNumber: "456",
        phone: "",
      },
    ];

    render(
      <PassengerFormCard
        passengers={multiplePassengers}
        savedPassengers={[]}
        selectedPassengerIds={[]}
        onChange={vi.fn()}
        onToggleSavedPassenger={vi.fn()}
        onRemovePassenger={vi.fn()}
        onAddPassenger={vi.fn()}
      />
    );

    expect(screen.getByText("乘机人 1")).toBeInTheDocument();
    expect(screen.getByText("乘机人 2")).toBeInTheDocument();
  });

  it("calls onChange with correct index when form field changes", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <PassengerFormCard
        passengers={mockPassengers}
        savedPassengers={[]}
        selectedPassengerIds={[]}
        onChange={onChange}
        onToggleSavedPassenger={vi.fn()}
        onRemovePassenger={vi.fn()}
        onAddPassenger={vi.fn()}
      />
    );

    const nameInput = screen.getByPlaceholderText("请输入姓名");
    await user.type(nameInput, "张");

    expect(onChange).toHaveBeenCalledWith(0, "name", "张");
  });

  it("calls onAddPassenger when add button clicked", async () => {
    const user = userEvent.setup();
    const onAddPassenger = vi.fn();

    render(
      <PassengerFormCard
        passengers={mockPassengers}
        savedPassengers={[]}
        selectedPassengerIds={[]}
        onChange={vi.fn()}
        onToggleSavedPassenger={vi.fn()}
        onRemovePassenger={vi.fn()}
        onAddPassenger={onAddPassenger}
      />
    );

    await user.click(screen.getByText("新增乘机人"));
    expect(onAddPassenger).toHaveBeenCalled();
  });

  it("calls onRemovePassenger with correct index", async () => {
    const user = userEvent.setup();
    const onRemovePassenger = vi.fn();
    const multiplePassengers: PassengerFormData[] = [
      {
        name: "张三",
        documentType: "id_card",
        documentNumber: "123",
        phone: "",
      },
      {
        name: "李四",
        documentType: "id_card",
        documentNumber: "456",
        phone: "",
      },
    ];

    render(
      <PassengerFormCard
        passengers={multiplePassengers}
        savedPassengers={[]}
        selectedPassengerIds={[]}
        onChange={vi.fn()}
        onToggleSavedPassenger={vi.fn()}
        onRemovePassenger={onRemovePassenger}
        onAddPassenger={vi.fn()}
      />
    );

    const deleteButtons = screen.getAllByText("删除");
    await user.click(deleteButtons[1]);

    expect(onRemovePassenger).toHaveBeenCalledWith(1);
  });

  it("uses default showDeleteButton logic when not provided", () => {
    const emptyForm: PassengerFormData[] = [
      {
        name: "",
        documentType: "id_card",
        documentNumber: "",
        phone: "",
      },
    ];

    render(
      <PassengerFormCard
        passengers={emptyForm}
        savedPassengers={[]}
        selectedPassengerIds={[]}
        onChange={vi.fn()}
        onToggleSavedPassenger={vi.fn()}
        onRemovePassenger={vi.fn()}
        onAddPassenger={vi.fn()}
      />
    );

    // Default logic: single empty form should not show delete
    expect(screen.queryByText("删除")).not.toBeInTheDocument();
  });

  it("uses custom showDeleteButton when provided", () => {
    const emptyForm: PassengerFormData[] = [
      {
        name: "",
        documentType: "id_card",
        documentNumber: "",
        phone: "",
      },
    ];

    render(
      <PassengerFormCard
        passengers={emptyForm}
        savedPassengers={[]}
        selectedPassengerIds={[]}
        onChange={vi.fn()}
        onToggleSavedPassenger={vi.fn()}
        onRemovePassenger={vi.fn()}
        onAddPassenger={vi.fn()}
        showDeleteButton={() => true}
      />
    );

    // Custom logic returns true, so delete should show
    expect(screen.getByText("删除")).toBeInTheDocument();
  });
});
