import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  challenge: Challenge;
}

export default function ChallengeCard({ challenge }: Props) {
  const router = useRouter();

  // Traducción de dificultad a español
  const difficultyLabels = {
    easy: "Fácil",
    mid: "Medio",
    hard: "Difícil",
    expert: "Experto",
  };

  // Estados técnicos a español
  const statusLabels = {
    finished: "Finalizado",
    ongoing: "En curso",
    next: "Próximo",
  };

  // Colores por estado
  const statusColors = {
    finished: "bg-gray-700 text-gray-300 border-gray-500",
    ongoing: "bg-green-900/50 text-green-400 border-green-500",
    next: "bg-purple-900/50 text-purple-300 border-purple-500",
  };

  // Degradados por estado para el banner superior
  const statusGradient = {
    finished: "bg-gradient-to-r from-gray-600 to-gray-400",
    ongoing:
      "bg-gradient-to-r from-green-500 via-teal-400 to-blue-500 animate-pulse",
    next: "bg-gradient-to-r from-purple-600 via-pink-500 to-red-500",
  };

  // Colores por nivel de dificultad
  const difficultyStyles = {
    easy: "text-green-400 border-green-500 bg-green-500/10",
    mid: "text-yellow-400 border-yellow-500 bg-yellow-500/10",
    hard: "text-orange-400 border-orange-500 bg-orange-500/10",
    expert: "text-red-400 border-red-500 bg-red-500/10",
  };

  return (
    <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-gray-700 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/30 group h-full flex flex-col">
      {/* Banner superior con gradiente */}
      <div className={`h-1 ${statusGradient[challenge.status]}`}></div>

      {/* Efecto neón al hacer hover */}
      <div
        className={`absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300 ${
          challenge.status === "ongoing"
            ? "ring-2 ring-green-500/60"
            : challenge.status === "next"
            ? "ring-2 ring-purple-500/60"
            : "ring-2 ring-gray-500/60"
        }`}
      ></div>

      {/* Contenido principal */}
      <div className="p-6 flex flex-col h-full z-10">
        {/* Estado */}
        <span
          className={`inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-full mb-4 self-start ${
            statusColors[challenge.status]
          } backdrop-blur-sm drop-shadow-md group-hover:scale-105 transition-transform duration-300`}
        >
          {statusLabels[challenge.status]}
        </span>

        {/* Título */}
        <h3 className="text-xl font-extrabold text-white mb-3 line-clamp-1 group-hover:text-blue-300 transition-colors duration-300">
          {challenge.title}
        </h3>

        {/* Descripción */}
        <p className="text-base text-gray-300 mb-5 flex-grow line-clamp-3 group-hover:text-gray-100 group-hover:font-medium">
          {challenge.description}
        </p>

        {/* Dificultad + Equipo */}
        <div className="flex justify-between items-center mb-5 text-sm text-gray-400">
          <span
            className={`px-3 py-1 rounded-full ${
              difficultyStyles[challenge.difficulty]
            } inline-block`}
          >
            {difficultyLabels[challenge.difficulty]}
          </span>
          <span className="text-gray-500">
            Equipo:{" "}
            <strong>
              {challenge.teamSize || 1} persona
              {challenge.teamSize !== 1 ? "s" : ""}
            </strong>
          </span>
        </div>

        {/* Tags con brillo dinámico */}
        <div className="flex flex-wrap gap-2 mb-6">
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

        {/* Fechas */}
        <div className="text-sm text-gray-500 mt-auto mb-6 opacity-70 group-hover:opacity-90 transition-opacity">
          {challenge.startDate
            ? new Date(challenge.startDate).toLocaleDateString()
            : "Fecha no disponible"}{" "}
          -{" "}
          {challenge.endDate
            ? new Date(challenge.endDate).toLocaleDateString()
            : "Abierto"}
        </div>

        {/* Botón con efecto glitch */}
        <button
          onClick={() => router.push(`/challenge/${challenge.id}`)}
          className="relative w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-[1.02] hover:from-purple-700 hover:to-pink-700 overflow-hidden group"
        >
          <span className="relative z-10">Ver reto</span>
          <span className="absolute inset-0 bg-[linear-gradient(45deg,var(--tw-gradient-stops))] from-cyan-400 via-pink-500 to-yellow-500 opacity-0 group-hover:opacity-10 blur-sm scale-110 transition-opacity duration-300"></span>
        </button>
      </div>
    </div>
  );
}

// Skeleton UI para carga
ChallengeCard.Skeleton = function Skeleton() {
  return (
    <div className="bg-gray-900 rounded-xl shadow-md border border-gray-700 overflow-hidden h-full flex flex-col">
      {/* Banner shimmer */}
      <div className="h-1 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500"></div>
      <div className="p-6 space-y-5 animate-shimmer">
        <div className="h-6 bg-gray-800 rounded w-4/5"></div>
        <div className="h-5 bg-gray-800 rounded w-full"></div>
        <div className="h-5 bg-gray-800 rounded w-4/5"></div>
        <div className="h-4 bg-gray-800 rounded w-2/5"></div>
        <div className="h-4 bg-gray-800 rounded w-1/3"></div>
        <div className="h-12 bg-gray-800 rounded mt-1"></div>
      </div>
    </div>
  );
};
