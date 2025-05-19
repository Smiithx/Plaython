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
  location?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Tag {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Difficulty {
  id: number;
  label: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface Status {
  id: number;
  label: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface ChallengePageProps {
  params: Promise<{ id: string }>;
}
