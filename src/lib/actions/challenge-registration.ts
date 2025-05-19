"use server";

import { auth } from "@clerk/nextjs/server";
import { supabase } from "../supabaseClient";
import { Challenge } from "@/types";

/**
 * Interface for a user in the challenge registration queue
 */
interface QueuedUser {
  id: string;
  userId: string;
  challengeId: string;
  joinedAt: string;
  groupId: string | null;
}

/**
 * Enqueues the current user into the "group search" queue for a challenge
 * @param challengeId The ID of the challenge to register for
 * @returns An object with success status and message
 */
export async function registerForChallenge(challengeId: string) {
  // Get the current user from Clerk
  const { userId } = auth();
  
  // If no user is authenticated, return an error
  if (!userId) {
    return {
      success: false,
      message: "You must be signed in to register for a challenge",
    };
  }

  try {
    // Check if the user is already registered for this challenge
    const { data: existingRegistration, error: checkError } = await supabase
      .from("challenge_registrations")
      .select("*")
      .eq("user_id", userId)
      .eq("challenge_id", challengeId)
      .single();

    if (checkError && checkError.code !== "PGRST116") {
      // PGRST116 is the error code for "no rows returned" which is expected if the user isn't registered
      throw checkError;
    }

    // If the user is already registered, return early
    if (existingRegistration) {
      return {
        success: true,
        message: "You are already registered for this challenge",
        isRegistered: true,
      };
    }

    // Get the challenge to check the team size
    const { data: challenge, error: challengeError } = await supabase
      .from("challenges")
      .select("team_size")
      .eq("id", challengeId)
      .single();

    if (challengeError) {
      throw challengeError;
    }

    // Register the user for the challenge
    const { error: registrationError } = await supabase
      .from("challenge_registrations")
      .insert({
        user_id: userId,
        challenge_id: challengeId,
        joined_at: new Date().toISOString(),
        group_id: null, // Will be assigned when a group is formed
      });

    if (registrationError) {
      throw registrationError;
    }

    // Try to form a group if possible
    await tryFormGroup(challengeId, challenge.team_size);

    return {
      success: true,
      message: "Successfully registered for the challenge",
      isRegistered: true,
    };
  } catch (error) {
    console.error("Error registering for challenge:", error);
    return {
      success: false,
      message: "An error occurred while registering for the challenge",
      error,
    };
  }
}

/**
 * Checks if the user is registered for a challenge
 * @param challengeId The ID of the challenge to check
 * @returns An object with registration status
 */
export async function checkRegistrationStatus(challengeId: string) {
  // Get the current user from Clerk
  const { userId } = auth();
  
  // If no user is authenticated, return false
  if (!userId) {
    return {
      isRegistered: false,
    };
  }

  try {
    // Check if the user is registered for this challenge
    const { data, error } = await supabase
      .from("challenge_registrations")
      .select("*")
      .eq("user_id", userId)
      .eq("challenge_id", challengeId)
      .single();

    if (error && error.code !== "PGRST116") {
      throw error;
    }

    return {
      isRegistered: !!data,
      groupId: data?.group_id || null,
    };
  } catch (error) {
    console.error("Error checking registration status:", error);
    return {
      isRegistered: false,
      error,
    };
  }
}

/**
 * Unregisters the current user from a challenge
 * @param challengeId The ID of the challenge to unregister from
 * @returns An object with success status and message
 */
export async function unregisterFromChallenge(challengeId: string) {
  // Get the current user from Clerk
  const { userId } = auth();
  
  // If no user is authenticated, return an error
  if (!userId) {
    return {
      success: false,
      message: "You must be signed in to unregister from a challenge",
    };
  }

  try {
    // Delete the registration
    const { error } = await supabase
      .from("challenge_registrations")
      .delete()
      .eq("user_id", userId)
      .eq("challenge_id", challengeId);

    if (error) {
      throw error;
    }

    return {
      success: true,
      message: "Successfully unregistered from the challenge",
      isRegistered: false,
    };
  } catch (error) {
    console.error("Error unregistering from challenge:", error);
    return {
      success: false,
      message: "An error occurred while unregistering from the challenge",
      error,
    };
  }
}

/**
 * Tries to form a group for a challenge based on the queue
 * @param challengeId The ID of the challenge
 * @param teamSize The size of teams for this challenge
 */
async function tryFormGroup(challengeId: string, teamSize: number) {
  try {
    // Get users who are registered but not assigned to a group
    const { data: queuedUsers, error: queueError } = await supabase
      .from("challenge_registrations")
      .select("*")
      .eq("challenge_id", challengeId)
      .is("group_id", null)
      .order("joined_at", { ascending: true });

    if (queueError) {
      throw queueError;
    }

    // If we have enough users to form a group
    if (queuedUsers && queuedUsers.length >= teamSize) {
      // Create a new group
      const { data: newGroup, error: groupError } = await supabase
        .from("challenge_groups")
        .insert({
          challenge_id: challengeId,
          created_at: new Date().toISOString(),
        })
        .select("id")
        .single();

      if (groupError) {
        throw groupError;
      }

      // Assign the first `teamSize` users to the new group
      const usersToAssign = queuedUsers.slice(0, teamSize);
      
      for (const user of usersToAssign) {
        const { error: updateError } = await supabase
          .from("challenge_registrations")
          .update({ group_id: newGroup.id })
          .eq("id", user.id);

        if (updateError) {
          throw updateError;
        }
      }
    }
  } catch (error) {
    console.error("Error forming group:", error);
    // We don't want to fail the registration if group formation fails
    // Just log the error and continue
  }
}