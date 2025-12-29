import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  type ContactInfo,
  ContactInfoCard,
  validateContactInfo,
} from "./contact-info-card";

/**
 * @requirement REQ-F05
 */
describe("ContactInfoCard Component", () => {
  const mockOnChange = vi.fn();

  const defaultValue: ContactInfo = {
    method: "email",
    email: "",
    phone: "",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("renders the card with title", () => {
      render(<ContactInfoCard value={defaultValue} onChange={mockOnChange} />);

      expect(screen.getByText("联系人信息")).toBeInTheDocument();
    });

    it("renders contact method label with required indicator", () => {
      render(<ContactInfoCard value={defaultValue} onChange={mockOnChange} />);

      const label = screen.getByText("联系方式");
      expect(label).toBeInTheDocument();

      // Check for required indicator
      const requiredIndicator = screen.getAllByText("*");
      expect(requiredIndicator.length).toBeGreaterThan(0);
    });

    it("renders both email and phone radio options", () => {
      render(<ContactInfoCard value={defaultValue} onChange={mockOnChange} />);

      const emailRadio = screen.getByRole("radio", { name: /邮箱/ });
      const phoneRadio = screen.getByRole("radio", { name: /手机/ });

      expect(emailRadio).toBeInTheDocument();
      expect(phoneRadio).toBeInTheDocument();
    });

    it("shows email input when email method is selected", () => {
      render(<ContactInfoCard value={defaultValue} onChange={mockOnChange} />);

      expect(screen.getByLabelText("联系邮箱 *")).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("邮箱地址，接收订单信息")
      ).toBeInTheDocument();
    });

    it("shows phone input when phone method is selected", () => {
      const phoneValue: ContactInfo = {
        method: "phone",
        email: "",
        phone: "",
      };

      render(<ContactInfoCard value={phoneValue} onChange={mockOnChange} />);

      expect(screen.getByLabelText("联系电话 *")).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("手机号，接收订单信息")
      ).toBeInTheDocument();
    });

    it("does not show phone input when email method is selected", () => {
      render(<ContactInfoCard value={defaultValue} onChange={mockOnChange} />);

      expect(
        screen.queryByPlaceholderText("手机号，接收订单信息")
      ).not.toBeInTheDocument();
    });

    it("does not show email input when phone method is selected", () => {
      const phoneValue: ContactInfo = {
        method: "phone",
        email: "",
        phone: "",
      };

      render(<ContactInfoCard value={phoneValue} onChange={mockOnChange} />);

      expect(
        screen.queryByPlaceholderText("邮箱地址，接收订单信息")
      ).not.toBeInTheDocument();
    });
  });

  describe("Contact Method Selection", () => {
    it("email radio is checked when email method is selected", () => {
      render(<ContactInfoCard value={defaultValue} onChange={mockOnChange} />);

      const emailRadio = screen.getByRole("radio", { name: /邮箱/ });
      expect(emailRadio).toBeChecked();
    });

    it("phone radio is checked when phone method is selected", () => {
      const phoneValue: ContactInfo = {
        method: "phone",
        email: "",
        phone: "",
      };

      render(<ContactInfoCard value={phoneValue} onChange={mockOnChange} />);

      const phoneRadio = screen.getByRole("radio", { name: /手机/ });
      expect(phoneRadio).toBeChecked();
    });

    it("calls onChange when switching from email to phone", async () => {
      const user = userEvent.setup();

      render(<ContactInfoCard value={defaultValue} onChange={mockOnChange} />);

      const phoneRadio = screen.getByLabelText(/手机/);
      await user.click(phoneRadio);

      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "phone",
        })
      );
    });

    it("calls onChange when switching from phone to email", async () => {
      const user = userEvent.setup();
      const phoneValue: ContactInfo = {
        method: "phone",
        email: "",
        phone: "",
      };

      render(<ContactInfoCard value={phoneValue} onChange={mockOnChange} />);

      const emailRadio = screen.getByLabelText(/邮箱/);
      await user.click(emailRadio);

      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "email",
        })
      );
    });
  });

  describe("Email Input", () => {
    it("displays the email value", () => {
      const emailValue: ContactInfo = {
        method: "email",
        email: "test@example.com",
        phone: "",
      };

      render(<ContactInfoCard value={emailValue} onChange={mockOnChange} />);

      const emailInput = screen.getByPlaceholderText(
        "邮箱地址，接收订单信息"
      ) as HTMLInputElement;
      expect(emailInput).toHaveValue("test@example.com");
    });

    it("calls onChange when email is typed", async () => {
      const user = userEvent.setup();

      render(<ContactInfoCard value={defaultValue} onChange={mockOnChange} />);

      const emailInput = screen.getByPlaceholderText("邮箱地址，接收订单信息");
      await user.type(emailInput, "test");

      expect(mockOnChange).toHaveBeenCalled();
      // userEvent.type fires onChange for each character typed
      expect(mockOnChange.mock.calls.length).toBeGreaterThan(0);
      // Verify email field is being updated
      expect(mockOnChange.mock.calls[0][0]).toHaveProperty("email");
    });

    it("shows error message when email error is provided", () => {
      render(
        <ContactInfoCard
          value={defaultValue}
          onChange={mockOnChange}
          errors={{ email: "请输入有效的邮箱地址" }}
        />
      );

      expect(screen.getByText("请输入有效的邮箱地址")).toBeInTheDocument();
    });

    it("applies error styling when email error exists", () => {
      render(
        <ContactInfoCard
          value={defaultValue}
          onChange={mockOnChange}
          errors={{ email: "邮箱错误" }}
        />
      );

      const emailInput = screen.getByPlaceholderText("邮箱地址，接收订单信息");
      expect(emailInput).toHaveClass("border-destructive/60");
    });

    it("does not show error when no email error", () => {
      render(<ContactInfoCard value={defaultValue} onChange={mockOnChange} />);

      expect(screen.queryByText(/请输入有效的邮箱/)).not.toBeInTheDocument();
    });
  });

  describe("Phone Input", () => {
    const phoneValue: ContactInfo = {
      method: "phone",
      email: "",
      phone: "",
    };

    it("displays the phone value", () => {
      const filledPhoneValue: ContactInfo = {
        method: "phone",
        email: "",
        phone: "13812345678",
      };

      render(
        <ContactInfoCard value={filledPhoneValue} onChange={mockOnChange} />
      );

      const phoneInput = screen.getByPlaceholderText(
        "手机号，接收订单信息"
      ) as HTMLInputElement;
      expect(phoneInput).toHaveValue("13812345678");
    });

    it("calls onChange when phone is typed", async () => {
      const user = userEvent.setup();

      render(<ContactInfoCard value={phoneValue} onChange={mockOnChange} />);

      const phoneInput = screen.getByPlaceholderText("手机号，接收订单信息");
      await user.type(phoneInput, "13900000000");

      expect(mockOnChange).toHaveBeenCalled();
      // Check that onChange was called with phone digits
      const calls = mockOnChange.mock.calls;
      const finalCall = calls[calls.length - 1][0];
      expect(finalCall.phone).toContain("0");
    });

    it("shows error message when phone error is provided", () => {
      render(
        <ContactInfoCard
          value={phoneValue}
          onChange={mockOnChange}
          errors={{ phone: "手机号格式不正确" }}
        />
      );

      expect(screen.getByText("手机号格式不正确")).toBeInTheDocument();
    });

    it("applies error styling when phone error exists", () => {
      render(
        <ContactInfoCard
          value={phoneValue}
          onChange={mockOnChange}
          errors={{ phone: "手机号错误" }}
        />
      );

      const phoneInput = screen.getByPlaceholderText("手机号，接收订单信息");
      expect(phoneInput).toHaveClass("border-destructive/60");
    });

    it("does not show error when no phone error", () => {
      render(<ContactInfoCard value={phoneValue} onChange={mockOnChange} />);

      expect(screen.queryByText(/手机号格式不正确/)).not.toBeInTheDocument();
    });
  });

  describe("Icons Display", () => {
    it("displays Mail icon for email option", () => {
      const { container } = render(
        <ContactInfoCard value={defaultValue} onChange={mockOnChange} />
      );

      // Check for SVG icons
      const icons = container.querySelectorAll("svg");
      expect(icons.length).toBeGreaterThan(0);
    });

    it("displays Phone icon for phone option", () => {
      const phoneValue: ContactInfo = {
        method: "phone",
        email: "",
        phone: "",
      };

      const { container } = render(
        <ContactInfoCard value={phoneValue} onChange={mockOnChange} />
      );

      const icons = container.querySelectorAll("svg");
      expect(icons.length).toBeGreaterThan(0);
    });
  });

  describe("Accessibility", () => {
    it("has proper label associations for email input", () => {
      render(<ContactInfoCard value={defaultValue} onChange={mockOnChange} />);

      const emailInput = screen.getByLabelText("联系邮箱 *");
      expect(emailInput).toBeInTheDocument();
      expect(emailInput).toHaveAttribute("type", "email");
    });

    it("has proper label associations for phone input", () => {
      const phoneValue: ContactInfo = {
        method: "phone",
        email: "",
        phone: "",
      };

      render(<ContactInfoCard value={phoneValue} onChange={mockOnChange} />);

      const phoneInput = screen.getByLabelText("联系电话 *");
      expect(phoneInput).toBeInTheDocument();
      expect(phoneInput).toHaveAttribute("type", "tel");
    });

    it("radio buttons are keyboard accessible", () => {
      render(<ContactInfoCard value={defaultValue} onChange={mockOnChange} />);

      const emailRadio = screen.getByRole("radio", { name: /邮箱/ });
      const phoneRadio = screen.getByRole("radio", { name: /手机/ });

      expect(emailRadio).toHaveAttribute("type", "button");
      expect(phoneRadio).toHaveAttribute("type", "button");
      expect(emailRadio).toHaveAttribute("role", "radio");
      expect(phoneRadio).toHaveAttribute("role", "radio");
    });
  });

  describe("Edge Cases", () => {
    it("handles empty email value", () => {
      render(<ContactInfoCard value={defaultValue} onChange={mockOnChange} />);

      const emailInput = screen.getByPlaceholderText(
        "邮箱地址，接收订单信息"
      ) as HTMLInputElement;
      expect(emailInput).toHaveValue("");
    });

    it("handles empty phone value", () => {
      const phoneValue: ContactInfo = {
        method: "phone",
        email: "",
        phone: "",
      };

      render(<ContactInfoCard value={phoneValue} onChange={mockOnChange} />);

      const phoneInput = screen.getByPlaceholderText(
        "手机号，接收订单信息"
      ) as HTMLInputElement;
      expect(phoneInput).toHaveValue("");
    });

    it("handles very long email", async () => {
      const user = userEvent.setup();
      const longEmail = `${"a".repeat(50)}@example.com`;

      render(<ContactInfoCard value={defaultValue} onChange={mockOnChange} />);

      const emailInput = screen.getByPlaceholderText("邮箱地址，接收订单信息");
      await user.clear(emailInput);
      await user.type(emailInput, longEmail);

      expect(mockOnChange).toHaveBeenCalled();
      // Verify onChange was called multiple times (once per character)
      expect(mockOnChange.mock.calls.length).toBeGreaterThan(50);
    });

    it("preserves both email and phone values when switching methods", async () => {
      const user = userEvent.setup();
      const initialValue: ContactInfo = {
        method: "email",
        email: "test@example.com",
        phone: "13812345678",
      };

      render(<ContactInfoCard value={initialValue} onChange={mockOnChange} />);

      const phoneRadio = screen.getByLabelText(/手机/);
      await user.click(phoneRadio);

      expect(mockOnChange).toHaveBeenCalledWith({
        method: "phone",
        email: "test@example.com",
        phone: "13812345678",
      });
    });

    it("handles both email and phone errors simultaneously", () => {
      render(
        <ContactInfoCard
          value={defaultValue}
          onChange={mockOnChange}
          errors={{
            email: "邮箱错误",
            phone: "手机号错误",
          }}
        />
      );

      // Only email error should be visible since method is email
      expect(screen.getByText("邮箱错误")).toBeInTheDocument();
      expect(screen.queryByText("手机号错误")).not.toBeInTheDocument();
    });
  });
});

