"use server";

import {createAnonSupabaseClient, createServerSupabaseClient} from "../supabaseClient";
import {Challenge} from "@/types";
import {DbChallengeWithRelations} from "@/types/database";
import {unstable_cache, revalidateTag} from "next/cache";
import {auth} from "@clerk/nextjs/server";

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

/**
 * Función cacheada que recibe un userId y devuelve los retos registrados
 */
const _getRegisteredChallenges: (userId: string) => Promise<{
    current: Challenge[];
    upcoming: Challenge[];
    past: Challenge[]
}> = unstable_cache(
    async (userId: string): Promise<{
        current:  Challenge[];
        upcoming: Challenge[];
        past:     Challenge[];
    }> => {
        const supabase = createAnonSupabaseClient();

        // 1) Traer las inscripciones junto con el challenge
        const { data: regs, error } = await supabase
            .from("challenge_registrations")
            .select(`challenges(${DEFAULT_SELECT})`)
            .eq("user_id", userId)
            .order("start_date", { ascending: true, foreignTable: "challenges" });

        if (error) throw error;

        // 2) Mapear a Challenge[]
        const all = (regs ?? []).map(r => mapRawToChallenge(r.challenges));

        // 3) Agrupar según fechas
        const now = new Date();
        const upcoming = all.filter(c => new Date(c.startDate) > now);
        const current  = all.filter(
            c =>
                new Date(c.startDate) <= now &&
                (!c.endDate || new Date(c.endDate) >= now)
        );
        const past     = all.filter(
            c => c.endDate !== undefined && new Date(c.endDate) < now
        );

        return { current, upcoming, past };
    },
    ["registered-challenges"],
    { revalidate: 60 }
);

/**
 * Devuelve únicamente los challenges en los que este usuario está registrado,
 * agrupados en actuales, próximos y pasados.
 */
export async function getRegisteredChallenges(): Promise<{
    current:  Challenge[];
    upcoming: Challenge[];
    past:     Challenge[];
}> {
    const { userId } = await auth();
    if (!userId) {
        return { current: [], upcoming: [], past: [] };
    }
    // Invocamos la función cacheada con el userId
    return _getRegisteredChallenges(userId);
}

// …puedes añadir updateChallenge, deleteChallenge, etc.
