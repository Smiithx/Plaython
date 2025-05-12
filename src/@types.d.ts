declare global {
  interface Challenge {
    id: string;
    title: string;
    description: string;
    difficulty: string;
    tags: string[];
    estimatedTime?: string;
    teamSize?: number;
    startDate?: string;
    endDate?: string;
    status: "finished" | "ongoing" | "next";
  }
}

export {};