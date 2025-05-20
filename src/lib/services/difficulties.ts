import {createAnonSupabaseClient, createServerSupabaseClient} from "../supabaseClient";
import {Difficulty} from "@/types";
import { unstable_cache, revalidateTag } from "next/cache";

// 2) Función pura de mapeo
function mapRawToDifficulty(r: any): Difficulty {
    return {
        id:        r.id,
        label:     r.label,
        sortOrder: r.sort_order,
        createdAt: r.created_at,
        updatedAt: r.updated_at,
    };
}

// Wrapped with unstable_cache for server-side caching
export const getAllDifficulties = unstable_cache(
    async (): Promise<Difficulty[]> => {
        const supabase = createAnonSupabaseClient();
        const { data, error } = await supabase
            .from("challenge_difficulties")
            .select("*")
            .order("sort_order", { ascending: true });

        if (error) throw error;
        return (data ?? []).map(mapRawToDifficulty);
    },
    // Cache key
    ["all-difficulties"],
    // Cache options
    { 
        revalidate: 3600, // Revalidate every hour (difficulties change very infrequently)
        tags: ["difficulties"] // Cache tag for invalidation
    }
);
