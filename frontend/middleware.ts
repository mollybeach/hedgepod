import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n/request';

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale: 'en',

  // Automatically detect user's preferred language
  localeDetection: true,

  // Optional: Customize the locale prefix
  localePrefix: 'as-needed', // Will only add prefix for non-default locales
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en|zh|es|ar|pt|id|fr|ja|ru|de)/:path*'],
};

