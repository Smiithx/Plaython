"use client";
import { useEffect, useState } from "react";
import ChallengeCard from "./ChallengeCard";

// Datos locales de ejemplo
const LOCAL_CHALLENGES: Challenge[] = [
  {
    id: "1",
    title: "FizzBuzz Clásico",
    description: "Escribe una función que imprima números del 1 al 100...",
    difficulty: "easy",
    tags: ["JavaScript", "Python", "Lógica"],
    estimatedTime: "PT15M",
    teamSize: 1,
    startDate: "2025-03-01T00:00:00Z",
    endDate: "2025-03-15T00:00:00Z",
    status: "ongoing"
  },
  {
    id: "2",
    title: "Invertir Cadena",
    description: "Crea una función que invierta una cadena de texto sin usar reverse()...",
    difficulty: "easy",
    tags: ["JavaScript", "Strings"],
    estimatedTime: "PT20M",
    teamSize: 1,
    startDate: "2025-03-10T00:00:00Z",
    endDate: "2025-03-20T00:00:00Z",
    status: "ongoing"
  },
  {
    id: "3",
    title: "Validar Palíndromo",
    description: "Escribe una función que determine si una cadena es un palíndromo ignorando mayúsculas, espacios y signos de puntuación.",
    difficulty: "mid",
    tags: ["JavaScript", "Regex", "Strings"],
    estimatedTime: "PT30M",
    teamSize: 2,
    startDate: "2025-04-01T00:00:00Z",
    endDate: "2025-04-15T00:00:00Z",
    status: "next"
  },
  {
    id: "7",
    title: "Desarrolla una API RESTful",
    description: "Crea una API REST usando Express.js o FastAPI que permita gestionar usuarios, autenticación JWT y roles.",
    difficulty: "mid",
    tags: ["Node.js", "Express", "Python", "Seguridad"],
    estimatedTime: "PT2H",
    teamSize: 2,
    startDate: "2025-04-01T00:00:00Z",
    endDate: "2025-04-15T00:00:00Z",
    status: "ongoing"
  },
  {
    id: "8",
    title: "Juego Snake en la terminal",
    description: "Implementa el clásico juego Snake en la terminal usando Python.",
    difficulty: "easy",
    tags: ["Python", "Terminal", "Lógica"],
    estimatedTime: "PT3H",
    teamSize: 1,
    startDate: "2025-03-15T00:00:00Z",
    endDate: "2025-03-30T00:00:00Z",
    status: "finished"
  },
  {
    id: "9",
    title: "Plataforma de hackatones online",
    description: "Crea una web donde se organicen hackatones online. Incluye registro de equipos, calendario, chat y sistema de votación.",
    difficulty: "expert",
    tags: ["Next.js", "Firebase", "WebSockets", "UI/UX"],
    estimatedTime: "PT10H",
    teamSize: 5,
    startDate: "2025-05-01T00:00:00Z",
    endDate: "2025-06-01T00:00:00Z",
    status: "next"
  }
];

export default function ChallengeShowcase() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    difficulty: "all" as "all" | "easy" | "mid" | "hard" | "expert",
    tags: [] as string[],
  });

  // Aplicar filtros
  useEffect(() => {
    const filtered = LOCAL_CHALLENGES.filter((challenge) => {
      const titleMatch = challenge.title
        .toLowerCase()
        .includes(filters.search.toLowerCase());
      const difficultyMatch =
        filters.difficulty === "all" ||
        challenge.difficulty === filters.difficulty;
      const tagsMatch =
        filters.tags.length === 0 ||
        filters.tags.every((tag) => challenge.tags.includes(tag));

      return titleMatch && difficultyMatch && tagsMatch;
    });

    const timer = setTimeout(() => {
      setChallenges(filtered);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [filters]);

  // Dividir retos por estado
  const challengesByStatus = {
    ongoing: challenges.filter(c => c.status === "ongoing"),
    next: challenges.filter(c => c.status === "next"),
    finished: challenges.filter(c => c.status === "finished")
  };

  const renderSection = (
    status: "ongoing" | "next" | "finished",
    title: string,
    bgColor: string
  ) => {
    const items = challengesByStatus[status];
    if (items.length === 0) return null;

    return (
      <section key={status} className="mb-10">
        <h3 className={`text-2xl font-extrabold mb-6 ${bgColor}`}>
          {title}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((challenge) => (
            <div key={challenge.id} className="h-full">
              <ChallengeCard challenge={challenge} />
            </div>
          ))}
        </div>
      </section>
    );
  };

  return (
    <main className="bg-gray-900 min-h-screen text-white py-10 px-4">
      {/* Filtros */}
      <section className="sticky top-0 z-10 bg-gray-900 p-4 rounded-lg shadow-lg backdrop-blur-md border border-gray-700 mb-8">
        <div className="max-w-5xl mx-auto">
          {/* Barra de búsqueda */}
          <div className="relative w-full max-w-3xl mx-auto mb-4">
            <input
              type="text"
              placeholder="Buscar reto..."
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
              className="w-full pl-10 pr-4 py-3 border border-gray-600 rounded-lg shadow-inner bg-gray-800 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute left-3 top-3.5 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Filtros: dificultad + lenguajes */}
          <div className="flex flex-wrap justify-center gap-2">
            {["all", "easy", "mid", "hard", "expert"].map((level) => (
              <button
                key={level}
                onClick={() =>
                  setFilters({
                    ...filters,
                    difficulty: level as any,
                  })
                }
                className={`px-4 py-1 text-sm rounded-full capitalize font-semibold ${
                  filters.difficulty === level
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {level === "all"
                  ? "Todos"
                  : level === "easy"
                  ? "Fácil"
                  : level === "mid"
                  ? "Medio"
                  : level === "hard"
                  ? "Difícil"
                  : "Experto"}
              </button>
            ))}

            {["JavaScript", "Python", "TypeScript", "Java", "C++"].map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  if (filters.tags.includes(tag)) {
                    setFilters({
                      ...filters,
                      tags: filters.tags.filter((t) => t !== tag),
                    });
                  } else {
                    setFilters({
                      ...filters,
                      tags: [...filters.tags, tag],
                    });
                  }
                }}
                className={`px-4 py-1 text-sm rounded-full font-semibold ${
                  filters.tags.includes(tag)
                    ? "bg-purple-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Secciones organizadas por estado */}
      <div className="container max-w-6xl mx-auto px-4">
        {renderSection("ongoing", "Retos en curso", "text-blue-400")}
        {renderSection("next", "Próximos retos", "text-yellow-400")}
        {renderSection("finished", "Retos finalizados", "text-green-400")}

        {/* Estado vacío */}
        {challenges.length === 0 && !loading && (
          <div className="text-center py-16 bg-gray-800 rounded-xl border border-dashed border-gray-600">
            <p className="text-gray-400 text-lg">No hay retos con esos filtros.</p>
            <button
              onClick={() =>
                setFilters({
                  search: "",
                  difficulty: "all",
                  tags: [],
                })
              }
              className="mt-4 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Restablecer filtros
            </button>
          </div>
        )}
      </div>
    </main>
  );
}