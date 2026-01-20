import type { Meta, StoryObj } from "@storybook/react";
import { Form } from "@ukesjtu/nomad-ui/components/primitives/form";
import {
  AddressList,
  type AddressListItem,
} from "@ukesjtu/nomad-ui/components/user/address";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { fn } from "storybook/test";

const meta = {
  title: "User/AddressList",
  component: AddressList,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [
    Story => (
      <div className="max-w-6xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AddressList>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockAddresses: AddressListItem[] = [
  {
    id: "1",
    recipientName: "张三",
    phoneNumber: "13800138000",
    province: "北京市",
    city: "北京市",
    district: "朝阳区",
    town: "望京街道",
    detailAddress: "SOHO现代城100号",
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
    detailAddress: "陆家嘴金融中心200号",
    isDefault: false,
  },
  {
    id: "3",
    recipientName: "王五",
    phoneNumber: "13700137000",
    province: "广东省",
    city: "深圳市",
    district: "南山区",
    town: "科技园街道",
    detailAddress: "科技园南路300号",
    isDefault: false,
  },
];

// Simple form component for stories
function SimpleAddressForm({ onSuccess }: { onSuccess: () => void }) {
  const form = useForm({
    defaultValues: {
      recipientName: "",
      phoneNumber: "",
      province: "",
      city: "",
      district: "",
      town: "",
      detailAddress: "",
      isDefault: false,
    },
  });

  return (
    <Form {...form}>
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          表单内容已简化，仅用于演示对话框交互
        </p>
        <button
          type="button"
          onClick={onSuccess}
          className="rounded bg-primary px-4 py-2 text-primary-foreground"
        >
          保存
        </button>
      </div>
    </Form>
  );
}

function AddressListWrapper({ addresses }: { addresses: AddressListItem[] }) {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <AddressList
      addresses={addresses}
      onDelete={fn()}
      onSetDefault={fn()}
      onCancelDefault={fn()}
      onEdit={fn()}
      isAddOpen={isAddOpen}
      onAddOpenChange={setIsAddOpen}
      isEditOpen={isEditOpen}
      onEditOpenChange={setIsEditOpen}
      renderAddForm={() => (
        <SimpleAddressForm onSuccess={() => setIsAddOpen(false)} />
      )}
      renderEditForm={() => (
        <SimpleAddressForm onSuccess={() => setIsEditOpen(false)} />
      )}
    />
  );
}

/**
 * Default address list with multiple addresses
 */
export const Default: Story = {
  render: () => <AddressListWrapper addresses={mockAddresses} />,
};

/**
 * Address list with only one address
 */
export const SingleAddress: Story = {
  render: () => <AddressListWrapper addresses={[mockAddresses[0]]} />,
};

/**
 * Empty address list showing empty state
 */
export const Empty: Story = {
  render: () => <AddressListWrapper addresses={[]} />,
};

/**
 * All addresses are non-default
 */
export const AllNonDefault: Story = {
  render: () => {
    const nonDefaultAddresses = mockAddresses.map(addr => ({
      ...addr,
      isDefault: false,
    }));
    return <AddressListWrapper addresses={nonDefaultAddresses} />;
  },
};

/**
 * Address with very long detail address
 */
export const LongAddress: Story = {
  render: () => {
    const longAddresses: AddressListItem[] = [
      {
        id: "1",
        recipientName: "张三",
        phoneNumber: "13800138000",
        province: "北京市",
        city: "北京市",
        district: "朝阳区",
        town: "望京街道",
        detailAddress:
          "SOHO现代城A座18层1801室，这是一个非常长的详细地址示例，用于测试地址显示的换行和布局情况",
        isDefault: true,
      },
    ];
    return <AddressListWrapper addresses={longAddresses} />;
  },
};

/**
 * Interactive demo with functional dialogs
 */
export const InteractiveDemo: Story = {
  render: () => {
    const [addresses, setAddresses] = useState(mockAddresses);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const handleDelete = (id: string) => {
      setAddresses(prev => prev.filter(addr => addr.id !== id));
      console.log("Deleted address:", id);
    };

    const handleSetDefault = (id: string) => {
      setAddresses(prev =>
        prev.map(addr => ({
          ...addr,
          isDefault: addr.id === id,
        }))
      );
      console.log("Set default address:", id);
    };

    const handleCancelDefault = (id: string) => {
      setAddresses(prev =>
        prev.map(addr => ({
          ...addr,
          isDefault: addr.id === id ? false : addr.isDefault,
        }))
      );
      console.log("Cancelled default address:", id);
    };

    const handleEdit = (address: AddressListItem) => {
      setIsEditOpen(true);
      console.log("Editing address:", address);
    };

    return (
      <AddressList
        addresses={addresses}
        onDelete={handleDelete}
        onSetDefault={handleSetDefault}
        onCancelDefault={handleCancelDefault}
        onEdit={handleEdit}
        isAddOpen={isAddOpen}
        onAddOpenChange={setIsAddOpen}
        isEditOpen={isEditOpen}
        onEditOpenChange={setIsEditOpen}
        renderAddForm={() => (
          <SimpleAddressForm onSuccess={() => setIsAddOpen(false)} />
        )}
        renderEditForm={() => (
          <SimpleAddressForm onSuccess={() => setIsEditOpen(false)} />
        )}
      />
    );
  },
};
