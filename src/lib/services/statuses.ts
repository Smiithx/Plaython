import { supabase } from "../supabaseClient";
import { Status } from "@/types";

function mapRawToStatus(r: any): Status {
    return {
        id:         r.id,
        label:      r.label,
        sortOrder: r.sort_order,
    };
}

export async function getAllStatuses(): Promise<Status[]> {
    const { data, error } = await supabase
        .from("challenge_statuses")
        .select("*")
        .order("sort_order", { ascending: true });

    if (error) throw error;
    return (data ?? []).map(mapRawToStatus);
}
