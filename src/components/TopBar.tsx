"use client";

import { ColorModeSwitch } from "./ColorModeSwitch";
import { ShoppingCart, Tag } from "lucide-react";

export function TopBar() {
  return (
    <div className="w-full flex items-center justify-between p-2 md:p-4 bg-background/90 backdrop-blur-md border-b border-border shadow-md">
      <div className="flex items-center gap-3">
        <ColorModeSwitch />
        <button className="relative p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition">
          <ShoppingCart className="w-5 h-5 text-gray-700 dark:text-gray-200" />
          <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>
        </button>
      </div>
    </div>
  );
}
