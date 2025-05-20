# State Management in Plaython

This document provides an overview of the state management system implemented in the Plaython project.

## Overview

Plaython uses React Context for global state management, with separate contexts for different domains (user, challenges, teams). This approach provides a consistent and predictable way to manage state across the application.

## Context Structure

The context system is organized as follows:

```
src/contexts/
├── context-utils.tsx     # Utility functions for creating typed contexts
├── user-context.tsx      # User-related state and actions
├── challenges-context.tsx # Challenge-related state and actions
├── teams-context.tsx     # Team-related state and actions
└── index.tsx             # Root provider that combines all contexts
```

## Context Providers

### UserProvider

The `UserProvider` manages user-related state, including:

- User data (ID, name, profile information)
- Authentication state (isLoaded, isSignedIn)
- User metadata (specialty, skills)

It uses Clerk's `useUser()` hook to access user data and provides a consistent interface for accessing user information throughout the application.

### ChallengesProvider

The `ChallengesProvider` manages challenge-related state, including:

- Challenge data (list of challenges, filtered challenges)
- Challenge filters (search, tags, difficulty, status)
- Challenge actions (fetch, register, unregister)

It provides functions for filtering challenges and interacting with challenges, making it easy to display and manipulate challenge data.

### TeamsProvider

The `TeamsProvider` manages team-related state, including:

- Team data (current team, members)
- Team actions (fetch team members, clear team)

It provides a consistent interface for accessing team information and performing team-related actions.

## Usage

To use the context system, wrap your application with the `AppProviders` component:

```tsx
import { AppProviders } from '@/contexts';

function App({ children }) {
  return (
    <AppProviders>
      {children}
    </AppProviders>
  );
}
```

Then, in your components, import and use the context hooks:

```tsx
import { useUserContext, useChallengesContext, useTeamsContext } from '@/contexts';

function MyComponent() {
  const { userId, isSignedIn } = useUserContext();
  const { challenges, filteredChallenges } = useChallengesContext();
  const { currentTeam } = useTeamsContext();

  // Use the context values in your component
  return (
    <div>
      {isSignedIn ? (
        <p>Welcome, user {userId}!</p>
      ) : (
        <p>Please sign in</p>
      )}
      
      <h2>Challenges</h2>
      <ul>
        {filteredChallenges.map(challenge => (
          <li key={challenge.id}>{challenge.title}</li>
        ))}
      </ul>
      
      {currentTeam && (
        <div>
          <h2>My Team: {currentTeam.name}</h2>
          <ul>
            {currentTeam.members.map(member => (
              <li key={member.id}>{member.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
```

## Benefits

This state management approach provides several benefits:

1. **Separation of concerns**: Each context handles a specific domain, making the code more maintainable.
2. **Type safety**: All contexts are fully typed, providing better developer experience and catching errors at compile time.
3. **Consistent API**: All contexts follow the same pattern, making it easy to understand and use.
4. **Reduced prop drilling**: Global state is accessible anywhere in the component tree without passing props through multiple levels.
5. **Optimized rendering**: Components only re-render when the specific context values they use change.

## Future Improvements

Potential future improvements to the state management system include:

1. **Persistence**: Add persistence for certain state values using localStorage or similar.
2. **Performance optimizations**: Implement memoization and other performance optimizations.
3. **Server state integration**: Better integration with server state using React Query or similar.
4. **State synchronization**: Synchronize state between tabs/windows.
5. **Middleware**: Add middleware support for logging, analytics, etc.