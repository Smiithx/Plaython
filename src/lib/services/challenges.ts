import { createServerSupabaseClient } from "../supabaseClient";
import { Challenge } from "@/types";

interface RawChallenge {
    id: string;
    title: string;
    description: string;
    difficulty_id?: number;
    difficulty?: { label: string };
    status_id?: number;
    status?: { label: string };
    team_size: number;
    start_date: string;
    end_date: string | null;
    challenge_tags?: Array<{ tags: { name: string } }>;
    created_at: string;
    updated_at: string;
}

/**
 * Función pura que mapea un registro “raw” al interfaz Challenge
 */
function mapRawToChallenge(c: RawChallenge): Challenge {
    return {
        id:            c.id,
        title:         c.title,
        description:   c.description,
        difficultyId:  c.difficulty_id,
        difficulty:    c.difficulty?.label ?? "",
        statusId:      c.status_id,
        status:        c.status?.label ?? "",
        teamSize:      c.team_size,
        startDate:     c.start_date,
        endDate:       c.end_date ?? undefined,
        tags:          c.challenge_tags?.map((ct: any) => ct.tags.name) ?? [],
        organizer:     "Plaython",
        createdAt:    c.created_at,
        updatedAt:    c.updated_at,
    };
}

/**
 * El SELECT que queremos repetir en TODOS los queries
 */
const DEFAULT_SELECT = `
  *,
  challenge_tags ( tags ( name ) ),
  status:challenge_statuses ( label ),
  difficulty:challenge_difficulties ( label )
`;

export async function getAllChallenges(): Promise<Challenge[]> {
    const supabase = createServerSupabaseClient();
    const {data, error} = await supabase
        .from("challenges")
        .select(DEFAULT_SELECT)
        .order("start_date", {ascending: true});

    if (error) throw error;
    // Transformar la estructura para exponer tags como string[]
    return (data ?? []).map(mapRawToChallenge);
}

export async function getChallengeById(id: string): Promise<Challenge> {
    const supabase = createServerSupabaseClient();
    const {data, error} = await supabase
        .from("challenges")
        .select(DEFAULT_SELECT)
        .eq("id", id)
        .single();

    if (error) throw error;
    return mapRawToChallenge(data!);
}

export async function createChallenge(input: Omit<Challenge, "id">) {
    const supabase = createServerSupabaseClient();
    const {data, error} = await supabase
        .from("challenges")
        .insert(input)
        .select(DEFAULT_SELECT)
        .single();

    if (error) throw error;
    return mapRawToChallenge(data!);
}

// …puedes añadir updateChallenge, deleteChallenge, etc.
