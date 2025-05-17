import {supabase} from "../supabaseClient";
import { Challenge } from "@/types";

export async function getAllChallenges(): Promise<Challenge[]> {
    const {data, error} = await supabase
        .from("challenges")
        .select(`
          *,
          challenge_tags (
            tags ( name )
          ),
          status:challenge_statuses ( label ),
          difficulty:challenge_difficulties ( label )
        `
        )
        .order("start_date", {ascending: true});

    if (error) throw error;
    // Transformar la estructura para exponer tags como string[]
    return data.map((c) => ({
        id: c.id,
        title: c.title,
        description: c.description,
        difficultyId: c.difficulty_id,
        difficulty: c.difficulty?.label ?? "",
        statusId: c.status_id,
        status: c.status?.label ?? "",
        teamSize: c.team_size,
        startDate: c.start_date,
        endDate: c.end_date ?? undefined,
        tags: c.challenge_tags?.map((ct) => ct.tags.name) ?? [],
        organizer:  "Plaython",
    }));
}

export async function getChallengeById(id: string): Promise<Challenge> {
    const {data, error} = await supabase
        .from("challenges")
        .select(`
          *,
          challenge_tags (
            tags ( name )
          ),
          status:challenge_statuses ( label ),
          difficulty:challenge_difficulties ( label )
        `)
        .eq("id", id)
        .single();

    if (error) throw error;
    const c = data;
    return {
        id: c.id,
        title: c.title,
        description: c.description,
        difficultyId: c.difficulty_id,
        difficulty: c.difficulty?.label ?? "",
        statusId: c.status_id,
        status: c.status?.label ?? "",
        teamSize: c.team_size,
        startDate: c.start_date,
        endDate: c.end_date ?? undefined,
        tags: c.challenge_tags?.map((ct) => ct.tags.name) ?? [],
        organizer:  "Plaython",
    };
}

export async function createChallenge(input: Omit<Challenge, "id">) {
    const {data, error} = await supabase
        .from<Challenge>("challenges")
        .insert(input)
        .select()
        .single();

    if (error) throw error;
    return data;
}

// …puedes añadir updateChallenge, deleteChallenge, etc.
