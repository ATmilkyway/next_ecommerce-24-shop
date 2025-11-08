"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";

interface CartCounterProps {
  size?: "sm" | "md" | "lg";
}

export default function CartCounter({ size = "md" }: CartCounterProps) {
  const cart = useSelector((state: RootState) => state.cart.items);
  const router = useRouter();

  const handleClick = () => {
    router.push("/cart");
  };

  const sizeClass = size === "sm" ? "w-5 h-5 text-[10px]" : "w-6 h-6 text-xs";

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full relative"
      onClick={handleClick}
    >
      <ShoppingCart className={`h-5 w-5`} />
      {cart.length > 0 && (
        <span
          className={`absolute -top-1 -right-1 bg-primary text-primary-foreground font-semibold rounded-full flex items-center justify-center ${sizeClass}`}
        >
          {cart.length}
        </span>
      )}
    </Button>
  );
}
