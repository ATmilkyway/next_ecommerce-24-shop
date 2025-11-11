"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";

interface Props {
  product: Product;
}

export function ProductItem({ product }: Props) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group block rounded-lg border border-gray-200 dark:border-gray-800 p-3 hover:shadow-md hover:scale-105 transition-transform"
    >
      <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-900 rounded-md overflow-hidden">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          className="object-cover group-hover:opacity-90"
        />
      </div>
      <div className="mt-3 space-y-1">
        <h3 className="text-sm sm:text-base font-medium truncate">
          {product.title}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm truncate">
          {product.category}
        </p>
        <p className="font-semibold text-gray-800 dark:text-gray-100">
          ${product.price}
        </p>
      </div>
    </Link>
  );
}
