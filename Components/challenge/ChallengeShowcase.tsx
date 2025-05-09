"use client";
import { useEffect, useState } from "react";
import ChallengeCard from "./ChallengeCard";

// Datos locales de ejemplo TODO: CAMBIAR POR API SUPABASE
const LOCAL_CHALLENGES: Challenge[] = [
  {
    id: "1",
    title: "FizzBuzz Clásico",
    description: "Escribe una función que imprima números del 1 al 100...",
    difficulty: "Fácil",
    tags: ["JavaScript", "Python", "Lógica"],
    estimatedTime: "PT15M",
  },
  {
    id: "2",
    title: "Invertir Cadena",
    description: "Crea una función que invierta una cadena de texto...",
    difficulty: "Fácil",
    tags: ["JavaScript", "Strings"],
    estimatedTime: "PT20M",
  },
];

export default function ChallengeShowcase() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);

  // Simula carga de datos
  useEffect(() => {
    const timer = setTimeout(() => {
      setChallenges(LOCAL_CHALLENGES);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="container py-8">
      <h2 className="text-2xl font-bold mb-6">Retos disponibles</h2>

      {/* Lista de retos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="border rounded shadow-sm animate-pulse">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-16"></div>
                <div className="p-4 space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))
          : challenges.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
      </div>
    </section>
  );
}
