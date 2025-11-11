import type { Metadata } from "next";
import { ReduxProvider } from "@/redux/Providers";

import { Geist, Geist_Mono, Outfit } from "next/font/google";

import "./globals.css";
import { NavBar } from "@/components/NavBar/NavBar";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { TopBar } from "@/components/NavBar/TopBar";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // optional
});

export const metadata: Metadata = {
  title: "24 Shop",
  description: "24 Ecommerce Shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} antialiased`}
      >
        <ReduxProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex flex-col min-h-screen">
              <TopBar />
              <NavBar />
              <main className="lg:w-[93vw] lg:ml-auto lg:pt-8 lg:px-4 font-outfit">
                {children}
              </main>
              <Footer />
            </div>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
