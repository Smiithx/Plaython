# Server vs. Client Components in Plaython

This document establishes a consistent pattern for using server and client components in the Plaython project, providing clear guidelines, examples, and best practices.

## Overview

Next.js 15.3.2 with React 19 introduces a powerful paradigm of Server Components and Client Components. Using them effectively can significantly improve performance, reduce JavaScript bundle size, and enhance user experience.

## Key Principles

1. **Server-first approach**: Use Server Components by default and only switch to Client Components when necessary
2. **Minimize client-side JavaScript**: Leverage Server Components to reduce the amount of JavaScript sent to the client
3. **Clear boundaries**: Establish clear boundaries between Server and Client Components
4. **Proper Suspense usage**: Implement proper Suspense boundaries for async operations

## When to Use Server Components

Server Components should be used for:

- **Data fetching**: Components that primarily fetch and display data
- **Static content**: Components that render static content without interactivity
- **SEO-critical sections**: Components that need to be indexed by search engines
- **Database access**: Components that need direct access to the database
- **Server-side operations**: Components that perform operations that should happen on the server (e.g., authentication)

### Benefits of Server Components

- Zero JavaScript footprint (not sent to the client)
- Direct access to backend resources
- Improved initial page load performance
- Better SEO
- Secure handling of sensitive data

## When to Use Client Components

Client Components should be used for:

- **Interactivity**: Components that need to respond to user interactions
- **Browser APIs**: Components that need access to browser APIs
- **State management**: Components that need to maintain client-side state
- **Event listeners**: Components that need to add event listeners
- **Effects**: Components that need to use `useEffect` or other React hooks

### Benefits of Client Components

- Interactive user interfaces
- Access to browser APIs
- Client-side state management
- Real-time updates

## Implementation Guidelines

### File Organization

- Place Server Components in the `src/app` directory following Next.js App Router conventions
- Place reusable Client Components in the `Components` directory
- Use the `.client.tsx` suffix for Client Components to make them easily identifiable

### Server Component Example

```tsx
// src/app/challenges/page.tsx
import { getChallenges } from '@/lib/services/challenges';
import { ChallengeList } from '@/challenge/ChallengeList';

export default async function ChallengesPage() {
  // Data fetching happens on the server
  const challenges = await getChallenges();
  
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Available Challenges</h1>
      <ChallengeList challenges={challenges} />
    </main>
  );
}
```

### Client Component Example

```tsx
// Components/challenge/ChallengeCard.client.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/ui/button';
import type { Challenge } from '@/types';

interface ChallengeCardProps {
  challenge: Challenge;
  onRegister: (challengeId: string) => Promise<void>;
}

export function ChallengeCard({ challenge, onRegister }: ChallengeCardProps) {
  const [isRegistering, setIsRegistering] = useState(false);
  
  async function handleRegister() {
    setIsRegistering(true);
    try {
      await onRegister(challenge.id);
    } finally {
      setIsRegistering(false);
    }
  }
  
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <h3 className="text-xl font-semibold">{challenge.title}</h3>
      <p className="text-gray-600 mt-2">{challenge.description}</p>
      <Button 
        onClick={handleRegister} 
        disabled={isRegistering}
        className="mt-4"
      >
        {isRegistering ? 'Registering...' : 'Register'}
      </Button>
    </div>
  );
}
```

### Mixing Server and Client Components

```tsx
// src/app/challenges/[id]/page.tsx
import { getChallengeById } from '@/lib/services/challenges';
import { ChallengeDetailClient } from '@/challenge/id/ChallengeDetailClient.client';
import { Suspense } from 'react';
import { LoadingSpinner } from '@/ui/loading-spinner';

export default async function ChallengePage({ params }: { params: { id: string } }) {
  // Data fetching happens on the server
  const challenge = await getChallengeById(params.id);
  
  if (!challenge) {
    return <div>Challenge not found</div>;
  }
  
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">{challenge.title}</h1>
      
      {/* Wrap client component in Suspense */}
      <Suspense fallback={<LoadingSpinner />}>
        <ChallengeDetailClient challenge={challenge} />
      </Suspense>
    </main>
  );
}
```

## Best Practices

1. **Minimize `use client` directives**: Only add the `'use client'` directive to components that absolutely need client-side interactivity.

2. **Proper data passing**: Pass data from Server Components to Client Components as props rather than having Client Components fetch data.

3. **Suspense boundaries**: Wrap Client Components in `<Suspense>` with lightweight fallbacks to improve perceived performance.

4. **Dynamic imports**: Use dynamic imports (`next/dynamic`) for non-critical Client Components to reduce initial bundle size.

5. **Colocate related components**: Keep related Server and Client Components close to each other in the file structure.

6. **Avoid prop drilling**: Use React Context for state that needs to be shared across multiple Client Components.

7. **Server Actions for form submissions**: Use Server Actions for form submissions to avoid unnecessary client-side code.

8. **Progressive enhancement**: Design components to work without JavaScript first, then enhance with client-side interactivity.

## Anti-patterns to Avoid

1. **Overusing Client Components**: Don't mark entire page components as Client Components when only small parts need interactivity.

2. **Mixing concerns**: Don't mix data fetching and interactive UI in the same component.

3. **Unnecessary state**: Don't use client-side state for data that could be server-rendered.

4. **Large client bundles**: Don't import large libraries in Client Components without code splitting.

5. **Excessive nesting**: Don't create deeply nested hierarchies of Server and Client Components.

## Performance Considerations

- Monitor bundle sizes using tools like `next/bundle-analyzer`
- Use the Network tab in browser DevTools to verify that Server Components aren't sending unnecessary JavaScript
- Implement proper code splitting for large Client Components
- Use the React DevTools Profiler to identify performance bottlenecks in Client Components

## Conclusion

By following these guidelines, the Plaython project can leverage the full power of Next.js Server and Client Components to create a high-performance, maintainable application with optimal user experience.