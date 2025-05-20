import { useState, useEffect, useCallback, useRef } from 'react';

// Simple in-memory cache for client-side caching
type CacheEntry<T> = {
  data: T;
  timestamp: number;
  params: string; // Stringified params for cache key
};

const cache = new Map<string, CacheEntry<any>>();

// Default cache TTL (time to live) in milliseconds
const DEFAULT_CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * A generic hook for data fetching with loading and error states and client-side caching.
 * 
 * @template T The type of data to be fetched
 * @param fetchFn The async function that fetches the data
 * @param initialData Optional initial data
 * @param immediate Whether to fetch data immediately on mount
 * @param cacheOptions Caching options
 * @returns An object containing the data, loading state, error state, and a function to trigger the fetch
 */
export function useFetch<T, P extends any[] = []>(
  fetchFn: (...params: P) => Promise<T>,
  initialData?: T,
  immediate: boolean = false,
  cacheOptions: {
    enabled?: boolean;
    ttl?: number;
    cacheKey?: string;
  } = {}
) {
  const {
    enabled = true, // Enable caching by default
    ttl = DEFAULT_CACHE_TTL,
    cacheKey = fetchFn.name || 'anonymous',
  } = cacheOptions;

  const [data, setData] = useState<T | undefined>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(immediate);
  const [error, setError] = useState<Error | null>(null);
  const isMounted = useRef(true);

  // Function to get a cache key based on function name and parameters
  const getCacheKey = useCallback((params: P): string => {
    return `${cacheKey}:${JSON.stringify(params)}`;
  }, [cacheKey]);

  // Function to check if cache entry is valid
  const isCacheValid = useCallback((entry: CacheEntry<T>): boolean => {
    return Date.now() - entry.timestamp < ttl;
  }, [ttl]);

  const execute = useCallback(async (...params: P) => {
    // Check cache first if caching is enabled
    if (enabled) {
      const key = getCacheKey(params);
      const cachedEntry = cache.get(key) as CacheEntry<T> | undefined;

      if (cachedEntry && isCacheValid(cachedEntry)) {
        // Use cached data
        setData(cachedEntry.data);
        return { success: true, data: cachedEntry.data, error: null, fromCache: true };
      }
    }

    try {
      setIsLoading(true);
      setError(null);
      const result = await fetchFn(...params);

      // Only update state if component is still mounted
      if (isMounted.current) {
        setData(result);
      }

      // Cache the result if caching is enabled
      if (enabled) {
        const key = getCacheKey(params);
        cache.set(key, {
          data: result,
          timestamp: Date.now(),
          params: JSON.stringify(params),
        });
      }

      return { success: true, data: result, error: null, fromCache: false };
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error('An unknown error occurred');
      console.error('Error in useFetch:', errorObj);

      // Only update state if component is still mounted
      if (isMounted.current) {
        setError(errorObj);
      }

      return { success: false, data: undefined, error: errorObj, fromCache: false };
    } finally {
      // Only update state if component is still mounted
      if (isMounted.current) {
        setIsLoading(false);
      }
    }
  }, [fetchFn, enabled, getCacheKey, isCacheValid]);

  // Clear cache for this fetch function
  const clearCache = useCallback(() => {
    // Remove all entries that start with this cache key
    for (const key of cache.keys()) {
      if (key.startsWith(cacheKey)) {
        cache.delete(key);
      }
    }
  }, [cacheKey]);

  useEffect(() => {
    if (immediate) {
      execute([] as unknown as P);
    }

    // Cleanup function to prevent memory leaks
    return () => {
      isMounted.current = false;
    };
  }, [execute, immediate]);

  return {
    data,
    isLoading,
    error,
    execute,
    setData, // Allow manual updates to the data
    clearCache, // Allow clearing the cache
  };
}

/**
 * A hook for data fetching with automatic retries on failure and client-side caching.
 * 
 * @template T The type of data to be fetched
 * @param fetchFn The async function that fetches the data
 * @param options Configuration options for retries and caching
 * @returns An object containing the data, loading state, error state, and a function to trigger the fetch
 */
