# Plaython Component Usage Guide

This document provides guidelines and examples for using the components in the Plaython project.

## Table of Contents

1. [UI Components](#ui-components)
2. [Challenge Components](#challenge-components)
3. [Dashboard Components](#dashboard-components)
4. [Animation Components](#animation-components)
5. [Error Handling Components](#error-handling-components)
6. [Best Practices](#best-practices)

## UI Components

UI components are reusable building blocks located in the `Components/ui` directory. They follow the Shadcn UI and Radix UI patterns.

### Button

```tsx
import { Button } from "@/ui/button";

// Primary button
<Button>Click Me</Button>

// Variant
<Button variant="outline">Outline Button</Button>

// Size
<Button size="sm">Small Button</Button>

// With icon
<Button>
  <PlusIcon className="mr-2 h-4 w-4" />
  Add Item
</Button>

// Disabled state
<Button disabled>Disabled</Button>
```

### Badge

```tsx
import { Badge } from "@/ui/badge";

// Default badge
<Badge>New</Badge>

// Variant
<Badge variant="outline">Outline</Badge>

// Custom styling
<Badge className="bg-blue-500 text-white">Custom</Badge>
```

### Input

```tsx
import { Input } from "@/ui/input";

// Basic input
<Input placeholder="Enter your name" />

// With label
<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="Enter your email" />
</div>

// Disabled state
<Input disabled placeholder="Disabled input" />
```

### Textarea

```tsx
import { Textarea } from "@/ui/textarea";

// Basic textarea
<Textarea placeholder="Enter your message" />

// With label
<div className="space-y-2">
  <Label htmlFor="message">Message</Label>
  <Textarea id="message" placeholder="Enter your message" />
</div>

// Custom styling
<Textarea 
  className="min-h-[100px] bg-gray-900 border-gray-700 text-white" 
  placeholder="Custom styled textarea" 
/>
```

### Tabs

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/ui/tabs";

<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account settings content</TabsContent>
  <TabsContent value="password">Password settings content</TabsContent>
</Tabs>
```

### Avatar

```tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";

<Avatar>
  <AvatarImage src="https://example.com/avatar.jpg" alt="User" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

## Challenge Components

Challenge components are used for displaying and interacting with programming challenges.

### ChallengeCard

```tsx
import { ChallengeCard } from "@/challenge/ChallengeCard";

// Basic usage
<ChallengeCard 
  challenge={challengeData} 
  onRegister={handleRegister} 
  isRegistered={false} 
/>

// Loading skeleton
<ChallengeCard.Skeleton />
```

### ChallengeDetailClient

```tsx
import ChallengeDetailClient from "@/challenge/id/ChallengeDetailClient";

// Used in a server component
<ChallengeDetailClient eventData={challengeData} />
```

### InfoTab

```tsx
import { InfoTab } from "@/challenge/id/components/InfoTab";

<InfoTab eventData={challengeData} isJoined={isUserJoined} />
```

### ParticipantsTab

```tsx
import { ParticipantsTab } from "@/challenge/id/components/ParticipantsTab";

<ParticipantsTab eventData={challengeData} groupId={userGroupId} />
```

### ScheduleTab

```tsx
import { ScheduleTab } from "@/challenge/id/components/ScheduleTab";

<ScheduleTab eventData={challengeData} />
```

### DiscussionTab

```tsx
import { DiscussionTab } from "@/challenge/id/components/DiscussionTab";

<DiscussionTab eventData={challengeData} />
```

## Dashboard Components

Dashboard components are used for the user dashboard interface.

### DashHeader

```tsx
import { DashHeader } from "@/dashboard/header";

<DashHeader />
```

### SidebarDesktop

```tsx
import { SidebarDesktop } from "@/dashboard/sidebar.desktop";

<SidebarDesktop />
```

### SidebarMovil

```tsx
import { SidebarMovil } from "@/dashboard/sidebar.movil";

<SidebarMovil />
```

### UserSidebar

```tsx
import { UserSidebar } from "@/dashboard/component/user.sidebar";

<UserSidebar />
```

## Animation Components

Animation components add visual interest to the application.

### HexagonGrid

```tsx
import HexagonGrid from "@/ui/animations/hexagon-grid";

<HexagonGrid />
```

### AnimatedCounter

```tsx
import { AnimatedCounter } from "@/ui/animations/animated-counter";

<AnimatedCounter to={100} />
```

### CustomCursor

```tsx
import CustomCursor from "@/ui/animations/cursor-effect";

<CustomCursor />
```

### FloatingIcons

```tsx
import FloatingIcons from "@/ui/animations/floating-icons";

<FloatingIcons />
```

### GlitchText

```tsx
import GlitchText from "@/ui/animations/glitch-text";

<GlitchText>Plaython</GlitchText>
```

### StarField

```tsx
import StarField from "@/ui/animations/star-footer";

<StarField />
// Small variant
<StarField small />
```

## Error Handling Components

Error handling components provide a consistent way to handle and display errors.

### ErrorToast

```tsx
import { ErrorToast } from "@/error-handling/ErrorToast";

<ErrorToast 
  error={{ 
    message: "An error occurred", 
    severity: "error", 
    source: "API" 
  }} 
  onClose={() => console.log("Toast closed")} 
/>
```

### ApiErrorBoundary

```tsx
import { ApiErrorBoundary } from "@/error-handling/ApiErrorBoundary";

<ApiErrorBoundary onError={(error) => console.error(error)}>
  <YourComponent />
</ApiErrorBoundary>
```

### FormErrorBoundary

```tsx
import { FormErrorBoundary } from "@/error-handling/FormErrorBoundary";

<FormErrorBoundary onError={(error) => console.error(error)}>
  <YourForm />
</FormErrorBoundary>
```

### RouteErrorBoundary

```tsx
import { RouteErrorBoundary } from "@/error-handling/RouteErrorBoundary";

<RouteErrorBoundary onError={(error) => console.error(error)}>
  <YourPage />
</RouteErrorBoundary>
```

## Best Practices

### Component Memoization

Use React.memo, useMemo, and useCallback to optimize performance:

```tsx
// Memoize a component
const MemoizedComponent = React.memo(MyComponent);

// Memoize an expensive calculation
const expensiveResult = useMemo(() => {
  return expensiveCalculation(a, b);
}, [a, b]);

// Memoize a callback function
const handleClick = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

### Suspense and Error Boundaries

Wrap components that perform data fetching in Suspense and error boundaries:

```tsx
<ErrorBoundary fallback={<ErrorDisplay />}>
  <Suspense fallback={<LoadingSpinner />}>
    <DataFetchingComponent />
  </Suspense>
</ErrorBoundary>
```

### Responsive Design

Use Tailwind's responsive utilities for mobile-first design:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Content */}
</div>
```

### Accessibility

Ensure components are accessible:

- Use semantic HTML elements
- Add ARIA attributes when necessary
- Ensure proper keyboard navigation
- Maintain sufficient color contrast

```tsx
<button
  aria-label="Close dialog"
  onClick={handleClose}
  className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  <XIcon className="h-5 w-5" />
</button>
```

### Server vs. Client Components

Follow the guidelines in `docs/server-client-components.md` for deciding when to use server or client components.

For more detailed information on component props and TypeScript interfaces, see `docs/prop-typing-guidelines.md`.