import {supabase} from "../supabaseClient";

export interface Challenge {
    id: string;
    title: string;
    description: string;
    difficulty_id: number;
    difficulty?: string;
    status_id: number;
    status?: string;
    team_size: number;
    start_date: string;
    end_date?: string;
    tags?: string[];
}

export async function getAllChallenges(): Promise<Challenge[]> {
    const {data, error} = await supabase
        .from("challenges")
        .select(`
          *,
          challenge_tags (
            tag_id,
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
        difficulty_id: c.difficulty_id,
        difficulty: c.difficulty?.label ?? "",
        status_id: c.status_id,
        team_size: c.team_size,
        start_date: c.start_date,
        end_date: c.end_date,
        tags: c.challenge_tags?.map((ct: { tags: { name: any; }; }) => ct.tags.name) ?? [],
        status: c.status?.label ?? "",
    }));
}

export async function getChallengeById(id: string): Promise<Challenge> {
    const {data, error} = await supabase
        .from("challenges")
        .select(`
          *,
          challenge_tags (
            tag_id,
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
        difficulty_id: c.difficulty_id,
        difficulty: c.difficulty?.label ?? "",
        status_id: c.status_id,
        team_size: c.team_size,
        start_date: c.start_date,
        end_date: c.end_date,
        tags: c.challenge_tags?.map((ct: { tags: { name: any; }; }) => ct.tags.name) ?? [],
        status: c.status?.label ?? "",
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
