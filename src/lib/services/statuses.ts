import { supabase } from "../supabaseClient";

export interface Status {
    id: number;
    label: string;
    sort_order: number;
}

export async function getAllStatuses(): Promise<Status[]> {
    const { data, error } = await supabase
        .from<Status>("challenge_statuses")
        .select("*")
        .order("sort_order", { ascending: true });

    if (error) throw error;
    return data;
}
