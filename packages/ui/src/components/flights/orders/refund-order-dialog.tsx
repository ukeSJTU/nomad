import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../primitives/alert-dialog";

export type RefundOrderDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isLoading?: boolean;
  refundAmount?: string;
};

/**
 * Refund Order Confirmation Dialog Component
 *
 * Displays a confirmation dialog when user attempts to refund an order.
 * Shows refund amount and warning message, requires explicit confirmation.
 */
export function RefundOrderDialog({
  open,
  onOpenChange,
  onConfirm,
  isLoading = false,
  refundAmount,
}: RefundOrderDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>申请退款</AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p>确定要申请退款吗？</p>
            {refundAmount && (
              <p className="font-medium text-foreground">
                退款金额：¥{refundAmount}
              </p>
            )}
            <p className="text-sm text-muted-foreground">
              退款将退回到您的账户余额，座位将立即释放。
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>取消</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} disabled={isLoading}>
            {isLoading ? "退款中..." : "确认退款"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
