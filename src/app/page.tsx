import { CategoryGrid } from "@/components/Category";
import { FeatureSection } from "@/components/FeatureSection";
import { HeroSection } from "@/components/HeroSection";
import { ProductGrid } from "@/components/Product/ProductGrid";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <CategoryGrid />
      <FeatureSection />
      <ProductGrid />
    </div>
  );
}
