import { CategoryGrid } from "@/components/Category";
import { FeatureSection } from "@/components/FeatureSection";
import { HeroSection } from "@/components/HeroSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <CategoryGrid />
      <FeatureSection />
    </div>
  );
}
