"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-black text-gray-300 py-10">
      <div className="max-w-7xl w-[86vw] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4 text-white">
            <span className="text-5xl">24</span> Shop
          </h3>
          <p className="text-sm text-gray-400">
            Your one-stop shop for amazing products. Quality guaranteed and fast
            shipping.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-3 text-white">Navigation</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="hover:text-white transition-colors"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/products/categories"
                className="hover:text-white transition-colors"
              >
                All Categories
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-3 text-white">
            Customer Service
          </h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-white">Contact</h4>
          <p className="text-sm text-gray-400">Addis Ababa, Ethiopia</p>
          <p className="text-sm text-gray-400 mt-1">Email: info@24shop.com</p>
          <p className="text-sm text-gray-400 mt-1">Phone: +9123456789</p>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} MyShop. All rights reserved.
      </div>
    </footer>
  );
}
