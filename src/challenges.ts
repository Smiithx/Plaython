export const LOCAL_CHALLENGES: Challenge[] = [
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

export const getChallengeById = (id: string) => {
  return LOCAL_CHALLENGES.find((challenge) => challenge.id === id);
};