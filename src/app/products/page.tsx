"use client";

import React, { useState } from "react";
import ProductList from "@/components/ProductList";

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="p-6">
      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Product List with search query */}
      <ProductList searchQuery={searchQuery} />
    </div>
  );
}
