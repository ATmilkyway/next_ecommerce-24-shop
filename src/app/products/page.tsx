"use client";

import React, { useState } from "react";
import ProductList from "@/components/ProductList";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Search Input */}
      <div className="mb-8">
        <div className="relative max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />

            <Input
              type="text"
              placeholder="Search for products, brands, or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 h-12 text-base"
            />

            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 
                           text-muted-foreground hover:text-foreground transition-colors
                           p-1 rounded-sm hover:bg-accent"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Search hint */}
          <p className="text-sm text-muted-foreground mt-3 text-center">
            Try searching for "electronics", "clothing", or "accessories"
          </p>
        </div>
      </div>

      {/* Product List with search query */}
      <ProductList searchQuery={searchQuery} />
    </div>
  );
}
