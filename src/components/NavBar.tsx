"use client";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import { Home, Package, Grid3X3, ShoppingCart, Star, Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

export function NavBar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const mainMenu = [
    { name: "Home", href: "/", icon: Home },
    { name: "All Products", href: "/products", icon: Package },
    { name: "Categories", href: "/products/categories", icon: Grid3X3 },
  ];

  const userMenu = [
    { name: "Cart", href: "/cart", icon: ShoppingCart },
    { name: "Favorite", href: "/favorite", icon: Star },
  ];

  const linkClasses = (href:string) =>
    `flex items-center gap-3 p-2 rounded-lg transition-colors ${
      pathname === href ? "bg-gray-200 font-semibold" : "hover:bg-gray-200"
    }`;

  return (
    <nav
      className={`hidden md:flex flex-col justify-between fixed left-5 top-1/2 -translate-y-1/2 z-50
                 bg-background/90 backdrop-blur-md border border-border shadow-lg rounded-3xl
                 p-4 transition-all duration-300 select-none
                 ${collapsed ? "w-26" : "w-52"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 select-none">
        <h1
          className={`font-bold transition-all duration-300 overflow-hidden whitespace-nowrap
                      ${collapsed ? "text-2xl" : "text-3xl"}`}
        >
          24 {!collapsed && <span className="text-lg ml-1 font-normal">Shop</span>}
        </h1>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
        </Button>
      </div>

      <Separator className="my-4" />

      {/* Main Menu */}
      <div className="flex flex-col gap-2">
        {mainMenu.map((item) => (
          <Link key={item.name} href={item.href} className={linkClasses(item.href)}>
            <item.icon className="w-6 h-6 shrink-0" />
            <span
              className={`transition-all duration-300 overflow-hidden whitespace-nowrap
                          ${collapsed ? "w-0 opacity-0" : "w-full opacity-100"}`}
            >
              {item.name}
            </span>
          </Link>
        ))}
      </div>

      <Separator className="my-4" />

      {/* User Menu */}
      <div className="flex flex-col gap-2">
        {userMenu.map((item) => (
          <Link key={item.name} href={item.href} className={linkClasses(item.href)}>
            <item.icon className="w-6 h-6 shrink-0" />
            <span
              className={`transition-all duration-300 overflow-hidden whitespace-nowrap
                          ${collapsed ? "w-0 opacity-0" : "w-full opacity-100"}`}
            >
              {item.name}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
