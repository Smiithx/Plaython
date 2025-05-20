import { AppError, ErrorSeverity } from '@/contexts/error-context';

/**
 * Custom error class for application errors
 */
export class ApplicationError extends Error {
  severity: ErrorSeverity;
  details?: any;
  source?: string;

  constructor(message: string, severity: ErrorSeverity = 'error', details?: any, source?: string) {
    super(message);
    this.name = 'ApplicationError';
    this.severity = severity;
    this.details = details;
    this.source = source;
  }

  /**
   * Convert to AppError format for the error context
   */
  toAppError(): Omit<AppError, 'id' | 'timestamp'> {
    return {
      message: this.message,
      severity: this.severity,
      details: this.details,
      source: this.source,
    };
  }
}

/**
 * Create an info level error
 */
export function createInfoError(message: string, details?: any, source?: string): ApplicationError {
  return new ApplicationError(message, 'info', details, source);
}

/**
 * Create a warning level error
 */
export function createWarningError(message: string, details?: any, source?: string): ApplicationError {
  return new ApplicationError(message, 'warning', details, source);
}

/**
 * Create an error level error
 */
export function createError(message: string, details?: any, source?: string): ApplicationError {
  return new ApplicationError(message, 'error', details, source);
}

/**
 * Create a fatal level error
 */
export function createFatalError(message: string, details?: any, source?: string): ApplicationError {
  return new ApplicationError(message, 'fatal', details, source);
}

/**
 * Safely execute a function and handle any errors
 * @param fn The function to execute
 * @param errorHandler A function to handle any errors
 * @returns The result of the function or undefined if an error occurred
 */
export async function tryCatch<T>(
  fn: () => Promise<T>,
  errorHandler: (error: Error) => void
): Promise<T | undefined> {
  try {
    return await fn();
  } catch (error) {
    const appError = error instanceof ApplicationError
      ? error
      : new ApplicationError(
          error instanceof Error ? error.message : 'An unknown error occurred',
          'error',
          error
        );
    
    errorHandler(appError);
    return undefined;
  }
}

/**
 * Safely execute a function and handle any errors with a default value
 * @param fn The function to execute
 * @param defaultValue The default value to return if an error occurs
 * @param errorHandler A function to handle any errors
 * @returns The result of the function or the default value if an error occurred
 */
export async function tryCatchWithDefault<T>(
  fn: () => Promise<T>,
  defaultValue: T,
  errorHandler: (error: Error) => void
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    const appError = error instanceof ApplicationError
      ? error
      : new ApplicationError(
          error instanceof Error ? error.message : 'An unknown error occurred',
          'error',
          error
        );
    
    errorHandler(appError);
    return defaultValue;
  }
}

/**
 * Parse and enhance an error from any source
 * @param error The error to parse
 * @param defaultMessage The default message to use if the error doesn't have one
 * @param severity The severity level to assign
 * @param source The source of the error
 * @returns An ApplicationError
 */
export function parseError(
  error: unknown,
  defaultMessage = 'An unknown error occurred',
  severity: ErrorSeverity = 'error',
  source?: string
): ApplicationError {
  if (error instanceof ApplicationError) {
    return error;
  }
  
  if (error instanceof Error) {
    return new ApplicationError(error.message, severity, error, source);
  }
  
  if (typeof error === 'string') {
    return new ApplicationError(error, severity, undefined, source);
  }
  
  return new ApplicationError(defaultMessage, severity, error, source);
}