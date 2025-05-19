"use server";

import { auth } from "@clerk/nextjs/server";
import { createServerSupabaseClient } from "../supabaseClient";

/**
 * Registers the current user for a challenge
 */
export async function registerForChallenge(challengeId: string) {
  const { userId  } = await auth();
  if (!userId) {
    return { success: false, message: "You must be signed in to register for a challenge" };
  }
  const supabase = createServerSupabaseClient();

  try {
    // Check existing registration
    console.log(`userId`, userId)
    const { data: existingRegistration, error: checkError } = await supabase
        .from("challenge_registrations")
        .select("*")
        .eq("user_id", userId)
        .eq("challenge_id", challengeId)
        .single();
    if (checkError && checkError.code !== "PGRST116") {
      throw checkError;
    }
    if (existingRegistration) {
      return { success: true, message: "You are already registered for this challenge", isRegistered: true };
    }

    // Fetch team size
    const { data: challenge, error: challengeError } = await supabase
        .from("challenges")
        .select("team_size")
        .eq("id", challengeId)
        .single();

    if (challengeError) {
      throw challengeError;
    }

    // Insert registration
    const registrationBuilder = supabase
        .from("challenge_registrations")
        .insert({
          user_id: userId,
          challenge_id: challengeId,
          joined_at: new Date().toISOString(),
          group_id: null,
        });
    const { error: registrationError } = await registrationBuilder;
    if (registrationError) {
      throw registrationError;
    }

    // Attempt to form a group
    await tryFormGroup(challengeId, challenge.team_size);

    return { success: true, message: "Successfully registered for the challenge", isRegistered: true };
  } catch (error) {
    console.error("Error registering for challenge:", error);
    return { success: false, message: "An error occurred while registering for the challenge", error };
  }
}

/**
 * Checks registration status for the current user
 */
export async function checkRegistrationStatus(challengeId: string) {
  const { userId } = await auth();
  if (!userId) {
    return { isRegistered: false };
  }

  const supabase = createServerSupabaseClient();

  try {
    const { data, error } = await supabase
        .from("challenge_registrations")
        .select("*")
        .eq("user_id", userId)
        .eq("challenge_id", challengeId)
        .single();

    if (error && error.code !== "PGRST116") {
      throw error;
    }
    return { isRegistered: !!data, groupId: data?.group_id || null };
  } catch (error) {
    console.error("Error checking registration status:", error);
    return { isRegistered: false, error };
  }
}

/**
 * Unregisters the current user from a challenge
 */
export async function unregisterFromChallenge(challengeId: string) {
  const { userId } = await auth();
  if (!userId) {
    return { success: false, message: "You must be signed in to unregister from a challenge" };
  }

  const supabase = createServerSupabaseClient();

  try {
    const builder = supabase
        .from("challenge_registrations")
        .delete();

    // Apply filters without chaining on promise
    builder.eq("user_id", userId);
    builder.eq("challenge_id", challengeId);

    const { error } = await builder;
    if (error) {
      throw error;
    }

    return { success: true, message: "Successfully unregistered from the challenge", isRegistered: false };
  } catch (error) {
    console.error("Error unregistering from challenge:", error);
    return { success: false, message: "An error occurred while unregistering from the challenge", error };
  }
}

/**
 * Returns the ID of the currently authenticated user
 * @returns The user ID if authenticated, null otherwise
 */
export async function getCurrentUserId(): Promise<string | null> {
  const { userId } = await auth();
  return userId;
}

/**
 * Forms groups when enough users are queued
 */
async function tryFormGroup(challengeId: string, teamSize: number) {

  const supabase = createServerSupabaseClient();

  try {
    const { data: queuedUsers, error: queueError } = await supabase
        .from("challenge_registrations")
        .select("*")
        .eq("challenge_id", challengeId)
        .is("group_id", null)
        .order("joined_at", { ascending: true });

    if (queueError) {
      throw queueError;
    }
    if (!queuedUsers || queuedUsers.length < teamSize) {
      return;
    }

    const { data: newGroup, error: groupError } = await supabase
        .from("challenge_groups")
        .insert({ challenge_id: challengeId, created_at: new Date().toISOString() })
        .select("id")
        .single();
    if (groupError) {
      throw groupError;
    }

    const usersToAssign = queuedUsers.slice(0, teamSize);
    for (const user of usersToAssign) {
      await supabase
          .from("challenge_registrations")
          .update({ group_id: newGroup.id })
          .eq("id", user.id);
    }
  } catch (error) {
    console.error("Error forming group:", error);
  }
}
