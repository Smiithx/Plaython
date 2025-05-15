import { supabase } from "../supabaseClient";

export interface Difficulty {
    id: number;
    label: string;
    sort_order: number;
}

export async function getAllDifficulties(): Promise<Difficulty[]> {
    const { data, error } = await supabase
        .from<Difficulty>("challenge_difficulties")
        .select("*")
        .order("sort_order", { ascending: true });

    if (error) throw error;
    return data;
}
