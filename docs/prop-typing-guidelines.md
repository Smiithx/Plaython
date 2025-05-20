# Prop Typing Guidelines for Plaython Components

This document provides guidelines for implementing proper TypeScript prop typing for all components in the Plaython project.

## Why Proper Prop Typing Matters

Proper prop typing offers several benefits:

1. **Type Safety**: Catch type-related errors at compile time rather than runtime
2. **Better Developer Experience**: Improved autocompletion and IntelliSense
3. **Self-Documentation**: Props and their types serve as documentation
4. **Refactoring Support**: Makes it easier to refactor components
5. **Consistency**: Ensures a consistent approach across the codebase

## General Guidelines

### 1. Always Define Explicit Interfaces for Props

Every component should have an explicitly defined interface for its props:

```tsx
// ❌ Avoid implicit typing
function UserProfile({ name, age, isAdmin }) {
  // ...
}

// ✅ Use explicit interface
interface UserProfileProps {
  name: string;
  age: number;
  isAdmin: boolean;
}

function UserProfile({ name, age, isAdmin }: UserProfileProps) {
  // ...
}
```

### 2. Export Prop Interfaces When Appropriate

Export prop interfaces when they might be reused elsewhere:

```tsx
// Export the interface if it might be reused
export interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger';
  size: 'small' | 'medium' | 'large';
  label: string;
  onClick: () => void;
}

export function Button({ variant, size, label, onClick }: ButtonProps) {
  // ...
}
```

### 3. Use Descriptive Interface Names

Name interfaces descriptively, typically using the component name followed by "Props":

```tsx
interface UserAvatarProps {
  // ...
}

function UserAvatar(props: UserAvatarProps) {
  // ...
}
```

### 4. Use Named Exports Instead of Default Exports

Following the project guidelines, use named exports for components:

```tsx
// ❌ Avoid default exports
export default function Button(props: ButtonProps) {
  // ...
}

// ✅ Use named exports
export function Button(props: ButtonProps) {
  // ...
}
```

### 5. Use Specific Types Instead of `any`

Avoid using `any` as it defeats the purpose of TypeScript:

```tsx
// ❌ Avoid using any
interface DataTableProps {
  data: any[];
  onRowClick: (item: any) => void;
}

// ✅ Use specific types
interface User {
  id: string;
  name: string;
  email: string;
}

interface DataTableProps {
  data: User[];
  onRowClick: (user: User) => void;
}
```

### 6. Make Optional Props Explicit

Use the `?` operator to mark optional props:

```tsx
interface CardProps {
  title: string;           // Required
  description?: string;    // Optional
  image?: string;          // Optional
  onClick?: () => void;    // Optional
}
```

### 7. Use Union Types for Props with Multiple Possible Values

```tsx
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger';
  size: 'small' | 'medium' | 'large';
}
```

### 8. Use Proper Event Handler Types

```tsx
interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onFocus?: React.FocusEventHandler<HTMLButtonElement>;
}
```

### 9. Extend HTML Element Props When Appropriate

When creating components that wrap HTML elements, extend the appropriate HTML element props:

```tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary' | 'danger';
}
```

### 10. Use React.ReactNode for Children

```tsx
interface CardProps {
  title: string;
  children: React.ReactNode;
}
```

## Component-Specific Guidelines

### UI Components

UI components should have comprehensive prop typing that extends the appropriate HTML element props:

```tsx
// Example: Button component
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export function Button({
  variant = 'default',
  size = 'md',
  isLoading = false,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  // ...
}
```

### Feature Components

Feature components should have clear prop interfaces that reflect the domain model:

```tsx
// Example: ChallengeCard component
import { Challenge } from '@/types';

export interface ChallengeCardProps {
  challenge: Challenge;
  onRegister?: (challengeId: string) => Promise<void>;
  isRegistered?: boolean;
}

export function ChallengeCard({ challenge, onRegister, isRegistered = false }: ChallengeCardProps) {
  // ...
}
```

### Page Components

Page components should type their route parameters and any other props:

```tsx
// Example: Challenge detail page
import { Challenge } from '@/types';

interface ChallengePageProps {
  params: {
    id: string;
  };
}

export async function ChallengePage({ params }: ChallengePageProps) {
  // ...
}
```

### Server Components

Server components should type their props just like client components:

```tsx
// Example: Server component
interface UserProfileServerProps {
  userId: string;
}

export async function UserProfileServer({ userId }: UserProfileServerProps) {
  // ...
}
```

## Handling Component Variants

For components with variants, use discriminated unions:

```tsx
// Base props shared by all variants
interface BaseAlertProps {
  message: string;
  onClose?: () => void;
}

// Success variant
interface SuccessAlertProps extends BaseAlertProps {
  variant: 'success';
  successAction?: () => void;
}

// Error variant
interface ErrorAlertProps extends BaseAlertProps {
  variant: 'error';
  errorCode?: string;
  retry?: () => void;
}

// Warning variant
interface WarningAlertProps extends BaseAlertProps {
  variant: 'warning';
  acknowledgeRequired?: boolean;
}

// Union type of all variants
type AlertProps = SuccessAlertProps | ErrorAlertProps | WarningAlertProps;

export function Alert(props: AlertProps) {
  // Common rendering logic
  const { variant, message, onClose } = props;
  
  // Variant-specific rendering
  switch (variant) {
    case 'success':
      return (
        // Render success alert with successAction
        // props.successAction is available here
      );
    case 'error':
      return (
        // Render error alert with errorCode and retry
        // props.errorCode and props.retry are available here
      );
    case 'warning':
      return (
        // Render warning alert with acknowledgeRequired
        // props.acknowledgeRequired is available here
      );
  }
}
```

## Prop Typing for Higher-Order Components (HOCs)

When creating HOCs, ensure proper typing:

```tsx
// HOC that adds a loading state
export function withLoading<P extends object>(
  Component: React.ComponentType<P>
): React.FC<P & { isLoading?: boolean }> {
  return function WithLoadingComponent({ isLoading = false, ...props }: P & { isLoading?: boolean }) {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    return <Component {...(props as P)} />;
  };
}
```

## Using Generic Components

For reusable components that work with different data types, use generics:

```tsx
// Generic list component
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
}

export function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map((item) => (
        <li key={keyExtractor(item)}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}

// Usage
<List<User>
  items={users}
  renderItem={(user) => <UserCard user={user} />}
  keyExtractor={(user) => user.id}
/>
```

## Prop Typing for Context Providers

Ensure proper typing for context providers:

```tsx
// Define the context value type
interface AuthContextValue {
  user: User | null;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  error: Error | null;
}

// Create the context with an initial value
const AuthContext = React.createContext<AuthContextValue | undefined>(undefined);

// Define props for the provider component
interface AuthProviderProps {
  children: React.ReactNode;
}

// Create the provider component
export function AuthProvider({ children }: AuthProviderProps) {
  // ...implementation
  
  const value: AuthContextValue = {
    user,
    login,
    logout,
    isLoading,
    error,
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Create a hook for consuming the context
export function useAuth(): AuthContextValue {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
```

## Conclusion

By following these guidelines, we can ensure that all components in the Plaython project have proper prop typing, leading to a more maintainable, self-documenting, and type-safe codebase.

Remember that proper prop typing is not just about adding TypeScript interfaces; it's about designing clear component APIs that are easy to understand and use correctly.