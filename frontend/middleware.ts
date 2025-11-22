import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n/request';

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale: 'en',

  // Automatically detect user's preferred language
  localeDetection: true,

  // Default locale doesn't need prefix for cleaner URLs
  localePrefix: 'as-needed',
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en|zh|es|ar|pt|id|fr|ja|ru|de)/:path*'],
};

