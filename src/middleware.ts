import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import createI18nMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/config';

/**
 * NOTE: This file requires the next-intl library to be installed.
 * Install it with: pnpm add next-intl
 */

// Create the internationalization middleware
const i18nMiddleware = createI18nMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed'
});

// Create a route matcher for protected routes
const isProtectedRoute = createRouteMatcher(["/api(.*)", "/dashboard(.*)"]);

// Combine Clerk authentication and internationalization middleware
export default async function middleware(request: NextRequest) {
  // First, handle internationalization
  const i18nResponse = i18nMiddleware(request);

  // Then, handle authentication with Clerk
  const authMiddleware = clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) {
      await auth.protect();
    }
    return NextResponse.next();
  });

  // If i18n middleware redirected, use that response
  if (i18nResponse.status !== 200) {
    return i18nResponse;
  }

  // Otherwise, continue with auth middleware
  return authMiddleware(request);
}

// Configure the middleware to match all routes except for static files
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
