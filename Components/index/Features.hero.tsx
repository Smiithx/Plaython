"use client";

import { motion } from "framer-motion";
import { Zap, Users, Trophy, Search } from "lucide-react";
import HexagonGrid from "../ui/animations/hexagon-grid";
import FloatingIcons from "../ui/animations/floating-icons";
const features = [
  {
    title: "Matchmaking Inteligente",
    icon: <Zap className="h-6 w-6" />,
    desc: "Algoritmo que analiza habilidades, experiencia y personalidad para formar equipos perfectamente equilibrados.",
  },
  {
    title: "Búsqueda Avanzada",
    icon: <Search className="h-6 w-6" />,
    desc: "Encuentra eventos y programadores que se ajusten a tus intereses, habilidades y disponibilidad.",
  },
  {
    title: "Formación de Equipos",
    icon: <Users className="h-6 w-6" />,
    desc: "Conecta profesionales de distintas especialidades asegurando que cada equipo tenga todas las habilidades necesarias.",
  },
  {
    title: "Eventos Exclusivos",
    icon: <Trophy className="h-6 w-6" />,
    desc: "Accede a hackathons, codeathons y desafíos exclusivos con empresas líderes del sector tecnológico.",
  },
];
export default function FeaturesSection() {
  return (
    <section id="features" className="section-horizontal pt-16">
      <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black via-[#0b0b0b] to-transparent z-10 pointer-events-none"></div>
      <HexagonGrid />
      <div className="horizontal-inner space-x-4 gap-3">
        <div className="relative panel items-center justify-center text-center px-4 pt-16">
          {/* Fondo difuminado detrás del texto */}
          <div className="absolute inset-x-0 top-1/4 h-64 bg-black/60 blur-lg rounded-xl z-0 mx-auto max-w-5xl"></div>

          <div className="relative z-10 pt-32">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Características{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                Principales
              </span>
            </h2>
            <p className="text-2xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed tracking-wide">
              Nuestra plataforma combina{" "}
              <span className="text-cyan-400 font-semibold">
                tecnología avanzada
              </span>{" "}
              con un enfoque en la{" "}
              <span className="text-purple-400 font-semibold">
                experiencia del programador
              </span>
              .
            </p>
          </div>
        </div>

        <motion.div
          className="panel grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 p-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {features.map((feature, i) => (
            <div
              key={i}
              className="flex h-[100%] w-[50%] flex-col items-center p-4 bg-white/5 rounded-lg border border-white/10"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center mb-3 animate-pulse">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-1 drop-shadow">
                {feature.title}
              </h3>
              <p className="text-white/70 text-sm text-center drop-shadow-sm">
                {feature.desc}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
      <FloatingIcons />
    </section>
  );
}
