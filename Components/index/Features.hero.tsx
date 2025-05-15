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

//
export default function FeaturesSection() {
  return (
    <section id="features" className="section-horizontal pt-16">
      <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black via-[#0b0b0b] to-transparent z-10 pointer-events-none"></div>
      {/* <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black via-[#0b0b0b] to-transparent z-10 pointer-events-none"></div> */}
      {/* <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" /> */}

      <HexagonGrid />
      <div className="horizontal-inner space-x-4 gap-3 pt-16">
        <div className="relative panel items-center justify-center text-center px-4">
          {/* Fondo difuminado detrás del texto */}
          <div className="absolute inset-x-0 top-1/4 h-64 bg-black/60 blur-lg rounded-xl z-0 mx-auto max-w-5xl"></div>

          <div className="relative z-10">
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

        {features.map((feature, i) => (
          <motion.div
            key={i}
            className="panel"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            {/* Ícono con glow */}
            <div className="relative flex items-center justify-center mb-6">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 blur-md opacity-60 animate-pulse" />
              <div className="h-12 w-12 z-10 rounded-lg bg-[#4C1D95] flex items-center justify-center text-white shadow-md">
                {feature.icon}
              </div>
            </div>

            {/* Título */}
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3 drop-shadow">
              {feature.title}
            </h3>

            {/* Descripción */}
            <p className="text-white/80 leading-relaxed tracking-wide drop-shadow-sm">
              {feature.desc}
            </p>
          </motion.div>
        ))}
      </div>
      <FloatingIcons />
    </section>
  );
}
{
  /* <div>
        <div className="absolute inset-0 opacity-30 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-transparent"></div>
      </div> */
}
//  <div className="panel items-center justify-center text-center">
//           <h2 className="text-4xl md:text-6xl font-bold mb-9">
//             <span className="relative">
//               Características Principales
//               <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 blur-xl opacity-50 -z-10 rounded-full"></div>
//               {/* <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#107C10] to-[#52B043]"></span> */}
//             </span>
//           </h2>
//           <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto">
//             Nuestra plataforma combina tecnología avanzada con un enfoque en la
//             experiencia del programador
//           </p>
//         </div>
