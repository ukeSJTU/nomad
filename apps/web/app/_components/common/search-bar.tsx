"use client";

import { Button } from "@nomad/ui/components/button";
import { Input } from "@nomad/ui/components/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.success(`Searching for: ${searchQuery}`);
      // TODO: Implement actual search functionality
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex w-full items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="搜索任何旅游相关"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full pl-9 rounded-r-none border-r-0"
        />
      </div>
      <Button
        type="submit"
        size="icon"
        variant="outline"
        className="rounded-l-none shrink-0"
      >
        <Search className="size-4" />
        <span className="sr-only">Search</span>
      </Button>
    </form>
  );
}
