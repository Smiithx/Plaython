"use client";
import {
  Users,
  CheckCircle,
  Gamepad2,
  ArrowRight,
  ChevronRight,
  Trophy,
  Star,
  Zap,
  Search,
} from "lucide-react";
import { useEffect, useState } from "react";

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const [animatedText, setAnimatedText] = useState("");
  const fullText =
    "Encuentra tu equipo perfecto para el próximo desafío de programación.";
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setAnimatedText((prev) => prev + fullText[index]);
        setIndex(index + 1);
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, [index]);

  if (!mounted) return null;
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-20">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 800">
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
            <rect x="0" y="0" width="100%" height="100%" fill="url(#grid)" />
            <circle cx="400" cy="400" r="300" fill="url(#glowGradient)" />
          </svg>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#107C10]/20 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 text-center space-y-10">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold max-w-3xl mx-auto leading-tight">
              Conectando{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#107C10] to-[#52B043]">
                Programadores
              </span>{" "}
              para Desafíos Extraordinarios
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto min-h-[4rem]">
              {animatedText}
              <span className="animate-pulse">|</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="flex flex-row w-full sm:w-auto py-2 px-4 rounded text-lg bg-[#107C10] hover:bg-[#0B5D0B] shadow-[0_0_15px_rgba(16,124,16,0.5)]">
              Encontrar Evento <ArrowRight className="ml-2 h-5 w-5 mt-1" />
            </button>
            <button
              // variant="outline"
              className="w-full sm:w-auto py-2 px-4 rounded text-lg border-[#2D2D2D] hover:bg-[#1E1E1E] hover:border-[#107C10]"
            >
              Cómo Funciona
            </button>
          </div>

          <div className="pt-10 flex items-center justify-center text-white/60 text-sm">
            <div className="flex items-center gap-6 md:gap-10">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-[#107C10]" />
                <span>10,000+ Programadores</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-[#107C10]" />
                <span>500+ Eventos</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-[#107C10]" />
                <span>98% Satisfacción</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-[#1E1E1E]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="relative">
                Características Principales
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#107C10] to-[#52B043]"></span>
              </span>
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Nuestra plataforma combina tecnología avanzada con un enfoque en
              la experiencia del programador
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-[#141414] backdrop-blur border border-[#2D2D2D] rounded-xl p-6 shadow-lg hover:shadow-[#107C10]/5 transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-[#107C10] flex items-center justify-center mb-6">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">
                Matchmaking Inteligente
              </h3>
              <p className="text-white/70">
                Algoritmo que analiza habilidades, experiencia y personalidad
                para formar equipos perfectamente equilibrados.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#141414] backdrop-blur border border-[#2D2D2D] rounded-xl p-6 shadow-lg hover:shadow-[#107C10]/5 transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-[#107C10] flex items-center justify-center mb-6">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Formación de Equipos</h3>
              <p className="text-white/70">
                Conecta profesionales de distintas especialidades asegurando que
                cada equipo tenga todas las habilidades necesarias.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#141414] backdrop-blur border border-[#2D2D2D] rounded-xl p-6 shadow-lg hover:shadow-[#107C10]/5 transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-[#107C10] flex items-center justify-center mb-6">
                <Trophy className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Eventos Exclusivos</h3>
              <p className="text-white/70">
                Accede a hackathons, codeathons y desafíos exclusivos con
                empresas líderes del sector tecnológico.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-[#141414] backdrop-blur border border-[#2D2D2D] rounded-xl p-6 shadow-lg hover:shadow-[#107C10]/5 transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-[#107C10] flex items-center justify-center mb-6">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">
                Sistema de Gamificación
              </h3>
              <p className="text-white/70">
                Gana XP, sube de nivel y desbloquea logros mientras participas
                en eventos y colaboras con otros programadores.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-[#141414] backdrop-blur border border-[#2D2D2D] rounded-xl p-6 shadow-lg hover:shadow-[#107C10]/5 transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-[#107C10] flex items-center justify-center mb-6">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Búsqueda Avanzada</h3>
              <p className="text-white/70">
                Encuentra eventos y programadores que se ajusten a tus
                intereses, habilidades y disponibilidad.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-[#141414] backdrop-blur border border-[#2D2D2D] rounded-xl p-6 shadow-lg hover:shadow-[#107C10]/5 transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-[#107C10] flex items-center justify-center mb-6">
                <Gamepad2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Interfaz Tipo Consola</h3>
              <p className="text-white/70">
                Disfruta de una experiencia de usuario única inspirada en las
                interfaces de videojuegos.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0F0F0F]">
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
                usabilidad de los mejores videojuegos. Hemos combinado lo mejor
                de ambos mundos para crear una experiencia única.
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
                      Visualiza tus estadísticas, logros y próximos eventos en
                      un panel inspirado en interfaces de videojuegos.
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
                      Gana puntos de experiencia por cada desafío completado y
                      sube de nivel como programador.
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
                      Desbloquea insignias y reconocimientos especiales por tus
                      contribuciones y victorias.
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

      {/* Call to Action */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0F0F0F] to-[#1E1E1E]"></div>
        <div className="absolute inset-0 -z-10 opacity-30">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 800">
            <defs>
              <pattern
                id="small-grid"
                width="30"
                height="30"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 30 0 L 0 0 0 30"
                  fill="none"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#small-grid)"
            />
          </svg>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#107C10]/30 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold">
            ¿Listo para comenzar tu aventura?
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Únete a miles de programadores que ya han encontrado su equipo
            perfecto para hackathons, codeathons y desafíos de programación.
          </p>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="flex flex-row w-full sm:w-auto py-2 px-4 rounded text-lg bg-[#107C10] hover:bg-[#0B5D0B] shadow-[0_0_15px_rgba(16,124,16,0.5)]">
              Comenzar Aventura <ArrowRight className="ml-2 h-5 w-5 mt-1" />
            </button>
            <button
              //  size="lg"
              // variant="outline"
              className="w-full sm:w-auto py-2 px-4 text-lg border-[#2D2D2D] hover:bg-[#1E1E1E] hover:border-[#107C10]"
            >
              Ver Demo
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Hero;
