"use client";

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
} from "@nomad/ui/components/primitives/alert-dialog";
import { Badge } from "@nomad/ui/components/primitives/badge";
import { Button } from "@nomad/ui/components/primitives/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@nomad/ui/components/primitives/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@nomad/ui/components/primitives/table";
import { Edit, Plus, Trash2 } from "lucide-react";

/**
 * Minimal address data structure required by UI component
 */
export interface AddressListItem {
  id: string;
  recipientName: string;
  phoneNumber: string;
  province: string;
  city: string;
  district: string;
  town: string | null;
  detailAddress: string;
  isDefault: boolean;
}

export interface AddressListProps {
  /** Array of addresses to display */
  addresses: AddressListItem[];
  /** Callback when delete button is clicked */
  onDelete: (id: string) => void | Promise<void>;
  /** Callback when set as default button is clicked */
  onSetDefault: (id: string) => void | Promise<void>;
  /** Callback when cancel default button is clicked */
  onCancelDefault: (id: string) => void | Promise<void>;
  /** Callback when edit button is clicked */
  onEdit: (address: AddressListItem) => void;
  /** Whether add dialog is open */
  isAddOpen: boolean;
  /** Callback to control add dialog open state */
  onAddOpenChange: (open: boolean) => void;
  /** Whether edit dialog is open */
  isEditOpen: boolean;
  /** Callback to control edit dialog open state */
  onEditOpenChange: (open: boolean) => void;
  /** Render prop for add address form */
  renderAddForm: () => React.ReactNode;
  /** Render prop for edit address form */
  renderEditForm: () => React.ReactNode;
}

/**
 * Address list UI component for displaying and managing user addresses
 * Pure presentation component with all business logic handled via callbacks
 */
export function AddressList({
  addresses,
  onDelete,
  onSetDefault,
  onCancelDefault,
  onEdit,
  isAddOpen,
  onAddOpenChange,
  isEditOpen,
  onEditOpenChange,
  renderAddForm,
  renderEditForm,
}: AddressListProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">常用地址</h3>
        <Dialog open={isAddOpen} onOpenChange={onAddOpenChange}>
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
            {renderAddForm()}
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={onEditOpenChange}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>编辑地址</DialogTitle>
          </DialogHeader>
          {renderEditForm()}
        </DialogContent>
      </Dialog>

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
                          onClick={() => onCancelDefault(address.id)}
                        >
                          取消默认
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onSetDefault(address.id)}
                        >
                          设为默认
                        </Button>
                      )}

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(address)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>

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
                              onClick={() => onDelete(address.id)}
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
