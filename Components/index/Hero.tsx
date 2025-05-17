"use client";
import FeaturesSection from "./Features.hero";
import HorizontalScroll from "../ui/animations/useHorinzontal";
import { Presentation } from "./presentation.hero";
import { ContenHero } from "./content.hero";

function Sombra() {
  return (
    <>
      <div className="absolute inset-0 opacity-30 mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-transparent"></div>
    </>
  );
}
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
