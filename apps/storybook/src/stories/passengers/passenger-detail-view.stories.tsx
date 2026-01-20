import type { Meta, StoryObj } from "@storybook/react";
import {
  type PassengerDetailData,
  PassengerDetailView,
} from "@ukesjtu/nomad-ui/components/passengers";

const mockPassenger: PassengerDetailData = {
  name: "张三",
  nationality: "中国",
  gender: "male",
  dateOfBirth: "1990-01-01",
  placeOfBirth: "北京",
  phone: "13800138000",
  email: "zhangsan@example.com",
  documentType: "id_card",
  documentNumber: "110101199001011234",
  documentExpiryDate: "2030-12-31",
};

const meta = {
  title: "Passengers/PassengerDetailView",
  component: PassengerDetailView,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PassengerDetailView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    passenger: mockPassenger,
  },
};

export const Female: Story = {
  args: {
    passenger: {
      ...mockPassenger,
      name: "李四",
      gender: "female",
      email: "lisi@example.com",
    },
  },
};

export const WithPassport: Story = {
  args: {
    passenger: {
      name: "John Doe",
      nationality: "USA",
      gender: "male",
      dateOfBirth: "1985-05-15",
      placeOfBirth: "New York",
      phone: "1234567890",
      email: "john.doe@example.com",
      documentType: "passport",
      documentNumber: "AB1234567",
      documentExpiryDate: "2028-06-30",
    },
  },
};

export const WithNullFields: Story = {
  args: {
    passenger: {
      name: "王五",
      nationality: "中国",
      gender: "other",
      dateOfBirth: "1992-03-10",
      placeOfBirth: null,
      phone: null,
      email: null,
      documentType: "id_card",
      documentNumber: "320101199203101234",
      documentExpiryDate: null,
    },
  },
};

export const MinimalInfo: Story = {
  args: {
    passenger: {
      name: "赵六",
      nationality: "中国",
      gender: "male",
      dateOfBirth: "1988-12-25",
      placeOfBirth: null,
      phone: null,
      email: null,
      documentType: "other",
      documentNumber: "HK1234567",
      documentExpiryDate: "2025-12-31",
    },
  },
};
