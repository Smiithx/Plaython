"use client";

import React from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { FileWarning, RefreshCw } from 'lucide-react';
import { Button } from '@/ui/button';

interface FormErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

/**
 * A fallback component for form errors
 */
function FormErrorFallback({ error, resetErrorBoundary }: FormErrorFallbackProps) {
  return (
    <div className="p-6 rounded-lg border border-purple-800 bg-purple-900/20 text-white">
      <div className="flex items-center mb-4">
        <FileWarning className="h-6 w-6 text-purple-500 mr-2" />
        <h2 className="text-xl font-semibold">Form Error</h2>
      </div>
      
      <div className="mb-4">
        <p className="text-gray-300 mb-2">
          We encountered a problem with your form submission. This might be due to invalid data or a temporary server issue.
        </p>
        <pre className="p-3 bg-black/30 rounded text-sm text-purple-300 overflow-auto max-h-40">
          {error.message}
        </pre>
      </div>
      
      <div className="flex space-x-3">
        <Button 
          variant="outline" 
          onClick={resetErrorBoundary}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Reset Form
        </Button>
      </div>
    </div>
  );
}

interface FormErrorBoundaryProps {
  children: React.ReactNode;
  onError?: (error: Error, info: React.ErrorInfo) => void;
  resetKey?: any;
}

/**
 * An error boundary specifically designed for form-related errors
 */
export function FormErrorBoundary({ children, onError, resetKey }: FormErrorBoundaryProps) {
  return (
    <ErrorBoundary
      fallback={({ error, resetErrorBoundary }) => (
        <FormErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />
      )}
      onError={onError}
      resetKey={resetKey}
    >
      {children}
    </ErrorBoundary>
  );
}

/**
 * A higher-order component that wraps a component with a FormErrorBoundary
 */
export function withFormErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<FormErrorBoundaryProps, 'children'>
) {
  const displayName = Component.displayName || Component.name || 'Component';
  
  const ComponentWithFormErrorBoundary = (props: P) => (
    <FormErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </FormErrorBoundary>
  );
  
  ComponentWithFormErrorBoundary.displayName = `withFormErrorBoundary(${displayName})`;
  
  return ComponentWithFormErrorBoundary;
}