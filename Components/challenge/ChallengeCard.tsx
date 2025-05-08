import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  challenge: Challenge;
}

export default function ChallengeCard({ challenge }: Props) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Banner superior con gradiente */}
      <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

      <div className="p-4 flex flex-col h-full">
        {/* Título */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
          {challenge.title}
        </h3>

        {/* Descripción */}
        <p className="text-sm text-gray-600 mb-4 flex-grow line-clamp-2">
          {challenge.description}
        </p>

        {/* Dificultad */}
        <div className="mb-3">
          <span
            className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${
              challenge.difficulty === "Fácil"
                ? "bg-green-100 text-green-800"
                : challenge.difficulty === "Medio"
                ? "bg-yellow-100 text-yellow-800"
                : challenge.difficulty === "Difícil"
                ? "bg-orange-100 text-orange-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {challenge.difficulty}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {challenge.tags.map((tag, i) => (
            <span
              key={i}
              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full hover:bg-gray-200 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Botón */}
        <button
          onClick={() => router.push(`/challenge/${challenge.id}`)}
          className="mt-auto w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Ver reto
        </button>
      </div>
    </div>
  );
}
