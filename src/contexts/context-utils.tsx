import { createContext, useContext, ReactNode } from 'react';

/**
 * Creates a typed context with a custom hook for accessing the context value
 * @param displayName The display name for the context (used in React DevTools)
 * @param defaultValue The default value for the context
 * @returns An object containing the context, provider, and a custom hook for accessing the context value
 */
export function createTypedContext<T>(displayName: string, defaultValue: T | null = null) {
  // Create the context with the default value
  const Context = createContext<T | null>(defaultValue);
  
  // Set the display name for the context (used in React DevTools)
  Context.displayName = displayName;
  
  // Create a provider component that wraps the context provider
  function Provider({ children, value }: { children: ReactNode; value: T }) {
    return <Context.Provider value={value}>{children}</Context.Provider>;
  }
  
  // Create a custom hook for accessing the context value
  function useTypedContext() {
    const context = useContext(Context);
    if (context === null) {
      throw new Error(`use${displayName} must be used within a ${displayName}Provider`);
    }
    return context;
  }
  
  // Return the context, provider, and custom hook
  return {
    Context,
    Provider,
    useTypedContext,
  };
}

/**
 * Type for a context provider component
 */
export type ContextProvider = {
  children: ReactNode;
};