"use client";

import { Edit, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import {
  cancelDefaultAddressAction,
  deleteAddressAction,
  setDefaultAddressAction,
} from "@/app/_actions/addresses";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { AddressForm } from "@/app/_components/user/address/address-form";
import { type Address } from "@/types/db";

interface AddressListProps {
  addresses: Address[];
}

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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">常用地址</h3>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              增加
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>新增地址</DialogTitle>
            </DialogHeader>
            <AddressForm
              onSuccess={() => setIsAddOpen(false)}
              submitLabel="保存"
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">序号</TableHead>
              <TableHead>收件人</TableHead>
              <TableHead>地址</TableHead>
              <TableHead>手机</TableHead>
              <TableHead className="w-[100px]">是否默认</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {addresses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  暂无保存的地址
                </TableCell>
              </TableRow>
            ) : (
              addresses.map((address, index) => (
                <TableRow key={address.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{address.recipientName}</TableCell>
                  <TableCell>
                    {address.province}
                    {address.city}
                    {address.district}
                    {address.town}
                    {address.detailAddress}
                  </TableCell>
                  <TableCell>{address.phoneNumber}</TableCell>
                  <TableCell>
                    {address.isDefault && (
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800 hover:bg-green-100"
                      >
                        默认
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      {address.isDefault ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCancelDefault(address.id)}
                        >
                          取消默认
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSetDefault(address.id)}
                        >
                          设为默认
                        </Button>
                      )}

                      <Dialog
                        open={
                          !!editingAddress && editingAddress.id === address.id
                        }
                        onOpenChange={open => !open && setEditingAddress(null)}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setEditingAddress(address)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle>编辑地址</DialogTitle>
                          </DialogHeader>
                          {editingAddress && (
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
                          )}
                        </DialogContent>
                      </Dialog>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>确认删除?</AlertDialogTitle>
                            <AlertDialogDescription>
                              此操作无法撤销。这将永久删除该地址。
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>取消</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(address.id)}
                            >
                              删除
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
