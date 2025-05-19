import { createServerSupabaseClient } from "../supabaseClient";
import {Difficulty} from "@/types";

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

export async function getAllDifficulties(): Promise<Difficulty[]> {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
        .from("challenge_difficulties")
        .select("*")
        .order("sort_order", { ascending: true });

    if (error) throw error;
    return (data ?? []).map(mapRawToDifficulty);
}
