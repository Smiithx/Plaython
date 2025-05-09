import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  challenge: Challenge;
}

export default function ChallengeCard({ challenge }: Props) {
  const router = useRouter();

  // Mapeo de estados técnicos a nombres en español
  const statusLabels: Record<Challenge["status"], string> = {
    finished: "Finalizado",
    ongoing: "En curso",
    next: "Próximamente",
  };

  // Colores por estado
  const statusColors = {
    finished: "bg-gray-700 text-gray-300 border border-gray-500",
    ongoing: "bg-green-900/50 text-green-400 border border-green-500",
    next: "bg-purple-900/50 text-purple-300 border border-purple-500",
  };

  return (
    <div className="bg-gray-900 rounded-xl shadow-md overflow-hidden border border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-1 h-full flex flex-col justify-between">
      {/* Banner superior */}
      <div
        className={`h-2 ${
          challenge.status === "finished"
            ? "from-gray-600 to-gray-500 bg-gradient-to-r"
            : challenge.status === "ongoing"
            ? "from-green-500 to-blue-500 bg-gradient-to-r"
            : "from-purple-600 via-pink-500 to-red-500 bg-gradient-to-r"
        }`}
      ></div>

      <div className="p-5 flex-grow flex flex-col">
        {/* Estado */}
        <span
          className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full mb-2 self-start ${statusColors[challenge.status]}`}
        >
          {statusLabels[challenge.status]}
        </span>

        {/* Título */}
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-blue-400 transition-colors">
          {challenge.title}
        </h3>

        {/* Descripción */}
        <p className="text-sm text-gray-300 mb-4 flex-grow line-clamp-2">
          {challenge.description}
        </p>

        {/* Dificultad + Equipo */}
        <div className="flex justify-between mb-3 text-xs text-gray-400">
          <span>
            Dificultad:{" "}
            <strong>
              {challenge.difficulty === "easy"
                ? "Fácil"
                : challenge.difficulty === "mid"
                ? "Medio"
                : challenge.difficulty === "hard"
                ? "Difícil"
                : "Experto"}
            </strong>
          </span>
          <span>
            Equipo: <strong>{challenge.teamSize || 1} persona{challenge.teamSize !== 1 ? "s" : ""}</strong>
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {challenge.tags.map((tag, i) => (
            <span
              key={i}
              className="text-xs bg-indigo-800 text-indigo-200 px-2 py-1 rounded-full hover:bg-indigo-700 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Fechas */}
        <div className="text-xs text-gray-500 mt-auto mb-4">
          {challenge.startDate && new Date(challenge.startDate).toLocaleDateString()} -{" "}
          {challenge.endDate ? new Date(challenge.endDate).toLocaleDateString() : "Abierto"}
        </div>

        {/* Botón */}
        <button
          onClick={() => router.push(`/challenge/${challenge.id}`)}
          className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-sm font-semibold rounded-lg transition-transform duration-300 hover:scale-105 focus:outline-none"
        >
          Ver reto
        </button>
      </div>
    </div>
  );
}

// Versión Skeleton para carga
ChallengeCard.Skeleton = function Skeleton() {
  return (
    <div className="bg-gray-900 rounded-xl shadow-md border border-gray-700 animate-pulse h-full flex flex-col justify-between">
      <div className="h-16 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500"></div>
      <div className="p-5 space-y-3">
        <div className="h-5 bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        <div className="h-4 bg-gray-700 rounded w-1/4"></div>
        <div className="h-4 bg-gray-700 rounded w-1/4"></div>
        <div className="h-10 bg-gray-700 rounded mt-2"></div>
      </div>
    </div>
  );
};