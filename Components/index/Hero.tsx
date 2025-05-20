"use client";
import FeaturesSection from "./Features.hero";
import HorizontalScroll from "../ui/animations/useHorinzontal";
import { Presentation } from "./presentation.hero";
import { ContenHero } from "./content.hero";

const Hero = () => {
  return (
    <HorizontalScroll>
      <Presentation />
      <FeaturesSection />
      <ContenHero />
    </HorizontalScroll>
  );
};

export default Hero;
