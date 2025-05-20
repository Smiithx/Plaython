"use client";

import React, { useEffect } from 'react';
import { X, AlertCircle, AlertTriangle, Info, XCircle } from 'lucide-react';
import { useErrorContext, AppError, ErrorSeverity } from '@/contexts/error-context';

interface ErrorToastProps {
  error: AppError;
  onClose: () => void;
  autoClose?: boolean;
  autoCloseDelay?: number;
}

/**
 * Get the appropriate icon for the error severity
 */
function getErrorIcon(severity: ErrorSeverity) {
  switch (severity) {
    case 'info':
      return <Info className="h-5 w-5 text-blue-400" />;
    case 'warning':
      return <AlertTriangle className="h-5 w-5 text-amber-400" />;
    case 'error':
      return <AlertCircle className="h-5 w-5 text-red-400" />;
    case 'fatal':
      return <XCircle className="h-5 w-5 text-red-600" />;
    default:
      return <AlertCircle className="h-5 w-5 text-red-400" />;
  }
}

/**
 * Get the appropriate background color for the error severity
 */
function getErrorBackground(severity: ErrorSeverity) {
  switch (severity) {
    case 'info':
      return 'bg-blue-900/20 border-blue-800';
    case 'warning':
      return 'bg-amber-900/20 border-amber-800';
    case 'error':
      return 'bg-red-900/20 border-red-800';
    case 'fatal':
      return 'bg-red-900/30 border-red-900';
    default:
      return 'bg-red-900/20 border-red-800';
  }
}

/**
 * A toast component for displaying an error
 */
export function ErrorToast({ error, onClose, autoClose = true, autoCloseDelay = 5000 }: ErrorToastProps) {
  // Auto-close the toast after a delay
  useEffect(() => {
    if (autoClose && error.severity !== 'fatal') {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);
      
      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseDelay, error.severity, onClose]);
  
  return (
    <div className={`p-4 rounded-lg border ${getErrorBackground(error.severity)} text-white shadow-lg max-w-md w-full`}>
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3">
          {getErrorIcon(error.severity)}
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-white">
              {error.severity === 'info' ? 'Information' : 
               error.severity === 'warning' ? 'Warning' : 
               error.severity === 'error' ? 'Error' : 'Critical Error'}
            </h3>
            
            <button 
              onClick={onClose}
              className="ml-4 text-gray-400 hover:text-white focus:outline-none"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          <p className="mt-1 text-sm text-gray-300">
            {error.message}
          </p>
          
          {error.source && (
            <p className="mt-1 text-xs text-gray-400">
              Source: {error.source}
            </p>
          )}
          
          {error.details && typeof error.details === 'string' && (
            <p className="mt-2 text-xs text-gray-400 bg-black/30 p-2 rounded">
              {error.details}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * A component that displays all errors from the error context as toasts
 */
export function ErrorToastContainer() {
  const { errors, removeError } = useErrorContext();
  
  if (errors.length === 0) {
    return null;
  }
  
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-h-screen overflow-hidden">
      {errors.map(error => (
        <ErrorToast 
          key={error.id} 
          error={error} 
          onClose={() => removeError(error.id)} 
        />
      ))}
    </div>
  );
}