export function useFetchWithRetry<T, P extends any[] = []>(
  fetchFn: (...params: P) => Promise<T>,
  options: {
    initialData?: T;
    immediate?: boolean;
    maxRetries?: number;
    retryDelay?: number;
    cacheOptions?: {
      enabled?: boolean;
      ttl?: number;
      cacheKey?: string;
    };
  } = {}
) {
  const {
    initialData,
    immediate = false,
    maxRetries = 3,
    retryDelay = 1000,
    cacheOptions = {},
  } = options;

  const {
    enabled = true, // Enable caching by default
    ttl = DEFAULT_CACHE_TTL,
    cacheKey = fetchFn.name || 'anonymous',
  } = cacheOptions;

  const [data, setData] = useState<T | undefined>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(immediate);
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState<number>(0);
  const isMounted = useRef(true);

  // Function to get a cache key based on function name and parameters
  const getCacheKey = useCallback((params: P): string => {
    return `${cacheKey}:${JSON.stringify(params)}`;
  }, [cacheKey]);

  // Function to check if cache entry is valid
  const isCacheValid = useCallback((entry: CacheEntry<T>): boolean => {
    return Date.now() - entry.timestamp < ttl;
  }, [ttl]);

  const execute = useCallback(async (...params: P) => {
    // Check cache first if caching is enabled
    if (enabled) {
      const key = getCacheKey(params);
      const cachedEntry = cache.get(key) as CacheEntry<T> | undefined;

      if (cachedEntry && isCacheValid(cachedEntry)) {
        // Use cached data
        setData(cachedEntry.data);
        return { success: true, data: cachedEntry.data, error: null, fromCache: true, retryCount: 0 };
      }
    }

    let currentRetry = 0;
    setRetryCount(0);

    const attemptFetch = async (): Promise<{ 
      success: boolean; 
      data?: T; 
      error: Error | null;
      fromCache?: boolean;
      retryCount: number;
    }> => {
      try {
        if (isMounted.current) {
          setIsLoading(true);
          setError(null);
        }

        const result = await fetchFn(...params);

        // Only update state if component is still mounted
        if (isMounted.current) {
          setData(result);
        }

        // Cache the result if caching is enabled
        if (enabled) {
          const key = getCacheKey(params);
          cache.set(key, {
            data: result,
            timestamp: Date.now(),
            params: JSON.stringify(params),
          });
        }

        return { success: true, data: result, error: null, fromCache: false, retryCount: currentRetry };
      } catch (err) {
        const errorObj = err instanceof Error ? err : new Error('An unknown error occurred');

        if (currentRetry < maxRetries) {
          currentRetry++;

          // Only update state if component is still mounted
          if (isMounted.current) {
            setRetryCount(currentRetry);
          }

          console.warn(`Retry attempt ${currentRetry}/${maxRetries} after error:`, errorObj);

          // Wait for the specified delay before retrying
          await new Promise(resolve => setTimeout(resolve, retryDelay));
          return attemptFetch();
        }

        console.error('Error in useFetchWithRetry after all retries:', errorObj);

        // Only update state if component is still mounted
        if (isMounted.current) {
          setError(errorObj);
        }

        return { success: false, error: errorObj, fromCache: false, retryCount: currentRetry };
      } finally {
        if ((currentRetry === maxRetries || currentRetry === 0) && isMounted.current) {
          setIsLoading(false);
        }
      }
    };

    return attemptFetch();
  }, [fetchFn, maxRetries, retryDelay, enabled, getCacheKey, isCacheValid]);

  // Clear cache for this fetch function
  const clearCache = useCallback(() => {
    // Remove all entries that start with this cache key
    for (const key of cache.keys()) {
      if (key.startsWith(cacheKey)) {
        cache.delete(key);
      }
    }
  }, [cacheKey]);

  useEffect(() => {
    if (immediate) {
      execute([] as unknown as P);
    }

    // Cleanup function to prevent memory leaks
    return () => {
      isMounted.current = false;
    };
  }, [execute, immediate]);

  return {
    data,
    isLoading,
    error,
    retryCount,
    execute,
    setData,
    clearCache, // Allow clearing the cache
  };
}
