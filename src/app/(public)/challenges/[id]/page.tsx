import { notFound } from "next/navigation";
import Link from "next/link";
import { getChallengeById } from "@/lib/services/challenges";

export default async function ChallengeDetail({
  params,
}: {
  params: { id: string };
}) {

  const { id } = await params

  const challenge = await getChallengeById(id);

  if (!challenge) {
    notFound();
  }

  // Estilos y traducciones
  const statusLabels = {
    finished: "Finalizado",
    ongoing: "En curso",
    next: "Próximo",
  };

  const difficultyLabels = {
    easy: "Fácil",
    mid: "Medio",
    hard: "Difícil",
    expert: "Experto",
  };

  const statusGradient = {
    finished: "bg-gradient-to-r from-gray-600 to-gray-400",
    ongoing:
      "bg-gradient-to-r from-green-500 via-teal-400 to-blue-500 animate-pulse",
    next: "bg-gradient-to-r from-purple-600 via-pink-500 to-red-500",
  };

  const difficultyStyles = {
    easy: "text-green-400 border-green-500 bg-green-500/10",
    mid: "text-yellow-400 border-yellow-500 bg-yellow-500/10",
    hard: "text-orange-400 border-orange-500 bg-orange-500/10",
    expert: "text-red-400 border-red-500 bg-red-500/10",
  };

  return (
    <main className="min-h-screen bg-black text-white py-12 px-4 overflow-hidden">
      {/* Fondo animado */}
      <div className="fixed inset-0 z-0 bg-grid-pattern opacity-[0.03]"></div>

      {/* Botón de retroceso */}
      <div className="max-w-6xl mx-auto relative z-10 mb-8">
        <Link
          href="/challenges"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 text-gray-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Volver a retos
        </Link>
      </div>

      {/* Contenedor principal */}
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-gray-700 transition-all duration-500">
          {/* Banner superior con gradiente */}
          <div className={`h-2 ${statusGradient[challenge.status]}`}></div>

          {/* Contenido */}
          <div className="p-8 md:p-10">
            {/* Estado */}
            <div className="flex justify-between items-start mb-6">
              <span
                className={`inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-full ${
                  challenge.status === "ongoing"
                    ? "bg-green-900/50 text-green-400 border-green-500"
                    : challenge.status === "next"
                    ? "bg-purple-900/50 text-purple-300 border-purple-500"
                    : "bg-gray-700 text-gray-300 border-gray-500"
                }`}
              >
                {statusLabels[challenge.status]}
              </span>

              <div className="text-sm text-gray-400">
                Equipo:{" "}
                <strong>
                  {challenge.teamSize} persona
                  {challenge.teamSize !== 1 ? "s" : ""}
                </strong>
              </div>
            </div>

            {/* Título */}
            <h1 className="text-4xl font-extrabold text-white mb-6 line-clamp-1">
              {challenge.title}
            </h1>

            {/* Descripción */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-300 mb-3">
                Descripción
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                {challenge.description}
              </p>
            </div>

            {/* Detalles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h2 className="text-xl font-semibold text-gray-300 mb-3">
                  Detalles técnicos
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 w-24">Dificultad:</span>
                    <span
                      className={`px-3 py-1 rounded-full ${
                        difficultyStyles[challenge.difficulty]
                      }`}
                    >
                      {difficultyLabels[challenge.difficulty]}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 w-24">Fecha inicio:</span>
                    <span className="text-white">
                      {challenge.startDate
                        ? new Date(challenge.startDate).toLocaleDateString()
                        : "Fecha no disponible"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 w-24">Fecha fin:</span>
                    <span className="text-white">
                      {challenge.endDate
                        ? new Date(challenge.endDate).toLocaleDateString()
                        : "Abierto"}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-300 mb-3">
                  Tecnologías
                </h2>
                <div className="flex flex-wrap gap-2">
                  {challenge.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="relative inline-block px-3 py-1.5 rounded-full text-sm font-medium bg-indigo-900/60 text-indigo-200 overflow-hidden group-hover:bg-indigo-700 transition-all duration-300"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 animate-shine"></span>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Nueva sección de inscripción */}
            <div className="mt-12 pt-6 border-t border-gray-800">
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button className="relative py-3 px-6 bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-[1.02] hover:from-emerald-700 hover:to-teal-600 overflow-hidden group">
                  <span className="relative z-10">Inscribirse</span>
                  <span className="absolute inset-0 bg-[linear-gradient(45deg,var(--tw-gradient-stops))] from-cyan-400 via-pink-500 to-yellow-500 opacity-0 group-hover:opacity-10 blur-sm scale-110 transition-opacity duration-300"></span>
                </button>

                {(challenge.teamSize ?? 1) > 1 && (
                  <button className="relative py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-[1.02] hover:from-purple-700 hover:to-pink-700 overflow-hidden group">
                    <span className="relative z-10">
                      Emparejamiento automático
                    </span>
                    <span className="absolute inset-0 bg-[linear-gradient(45deg,var(--tw-gradient-stops))] from-cyan-400 via-pink-500 to-yellow-500 opacity-0 group-hover:opacity-10 blur-sm scale-110 transition-opacity duration-300"></span>
                  </button>
                )}
              </div>

              {/* Sección de equipo */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-300 mb-4">
                  Equipo
                </h2>
                <div className="space-y-3">
                  {/* Miembro propio (siempre visible) */}
                  <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                      TU
                    </div>
                    <span className="font-medium">Tu nombre de usuario</span>
                  </div>

                  {/* Miembros adicionales (dinámico según teamSize) */}
                  {Array.from({ length: (challenge.teamSize || 1) - 1 }).map(
                    (_, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg border border-gray-700 hover:border-dashed hover:border-purple-500 transition-all duration-300 group"
                      >
                        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 transition-colors">
                          <span className="text-xl font-bold">+</span>
                        </div>
                        <span className="text-gray-500 group-hover:text-gray-300 transition-colors">
                          Miembro {index + 2} (opcional)
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Nota informativa */}
              <div className="text-sm text-gray-500 bg-gray-800/30 p-4 rounded-lg border border-gray-700">
                <p>
                  Una vez inscrito, podrás gestionar tu equipo y acceder a los
                  recursos del reto.
                </p>
                <p className="mt-2">
                  Para equipos completos, se activará un chat privado y un
                  espacio de colaboración.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
