// TEMPORARILY DISABLED FOR TESTING - RE-ENABLE LATER
// Original i18n middleware moved to _i18n_disabled folder

/*
import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n/request';

export default createMiddleware({
  locales,
  defaultLocale: 'en',
  localeDetection: true,
  localePrefix: 'as-needed',
});

export const config = {
  matcher: ['/', '/(en|zh|es|ar|pt|id|fr|ja|ru|de|hi|ko|pl|ca|ms|th|zh-TW|nl|es-419)/:path*'],
};
*/

// Passthrough middleware (does nothing)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
