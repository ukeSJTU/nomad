import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";

import PassengerForm from "@/components/passengers/forms/passenger-form";
import storyLogger from "@/infra/logging/storybook-logger";

const meta = {
  title: "Passengers/PassengerForm",
  component: PassengerForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PassengerForm>;

export default meta;
type Story = Omit<StoryObj<typeof meta>, "args">;

/**
 * Default passenger form
 * Shows the complete passenger information form with all fields
 * Including personal info, contact details, and document information
 */
export const Default: Story = {
  render: () => (
    <div className="w-[700px] p-6">
      <PassengerForm
        onSubmit={data => {
          storyLogger.info("Form submitted:", data);
        }}
        onCancel={() => {
          storyLogger.info("Form cancelled");
        }}
      />
    </div>
  ),
};

/**
 * Form with initial data
 * Shows the form pre-filled with existing passenger information
 */
export const WithInitialData: Story = {
  render: () => (
    <div className="w-[700px] p-6">
      <PassengerForm
        onSubmit={data => {
          storyLogger.info("Form submitted:", data);
        }}
        onCancel={() => {
          storyLogger.info("Form cancelled");
        }}
        initialData={{
          name: "张三",
          nationality: "中国大陆",
          gender: "male",
          phone: "13812345678",
          email: "zhangsan@example.com",
          documentType: "id_card",
          documentNumber: "110101199001011234",
        }}
      />
    </div>
  ),
};

/**
 * Happy Path smoke test
 * Simulates a user successfully filling out the passenger form
 *
 * Test steps:
 * 1. Enter passenger name
 * 2. Select gender
 * 3. Select nationality
 * 4. Enter document number
 * 5. Submit form
 *
 * Note: This is a basic smoke test for visual verification.
 * Detailed validation logic, error states, and edge cases
 * should be tested using RTL
 */
export const HappyPath: Story = {
  render: () => (
    <div className="w-[700px] p-6">
      <PassengerForm
        onSubmit={data => {
          storyLogger.info("Form submitted:", data);
        }}
        onCancel={() => {
          storyLogger.info("Form cancelled");
        }}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 1. Enter passenger name
    const nameInput = canvas.getByPlaceholderText("请输入姓名（中文或英文）");
    await userEvent.type(nameInput, "张三", { delay: 50 });

    // 2. Select gender - find the radio button for male
    const maleRadio = canvas.getByRole("radio", { name: "男" });
    await userEvent.click(maleRadio);

    // 3. Enter document number
    const documentInput = canvas.getByPlaceholderText("请输入证件号码");
    await userEvent.type(documentInput, "110101199001011234", { delay: 30 });

    // 4. Verify form has required fields filled
    await expect(nameInput).toHaveValue("张三");
    await expect(documentInput).toHaveValue("110101199001011234");

    // 5. Submit form
    const submitButton = canvas.getByRole("button", { name: /保存/i });
    await userEvent.click(submitButton);
  },
};
