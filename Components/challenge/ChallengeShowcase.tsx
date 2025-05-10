"use client";
import { useState } from "react";
import ChallengeCard from "./ChallengeCard";

// Tipos e interfaces
interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: "easy" | "mid" | "hard" | "expert";
  tags: string[];
  teamSize: number;
  startDate: string;
  endDate: string;
  status: "ongoing" | "next" | "finished";
}

// Datos locales de ejemplo
const LOCAL_CHALLENGES: Challenge[] = [
  {
    id: "1",
    title: "FizzBuzz Clásico",
    description:
      "Escribe una función que imprima los números del 1 al 100. Para múltiplos de 3, imprime 'Fizz'; para múltiplos de 5, imprime 'Buzz'; y para múltiplos de ambos, 'FizzBuzz'. Ideal para principiantes.",
    difficulty: "easy",
    tags: ["JavaScript", "Python", "Lógica"],
    teamSize: 1,
    startDate: "2025-03-01T00:00:00Z",
    endDate: "2025-03-15T00:00:00Z",
    status: "ongoing",
  },
  {
    id: "2",
    title: "Invertir Cadena",
    description:
      "Crea una función que invierta una cadena de texto sin usar funciones nativas como reverse(). Puedes implementarlo en cualquier lenguaje de programación.",
    difficulty: "easy",
    tags: ["JavaScript", "Strings"],
    teamSize: 1,
    startDate: "2025-03-10T00:00:00Z",
    endDate: "2025-03-20T00:00:00Z",
    status: "ongoing",
  },
  {
    id: "3",
    title: "Validar Palíndromo",
    description:
      "Escribe una función que determine si una cadena es un palíndromo ignorando mayúsculas, espacios y signos de puntuación. Este ejercicio mejora el manejo avanzado de strings.",
    difficulty: "mid",
    tags: ["JavaScript", "Regex", "Strings"],
    teamSize: 2,
    startDate: "2025-04-01T00:00:00Z",
    endDate: "2025-04-15T00:00:00Z",
    status: "next",
  },
  {
    id: "4",
    title: "Calculadora Básica",
    description:
      "Desarrolla una calculadora básica con operaciones de suma, resta, multiplicación y división. Puedes hacerlo en terminal o interfaz gráfica.",
    difficulty: "easy",
    tags: ["Python", "Consola"],
    teamSize: 1,
    startDate: "2025-03-05T00:00:00Z",
    endDate: "2025-03-25T00:00:00Z",
    status: "ongoing",
  },
  {
    id: "5",
    title: "API RESTful con Express",
    description:
      "Crea una API REST usando Express.js que permita gestionar usuarios, autenticación JWT y roles. Ideal para desarrolladores intermedios en Node.js.",
    difficulty: "mid",
    tags: ["Node.js", "Express", "Seguridad"],
    teamSize: 2,
    startDate: "2025-04-01T00:00:00Z",
    endDate: "2025-04-15T00:00:00Z",
    status: "ongoing",
  },
  {
    id: "6",
    title: "Juego Snake en la Terminal",
    description:
      "Implementa el clásico juego Snake en la terminal usando Python. Usa librerías como `curses` para controlar la entrada y salida de datos.",
    difficulty: "easy",
    tags: ["Python", "Terminal", "Lógica"],
    teamSize: 1,
    startDate: "2025-03-15T00:00:00Z",
    endDate: "2025-03-30T00:00:00Z",
    status: "finished",
  },
  {
    id: "7",
    title: "Plataforma de Hackatones Online",
    description:
      "Crea una web donde se organicen hackatones online. Incluye registro de equipos, calendario, chat en tiempo real y sistema de votación. Ideal para un proyecto fullstack.",
    difficulty: "expert",
    tags: ["Next.js", "Firebase", "WebSockets", "UI/UX"],
    teamSize: 5,
    startDate: "2025-05-01T00:00:00Z",
    endDate: "2025-06-01T00:00:00Z",
    status: "next",
  },
  {
    id: "8",
    title: "Login con Autenticación Social",
    description:
      "Implementa un sistema de inicio de sesión utilizando OAuth con Google, GitHub o Facebook. Aprende a integrar APIs externas y manejar tokens JWT.",
    difficulty: "mid",
    tags: ["React", "OAuth", "Node.js", "Auth"],
    teamSize: 2,
    startDate: "2025-04-10T00:00:00Z",
    endDate: "2025-04-25T00:00:00Z",
    status: "ongoing",
  },
  {
    id: "9",
    title: "Conversor de Monedas",
    description:
      "Crea una aplicación que convierta entre distintas monedas usando una API pública como ExchangeRatesAPI. Ideal para aprender consumo de APIs.",
    difficulty: "easy",
    tags: ["JavaScript", "APIs", "Frontend"],
    teamSize: 1,
    startDate: "2025-03-20T00:00:00Z",
    endDate: "2025-04-05T00:00:00Z",
    status: "ongoing",
  },
  {
    id: "10",
    title: "Gestor de Tareas Multicapa",
    description:
      "Diseña una aplicación completa de gestión de tareas con frontend, backend y base de datos. Usa arquitectura limpia y patrones de diseño.",
    difficulty: "expert",
    tags: ["TypeScript", "React", "Node.js", "PostgreSQL"],
    teamSize: 4,
    startDate: "2025-05-10T00:00:00Z",
    endDate: "2025-06-10T00:00:00Z",
    status: "next",
  },
  {
    id: "11",
    title: "Chat en Tiempo Real",
    description:
      "Crea un chat web en tiempo real usando WebSockets. Permite conexión entre múltiples usuarios y mensajes persistentes.",
    difficulty: "mid",
    tags: ["Socket.IO", "Node.js", "Realtime"],
    teamSize: 2,
    startDate: "2025-04-15T00:00:00Z",
    endDate: "2025-05-01T00:00:00Z",
    status: "next",
  },
  {
    id: "12",
    title: "Generador de QR Dinámico",
    description:
      "Desarrolla una herramienta que genere códigos QR dinámicamente a partir de URLs o textos proporcionados por el usuario.",
    difficulty: "easy",
    tags: ["HTML", "Canvas", "JavaScript"],
    teamSize: 1,
    startDate: "2025-03-25T00:00:00Z",
    endDate: "2025-04-10T00:00:00Z",
    status: "ongoing",
  },
];

