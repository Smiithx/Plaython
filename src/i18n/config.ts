/**
 * Internationalization (i18n) configuration for the Plaython project
 * 
 * NOTE: This file requires the next-intl library to be installed.
 * Install it with: pnpm add next-intl
 */

import { getRequestConfig } from 'next-intl/server';

// Define the list of supported locales
export const locales = ['en', 'es', 'fr', 'de'];
export const defaultLocale = 'es';

// Configure next-intl
export default getRequestConfig(async ({ locale }) => {
  // Load the translations for the requested locale
  const language = locale ?? defaultLocale;
  const messages = (await import(`./messages/${language}.json`)).default;
  
  return {
    locale: language,
    messages,
    // You can add date, number, and time formatting options here
    timeZone: 'UTC',
    now: new Date(),
  };
});

/**
 * Helper function to get the locale from the pathname
 */
export function getLocaleFromPathname(pathname: string): string | undefined {
  const segments = pathname.split('/');
  // The locale is the first segment after the initial slash
  const localeSegment = segments[1];
  
  return locales.includes(localeSegment) ? localeSegment : undefined;
}

/**
 * Helper function to remove the locale from the pathname
 */
export function removeLocaleFromPathname(pathname: string): string {
  const locale = getLocaleFromPathname(pathname);
  
  if (!locale) {
    return pathname;
  }
  
  // Remove the locale segment from the pathname
  return pathname.replace(`/${locale}`, '') || '/';
}