"use client";
import {useState, useMemo, ChangeEvent} from "react";
import ChallengeCard from "./ChallengeCard";
import {Challenge} from "@/lib/services/challenges";
import {Tag} from "@/lib/services/tags";
import {Difficulty} from "@/lib/services/difficulties";
import {Status} from "@/lib/services/statuses";

interface Props {
    challenges: Challenge[];
    tags: Tag[];
    difficulties: Difficulty[];
    statuses: Status[];
}

// Configuración fija de UI, mapea keys a label y clases CSS
const CONFIG = {
    difficulty: {
        all: {label: "Todos", color: "bg-gray-700 text-white ring-gray-500"},
        easy: {label: "Fácil", color: "bg-green-800 text-green-200 ring-green-500"},
        mid: {label: "Medio", color: "bg-yellow-800 text-yellow-200 ring-yellow-500"},
        hard: {label: "Difícil", color: "bg-orange-800 text-orange-200 ring-orange-500"},
        expert: {label: "Experto", color: "bg-red-800 text-red-200 ring-red-500"}
    },
    tags: {
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
        "Node.js": "bg-emerald-500/20 text-emerald-400 border-emerald-500",
        React: "bg-sky-500/20 text-sky-400 border-sky-500",
        "Next.js": "bg-gray-500/20 text-gray-400 border-gray-500",
        Firebase: "bg-amber-500/20 text-amber-400 border-amber-500",
        Express: "bg-lime-500/20 text-lime-400 border-lime-500",
        "Socket.IO": "bg-cyan-500/20 text-cyan-400 border-cyan-500",
        PostgreSQL: "bg-blue-600/20 text-blue-300 border-blue-600",
        Auth: "bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500",
        "UI/UX": "bg-violet-500/20 text-violet-400 border-violet-500",
        APIs: "bg-slate-500/20 text-slate-400 border-slate-500"
    },
    languages: []
};

const statusConfig: Record<string, { title: string; color: string }> = {
    ongoing: {title: "Retos en curso", color: "text-blue-400"},
    next: {title: "Próximos retos", color: "text-yellow-400"},
    finished: {title: "Retos finalizados", color: "text-green-400"},
};

