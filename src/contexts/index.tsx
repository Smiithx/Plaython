"use client";

import { ReactNode } from 'react';
import { UserProvider } from './user-context';
import { ChallengesProvider } from './challenges-context';
import { TeamsProvider } from './teams-context';
import { ErrorProvider } from './error-context';

interface AppProvidersProps {
  children: ReactNode;
}

/**
 * Root provider that combines all context providers
 * This is the entry point for the context system
 */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ErrorProvider>
      <UserProvider>
        <ChallengesProvider>
          <TeamsProvider>
            {children}
          </TeamsProvider>
        </ChallengesProvider>
      </UserProvider>
    </ErrorProvider>
  );
}

// Re-export all context hooks for easier imports
export { useUserContext } from './user-context';
export { useChallengesContext } from './challenges-context';
export { useTeamsContext } from './teams-context';
export { useErrorContext, useErrorLogger } from './error-context';

// Re-export types
export type { Participant, Team } from './teams-context';
