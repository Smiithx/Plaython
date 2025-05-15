import { ArrowRight, Zap } from "lucide-react";
import HexagonGrid from "../ui/animations/hexagon-grid";
import FloatingIcons from "../ui/animations/floating-icons";

// h-screen w-screen flex flex-col
export function ContenHero() {
  return (
    <>
      <section className="section-vertical items-center justify-center relative">
        {/* <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-[#011d62b9] z-10 pointer-events-none" /> */}
        <HexagonGrid />
        <div className="container relative z-10 mx-auto px-4 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
              ¿Listo para comenzar
            </span>
            tu aventura?
          </h2>
          <p className="text-2xl text-white/80 max-w-2xl mx-auto">
            Únete a miles de programadores que ya han encontrado su equipo
            perfecto para
            <span className="text-cyan-400 font-semibold">hackathons</span>,
            <span className="text-purple-400 font-semibold">codeathons</span>y
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

{
  /* <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0F0F0F] to-[#1E1E1E]"></div> */
}
{
  /* <div>
        <div className="absolute inset-0 -z-10 opacity-30 mix-blend-overlay"></div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0c0c0c] to-transparent"></div>
      </div> */
}
{
  /* <div className="inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" /> */
}

{
  /* <div
        style={{
          backgroundColor: "#080707",
          background: "linear-gradient(black 80%, transparent)",
        }}
        className="h-16 opacity-70 inset-x-0 z-10"
      ></div> */
}
{
  /* <div className="absolute inset-0  bg-gradient-to-t from-black to-[#0F0F0F] z-0 pointer-events-none" /> */
}
{
  /* <div className="h-16  inset-0 -z-10  bg-gradient-to-t  from-black to-[#011d62b9]"></div> */
}
{
  /* <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-[#0F0F0F] z-10 pointer-events-none" /> */
}
{
  /* <div className="absolute inset-x-0 h-16 bg-gradient-to-t from-black via-[#0b0b0b] to-transparent z-10 pointer-events-none" /> */
}

{
  /* <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0F0F0F] to-[#1E1E1E]"></div> */
}
{
  /* <div className="absolute inset-0 -z-10 opacity-30">
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
      </div> */
}
{
  /* <button className="flex flex-row w-full sm:w-auto py-2 px-4 rounded text-lg bg-[#107C10] hover:bg-[#0B5D0B] shadow-[0_0_15px_rgba(16,124,16,0.5)]">
              Comenzar Aventura <ArrowRight className="ml-2 h-5 w-5 mt-1" />
            </button> */
}
