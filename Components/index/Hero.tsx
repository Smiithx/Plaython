"use client";
import { ArrowRight, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ParticleEffect from "../ui/animations/paticle-events";
import AnimatedText from "../ui/animations/text-principal";
import { motion } from "framer-motion";
import FeaturesSection from "./Features.hero";
import FeatureSlider from "../ui/animations/useHorinzontal";
import HorizontalScroll from "../ui/animations/useHorinzontal";
import StarField from "../ui/animations/star-footer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import { CustomTypewriter } from "../ui/animations/typewrite";
import { Footer } from "./Footer";
const phrases = [
  "DIVIÉRTETE PROGRAMANDO",
  "ENCUENTRA TU MATCH DEV",
  "CONSIGUE TU PRÓXIMO RETO",
  "DESBLOQUEA TU POTENCIAL",
];
const Hero = () => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const [introComplete, setIntroComplete] = useState(false);

  const [text] = useTypewriter({
    words: ["Plaython"],
    loop: 1,
    delaySpeed: 2000,
    deleteSpeed: 50,
    onLoopDone: () => {
      setTimeout(() => setIntroComplete(true), 1000);
    },
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (introComplete && containerRef.current) {
      const sections = gsap.utils.toArray<HTMLElement>(".horizontal-section");

      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () =>
            "+=" + containerRef.current.offsetWidth * (sections.length - 1),
        },
      });
    }
  }, [introComplete]);

  if (!introComplete) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-black text-white">
        <div className="text-4xl md:text-6xl font-bold">
          <span className="bg-gradient-to-r from-[#FF9A8B] via-[#5865F2] to-[#9146FF] text-transparent bg-clip-text">
            {text}
          </span>
          <Cursor cursorColor="#00FFFF" />
        </div>
      </div>
    );
  }

  return (
    <main className="relative overflow-hidden">
      <StarField />
      <ParticleEffect />
      <div className="relative">
        <HorizontalScroll ref={containerRef}>
          {/* Hero Section */}
          <section className="horizontal-section h-screen w-screen flex flex-col items-center justify-center relative">
            <div className="max-w-5xl mx-auto text-center px-4 pb-10">
              <div className="absolute inset-0 -z-10 opacity-10">
                <svg
                  className="absolute inset-0 h-full w-full"
                  viewBox="0 0 800 800"
                >
                  <defs>
                    <pattern
                      id="grid"
                      width="100"
                      height="100"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 100 0 L 0 0 0 100"
                        fill="none"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="1"
                      />
                    </pattern>
                    <radialGradient
                      id="glowGradient"
                      cx="50%"
                      cy="50%"
                      r="70%"
                      fx="50%"
                      fy="50%"
                    >
                      <stop offset="0%" stopColor="rgba(16,124,16,0.3)" />
                      <stop offset="100%" stopColor="rgba(16,124,16,0)" />
                    </radialGradient>
                  </defs>
                  <rect
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    fill="url(#grid)"
                  />
                  <circle cx="400" cy="400" r="300" fill="url(#glowGradient)" />
                </svg>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#107C10]/20 blur-3xl" />
              </div>

              <div className="space-y-8 max-w-2xl container mx-auto px-6 text-center">
                <div className="space-y-8">
                  <motion.h1
                    className="text-4xl md:text-6xl font-bold text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                  >
                    Únete a un reto y
                  </motion.h1>

                  <h2 className="text-green-500 font-mono text-2xl md:text-5xl mt-4 min-h-[3rem]">
                    <CustomTypewriter phrases={phrases} />
                  </h2>
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="text-2xl text-left bg-clip-text text-white/80"
                  >
                    Plaython crea equipos equilibrados y organiza experiencias
                    colaborativas para que desarrolles todo tu potencial.
                  </motion.span>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    className="flex flex-row w-full sm:w-auto py-2 px-4 text-lg 
                  bg-gradient-to-r from-purple-700 to-pink-700 text-white font-medium rounded transition-colors duration-300 hover:from-purple-400 hover:to-pink-500
                  
                  overflow-hidden group"
                  >
                    Encontrar Evento{" "}
                    <ArrowRight className="ml-2 h-5 w-5 mt-1" />
                  </button>
                  <button
                    // variant="outline"
                    className="w-full sm:w-auto py-2 px-4 rounded text-lg border-[#2D2D2D] hover:text-white duration-300 hover:bg-gradient-to-r hover:from-[#FF9A8B]/20 hover:via-[#5865F2]/20 hover:to-[#9146FF]/20 hover:border-white/40"
                  >
                    Cómo Funciona
                  </button>
                </div>

                <div className="mx-auto pt-5 w-full flex items-center justify-center rounded-2xl bg-black/10 backdrop-blur-sm p-6 text-white/60 text-sm">
                  <div className="flex items-center gap-6 md:gap-10">
                    <div className="flex items-center gap-2">
                      <i className="text-xl text-white/80">👨‍💻</i>
                      <span className="text-white">10,000+ Programadores</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="text-xl text-yellow-400">🏆</i>
                      <span className="text-yellow-300">500+ Eventos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="text-xl text-yellow-300">⭐</i>

                      <span className="text-yellow-200">98% Satisfacción</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <FeaturesSection />

          <section className="horizontal-section h-screen w-screen flex flex-col items-center justify-center relative">
            <div className="container mx-auto px-4">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="lg:w-1/2">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#107C10] to-[#52B043]">
                      Interfaz Gamer
                    </span>{" "}
                    para Programadores
                  </h2>
                  <p className="text-lg text-white/70 mb-8">
                    Experimenta una plataforma de programación con la estética y
                    usabilidad de los mejores videojuegos. Hemos combinado lo
                    mejor de ambos mundos para crear una experiencia única.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#107C10] flex items-center justify-center text-lg font-bold mt-1">
                        1
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">
                          Dashboard tipo Consola
                        </h3>
                        <p className="text-white/70">
                          Visualiza tus estadísticas, logros y próximos eventos
                          en un panel inspirado en interfaces de videojuegos.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#107C10] flex items-center justify-center text-lg font-bold mt-1">
                        2
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">
                          Sistema de Niveles
                        </h3>
                        <p className="text-white/70">
                          Gana puntos de experiencia por cada desafío completado
                          y sube de nivel como programador.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#107C10] flex items-center justify-center text-lg font-bold mt-1">
                        3
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">
                          Logros Desbloqueables
                        </h3>
                        <p className="text-white/70">
                          Desbloquea insignias y reconocimientos especiales por
                          tus contribuciones y victorias.
                        </p>
                      </div>
                    </div>
                  </div>
                  <button className="flex flex-row mt-8 py-2 px-4 rounded bg-[#107C10] hover:bg-[#0B5D0B] text-white font-medium">
                    Explorar Dashboard{" "}
                    <ChevronRight className="ml-2 h-4 w-4 mt-1" />
                  </button>
                </div>
                <div className="lg:w-1/2 rounded-lg overflow-hidden border-2 border-[#2D2D2D] shadow-[0_0_30px_rgba(16,124,16,0.2)]">
                  <div className="relative aspect-video bg-[#0F0F0F] overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-[#107C10]"></div>
                    <div className="p-4 flex justify-between items-center border-b border-[#2D2D2D]">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#107C10]"></div>
                        <span className="text-sm font-semibold">
                          Plaython Dashboard
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-white/50"></div>
                        <div className="w-2 h-2 rounded-full bg-white/50"></div>
                        <div className="w-2 h-2 rounded-full bg-white/50"></div>
                      </div>
                    </div>
                    <div className="relative w-full h-full flex items-center justify-center">
                      <img
                        src="/placeholder.svg?height=400&width=800"
                        alt="Plaython Dashboard Preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <div className="w-16 h-16 rounded-full bg-[#107C10] flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </HorizontalScroll>
      </div>
    </main>
  );
};

export default Hero;
