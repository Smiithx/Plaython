"use client";

import { ReactNode, useEffect, useState, useCallback } from 'react';
import { createTypedContext, ContextProvider } from './context-utils';
import { getGroupMembers } from '@/lib/actions/challenge-registration';

// Define the return type of getGroupMembers
interface GroupMembersResult {
  success: boolean;
  message: string;
  members: Participant[];
  error?: any;
}

// Define participant type
interface Participant {
  id: string;
  name: string;
  avatar_url?: string;
  skills?: string[];
  specialty?: string;
}

// Define team type
interface Team {
  id: string;
  name: string;
  members: Participant[];
  complete: boolean;
}

// Define the shape of the teams context
interface TeamsContextType {
  // Team data
  currentTeam: Team | null;
  isLoading: boolean;
  error: string | null;

  // Team actions
  fetchTeamMembers: (groupId: string) => Promise<void>;
  clearTeam: () => void;
}

// Create the context and hooks
const {
  Context: TeamsContext,
  Provider: TeamsContextProvider,
  useTypedContext: useTeamsContext
} = createTypedContext<TeamsContextType>('Teams');

// Create the provider component
export function TeamsProvider({ children }: ContextProvider) {
  // State for team data
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch team members
  const fetchTeamMembers = useCallback(async (groupId: string) => {
    if (!groupId) {
      setError("No group ID provided");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result: GroupMembersResult = await getGroupMembers(groupId);

      if (result.success) {
        setCurrentTeam({
          id: groupId,
          name: `Team ${groupId.substring(0, 4)}`, // Generate a simple team name
          members: result.members,
          complete: true, // Assume complete if we can fetch members
        });
      } else {
        setError(result.message);
      }
    } catch (err) {
      console.error("Error fetching team members:", err);
      setError("Failed to load team members");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Function to clear the current team
  const clearTeam = useCallback(() => {
    setCurrentTeam(null);
  }, []);

  // Create the context value
  const contextValue: TeamsContextType = {
    currentTeam,
    isLoading,
    error,
    fetchTeamMembers,
    clearTeam,
  };

  return (
    <TeamsContextProvider value={contextValue}>
      {children}
    </TeamsContextProvider>
  );
}

// Export the hook for consuming the context
export { useTeamsContext };

// Export types for use in other files
export type { Participant, Team };
