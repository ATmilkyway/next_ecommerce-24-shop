import { CategoryGrid } from "@/components/CategoryGrid";
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
