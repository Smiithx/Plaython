import { useFetch, useFetchWithRetry } from './useFetch';
import { getAllChallenges, getChallengeById, createChallenge } from '@/lib/services/challenges';
import { Challenge } from '@/types';

/**
 * Hook to fetch all challenges
 * @param immediate Whether to fetch challenges immediately on mount
 * @returns An object containing the challenges data, loading state, error state, and a function to trigger the fetch
 */
export function useAllChallenges(immediate: boolean = true) {
  return useFetch<Challenge[]>(
    getAllChallenges, 
    [], 
    immediate,
    {
      enabled: true,
      ttl: 5 * 60 * 1000, // 5 minutes cache
      cacheKey: 'getAllChallenges'
    }
  );
}

/**
 * Hook to fetch a challenge by ID
 * @param id The challenge ID to fetch
 * @param immediate Whether to fetch the challenge immediately on mount
 * @returns An object containing the challenge data, loading state, error state, and a function to trigger the fetch
 */
export function useChallenge(id?: string, immediate: boolean = false) {
  const fetchChallenge = async (challengeId: string) => {
    if (!challengeId) {
      throw new Error('Challenge ID is required');
    }
    return getChallengeById(challengeId);
  };

  const fetch = useFetch<Challenge, [string]>(
    fetchChallenge,
    undefined,
    false,
    {
      enabled: true,
      ttl: 2 * 60 * 1000, // 2 minutes cache (shorter than getAllChallenges as individual challenges might change more frequently)
      cacheKey: 'getChallenge'
    }
  );

  // If id is provided and immediate is true, fetch the challenge
  if (id && immediate && !fetch.isLoading && !fetch.data && !fetch.error) {
    fetch.execute(id);
  }

  return fetch;
}

/**
 * Hook to fetch a challenge by ID with automatic retries
 * @param options Configuration options for the hook
 * @returns An object containing the challenge data, loading state, error state, and a function to trigger the fetch
 */
export function useChallengeWithRetry(options: {
  id?: string;
  immediate?: boolean;
  maxRetries?: number;
  retryDelay?: number;
} = {}) {
  const { id, immediate = false, maxRetries = 3, retryDelay = 1000 } = options;

  const fetchChallenge = async (challengeId: string) => {
    if (!challengeId) {
      throw new Error('Challenge ID is required');
    }
    return getChallengeById(challengeId);
  };

  const fetch = useFetchWithRetry<Challenge, [string]>(fetchChallenge, {
    immediate: false,
    maxRetries,
    retryDelay,
    cacheOptions: {
      enabled: true,
      ttl: 2 * 60 * 1000, // 2 minutes cache
      cacheKey: 'getChallengeWithRetry'
    }
  });

  // If id is provided and immediate is true, fetch the challenge
  if (id && immediate && !fetch.isLoading && !fetch.data && !fetch.error) {
    fetch.execute(id);
  }

  return fetch;
}

/**
 * Hook to create a new challenge
 * @returns An object containing the created challenge data, loading state, error state, and a function to trigger the creation
 */
export function useCreateChallenge() {
  // No caching for mutation operations
  return useFetch<Challenge, [Omit<Challenge, 'id'>]>(
    createChallenge,
    undefined,
    false,
    {
      enabled: false // Disable caching for mutations
    }
  );
}
