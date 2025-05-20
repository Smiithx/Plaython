import {createAnonSupabaseClient, createServerSupabaseClient} from "../supabaseClient";
import { Status } from "@/types";
import { unstable_cache, revalidateTag } from "next/cache";

function mapRawToStatus(r: any): Status {
    return {
        id:         r.id,
        label:      r.label,
        sortOrder: r.sort_order,
        createdAt: r.created_at,
        updatedAt: r.updated_at,
    };
}

// Wrapped with unstable_cache for server-side caching
export const getAllStatuses = unstable_cache(
    async (): Promise<Status[]> => {
        const supabase = createAnonSupabaseClient();
        const { data, error } = await supabase
            .from("challenge_statuses")
            .select("*")
            .order("sort_order", { ascending: true });

        if (error) throw error;
        return (data ?? []).map(mapRawToStatus);
    },
    // Cache key
    ["all-statuses"],
    // Cache options
    { 
        revalidate: 3600, // Revalidate every hour (statuses change very infrequently)
        tags: ["statuses"] // Cache tag for invalidation
    }
);
