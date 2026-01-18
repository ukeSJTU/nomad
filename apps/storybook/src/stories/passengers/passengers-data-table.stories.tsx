import {
  type PassengerDataItem,
  PassengersDataTable,
} from "@nomad/ui/components/passengers";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";

const mockData: PassengerDataItem[] = [
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
    phone: "-",
    documentType: "护照",
    documentNumber: "E123****678",
    nationality: "中国",
    gender: "女",
  },
  {
    id: "3",
    name: "王五",
    phone: "137****7000",
    documentType: "身份证",
    documentNumber: "3201****5678",
    nationality: "中国",
    gender: "男",
  },
  {
    id: "4",
    name: "赵六",
    phone: "136****6000",
    documentType: "其他",
    documentNumber: "HK12****9012",
    nationality: "中国香港",
    gender: "女",
  },
];

const meta = {
  title: "Passengers/PassengersDataTable",
  component: PassengersDataTable,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    onView: fn(),
    onEdit: fn(),
    onDelete: fn(),
    onBatchDelete: fn(),
    onAdd: fn(),
  },
} satisfies Meta<typeof PassengersDataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: mockData,
    loading: false,
  },
};

export const WithSearch: Story = {
  args: {
    data: mockData,
    searchQuery: "张",
    onSearch: fn(),
    onSearchQueryChange: fn(),
    loading: false,
  },
};

export const Empty: Story = {
  args: {
    data: [],
    loading: false,
    emptyMessage: "暂无旅客信息",
  },
};

export const Loading: Story = {
  args: {
    data: mockData,
    loading: true,
  },
};

export const SingleRow: Story = {
  args: {
    data: [mockData[0]],
    loading: false,
  },
};

export const CustomLabels: Story = {
  args: {
    data: mockData,
    addButtonText: "添加新旅客",
    searchButtonText: "搜索",
    searchPlaceholder: "输入姓名搜索",
    loading: false,
  },
};
