"use server";

import {createAnonSupabaseClient, createServerSupabaseClient} from "../supabaseClient";
import {Challenge} from "@/types";
import {DbChallengeWithRelations} from "@/types/database";
import {unstable_cache, revalidateTag} from "next/cache";

/**
 * Función pura que mapea un registro “raw” al interfaz Challenge
 */
function mapRawToChallenge(c: DbChallengeWithRelations): Challenge {
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
        tags: c.challenge_tags?.map((ct: any) => ct.tags.name) ?? [],
        organizer: "Plaython",
        createdAt: c.created_at,
        updatedAt: c.updated_at,
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

// Wrapped with unstable_cache for server-side caching
export const getAllChallenges = unstable_cache(
    async (): Promise<Challenge[]> => {
        const supabase = createAnonSupabaseClient();
        const {data, error} = await supabase
            .from("challenges")
            .select(DEFAULT_SELECT)
            .order("start_date", {ascending: true});

        if (error) throw error;
        // Transformar la estructura para exponer tags como string[]
        return (data ?? []).map(mapRawToChallenge);
    },
    // Cache key
    ["all-challenges"],
    // Cache options
    {
        revalidate: 60, // Revalidate every 60 seconds
        tags: ["challenges"] // Cache tag for invalidation
    }
);

// Wrapped with unstable_cache for server-side caching
export const getChallengeById = unstable_cache(
    async (id: string): Promise<Challenge> => {
        const supabase = createAnonSupabaseClient();
        const {data, error} = await supabase
            .from("challenges")
            .select(DEFAULT_SELECT)
            .eq("id", id)
            .single();

        if (error) throw error;
        return mapRawToChallenge(data!);
    },
    // Cache key generator function
    [`challenge`],
    // Cache options
    {
        revalidate: 60, // Revalidate every 60 seconds
        tags: ["challenges"] // Cache tag for invalidation
    }
);

export async function createChallenge(input: Omit<Challenge, "id">) {
    const supabase = await createServerSupabaseClient();
    const {data, error} = await supabase
        .from("challenges")
        .insert(input)
        .select(DEFAULT_SELECT)
        .single();

    if (error) throw error;

    // Invalidate the challenges cache tag to refresh all challenge-related data
    revalidateTag("challenges");

    return mapRawToChallenge(data!);
}

// …puedes añadir updateChallenge, deleteChallenge, etc.