describe("validateContactInfo Function", () => {
  describe("Email Validation", () => {
    it("returns no error for valid email", () => {
      const contactInfo: ContactInfo = {
        method: "email",
        email: "test@example.com",
        phone: "",
      };

      const errors = validateContactInfo(contactInfo);
      expect(errors.email).toBeUndefined();
    });

    it("returns error for empty email", () => {
      const contactInfo: ContactInfo = {
        method: "email",
        email: "",
        phone: "",
      };

      const errors = validateContactInfo(contactInfo);
      expect(errors.email).toBe("请输入联系邮箱");
    });

    it("returns error for whitespace-only email", () => {
      const contactInfo: ContactInfo = {
        method: "email",
        email: "   ",
        phone: "",
      };

      const errors = validateContactInfo(contactInfo);
      expect(errors.email).toBe("请输入联系邮箱");
    });

    it("returns error for invalid email format", () => {
      const contactInfo: ContactInfo = {
        method: "email",
        email: "invalid-email",
        phone: "",
      };

      const errors = validateContactInfo(contactInfo);
      expect(errors.email).toBeDefined();
      expect(errors.email).toContain("邮箱");
    });

    it("returns error for email without @", () => {
      const contactInfo: ContactInfo = {
        method: "email",
        email: "testexample.com",
        phone: "",
      };

      const errors = validateContactInfo(contactInfo);
      expect(errors.email).toBeDefined();
    });

    it("returns error for email without domain", () => {
      const contactInfo: ContactInfo = {
        method: "email",
        email: "test@",
        phone: "",
      };

      const errors = validateContactInfo(contactInfo);
      expect(errors.email).toBeDefined();
    });

    it("accepts valid email with subdomain", () => {
      const contactInfo: ContactInfo = {
        method: "email",
        email: "user@mail.example.com",
        phone: "",
      };

      const errors = validateContactInfo(contactInfo);
      expect(errors.email).toBeUndefined();
    });

    it("accepts valid email with plus sign", () => {
      const contactInfo: ContactInfo = {
        method: "email",
        email: "user+tag@example.com",
        phone: "",
      };

      const errors = validateContactInfo(contactInfo);
      expect(errors.email).toBeUndefined();
    });
  });

  describe("Phone Validation", () => {
    it("returns no error for valid phone number", () => {
      const contactInfo: ContactInfo = {
        method: "phone",
        email: "",
        phone: "13812345678",
      };

      const errors = validateContactInfo(contactInfo);
      expect(errors.phone).toBeUndefined();
    });

    it("returns error for empty phone", () => {
      const contactInfo: ContactInfo = {
        method: "phone",
        email: "",
        phone: "",
      };

      const errors = validateContactInfo(contactInfo);
      expect(errors.phone).toBe("请输入联系电话");
    });

    it("returns error for whitespace-only phone", () => {
      const contactInfo: ContactInfo = {
        method: "phone",
        email: "",
        phone: "   ",
      };

      const errors = validateContactInfo(contactInfo);
      expect(errors.phone).toBe("请输入联系电话");
    });

    it("returns error for phone not starting with 1", () => {
      const contactInfo: ContactInfo = {
        method: "phone",
        email: "",
        phone: "23812345678",
      };

      const errors = validateContactInfo(contactInfo);
      expect(errors.phone).toBeDefined();
      expect(errors.phone).toContain("手机号");
    });

    it("returns error for phone with invalid second digit", () => {
      const contactInfo: ContactInfo = {
        method: "phone",
        email: "",
        phone: "12812345678",
      };

      const errors = validateContactInfo(contactInfo);
      expect(errors.phone).toBeDefined();
    });

    it("returns error for phone with less than 11 digits", () => {
      const contactInfo: ContactInfo = {
        method: "phone",
        email: "",
        phone: "1381234567",
      };

      const errors = validateContactInfo(contactInfo);
      expect(errors.phone).toBeDefined();
    });

    it("returns error for phone with more than 11 digits", () => {
      const contactInfo: ContactInfo = {
        method: "phone",
        email: "",
        phone: "138123456789",
      };

      const errors = validateContactInfo(contactInfo);
      expect(errors.phone).toBeDefined();
    });

    it("returns error for phone with non-numeric characters", () => {
      const contactInfo: ContactInfo = {
        method: "phone",
        email: "",
        phone: "1381234567a",
      };

      const errors = validateContactInfo(contactInfo);
      expect(errors.phone).toBeDefined();
    });

    it("returns error for phone with spaces", () => {
      const contactInfo: ContactInfo = {
        method: "phone",
        email: "",
        phone: "138 1234 5678",
      };

      const errors = validateContactInfo(contactInfo);
      expect(errors.phone).toBeDefined();
    });

    it("returns error for phone with dashes", () => {
      const contactInfo: ContactInfo = {
        method: "phone",
        email: "",
        phone: "138-1234-5678",
      };

      const errors = validateContactInfo(contactInfo);
      expect(errors.phone).toBeDefined();
    });

    it("accepts valid phone starting with 13", () => {
      const contactInfo: ContactInfo = {
        method: "phone",
        email: "",
        phone: "13912345678",
      };

      const errors = validateContactInfo(contactInfo);
      expect(errors.phone).toBeUndefined();
    });

    it("accepts valid phone starting with 15", () => {
      const contactInfo: ContactInfo = {
        method: "phone",
        email: "",
        phone: "15912345678",
      };

      const errors = validateContactInfo(contactInfo);
      expect(errors.phone).toBeUndefined();
    });

    it("accepts valid phone starting with 18", () => {
      const contactInfo: ContactInfo = {
        method: "phone",
        email: "",
        phone: "18912345678",
      };

      const errors = validateContactInfo(contactInfo);
      expect(errors.phone).toBeUndefined();
    });

    it("accepts valid phone starting with 19", () => {
      const contactInfo: ContactInfo = {
        method: "phone",
        email: "",
        phone: "19912345678",
      };

      const errors = validateContactInfo(contactInfo);
      expect(errors.phone).toBeUndefined();
    });
  });

  describe("Method-specific Validation", () => {
    it("does not validate phone when email method is selected", () => {
      const contactInfo: ContactInfo = {
        method: "email",
        email: "test@example.com",
        phone: "invalid", // Invalid phone but should not matter
      };

      const errors = validateContactInfo(contactInfo);
      expect(errors.phone).toBeUndefined();
      expect(errors.email).toBeUndefined();
    });

    it("does not validate email when phone method is selected", () => {
      const contactInfo: ContactInfo = {
        method: "phone",
        email: "invalid-email", // Invalid email but should not matter
        phone: "13812345678",
      };

      const errors = validateContactInfo(contactInfo);
      expect(errors.email).toBeUndefined();
      expect(errors.phone).toBeUndefined();
    });
  });

  describe("Return Value Structure", () => {
    it("returns empty object when no errors", () => {
      const contactInfo: ContactInfo = {
        method: "email",
        email: "test@example.com",
        phone: "",
      };

      const errors = validateContactInfo(contactInfo);
      expect(Object.keys(errors)).toHaveLength(0);
    });

    it("returns object with only email error when email invalid", () => {
      const contactInfo: ContactInfo = {
        method: "email",
        email: "invalid",
        phone: "",
      };

      const errors = validateContactInfo(contactInfo);
      expect(errors.email).toBeDefined();
      expect(errors.phone).toBeUndefined();
    });

    it("returns object with only phone error when phone invalid", () => {
      const contactInfo: ContactInfo = {
        method: "phone",
        email: "",
        phone: "invalid",
      };

      const errors = validateContactInfo(contactInfo);
      expect(errors.phone).toBeDefined();
      expect(errors.email).toBeUndefined();
    });
  });
});
