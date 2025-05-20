# Error Handling in Plaython

This document provides an overview of the error handling strategy implemented in the Plaython project.

## Overview

Plaython uses a comprehensive error handling strategy with custom error boundaries and a centralized error context. This approach provides a consistent way to handle and display errors throughout the application.

## Error Handling Components

### Error Boundaries

Error boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of crashing the whole component tree.

#### Base Error Boundary

The base error boundary component (`Components/error-handling/ErrorBoundary.tsx`) provides the foundation for all error boundaries in the application. It catches errors in its child components and displays a fallback UI.

```tsx
import { ErrorBoundary } from '@/error-handling/ErrorBoundary';

// Usage
<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>

// With custom fallback
<ErrorBoundary
  fallback={<div>Something went wrong</div>}
>
  <YourComponent />
</ErrorBoundary>

// With error callback
<ErrorBoundary
  onError={(error, errorInfo) => {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }}
>
  <YourComponent />
</ErrorBoundary>
```

#### Specialized Error Boundaries

The application includes specialized error boundaries for different types of errors:

1. **API Error Boundary** (`Components/error-handling/ApiErrorBoundary.tsx`): For handling API-related errors.
2. **Route Error Boundary** (`Components/error-handling/RouteErrorBoundary.tsx`): For handling navigation and route-related errors.
3. **Form Error Boundary** (`Components/error-handling/FormErrorBoundary.tsx`): For handling form submission and validation errors.

Each specialized error boundary provides a custom fallback UI tailored to the specific error type.

```tsx
import { ApiErrorBoundary } from '@/error-handling/ApiErrorBoundary';
import { RouteErrorBoundary } from '@/error-handling/RouteErrorBoundary';
import { FormErrorBoundary } from '@/error-handling/FormErrorBoundary';

// Usage
<ApiErrorBoundary>
  <DataFetchingComponent />
</ApiErrorBoundary>

<RouteErrorBoundary>
  <RouterComponent />
</RouteErrorBoundary>

<FormErrorBoundary>
  <FormComponent />
</FormErrorBoundary>
```

### Higher-Order Components

Each error boundary also provides a higher-order component (HOC) for easily wrapping components with an error boundary.

```tsx
import { withErrorBoundary } from '@/error-handling/ErrorBoundary';
import { withApiErrorBoundary } from '@/error-handling/ApiErrorBoundary';
import { withRouteErrorBoundary } from '@/error-handling/RouteErrorBoundary';
import { withFormErrorBoundary } from '@/error-handling/FormErrorBoundary';

// Usage
const ComponentWithErrorBoundary = withErrorBoundary(YourComponent);
const ComponentWithApiErrorBoundary = withApiErrorBoundary(YourComponent);
const ComponentWithRouteErrorBoundary = withRouteErrorBoundary(YourComponent);
const ComponentWithFormErrorBoundary = withFormErrorBoundary(YourComponent);
```

## Error Context

The error context (`src/contexts/error-context.tsx`) provides a centralized way to manage and display errors throughout the application.

### Error Provider

The error provider is included in the root provider and makes the error context available throughout the application.

```tsx
import { ErrorProvider } from '@/contexts/error-context';

// Usage
<ErrorProvider>
  {children}
</ErrorProvider>
```

### Error Hooks

The error context provides hooks for accessing and updating error state:

```tsx
import { useErrorContext, useErrorLogger } from '@/contexts';

// Usage
function YourComponent() {
  const { errors, addError, removeError, clearErrors } = useErrorContext();
  const { logInfo, logWarning, logError, logFatal } = useErrorLogger();

  // Log an error
  logError('Something went wrong', { details: 'More information' }, 'YourComponent');

  // Add an error directly
  addError({
    message: 'Something went wrong',
    severity: 'error',
    details: { more: 'information' },
    source: 'YourComponent',
  });

  // Remove an error
  removeError(errorId);

  // Clear all errors
  clearErrors();

  return (
    <div>
      {/* Your component content */}
    </div>
  );
}
```

## Error Utilities

The error utilities (`src/lib/error-utils.ts`) provide helper functions for creating and handling errors.

### ApplicationError

The `ApplicationError` class extends the standard Error class with additional properties like severity, details, and source.

```tsx
import { ApplicationError, createError } from '@/lib/error-utils';

// Usage
throw new ApplicationError('Something went wrong', 'error', { details: 'More information' }, 'YourComponent');

// Or use the helper function
throw createError('Something went wrong', { details: 'More information' }, 'YourComponent');
```

### Error Handling Functions

The error utilities include functions for safely executing functions and handling any errors:

```tsx
import { tryCatch, tryCatchWithDefault } from '@/lib/error-utils';
import { useErrorLogger } from '@/contexts';

// Usage
function YourComponent() {
  const { logError } = useErrorLogger();

  // Try to execute a function and handle any errors
  async function fetchDataWithErrorHandling() {
    const result = await tryCatch(
      async () => {
        // Your async function
        return await fetchData();
      },
      (error) => {
        // Handle the error
        logError(error.message, error.details, error.source);
      }
    );

    // Try to execute a function with a default value
    const resultWithDefault = await tryCatchWithDefault(
      async () => {
        // Your async function
        return await fetchData();
      },
      [], // Default value
      (error) => {
        // Handle the error
        logError(error.message, error.details, error.source);
      }
    );

    return { result, resultWithDefault };
  }

  return (
    <div>
      {/* Your component content */}
    </div>
  );
}
```

## Error Toast

The error toast component (`Components/error-handling/ErrorToast.tsx`) displays errors from the error context as toast notifications.

### Error Toast Container

The error toast container is included in the root layout and displays all errors from the error context.

```tsx
import { ErrorToastContainer } from '@/error-handling/ErrorToast';

// Usage
<ErrorToastContainer />
```

## Best Practices

1. **Use Error Boundaries**: Wrap components that might throw errors with the appropriate error boundary.
2. **Use the Error Context**: Use the error context to log and display errors throughout the application.
3. **Use Error Utilities**: Use the error utilities to create and handle errors in a consistent way.
4. **Provide Meaningful Error Messages**: Always provide clear and meaningful error messages that help users understand what went wrong.
5. **Include Error Details**: Include relevant details with errors to help with debugging.
6. **Specify Error Source**: Always specify the source of the error to help identify where it occurred.
7. **Handle Errors Gracefully**: Always handle errors gracefully to provide a good user experience.
