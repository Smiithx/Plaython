import {createAnonSupabaseClient, createServerSupabaseClient} from "../supabaseClient";
import { Tag } from "@/types";
import { unstable_cache, revalidateTag } from "next/cache";

// Función pura de mapeo
function mapRawToTag(r: any): Tag {
    return {
        id:   r.id,
        name: r.name,
        createdAt: r.created_at,
        updatedAt: r.updated_at,
    };
}

// Wrapped with unstable_cache for server-side caching
export const getAllTags = unstable_cache(
    async (): Promise<Tag[]> => {
        const supabase = createAnonSupabaseClient();
        const { data, error } = await supabase
            .from("tags")
            .select("*")
            .order("name", { ascending: true });

        if (error) throw error;
        return (data ?? []).map(mapRawToTag);
    },
    // Cache key
    ["all-tags"],
    // Cache options
    { 
        revalidate: 1800, // Revalidate every 30 minutes (tags might change more frequently than difficulties/statuses)
        tags: ["tags"] // Cache tag for invalidation
    }
);
