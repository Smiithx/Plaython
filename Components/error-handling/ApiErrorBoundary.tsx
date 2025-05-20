"use client";

import React from 'react';
import { ErrorBoundary, FallbackProps } from './ErrorBoundary';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/ui/button';

type ApiErrorFallbackProps = FallbackProps;

/**
 * A fallback component for API errors
 */
function ApiErrorFallback({ error, resetErrorBoundary }: ApiErrorFallbackProps) {
  return (
    <div className="p-6 rounded-lg border border-amber-800 bg-amber-900/20 text-white">
      <div className="flex items-center mb-4">
        <AlertCircle className="h-6 w-6 text-amber-500 mr-2" />
        <h2 className="text-xl font-semibold">Data Loading Error</h2>
      </div>

      <div className="mb-4">
        <p className="text-gray-300 mb-2">
          We couldn't load the data you requested. This might be due to a network issue or a temporary server problem.
        </p>
        <pre className="p-3 bg-black/30 rounded text-sm text-amber-300 overflow-auto max-h-40">
          {error.message}
        </pre>
      </div>

      <div className="flex space-x-3">
        <Button 
          variant="outline" 
          onClick={resetErrorBoundary}
        >
          Try Again
        </Button>

        <Button 
          variant="default"
          onClick={() => window.location.reload()}
        >
          Reload Page
        </Button>
      </div>
    </div>
  );
}

interface ApiErrorBoundaryProps {
  children: React.ReactNode;
  onError?: (error: Error, info: React.ErrorInfo) => void;
  resetKey?: any;
}

/**
 * An error boundary specifically designed for API-related errors
 */
export function ApiErrorBoundary({ children, onError, resetKey }: ApiErrorBoundaryProps) {
  return (
    <ErrorBoundary
      fallback={({ error, resetErrorBoundary }) => (
        <ApiErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />
      )}
      onError={onError}
      resetKey={resetKey}
    >
      {children}
    </ErrorBoundary>
  );
}

/**
 * A higher-order component that wraps a component with an ApiErrorBoundary
 */
export function withApiErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ApiErrorBoundaryProps, 'children'>
) {
  const displayName = Component.displayName || Component.name || 'Component';

  const ComponentWithApiErrorBoundary = (props: P) => (
    <ApiErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ApiErrorBoundary>
  );

  ComponentWithApiErrorBoundary.displayName = `withApiErrorBoundary(${displayName})`;

  return ComponentWithApiErrorBoundary;
}
