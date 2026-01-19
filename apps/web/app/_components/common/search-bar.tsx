"use client";

import { SearchBar as SearchBarUI } from "@nomad/ui/components/common";
import { useState } from "react";
import { toast } from "sonner";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      toast.success(`Searching for: ${searchQuery}`);
      // TODO: Implement actual search functionality
    }
  };

  return (
    <SearchBarUI
      value={searchQuery}
      onChange={setSearchQuery}
      onSubmit={handleSearch}
    />
  );
}
