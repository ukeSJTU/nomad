"use client";

import {
  type AddressListItem,
  AddressList as AddressListUI,
} from "@ukesjtu/nomad-ui/components/user/address";
import { useState } from "react";
import { toast } from "sonner";
import {
  cancelDefaultAddressAction,
  deleteAddressAction,
  setDefaultAddressAction,
} from "@/app/_actions/addresses";
import AddressForm from "@/app/_components/user/address/address-form";
import { type Address } from "@/types/db";

interface AddressListProps {
  addresses: Address[];
}

/**
 * AddressList container component
 * Manages state and server actions for the address list UI
 */
export function AddressList({ addresses }: AddressListProps) {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const handleDelete = async (id: string) => {
    const result = await deleteAddressAction(id);
    if (result.success) {
      toast.success("地址删除成功");
    } else {
      toast.error(result.error || "删除失败");
    }
  };

  const handleSetDefault = async (id: string) => {
    const result = await setDefaultAddressAction(id);
    if (result.success) {
      toast.success("默认地址设置成功");
    } else {
      toast.error(result.error || "设置失败");
    }
  };

  const handleCancelDefault = async (id: string) => {
    const result = await cancelDefaultAddressAction(id);
    if (result.success) {
      toast.success("默认地址已取消");
    } else {
      toast.error(result.error || "取消失败");
    }
  };

  const handleEdit = (address: AddressListItem) => {
    // Find the full address object from the original list
    const fullAddress = addresses.find(a => a.id === address.id);
    if (fullAddress) {
      setEditingAddress(fullAddress);
    }
  };

  // Convert Address[] to AddressListItem[] for UI component
  const addressItems: AddressListItem[] = addresses.map(addr => ({
    id: addr.id,
    recipientName: addr.recipientName,
    phoneNumber: addr.phoneNumber,
    province: addr.province,
    city: addr.city,
    district: addr.district,
    town: addr.town,
    detailAddress: addr.detailAddress,
    isDefault: addr.isDefault,
  }));

  return (
    <AddressListUI
      addresses={addressItems}
      onDelete={handleDelete}
      onSetDefault={handleSetDefault}
      onCancelDefault={handleCancelDefault}
      onEdit={handleEdit}
      isAddOpen={isAddOpen}
      onAddOpenChange={setIsAddOpen}
      isEditOpen={!!editingAddress}
      onEditOpenChange={open => !open && setEditingAddress(null)}
      renderAddForm={() => (
        <AddressForm onSuccess={() => setIsAddOpen(false)} submitLabel="保存" />
      )}
      renderEditForm={() =>
        editingAddress ? (
          <AddressForm
            initialData={{
              id: editingAddress.id,
              recipientName: editingAddress.recipientName,
              phoneNumber: editingAddress.phoneNumber,
              province: editingAddress.province,
              city: editingAddress.city,
              district: editingAddress.district,
              town: editingAddress.town ?? undefined,
              detailAddress: editingAddress.detailAddress,
              isDefault: editingAddress.isDefault,
            }}
            onSuccess={() => setEditingAddress(null)}
            submitLabel="更新"
          />
        ) : null
      }
    />
  );
}