// Configuraciones globales
const difficultyLabels = {
  all: "Todos",
  easy: "Fácil",
  mid: "Medio",
  hard: "Difícil",
  expert: "Experto",
};

const tagColors = {
  JavaScript: "bg-yellow-500/20 text-yellow-400 border-yellow-500",
  TypeScript: "bg-blue-500/20 text-blue-400 border-blue-500",
  Python: "bg-green-500/20 text-green-400 border-green-500",
  Java: "bg-red-500/20 text-red-400 border-red-500",
  Cpp: "bg-purple-500/20 text-purple-400 border-purple-500",
  Go: "bg-teal-500/20 text-teal-400 border-teal-500",
  Rust: "bg-orange-500/20 text-orange-400 border-orange-500",
  CSharp: "bg-pink-500/20 text-pink-400 border-pink-500",
  Ruby: "bg-rose-500/20 text-rose-400 border-rose-500",
  PHP: "bg-indigo-500/20 text-indigo-400 border-indigo-500",
  Nodejs: "bg-emerald-500/20 text-emerald-400 border-emerald-500",
  React: "bg-sky-500/20 text-sky-400 border-sky-500",
  Nextjs: "bg-gray-500/20 text-gray-400 border-gray-500",
  Firebase: "bg-amber-500/20 text-amber-400 border-amber-500",
  Express: "bg-lime-500/20 text-lime-400 border-lime-500",
  SocketIO: "bg-cyan-500/20 text-cyan-400 border-cyan-500",
  PostgreSQL: "bg-blue-600/20 text-blue-300 border-blue-600",
  Auth: "bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500",
  UIUX: "bg-violet-500/20 text-violet-400 border-violet-500",
  APIs: "bg-slate-500/20 text-slate-400 border-slate-500",
};

const languages = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "Cpp",
  "Go",
  "Rust",
  "CSharp",
  "Ruby",
  "PHP",
  "Node.js",
  "React",
  "Next.js",
  "Firebase",
  "Express",
  "Socket.IO",
  "PostgreSQL",
  "Auth",
  "UI/UX",
  "APIs",
];

