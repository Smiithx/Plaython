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
      {/* <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black to-transparent -z-10 pointer-events-none" /> */}
      <FeaturesSection />
      {/* <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black to-transparent -z-10 pointer-events-none" /> */}
      <ContenHero />

      {/* <div className="h-16  inset-0 -z-10  bg-gradient-to-t  from-black to-[#011d62b9]"></div> */}
    </HorizontalScroll>
  );
};

export default Hero;
