"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";

interface FavoriteCounterProps {
  iconSize?: number;
  badgeSize?: number;
}

export default function FavoriteCounter({
  iconSize = 24,
  badgeSize = 16,
}: FavoriteCounterProps) {
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const router = useRouter();

  const handleClick = () => {
    router.push("/favorite");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative p-0"
      onClick={handleClick}
    >
      <Star
        className="text-yellow-500"
        style={{ width: iconSize, height: iconSize }}
      />
      {favorites.length > 0 && (
        <span
          style={{ width: badgeSize, height: badgeSize }}
          className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full flex items-center justify-center shadow-md"
        >
          {favorites.length}
        </span>
      )}
    </Button>
  );
}
