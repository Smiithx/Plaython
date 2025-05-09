declare global {
  interface Challenge {
    id: string;
    title: string;
    description: string;
    difficulty: "Fácil" | "Medio" | "Difícil" | "Experto";
    tags: string[];
    estimatedTime?: string;
  }
}

export {};