import { Button } from "../primitives/button";

/**
 * Props for UnlinkButton component
 */
export interface UnlinkButtonProps {
  /** Click handler to initiate unlinking */
  onClick: () => void;
  /** Whether the button is in loading state */
  loading?: boolean;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Custom class name */
  className?: string;
}

/**
 * UnlinkButton Component (Pure UI)
 *
 * A pure UI button for unlinking social accounts.
 * All business logic (server actions, state management) is handled by the container.
 *
 * @example
 * ```tsx
 * <UnlinkButton
 *   onClick={() => handleUnlink()}
 *   loading={isPending}
 * />
 * ```
 */
export function UnlinkButton({
  onClick,
  loading = false,
  disabled = false,
  className = "text-sm",
}: UnlinkButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      disabled={disabled || loading}
      className={className}
    >
      {loading ? "解绑中..." : "取消绑定"}
    </Button>
  );
}
