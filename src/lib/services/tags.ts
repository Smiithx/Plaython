import { supabase } from "../supabaseClient";

export interface Tag {
    id: number;
    name: string;
}

export async function getAllTags(): Promise<Tag[]> {
    const { data, error } = await supabase
        .from<Tag>("tags")
        .select("*")
        .order("name", { ascending: true });

    if (error) throw error;
    return data;
}
