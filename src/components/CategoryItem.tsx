"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Menu } from "lucide-react";
import type { Category } from "@/types/category";
import type { IconType } from "react-icons";
import {
  FaLeaf,
  FaLaptop,
  FaTshirt,
  FaShoppingBag,
  FaMobileAlt,
  FaMotorcycle,
} from "react-icons/fa";
import { GiFruitBowl } from "react-icons/gi";
import { MdHome, MdSportsBaseball, MdWatch } from "react-icons/md";

interface Props {
  category: Category;
}

const categoryIconMap: { [key: string]: IconType } = {
  beauty: FaLeaf,
  fragrances: FaLeaf,
  furniture: MdHome,
  groceries: GiFruitBowl,
  "home-decoration": MdHome,
  "kitchen-accessories": GiFruitBowl,
  laptops: FaLaptop,
  "mens-shirts": FaTshirt,
  "mens-shoes": FaTshirt,
  "mens-watches": MdWatch,
  "mobile-accessories": FaMobileAlt,
  motorcycle: FaMotorcycle,
  "skin-care": FaLeaf,
  smartphones: FaMobileAlt,
  "sports-accessories": MdSportsBaseball,
  sunglasses: FaLeaf,
  tablets: FaLaptop,
  tops: FaTshirt,
  vehicle: FaMotorcycle,
  "womens-bags": FaShoppingBag,
  "womens-dresses": FaTshirt,
  "womens-jewellery": MdWatch,
  "womens-shoes": FaTshirt,
  "womens-watches": MdWatch,
  default: Menu,
};

export function CategoryItem({ category }: Props) {
  const IconComponent = categoryIconMap[category.slug] || categoryIconMap.default;

  return (
    <div className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform">
      <Avatar className="mb-2 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gray-100 dark:bg-gray-800">
        <AvatarFallback className="bg-transparent">
          <IconComponent className="w-10 h-10 sm:w-12 sm:h-14 md:w-14 md:h-16 text-gray-700 dark:text-gray-200" />
        </AvatarFallback>
      </Avatar>
      <span className="text-center text-[10px] sm:text-xs md:text-sm font-medium truncate">
        {category.name}
      </span>
    </div>
  );
}
