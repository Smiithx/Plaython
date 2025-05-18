import ParticleEffect from "@/ui/animations/paticle-events";
import StarField from "@/ui/animations/star-footer";
import { SignUpButton } from "@clerk/nextjs";
import { ArrowRight, Zap, PlayCircleIcon } from "lucide-react";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-black">
      <ParticleEffect />
      <StarField />
      <div className="container mx-auto px-4 py-16">
        <div className="relative text-center mb-12 z-10">
          <div className="relative z-10">
            <h1 className="p-2 text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 pr-4 bg-clip-text text-transparent">
              ¿ Cómo funciona
              <span className="pl-3 text1lh text-4xl md:text-5xl text-white">
                Plaython ?
              </span>
            </h1>
          </div>
          <p className="mt-4 text-lg text-white max-w-2xl mx-auto">
            Conectando talento, formando equipos equilibrados y impulsando
            eventos de codificación exitosos
          </p>
        </div>

        <div className="relative mb-16">
          <div className="aspect-video rounded-xl overflow-hidden shadow-xl">
            <div className="w-full h-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="animate-pulse mb-4">
                  <PlayCircleIcon className="w-16 h-16 mx-auto" />
                </div>
                <p className="text-xl font-medium">
                  Video de demostración de Plaython
                </p>
                <p className="text-sm opacity-80 mt-2">
                  Vea nuestra inteligencia de emparejamiento en acción
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#0b0b0b] p-8 rounded-xl shadow-lg border border-black mb-16">
          <h2 className="text-2xl font-bold text-center mb-8 text-white">
            El Proceso de Emparejamiento
          </h2>

          <div className="flex flex-col md:flex-row items-center justify-between max-w-4xl mx-auto">
            <div className="text-center mb-6 md:mb-0">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-purple-600">1</span>
              </div>
              <p className="font-bold text-white">Crear perfil</p>
            </div>

            <ArrowRight className="hidden md:block w-6 h-6 text-gray-400" />

            <div className="text-center mb-6 md:mb-0">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-indigo-600">2</span>
              </div>
              <p className="font-bold text-white">Unirse a eventos</p>
            </div>

            <ArrowRight className="hidden md:block w-6 h-6 text-gray-400" />

            <div className="text-center mb-6 md:mb-0">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-blue-600">3</span>
              </div>
              <p className="font-bold text-white">Consigue un Matched</p>
            </div>

            <ArrowRight className="hidden md:block w-6 h-6 text-gray-400" />

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-green-600">4</span>
              </div>
              <p className="font-bold text-white">Colaborar</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <SignUpButton>
            <button className="flex flex-row items-center bg-gradient-to-r from-pink-500 to-cyan-600 hover:from-blue-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-all">
              <Zap className="w-5 h-5 mr-2" />
              Prueba Plaython hoy
            </button>
          </SignUpButton>
        </div>
      </div>
    </div>
  );
}
