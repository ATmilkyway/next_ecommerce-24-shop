"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CartCounterProps {
  size?: "sm" | "md";
}

export default function CartCounter({ size = "sm" }: CartCounterProps) {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const dimension = size === "sm" ? "w-4 h-4 text-[10px]" : "w-6 h-6 text-xs";

  return (
    <Button variant="ghost" size="icon" className="rounded-full relative">
      <ShoppingCart className="h-5 w-5" />
      {cartItems.length > 0 && (
        <span
          className={`absolute -top-1 -right-1 bg-primary text-primary-foreground font-semibold rounded-full flex items-center justify-center ${dimension}`}
        >
          {cartItems.length}
        </span>
      )}
    </Button>
  );
}
