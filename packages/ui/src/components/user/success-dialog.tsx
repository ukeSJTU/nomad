import { Button } from "../primitives/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../primitives/dialog";

/**
 * Props for SuccessDialog component
 */
export interface SuccessDialogProps {
  /** Controls dialog visibility */
  open: boolean;
  /** Callback when dialog open state changes */
  onOpenChange: (open: boolean) => void;
}

/**
 * SuccessDialog component - displays success message after user info update
 * Pure UI component for showing save confirmation
 */
export function SuccessDialog({ open, onOpenChange }: SuccessDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>保存成功</DialogTitle>
          <DialogDescription>您的个人信息已成功更新。</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>确定</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
