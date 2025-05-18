import { Zap } from "lucide-react";
import HexagonGrid from "../ui/animations/hexagon-grid";
import FloatingIcons from "../ui/animations/floating-icons";

export function ContenHero() {
  return (
    <>
      <section className="section-vertical items-center justify-center relative">
        <HexagonGrid />
        <div className="container relative z-10 mx-auto px-4 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 pr-4">
              ¿Listo para comenzar
            </span>
            tu aventura?
          </h2>
          <p className="text-2xl text-white/80 max-w-2xl mx-auto">
            Únete a miles de programadores que ya han encontrado su equipo
            perfecto para
            <span className="text-cyan-400 font-semibold"> hackathons</span>,
            <span className="text-purple-400 font-semibold"> codeathons </span>y
            desafíos de programación.
          </p>
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="flex flex-row w-full sm:w-auto rounded bg-gradient-to-r from-pink-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-bold py-4 px-6 text-lg shadow-2xl transform transition-all duration-300 hover:shadow-cyan-500/50">
              Comenzar Aventura <Zap className="ml-3 h-6 w-6" />
            </button>
          </div>
        </div>
        <FloatingIcons />
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black via-[#0b0b0b] to-transparent z-10 pointer-events-none"></div>
      </section>
    </>
  );
}
