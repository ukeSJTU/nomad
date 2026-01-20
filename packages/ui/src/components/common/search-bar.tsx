import { Button } from "@ukesjtu/nomad-ui/components/primitives/button";
import { Input } from "@ukesjtu/nomad-ui/components/primitives/input";
import { Search } from "lucide-react";

export interface SearchBarProps {
  /**
   * Current search query value
   */
  value: string;
  /**
   * Callback when search query changes
   */
  onChange: (value: string) => void;
  /**
   * Callback when search form is submitted
   */
  onSubmit: () => void;
  /**
   * Placeholder text for the search input
   * @default "搜索任何旅游相关"
   */
  placeholder?: string;
  /**
   * Whether the search is in loading state
   */
  loading?: boolean;
  /**
   * Additional CSS classes for the form wrapper
   */
  className?: string;
  /**
   * Accessible label for the search button
   * @default "Search"
   */
  searchButtonLabel?: string;
}

export function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = "搜索任何旅游相关",
  loading = false,
  className,
  searchButtonLabel = "Search",
}: SearchBarProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={
        className
          ? `flex w-full items-center ${className}`
          : "flex w-full items-center"
      }
    >
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full pl-9 rounded-r-none border-r-0"
          disabled={loading}
        />
      </div>
      <Button
        type="submit"
        size="icon"
        variant="outline"
        className="rounded-l-none shrink-0"
        disabled={loading}
      >
        <Search className="size-4" />
        <span className="sr-only">{searchButtonLabel}</span>
      </Button>
    </form>
  );
}
