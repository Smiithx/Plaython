import { supabase } from "../supabaseClient";
import { Tag } from "@/types";

// Función pura de mapeo
function mapRawToTag(r: any): Tag {
    return {
        id:   r.id,
        name: r.name,
    };
}

export async function getAllTags(): Promise<Tag[]> {
    const { data, error } = await supabase
        .from("tags")
        .select("*")
        .order("name", { ascending: true });

    if (error) throw error;
    return (data ?? []).map(mapRawToTag);
}
