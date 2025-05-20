"use client";

import { ReactNode, useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { createTypedContext, ContextProvider } from './context-utils';
import { getCurrentUserId } from '@/lib/actions/challenge-registration';

// Define the shape of the user context
interface UserContextType {
  // User data
  userId: string | null;
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  imageUrl: string | null;
  
  // Authentication state
  isLoaded: boolean;
  isSignedIn: boolean;
  
  // User metadata
  specialty: string | null;
  skills: string[] | null;
  
  // Refetch user data
  refetchUser: () => Promise<void>;
}

// Create the context and hooks
const {
  Context: UserContext,
  Provider: UserContextProvider,
  useTypedContext: useUserContext
} = createTypedContext<UserContextType>('User');

// Create the provider component
export function UserProvider({ children }: ContextProvider) {
  // Get user data from Clerk
  const { isLoaded, isSignedIn, user } = useUser();
  
  // Local state for user ID from server
  const [userId, setUserId] = useState<string | null>(null);
  
  // Fetch user ID from server on mount and when auth state changes
  useEffect(() => {
    if (isSignedIn) {
      fetchUserId();
    } else {
      setUserId(null);
    }
  }, [isSignedIn]);
  
  // Function to fetch user ID from server
  const fetchUserId = async () => {
    try {
      const id = await getCurrentUserId();
      setUserId(id);
    } catch (error) {
      console.error('Error fetching user ID:', error);
      setUserId(null);
    }
  };
  
  // Extract user metadata
  const specialty = user?.publicMetadata?.specialty as string || null;
  const skills = user?.publicMetadata?.skills as string[] || null;
  
  // Create the context value
  const contextValue: UserContextType = {
    userId,
    firstName: user?.firstName || null,
    lastName: user?.lastName || null,
    fullName: user?.fullName || null,
    imageUrl: user?.imageUrl || null,
    isLoaded,
    isSignedIn: isSignedIn || false,
    specialty,
    skills,
    refetchUser: fetchUserId
  };
  
  return (
    <UserContextProvider value={contextValue}>
      {children}
    </UserContextProvider>
  );
}

// Export the hook for consuming the context
export { useUserContext };