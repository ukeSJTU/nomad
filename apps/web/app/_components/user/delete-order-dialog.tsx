import {
  type DeleteOrderDialogProps,
  DeleteOrderDialog as DeleteOrderDialogUI,
} from "@nomad/ui/components/user";

/**
 * Delete Order Confirmation Dialog Component (Container)
 *
 * @description
 * Container component that wraps the UI component from @nomad/ui.
 * This component can add Next.js-specific logic or state management if needed.
 *
 * @remarks
 * Currently passes through all props to the UI component without modification.
 */
export default function DeleteOrderDialog(props: DeleteOrderDialogProps) {
  return <DeleteOrderDialogUI {...props} />;
}
