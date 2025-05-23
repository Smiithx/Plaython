"use server";

import {
  createAnonSupabaseClient,
  createServerSupabaseClient,
} from "../supabaseClient";
import { Challenge, Discussion } from "@/types";
import { DbDiscussion } from "@/types/database";
import { unstable_cache, revalidateTag } from "next/cache";

/**
 * Función pura que mapea un registro “raw” al interfaz Challenge_discussion
 */
function mapRawToDiscuccion(c: DbDiscussion): Discussion {
  return {
    id: c.id,
    message: c.message,
    timestamp: c.timestamp,
    userName: c.userName,
    userAvatarUrl: c.userAvatarUrl ?? "",
    userId: c.userId,
  };
}

// Wrapped with unstable_cache for server-side caching
export const getAllChallenges = unstable_cache(
  async (): Promise<Discussion[]> => {
    const supabase = createAnonSupabaseClient();
    const { data, error } = await supabase
      .from("challenge_discussion")
      .select("*")
      .order("timestamp", { ascending: true });

    if (error) throw error;
    // Transformar la estructura para exponer tags como string[]
    return (data ?? []).map(mapRawToDiscuccion);
  },
  // Cache key
  ["all-discussions"],
  // Cache options
  {
    revalidate: 60, // Revalidate every 60 seconds
    tags: ["discussions"], // Cache tag for invalidation
  }
);

// Wrapped with unstable_cache for server-side caching
export const getChallengeById = unstable_cache(
  async (id: string): Promise<Discussion> => {
    const supabase = createAnonSupabaseClient();
    const { data, error } = await supabase
      .from("challenge_discussion")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return mapRawToDiscuccion(data!);
  },
  // Cache key generator function
  [`discussion`],
  // Cache options
  {
    revalidate: 60, // Revalidate every 60 seconds
    tags: ["discussions"], // Cache tag for invalidation
  }
);

export async function createDiscussion(input: Omit<Discussion, "id">) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("challenge_discussion")
    .insert(input)
    .single();

  if (error) throw error;

  // Invalidate the challenge_discussion cache tag to refresh all challenge_discussion-related data
  revalidateTag("challenge_discussion");

  return mapRawToDiscuccion(data!);
}