const difficultyActiveColors = {
  all: "bg-gray-700 text-white ring-gray-500",
  easy: "bg-green-800 text-green-200 ring-green-500",
  mid: "bg-yellow-800 text-yellow-200 ring-yellow-500",
  hard: "bg-orange-800 text-orange-200 ring-orange-500",
  expert: "bg-red-800 text-red-200 ring-red-500",
};

export default function ChallengeShowcase() {
  const [challenges] = useState<Challenge[]>(LOCAL_CHALLENGES);
  const [filters, setFilters] = useState({
    search: "",
    difficulty: "all" as "all" | "easy" | "mid" | "hard" | "expert",
    tags: [] as string[],
  });

  // Aplicar filtros
  const applyFilters = () =>
    challenges.filter((challenge) => {
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

  const filteredList = applyFilters();

  // Dividir retos por estado
  const challengesByStatus = {
    ongoing: filteredList.filter((c) => c.status === "ongoing"),
    next: filteredList.filter((c) => c.status === "next"),
    finished: filteredList.filter((c) => c.status === "finished"),
  };

  // Renderizar secciones por estado
  const renderSection = (
    status: "ongoing" | "next" | "finished",
    title: string,
    bgColor: string
  ) => {
    const items = challengesByStatus[status];
    if (!items.length) return null;
    return (
      <section key={status} className="mb-12">
        <h3 className={`text-3xl font-extrabold mb-6 ${bgColor} pb-2 inline-block`}>
          {title}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((challenge) => (
            <div
              key={challenge.id}
              className="transform transition-all duration-300 hover:scale-105"
            >
              <ChallengeCard challenge={challenge} />
            </div>
          ))}
        </div>
      </section>
    );
  };

  // Manejar toggle de tags
  const toggleTag = (tag: string) =>
    setFilters((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));

  return (
    <main className="min-h-screen bg-black text-white py-10 px-4 overflow-hidden">
      {/* Fondo animado */}
      <div className="fixed inset-0 z-0 bg-grid-pattern opacity-[0.03]"></div>

      {/* Contenido principal */}
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Barra de búsqueda */}
        <div className="relative w-full max-w-3xl mx-auto mb-10 group">
          <input
            type="text"
            placeholder="Buscar reto..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="w-full pl-14 pr-6 py-4 rounded-xl bg-gray-900 border border-purple-600 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:border-pink-500 shadow-lg shadow-purple-500/10"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 absolute left-5 top-1/2 transform -translate-y-1/2 text-purple-400 transition-transform duration-300 group-focus-within:scale-110"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {(["all", "easy", "mid", "hard", "expert"] as const).map((level) => {
            const isActive = filters.difficulty === level;
            return (
              <button
                key={level}
                onClick={() =>
                  setFilters({ ...filters, difficulty: level })
                }
                className={`px-5 py-2 rounded-full capitalize font-semibold transition-all duration-300 ${
                  isActive
                    ? `${difficultyActiveColors[level]} ring-2 ring-offset-2 ring-opacity-70 scale-105`
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {difficultyLabels[level]}
              </button>
            );
          })}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {languages.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-4 py-1 text-sm sm:text-base rounded-full font-medium transition-all ${
                filters.tags.includes(tag)
                  ? `${tagColors[tag as keyof typeof tagColors]} ring-2 ring-offset-2 ring-opacity-60 shadow-md`
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Separador neon */}
        <div className="my-10 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse"></div>

        {/* Listado de retos */}
        <div className="space-y-12">
          {renderSection("ongoing", "Retos en curso", "text-blue-400")}
          {renderSection("next", "Próximos retos", "text-yellow-400")}
          {renderSection("finished", "Retos finalizados", "text-green-400")}

          {/* Estado vacío */}
          {filteredList.length === 0 && (
            <div className="text-center py-16 bg-gray-800/70 backdrop-blur-sm rounded-xl border border-dashed border-gray-600">
              <p className="text-gray-400 text-lg">No hay retos con esos filtros</p>
              <button
                onClick={() =>
                  setFilters({
                    search: "",
                    difficulty: "all",
                    tags: [],
                  })
                }
                className="mt-4 px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg transition-transform duration-300 hover:scale-105 shadow-md shadow-purple-500/30"
              >
                Restablecer filtros
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}