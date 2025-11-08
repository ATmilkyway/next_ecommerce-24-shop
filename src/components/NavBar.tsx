"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Home,
  Star,
  PlusCircle,
  Edit3,
  Package,
  Grid3X3,
  Menu,
  X,
  ShoppingCart,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function CollapsibleFloatingNav() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "All Products", href: "/products", icon: Package },
    { name: "Categories", href: "/products/categories", icon: Grid3X3 },
    { name: "Favorites", href: "/favorites", icon: Star },
    { name: "Create", href: "/create", icon: PlusCircle },
    { name: "Edit", href: "/edit/1", icon: Edit3 },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

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
            onClick={toggleMenu}
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>

        {/* Menu */}
        <nav className="flex flex-col space-y-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-xl font-medium text-sm",
                    "hover:bg-primary/10 hover:text-primary transition-colors"
                  )}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  {isOpen && <span>{item.name}</span>}
                </Link>

                {/* Tooltip (only visible when sidebar is collapsed) */}
                {!isOpen && (
                  <div
                    className={cn(
                      "absolute left-full top-1/2 -translate-y-1/2 ml-3",
                      "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                      "pointer-events-none"
                    )}
                  >
                    <div className="bg-background/90 border border-border backdrop-blur-md shadow-lg rounded-md px-3 py-1 text-xs font-medium text-foreground whitespace-nowrap">
                      {item.name}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="flex flex-col items-center mt-6 space-y-3 border-t border-border pt-3">
          <div className="relative group">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full relative"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center shadow-sm">
                2
              </span>
            </Button>
            {!isOpen && (
              <div
                className={cn(
                  "absolute left-full top-1/2 -translate-y-1/2 ml-3",
                  "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                  "pointer-events-none"
                )}
              >
                <div className="bg-background/90 border border-border backdrop-blur-md shadow-lg rounded-md px-3 py-1 text-xs font-medium text-foreground whitespace-nowrap">
                  Cart
                </div>
              </div>
            )}
          </div>

          <div className="relative group">
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
            {!isOpen && (
              <div
                className={cn(
                  "absolute left-full top-1/2 -translate-y-1/2 ml-3",
                  "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                  "pointer-events-none"
                )}
              >
                <div className="bg-background/90 border border-border backdrop-blur-md shadow-lg rounded-md px-3 py-1 text-xs font-medium text-foreground whitespace-nowrap">
                  User
                </div>
              </div>
            )}
          </div>
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
