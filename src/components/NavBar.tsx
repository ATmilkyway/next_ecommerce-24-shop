"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Home,
  Package,
  Grid3X3,
  ShoppingCart,
  Star,
  Menu,
  X,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface MenuItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export function NavBar() {
  const [collapsed, setCollapsed] = useState(true);
  const pathname = usePathname();

  const mainMenu: MenuItem[] = [
    { name: "Home", href: "/", icon: Home },
    { name: "All Products", href: "/products", icon: Package },
    { name: "Categories", href: "/products/categories", icon: Grid3X3 },
  ];

  const userMenu: MenuItem[] = [
    { name: "Cart", href: "/cart", icon: ShoppingCart },
    { name: "Favorite", href: "/favorite", icon: Star },
  ];

  const allMenu = [...mainMenu, ...userMenu];

  const renderDesktopItems = (items: MenuItem[]) =>
    items.map((item) => (
      <div key={item.name} className="relative group">
        <Link
          href={item.href}
          className={`flex items-center gap-3 p-2 rounded-lg select-none transition-colors
            ${
              pathname === item.href
                ? "bg-gray-200 font-semibold"
                : "hover:bg-gray-200"
            }
          `}
        >
          <item.icon className="w-6 h-6 shrink-0" />
          <span
            className={`transition-all duration-300 overflow-hidden whitespace-nowrap
              ${collapsed ? "w-0 opacity-0" : "w-full opacity-100"}
            `}
          >
            {item.name}
          </span>
        </Link>
        {collapsed && (
          <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 rounded bg-gray-900 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
            {item.name}
          </span>
        )}
      </div>
    ));

  const renderMobileItems = (items: MenuItem[]) =>
    items.map((item) => {
      const active = pathname === item.href;
      const mobileName = item.name === "All Products" ? "Products" : item.name;
      return (
        <Link
          key={item.name}
          href={item.href}
          className={`flex-1 flex flex-col items-center justify-center gap-1 p-2 rounded-lg select-none transition-colors
            ${
              active
                ? "text-gray-900 font-semibold"
                : "text-gray-500 hover:text-gray-900"
            }
          `}
        >
          <item.icon className="w-6 h-6" />
          {active && <span className="text-xs">{mobileName}</span>}
        </Link>
      );
    });

  return (
    <>
      <nav
        className={`hidden md:flex flex-col justify-between fixed left-5 top-1/2 -translate-y-1/2 z-50
                   bg-background/90 backdrop-blur-md border border-border shadow-lg rounded-3xl
                   p-4 transition-all duration-300 select-none
                   ${collapsed ? "w-20" : "w-48"}`}
      >
        <div className="flex items-center justify-between mb-4">
          <h1
            className={`font-bold transition-all duration-300 whitespace-nowrap ${
              collapsed ? "text-2xl" : "text-3xl"
            }`}
          >
            24{" "}
            {!collapsed && (
              <span className="text-lg ml-1 font-normal">Shop</span>
            )}
          </h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <Menu className="w-5 h-5" />
            ) : (
              <X className="w-5 h-5" />
            )}
          </Button>
        </div>

        <Separator className="my-4" />

        <div className="flex flex-col gap-2">
          {renderDesktopItems(mainMenu)}
        </div>

        <Separator className="my-4" />

        <div className="flex flex-col gap-2">
          {renderDesktopItems(userMenu)}
        </div>
      </nav>

      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-background/90 backdrop-blur-md border-t border-border shadow-lg flex justify-around p-2 select-none">
        {renderMobileItems(allMenu)}
      </nav>
    </>
  );
}
