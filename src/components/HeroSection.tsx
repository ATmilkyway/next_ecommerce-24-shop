"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const rightImages = [
  { src: "/hero1.jpg", title: "Wireless Headphones", desc: "Immersive sound" },
  { src: "/hero2.jpg", title: "Stylish Hoody", desc: "Cozy and trendy" },
  { src: "/hero3.jpg", title: "Luxury Watch", desc: "Timeless design" },
];

export function HeroSection() {
  return (
    <div className="w-full max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 lg:gap-6 h-auto min-h-[500px] sm:min-h-[550px] lg:h-[500px] xl:h-[550px]">
        {/* Main Banner */}
        <div className="relative w-full lg:w-2/3 h-[300px] xs:h-[350px] sm:h-[400px] md:h-[450px] lg:h-full rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl hover:shadow-xl transition-all duration-300 group">
          <Image
            src="/deal3.jpg"
            alt="Hero Banner"
            fill
            priority
            className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 66vw, 800px"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent rounded-xl sm:rounded-2xl lg:rounded-3xl" />

          <div className="absolute inset-0 flex flex-col justify-center items-start p-4 xs:p-5 sm:p-6 md:p-8 lg:p-10 xl:p-12">
            <div className="max-w-xs xs:max-w-sm sm:max-w-md lg:max-w-lg">
              <div className="inline-block bg-primary text-primary-foreground text-xs xs:text-sm font-semibold px-3 xs:px-4 py-1 xs:py-2 rounded-full mb-3 xs:mb-4 shadow-lg">
                Limited Time Offer
              </div>

              <h1 className="text-white text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 xs:mb-4 sm:mb-5 lg:mb-6 leading-tight drop-shadow-2xl">
                Discover Amazing Deals
              </h1>
              <p className="text-white/90 text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl mb-4 xs:mb-5 sm:mb-6 lg:mb-8 max-w-xs xs:max-w-sm sm:max-w-md leading-relaxed drop-shadow-md">
                Shop the best products and save big on your favorite items today.
              </p>

              {/* Buttons - Always side by side on medium screens and up */}
              <div className="flex flex-row gap-2 xs:gap-3 sm:gap-4 w-full">
                <Link href="/products" className="flex-1 min-w-[120px]">
                  <Button
                    size="lg"
                    className="w-full font-semibold text-sm xs:text-base px-4 xs:px-6 sm:px-8 py-2 xs:py-3 shadow-xl sm:shadow-2xl cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Shop Products
                  </Button>
                </Link>
                <Link href="/favorites" className="flex-1 min-w-[120px]">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full font-semibold text-sm xs:text-base px-4 xs:px-6 sm:px-8 py-2 xs:py-3 shadow-lg cursor-pointer bg-white text-black hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:border dark:border-gray-600"
                  >
                    Favorites
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-3 xs:gap-4 mt-4 xs:mt-5 sm:mt-6 lg:mt-8 text-white/80 text-xs xs:text-sm">
                <div className="flex items-center gap-1">
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Images */}
        <div className="w-full lg:w-1/3 h-auto min-h-[200px] xs:min-h-[250px] sm:min-h-[300px] lg:h-full flex flex-col gap-3 sm:gap-4 lg:gap-6">
          {/* Top Right Image */}
          <div className="relative flex-1 min-h-[150px] xs:min-h-[180px] sm:min-h-[200px] rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg hover:shadow-md transition-all duration-300 group cursor-pointer">
            <Image
              src={rightImages[0].src}
              alt={rightImages[0].title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 33vw, 400px"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-xl sm:rounded-2xl lg:rounded-3xl" />

            <div className="absolute bottom-3 left-3 right-3 xs:bottom-4 xs:left-4 xs:right-4 sm:bottom-6 sm:left-6 text-white">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-2 xs:px-3 py-1 inline-block mb-1 xs:mb-2">
                <span className="text-xs font-semibold">Popular</span>
              </div>
              <h3 className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold mb-1 drop-shadow-lg">
                {rightImages[0].title}
              </h3>
              <p className="text-xs xs:text-sm sm:text-base text-gray-200 drop-shadow-lg">
                {rightImages[0].desc}
              </p>
            </div>
          </div>

          {/* Bottom Right Images */}
          <div className="flex flex-1 gap-3 sm:gap-4 lg:gap-6 min-h-[120px] xs:min-h-[150px] sm:min-h-[180px]">
            {rightImages.slice(1).map((img, i) => (
              <div
                key={i}
                className="relative flex-1 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-md transition-all duration-300 group cursor-pointer"
              >
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 16.5vw, 200px"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-xl sm:rounded-2xl" />

                <div className="absolute bottom-2 left-2 right-2 xs:bottom-3 xs:left-3 xs:right-3 sm:bottom-4 sm:left-4 text-white">
                  <h3 className="text-sm xs:text-base sm:text-lg md:text-xl font-bold mb-1 drop-shadow-lg line-clamp-1">
                    {img.title}
                  </h3>
                  <p className="text-xs text-gray-200 drop-shadow-lg line-clamp-1 xs:line-clamp-2">
                    {img.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}