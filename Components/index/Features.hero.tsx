"use client";

import { motion } from "framer-motion";
import {
  Zap,
  Users,
  Trophy,
  CheckCircle,
  Search,
  Gamepad2,
} from "lucide-react";
const features = [
  {
    title: "Matchmaking Inteligente",
    icon: <Zap className="h-6 w-6" />,
    desc: "Algoritmo que analiza habilidades, experiencia y personalidad para formar equipos perfectamente equilibrados.",
  },
  {
    title: "Formación de Equipos",
    icon: <Users className="h-6 w-6" />,
    desc: "Conecta profesionales de distintas especialidades asegurando que cada equipo tenga todas las habilidades necesarias.",
  },
  // {
  //   title: "Eventos Exclusivos",
  //   icon: <Trophy className="h-6 w-6" />,
  //   desc: "Accede a hackathons, codeathons y desafíos exclusivos con empresas líderes del sector tecnológico.",
  // },
  {
    title: "Sistema de Gamificación",
    icon: <CheckCircle className="h-6 w-6" />,
    desc: "Gana XP, sube de nivel y desbloquea logros mientras participas en eventos y colaboras con otros programadores.",
  },
  {
    title: "Búsqueda Avanzada",
    icon: <Search className="h-6 w-6" />,
    desc: "Encuentra eventos y programadores que se ajusten a tus intereses, habilidades y disponibilidad.",
  },
  // {
  //   title: "Interfaz Tipo Consola",
  //   icon: <Gamepad2 className="h-6 w-6" />,
  //   desc: "Disfruta de una experiencia de usuario única inspirada en las interfaces de videojuegos.",
  // },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="horizontal-section h-screen w-screen flex flex-col items-center justify-center relative"
    >
      <div className=" mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
        {/* <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="relative">
              Características Principales
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#107C10] to-[#52B043]"></span>
            </span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Nuestra plataforma combina tecnología avanzada con un enfoque en la
            experiencia del programador
          </p>
        </div> */}
        {features.map((feature, i) => (
          <motion.div
            key={i}
            className="snap-center min-w-[280px] sm:min-w-[390px] lg:min-w-[600px] bg-[#141414] border border-[#2D2D2D] rounded-xl p-6 shadow-lg hover:shadow-[#107C10]/5 transition-shadow"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="h-12 w-12 rounded-lg bg-[#107C10] flex items-center justify-center mb-6">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
            <p className="text-white/70">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
