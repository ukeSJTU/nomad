import {
  PassengerList,
  type PassengerListItem,
} from "@nomad/ui/components/passengers";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";

const mockPassengers: PassengerListItem[] = [
  {
    id: "1",
    name: "张三",
    phone: "138****8000",
    documentType: "身份证",
    documentNumber: "1101****1234",
    nationality: "中国",
    gender: "男",
  },
  {
    id: "2",
    name: "李四",
    phone: "139****9000",
    documentType: "护照",
    documentNumber: "E123****678",
    nationality: "中国",
    gender: "女",
  },
  {
    id: "3",
    name: "王五",
    phone: "-",
    documentType: "身份证",
    documentNumber: "3201****5678",
    nationality: "中国",
    gender: "男",
  },
];

const meta = {
  title: "Passengers/PassengerList",
  component: PassengerList,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    onEdit: fn(),
    onDelete: fn(),
    onBatchDelete: fn(),
  },
} satisfies Meta<typeof PassengerList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    passengers: mockPassengers,
    isLoading: false,
  },
};

export const WithAddButton: Story = {
  args: {
    passengers: mockPassengers,
    onAdd: fn(),
    isLoading: false,
  },
};

export const WithSearchCallback: Story = {
  args: {
    passengers: mockPassengers,
    onSearch: fn(),
    isLoading: false,
  },
};

export const Empty: Story = {
  args: {
    passengers: [],
    isLoading: false,
    emptyMessage: "暂无旅客信息",
  },
};

export const Loading: Story = {
  args: {
    passengers: mockPassengers,
    isLoading: true,
  },
};

export const SinglePassenger: Story = {
  args: {
    passengers: [mockPassengers[0]],
    isLoading: false,
  },
};
