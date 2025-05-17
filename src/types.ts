export interface Challenge {
    id: string;
    title: string;
    description: string;
    difficultyId?: number;
    difficulty?: string;
    statusId?: number;
    status?: string;
    teamSize: number;
    startDate: string;
    endDate?: string;
    tags: string[];
    estimatedTime?: string;
    organizer?: string;
}

export interface Tag {
    id: number;
    name: string;
}

export interface Difficulty {
    id: number;
    label: string;
}

export interface Status {
    id: number;
    label: string;
}

export interface ChallengePageProps {
    params: Promise<{ id: string }>;
}