export default function ChallengeShowcase({challenges, tags, difficulties, statuses}: Props) {
    /* Estado de filtros: dificultad almacena key de CONFIG.difficulty */
    const [filters, setFilters] = useState({
        search: "",
        difficulty: "all" as keyof typeof CONFIG.difficulty,
        tags: [] as string[],
        showLanguageMenu: false,
    });

    // Languages se obtiene dinámicamente de los tags de la DB
    const languages = useMemo(() => tags.map((t) => t.name), [tags]);

    // Mapea label a id para comparación numérica
    const difficultyMap = useMemo(() => {
        const map: Record<string, number> = {};
        difficulties.forEach((d) => {
            map[d.label] = d.id;
        });
        return map;
    }, [difficulties]);

    // Filtrado de retos
    const filteredChallenges = useMemo(() => {
        return challenges.filter((c) => {
            const matchesSearch = c.title
                .toLowerCase()
                .includes(filters.search.toLowerCase());
            const matchesDifficulty =
                filters.difficulty === "all" ||
                c.difficulty_id === difficultyMap[filters.difficulty];
            const matchesTags =
                filters.tags.length === 0 ||
                filters.tags.every((tag) => c.tags.includes(tag));
            return matchesSearch && matchesDifficulty && matchesTags;
        });
    }, [challenges, filters, difficultyMap]);

    // Agrupa por estado
    const challengesByStatus = useMemo(() => {
        // Creamos un objeto vacío, con tipado de string → lista de retos
        const byStatus: Record<string, Challenge[]> = {};

        statuses.forEach((s) => {
            // Para cada status (p.ej. { id: 2, label: "next", ... })
            // filtramos retos cuyo c.status coincida con s.label
            byStatus[s.label] = filteredChallenges.filter(
                (c) => c.status === s.label
            );
        });

        return byStatus;
    }, [filteredChallenges, statuses]);

    // Toggle tags
    const toggleTag = (tag: string) =>
        setFilters((prev) => {
            const s = new Set(prev.tags);
            s.has(tag) ? s.delete(tag) : s.add(tag);
            return {...prev, tags: Array.from(s)};
        });

    // Render secciones
    const renderSection = (
        status: "ongoing" | "next" | "finished",
        title: string,
        textColor: string
    ) => {
        const items = challengesByStatus[status];
        if (!items.length) return null;

        return (
            <section key={status} className="mb-12">
                <h3 className={`text-3xl font-extrabold mb-6 ${textColor} pb-2 inline-block`}>
                    {title}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((challenge) => (
                        <div key={challenge.id} className="transform transition-all duration-300 hover:scale-105">
                            <ChallengeCard challenge={challenge} />
                        </div>
                    ))}
                </div>
            </section>
        );
    };

    return (
        <main className="min-h-screen bg-black text-white py-10 px-4 overflow-hidden">
            <div className="fixed inset-0 z-0 bg-grid-pattern opacity-[0.03]"></div>
            <div className="max-w-6xl mx-auto relative z-10">
                {/* Filtros UI */}
                <div className="h-[36px] flex justify-center items-center mb-4">
                    {filters.tags.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-2">
                            {filters.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${CONFIG.tags[tag as keyof typeof CONFIG.tags]}`}
                                >
                                    {tag}
                                    <button
                                        onClick={() => toggleTag(tag)}
                                        className="ml-2 w-5 h-5 flex items-center justify-center rounded-full hover:bg-opacity-70"
                                    >
                                    ×
                                  </button>
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Barra de búsqueda y menú de tags */}
                    <div className="relative w-full max-w-3xl mx-auto mb-6 group">
                        <input
                            type="text"
                            placeholder="Buscar reto..."
                            value={filters.search}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setFilters({...filters, search: e.target.value})
                            }
                            className="w-full pl-14 pr-14 py-4 rounded-xl bg-gray-900 border border-purple-600 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:border-pink-500 shadow-lg shadow-purple-500/10"
                        />

                        {/* Icono de lupa */}
                        <svg
                            className="w-6 h-6 absolute left-5 top-1/2 transform -translate-y-1/2 text-purple-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>

                        {/* Botón de filtro */}
                        <button
                            onClick={() =>
                                setFilters((prev) => ({...prev, showLanguageMenu: !prev.showLanguageMenu}))
                            }
                            className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors focus:outline-none"
                            aria-expanded={filters.showLanguageMenu}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707v6.414a1 1 0 01-.293.707l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 01-.293-.707V13.293a1 1 0 00-.293-.707L3 6.586A1 1 0 013 5.879V4z"
                                />
                            </svg>
                        </button>

                        {/* Menú desplegable de tecnologías/tags */}
                        {filters.showLanguageMenu && (
                            <div
                                className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50 animate-fadeIn">
                                <div className="max-h-60 overflow-y-auto p-2 space-y-1">
                                    {tags.map(({name}) => (
                                        <label
                                            key={name}
                                            className={`block px-3 py-1.5 text-sm rounded-full cursor-pointer transition-all ${
                                                filters.tags.includes(name)
                                                    ? `${CONFIG.tags[name as keyof typeof CONFIG.tags]} ring-1 ring-offset-2 ring-opacity-60`
                                                    : "hover:bg-gray-800"
                                            }`}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={filters.tags.includes(name)}
                                                onChange={() => toggleTag(name)}
                                                className="hidden"
                                            />
                                            <span className="flex items-center">
                                              <span
                                                  className="mr-2 flex-shrink-0 w-4 h-4 rounded-full border border-current flex items-center justify-center">
                                                {filters.tags.includes(name) && (
                                                    <span className="w-2 h-2 rounded-full bg-current"></span>
                                                )}
                                              </span>
                                                                        {name}
                                            </span>
                                        </label>
                                    ))}
                                    {/* Botón de cerrar menú */}
                                    <div className="border-t border-gray-700 pt-2 mt-2">
                                        <button
                                            onClick={() => setFilters((prev) => ({...prev, showLanguageMenu: false}))}
                                            className="w-full text-center text-xs text-gray-500 hover:text-gray-300"
                                        >Cerrar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Filtros de dificultad */}
                    <div className="flex flex-wrap justify-center gap-3 mb-6">
                        {Object.keys(CONFIG.difficulty).map((level) => {
                            const isActive = filters.difficulty === level;
                            return (
                                <button
                                    key={level}
                                    onClick={() => setFilters({...filters, difficulty: level as keyof typeof CONFIG.difficulty })}
                                    className={`px-5 py-2 rounded-full capitalize font-semibold transition-all duration-300 ${
                                        isActive
                                            ? `${CONFIG.difficulty[level as keyof typeof CONFIG.difficulty].color} ring-2 ring-offset-2 ring-opacity-70 scale-105`
                                            : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                                    }`}
                                >{CONFIG.difficulty[level as keyof typeof CONFIG.difficulty].label}</button>
                            );
                        })}
                    </div>

                    <div
                        className="my-8 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse"></div>

                    <div className="space-y-12">
                        {renderSection("ongoing", "Retos en curso", "text-blue-400")}
                        {renderSection("next", "Próximos retos", "text-yellow-400")}
                        {renderSection("finished", "Retos finalizados", "text-green-400")}

                        {filteredChallenges.length === 0 && (
                            <div
                                className="text-center py-16 bg-gray-800/70 backdrop-blur-sm rounded-xl border border-dashed border-gray-600">
                                <p className="text-gray-400 text-lg">No hay retos con esos filtros</p>
                                <button
                                    onClick={() =>
                                        setFilters({
                                            search: "",
                                            difficulty: "all",
                                            tags: [],
                                            showLanguageMenu: false,
                                        })
                                    }
                                    className="mt-4 px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg transition-transform duration-300 hover:scale-105 shadow-md shadow-purple-500/30"
                                >Restablecer filtros
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}