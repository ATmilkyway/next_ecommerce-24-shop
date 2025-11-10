"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ColorModeSwitch() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className={`flex items-center gap-1 px-3 py-1 rounded-md border transition
        ${
          isDark
            ? "bg-gray-800 border-gray-600 text-gray-100 hover:bg-gray-700"
            : "bg-white border-gray-300 text-gray-900 hover:bg-gray-100"
        }
      `}
    >
      <Sun
        className={`h-4 w-4 transition-transform ${
          isDark ? "scale-0 rotate-90" : "scale-100 rotate-0"
        } `}
      />
      <Moon
        className={`absolute h-4 w-4 transition-transform ${
          isDark ? "scale-100 rotate-0" : "scale-0 -rotate-90"
        } text-gray-100`}
      />
      <span className="ml-1 text-xs font-medium">
        {isDark ? "Dark" : "Light"}
      </span>
    </button>
  );
}
