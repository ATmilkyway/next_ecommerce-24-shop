"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";

interface FavoriteCounterProps {
  size?: "sm" | "md" | "lg";
}

export default function FavoriteCounter({ size = "md" }: FavoriteCounterProps) {
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const router = useRouter();

  const handleClick = () => {
    router.push("/favorites");
  };

  const sizeClass = size === "sm" ? "w-5 h-5 text-[10px]" : "w-6 h-6 text-xs";

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full relative"
      onClick={handleClick}
    >
      <Star className="h-5 w-5" />
      {favorites.length > 0 && (
        <span
          className={`absolute -top-1 -right-1 bg-pink-500 text-white font-semibold rounded-full flex items-center justify-center ${sizeClass}`}
        >
          {favorites.length}
        </span>
      )}
    </Button>
  );
}
