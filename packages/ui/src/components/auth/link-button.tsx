import { Button } from "../primitives/button";

/**
 * Props for LinkButton component
 */
export interface LinkButtonProps {
  /** Click handler to initiate OAuth linking */
  onClick: () => void;
  /** Whether the button is in loading state */
  loading?: boolean;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Custom class name */
  className?: string;
}

/**
 * LinkButton Component (Pure UI)
 *
 * A pure UI button for linking social accounts.
 * All business logic (OAuth, server actions, navigation) is handled by the container.
 *
 * @example
 * ```tsx
 * <LinkButton
 *   onClick={() => handleLink()}
 *   loading={isPending}
 * />
 * ```
 */
export function LinkButton({
  onClick,
  loading = false,
  disabled = false,
  className = "text-sm",
}: LinkButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      disabled={disabled || loading}
      className={className}
    >
      {loading ? "绑定中..." : "绑定账号"}
    </Button>
  );
}
