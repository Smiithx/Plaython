"use client";
import { motion } from "framer-motion";

import { CustomTypewriter } from "../ui/animations/typewrite";
import ParticleEffect from "../ui/animations/paticle-events";
import StarField from "../ui/animations/star-footer";
import GlitchText from "../ui/animations/glitch-text";
import { AnimatedCounter } from "../ui/animations/animated-counter";

const phrases = [
  "DIVIÉRTETE PROGRAMANDO",
  "ENCUENTRA TU MATCH DEV",
  "DESBLOQUEA TU POTENCIAL",
];

export function Presentation() {
  return (
    <section className="section-vertical bg-black flex flex-col items-center justify-center relative">
      <StarField />
      <ParticleEffect />
      <div className="space-y-8 max-w-2xl container mx-auto px-6 text-center">
        <div className="space-y-8 text-center">
          <motion.h1
            className="flex flex-row place-content-center text-4xl md:text-6xl font-bold text-white justify-items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <GlitchText>Únete</GlitchText>
            <span className="pl-5"> a un reto y</span>
          </motion.h1>

          <h2 className="text-green-500 font-mono text-2xl md:text-5xl mt-4 min-h-[3rem]">
            <CustomTypewriter phrases={phrases} />
          </h2>
          <motion.span
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-2xl text-white/80 max-w-3xl mx-auto block text-center"
          >
            Plaython crea equipos equilibrados y organiza experiencias
            colaborativas para que desarrolles todo tu potencial.
          </motion.span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 space-x-8">
          <button className="relative inline-flex items-center gap-2 px-6 py-3 overflow-hidden text-lg font-medium text-white transition-all duration-500 rounded-full group hover:text-white bg-gradient-to-r from-purple-700 to-pink-700">
            <span className="absolute inset-0 w-full h-full transition-transform duration-500 transform -translate-x-full bg-pink-800 group-hover:translate-x-0 z-0 rounded-full"></span>

            <span className="relative z-10">Encontrar Evento</span>

            <svg
              className="w-8 h-8 relative z-10 transform rotate-45 group-hover:rotate-90 transition-all duration-300 ease-linear p-2 rounded-full border border-gray-700 group-hover:border-none group-hover:bg-gray-100"
              viewBox="0 0 16 19"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                className="fill-gray-100 group-hover:fill-gray-900"
              />
            </svg>
          </button>

          <button className="overflow-hidden relative w-full py-2 px-4  sm:w-auto text-white border-none rounded-md text-lg font-bold cursor-pointer z-10 group">
            Cómo Funciona
            <span className="absolute w-full h-32 -top-8 -left-2 bg-pink-200 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-right"></span>
            <span className="absolute w-full h-32 -top-8 -left-2 bg-pink-300 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-right"></span>
            <span className="absolute w-full h-32 -top-8 -left-2 bg-sky-500 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-right"></span>
            <span className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-6 z-10">
              Click Aqui!
            </span>
          </button>
        </div>

        <div className="mx-auto pt-5 w-full flex items-center justify-center rounded-2xl bg-gray-400/10 backdrop-blur-sm p-6 text-white/60 text-sm">
          <div className="flex items-center gap-6 md:gap-10">
            <div className="flex items-center gap-2">
              <i className="text-xl text-white/80">👨‍💻</i>
              <span className="text-white">
                <AnimatedCounter to={10000} />+ Programadores
              </span>
            </div>
            <div className="flex items-center gap-2">
              <i className="text-xl text-yellow-400">🏆</i>
              <span className="text-yellow-300">
                <AnimatedCounter to={500} />+ Eventos
              </span>
            </div>
            <div className="flex items-center gap-2">
              <i className="text-xl text-yellow-300">⭐</i>
              <span className="text-yellow-200">
                <AnimatedCounter to={98} />% Satisfacción
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
