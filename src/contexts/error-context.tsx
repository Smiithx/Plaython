"use client";

import { ReactNode, createContext, useContext, useState, useCallback } from 'react';

// Define error types
export type ErrorSeverity = 'info' | 'warning' | 'error' | 'fatal';

export interface AppError {
  id: string;
  message: string;
  severity: ErrorSeverity;
  timestamp: Date;
  details?: any;
  source?: string;
}

// Define the shape of the error context
interface ErrorContextType {
  // Error state
  errors: AppError[];
  hasErrors: boolean;
  
  // Error actions
  addError: (error: Omit<AppError, 'id' | 'timestamp'>) => void;
  removeError: (id: string) => void;
  clearErrors: () => void;
  
  // Convenience methods for different error types
  logInfo: (message: string, details?: any, source?: string) => void;
  logWarning: (message: string, details?: any, source?: string) => void;
  logError: (message: string, details?: any, source?: string) => void;
  logFatal: (message: string, details?: any, source?: string) => void;
}

// Create the context
const ErrorContext = createContext<ErrorContextType | null>(null);

// Create the provider component
export function ErrorProvider({ children }: { children: ReactNode }) {
  const [errors, setErrors] = useState<AppError[]>([]);
  
  // Add a new error
  const addError = useCallback((error: Omit<AppError, 'id' | 'timestamp'>) => {
    const newError: AppError = {
      ...error,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    
    // Log to console for debugging
    console.error(`[${error.severity.toUpperCase()}] ${error.message}`, error.details || '');
    
    setErrors(prev => [...prev, newError]);
    
    // For fatal errors, you might want to do something special
    if (error.severity === 'fatal') {
      // Maybe send to an error reporting service
    }
  }, []);
  
  // Remove an error by ID
  const removeError = useCallback((id: string) => {
    setErrors(prev => prev.filter(error => error.id !== id));
  }, []);
  
  // Clear all errors
  const clearErrors = useCallback(() => {
    setErrors([]);
  }, []);
  
  // Convenience methods for different error types
  const logInfo = useCallback((message: string, details?: any, source?: string) => {
    addError({ message, severity: 'info', details, source });
  }, [addError]);
  
  const logWarning = useCallback((message: string, details?: any, source?: string) => {
    addError({ message, severity: 'warning', details, source });
  }, [addError]);
  
  const logError = useCallback((message: string, details?: any, source?: string) => {
    addError({ message, severity: 'error', details, source });
  }, [addError]);
  
  const logFatal = useCallback((message: string, details?: any, source?: string) => {
    addError({ message, severity: 'fatal', details, source });
  }, [addError]);
  
  // Create the context value
  const contextValue: ErrorContextType = {
    errors,
    hasErrors: errors.length > 0,
    addError,
    removeError,
    clearErrors,
    logInfo,
    logWarning,
    logError,
    logFatal,
  };
  
  return (
    <ErrorContext.Provider value={contextValue}>
      {children}
    </ErrorContext.Provider>
  );
}

// Create a hook for consuming the context
export function useErrorContext() {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useErrorContext must be used within an ErrorProvider');
  }
  return context;
}

// Export a hook for adding errors
export function useErrorLogger() {
  const { logInfo, logWarning, logError, logFatal } = useErrorContext();
  return { logInfo, logWarning, logError, logFatal };
}