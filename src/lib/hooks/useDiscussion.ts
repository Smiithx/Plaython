import { useFetch } from "./useFetch";
import {
  createDiscussion,
  getAllDiscussions,
  getDiscussionById,
} from "@/lib/services/discussion";
import { Discussion } from "@/types";

/**
 * Hook to fetch all challenges
 * @param immediate Whether to fetch challenges immediately on mount
 * @returns An object containing the challenges data, loading state, error state, and a function to trigger the fetch
 */
export function useAllDiscussion(immediate: boolean = true) {
  return useFetch<Discussion[]>(getAllDiscussions, [], immediate, {
    enabled: true,
    ttl: 5 * 60 * 1000, // 5 minutes cache
    cacheKey: "getAllDiscussions",
  });
}

/**
 * Hook to fetch a discussion by ID
 * @param id The discussion ID to fetch
 * @param immediate Whether to fetch the discussion immediately on mount
 * @returns An object containing the discussion data, loading state, error state, and a function to trigger the fetch
 */
export function useDiscussion(id?: string, immediate: boolean = false) {
  const fetchDiscussion = async (discussionId: string) => {
    if (!discussionId) {
      throw new Error("Discussion ID is required");
    }
    return getDiscussionById(discussionId);
  };

  const fetch = useFetch<Discussion, [string]>(
    fetchDiscussion,
    undefined,
    false,
    {
      enabled: true,
      ttl: 2 * 60 * 1000, // 2 minutes cache (shorter than getAllDiscussion as individual discussion might change more frequently)
      cacheKey: "getAllDiscussions",
    }
  );

  // If id is provided and immediate is true, fetch the discussion
  if (id && immediate && !fetch.isLoading && !fetch.data && !fetch.error) {
    fetch.execute(id);
  }

  return fetch;
}

/**
 * Hook to create a new Discussion
 * @returns An object containing the created discussion data, loading state, error state, and a function to trigger the creation
 */
export function useCreateDiscussion() {
  // No caching for mutation operations
  return useFetch<Discussion, [Omit<Discussion, "id">]>(
    createDiscussion,
    undefined,
    false,
    {
      enabled: false, // Disable caching for mutations
    }
  );
}
