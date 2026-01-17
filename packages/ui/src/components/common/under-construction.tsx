import { ConstructionIcon } from "lucide-react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../primitives/empty";

export interface UnderConstructionProps {
  /**
   * The main title text to display
   */
  title: string;
  /**
   * The description text explaining the construction status
   */
  description: string;
  /**
   * Optional content to display below the description
   */
  children?: React.ReactNode;
}

/**
 * A component to display when a page or feature is under construction.
 * Shows a construction icon with a customizable title and description.
 *
 * @example
 * ```tsx
 * <UnderConstruction
 *   title="Coming Soon"
 *   description="This feature is currently being developed."
 * />
 * ```
 */
export function UnderConstruction({
  title,
  description,
  children,
}: UnderConstructionProps) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ConstructionIcon />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      {children && <EmptyContent>{children}</EmptyContent>}
    </Empty>
  );
}
