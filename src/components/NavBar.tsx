"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  User,
  Home,
  Star,
  PlusCircle,
  Edit3,
  Info,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function CollapsibleFloatingNav() {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { name: "All Products", href: "/", icon: Home },
    { name: "Favorites", href: "/favorites", icon: Star },
    { name: "Create", href: "/create", icon: PlusCircle },
    { name: "Edit", href: "/edit/1", icon: Edit3 },
  ];

  return (
    <>
      {/* ===== DESKTOP FLOATING LEFT BAR ===== */}
      <aside
        className={cn(
          "hidden md:flex flex-col justify-between fixed left-5 top-1/2 -translate-y-1/2 z-50",
          "bg-background/90 backdrop-blur-md border border-border shadow-lg",
          "rounded-3xl p-4 transition-all duration-300",
          isOpen ? "w-56" : "w-20 h-[70vh]"
        )}
      >
        {/* Logo + Toggle */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2 select-none">
            <span className="text-2xl font-extrabold text-primary drop-shadow-sm">
              24
            </span>
            {isOpen && (
              <span className="text-sm font-semibold text-foreground/80">
                Shop
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>

        {/* Menu */}
        <nav className="flex flex-col space-y-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-xl font-medium text-sm",
                  "hover:bg-primary/10 hover:text-primary transition-colors"
                )}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {isOpen && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="flex flex-col items-center mt-6 space-y-3 border-t border-border pt-3">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full relative"
            title="Cart"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center shadow-sm">
              2
            </span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            title="User"
          >
            <User className="h-5 w-5" />
          </Button>
        </div>
      </aside>

      {/* ===== MOBILE FLOATING BOTTOM NAV ===== */}
      <nav
        className={cn(
          "md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-50",
          "bg-background/90 backdrop-blur-md border border-border shadow-lg",
          "rounded-full w-[90%] px-4 py-2 flex justify-around items-center"
        )}
      >
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex flex-col items-center justify-center text-foreground/70 hover:text-primary transition-colors"
            >
              <Icon className="w-5 h-5" />
            </Link>
          );
        })}

        <Button variant="ghost" size="icon" className="rounded-full relative">
          <ShoppingCart className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center shadow-sm">
            2
          </span>
        </Button>
      </nav>
    </>
  );
}
