"use client";

import React from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { MapPin, Home } from 'lucide-react';
import { Button } from '@/ui/button';
import Link from 'next/link';

interface RouteErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

/**
 * A fallback component for route errors
 */
function RouteErrorFallback({ error, resetErrorBoundary }: RouteErrorFallbackProps) {
  return (
    <div className="p-6 rounded-lg border border-blue-800 bg-blue-900/20 text-white">
      <div className="flex items-center mb-4">
        <MapPin className="h-6 w-6 text-blue-500 mr-2" />
        <h2 className="text-xl font-semibold">Navigation Error</h2>
      </div>
      
      <div className="mb-4">
        <p className="text-gray-300 mb-2">
          We encountered a problem while loading this page. The route might be invalid or there might be an issue with the page content.
        </p>
        <pre className="p-3 bg-black/30 rounded text-sm text-blue-300 overflow-auto max-h-40">
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
          asChild
        >
          <Link href="/">
            <Home className="h-4 w-4 mr-2" />
            Go Home
          </Link>
        </Button>
      </div>
    </div>
  );
}

interface RouteErrorBoundaryProps {
  children: React.ReactNode;
  onError?: (error: Error, info: React.ErrorInfo) => void;
  resetKey?: any;
}

/**
 * An error boundary specifically designed for route-related errors
 */
export function RouteErrorBoundary({ children, onError, resetKey }: RouteErrorBoundaryProps) {
  return (
    <ErrorBoundary
      fallback={({ error, resetErrorBoundary }) => (
        <RouteErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />
      )}
      onError={onError}
      resetKey={resetKey}
    >
      {children}
    </ErrorBoundary>
  );
}

/**
 * A higher-order component that wraps a component with a RouteErrorBoundary
 */
export function withRouteErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<RouteErrorBoundaryProps, 'children'>
) {
  const displayName = Component.displayName || Component.name || 'Component';
  
  const ComponentWithRouteErrorBoundary = (props: P) => (
    <RouteErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </RouteErrorBoundary>
  );
  
  ComponentWithRouteErrorBoundary.displayName = `withRouteErrorBoundary(${displayName})`;
  
  return ComponentWithRouteErrorBoundary;
}