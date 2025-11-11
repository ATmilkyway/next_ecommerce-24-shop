"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";

interface CartCounterProps {
  iconSize?: number;
  badgeSize?: number;
}

export default function CartCounter({
  iconSize = 24,
  badgeSize = 16,
}: CartCounterProps) {
  const cart = useSelector((state: RootState) => state.cart.items);
  const router = useRouter();

  const handleClick = () => {
    router.push("/cart");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative p-0"
      onClick={handleClick}
    >
      <ShoppingCart
        className={`text-gray-900 dark:text-gray-100`}
        style={{ width: iconSize, height: iconSize }}
      />
      {cart.length > 0 && (
        <span
          style={{ width: badgeSize, height: badgeSize }}
          className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full flex items-center justify-center"
        >
          {cart.length}
        </span>
      )}
    </Button>
  );
}
