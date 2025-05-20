"use client";

import { ReactNode, useEffect, useState, useCallback } from 'react';
import { createTypedContext, ContextProvider } from './context-utils';
import { Challenge, Tag, Difficulty, Status } from '@/types';
import { 
  getAllChallenges, 
  getChallengeById, 
  createChallenge 
} from '@/lib/services/challenges';
import { 
  registerForChallenge, 
  unregisterFromChallenge, 
  checkRegistrationStatus 
} from '@/lib/actions/challenge-registration';

// Define filter types
interface ChallengeFilters {
  search: string;
  tags: Tag[];
  difficulty: Difficulty | null;
  status: Status | null;
}

// Define the shape of the challenges context
interface ChallengesContextType {
  // Challenge data
  challenges: Challenge[];
  filteredChallenges: Challenge[];
  isLoading: boolean;
  error: Error | null;

  // Challenge filters
  filters: ChallengeFilters;
  setSearchFilter: (search: string) => void;
  setTagsFilter: (tags: Tag[]) => void;
  setDifficultyFilter: (difficulty: Difficulty | null) => void;
  setStatusFilter: (status: Status | null) => void;
  resetFilters: () => void;

  // Challenge actions
  fetchChallenges: () => Promise<void>;
  fetchChallengeById: (id: string) => Promise<Challenge | null>;
  registerForChallenge: (challengeId: string) => Promise<{ success: boolean; message: string; isRegistered?: boolean }>;
  unregisterFromChallenge: (challengeId: string) => Promise<{ success: boolean; message: string; isRegistered?: boolean }>;
  checkRegistrationStatus: (challengeId: string) => Promise<{ isRegistered: boolean }>;
}

// Default filters
const defaultFilters: ChallengeFilters = {
  search: '',
  tags: [],
  difficulty: null,
  status: null,
};

// Create the context and hooks
const {
  Context: ChallengesContext,
  Provider: ChallengesContextProvider,
  useTypedContext: useChallengesContext
} = createTypedContext<ChallengesContextType>('Challenges');

// Create the provider component
export function ChallengesProvider({ children }: ContextProvider) {
  // State for challenges data
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // State for filters
  const [filters, setFilters] = useState<ChallengeFilters>(defaultFilters);

  // Fetch challenges on mount
  useEffect(() => {
    fetchChallenges();
  }, []);

  // Function to fetch all challenges
  const fetchChallenges = async () => {
    try {
      setIsLoading(true);
      const data = await getAllChallenges();
      setChallenges(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching challenges:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch challenges'));
    } finally {
      setIsLoading(false);
    }
  };

  // Function to fetch a challenge by ID
  const fetchChallengeById = async (id: string): Promise<Challenge | null> => {
    try {
      setIsLoading(true);
      const challenge = await getChallengeById(id);
      return challenge;
    } catch (err) {
      console.error(`Error fetching challenge with ID ${id}:`, err);
      setError(err instanceof Error ? err : new Error(`Failed to fetch challenge with ID ${id}`));
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Filter functions
  const setSearchFilter = useCallback((search: string) => {
    setFilters(prev => ({ ...prev, search }));
  }, []);

  const setTagsFilter = useCallback((tags: Tag[]) => {
    setFilters(prev => ({ ...prev, tags }));
  }, []);

  const setDifficultyFilter = useCallback((difficulty: Difficulty | null) => {
    setFilters(prev => ({ ...prev, difficulty }));
  }, []);

  const setStatusFilter = useCallback((status: Status | null) => {
    setFilters(prev => ({ ...prev, status }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  // Apply filters to challenges
  const filteredChallenges = challenges.filter(challenge => {
    // Apply search filter
    if (filters.search && !challenge.title.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }

    // Apply tags filter
    if (filters.tags.length > 0 && !filters.tags.every(tag => challenge.tags?.includes(tag))) {
      return false;
    }

    // Apply difficulty filter
    if (filters.difficulty && challenge.difficulty !== filters.difficulty) {
      return false;
    }

    // Apply status filter
    if (filters.status && challenge.status !== filters.status) {
      return false;
    }

    return true;
  });

  // Create the context value
  const contextValue: ChallengesContextType = {
    challenges,
    filteredChallenges,
    isLoading,
    error,
    filters,
    setSearchFilter,
    setTagsFilter,
    setDifficultyFilter,
    setStatusFilter,
    resetFilters,
    fetchChallenges,
    fetchChallengeById,
    registerForChallenge,
    unregisterFromChallenge,
    checkRegistrationStatus,
  };

  return (
    <ChallengesContextProvider value={contextValue}>
      {children}
    </ChallengesContextProvider>
  );
}

// Export the hook for consuming the context
export { useChallengesContext };
