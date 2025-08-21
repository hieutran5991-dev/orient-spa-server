import createMiddleware from 'next-intl/middleware';
import { SUPPORTED_LANGUAGE, DEFAULT_LANGUAGE } from './lib/i18n';

export default createMiddleware({
  locales: SUPPORTED_LANGUAGE,
  defaultLocale: DEFAULT_LANGUAGE,
  localePrefix: 'as-needed'
});

export const config = {
  matcher: [
    // Match all pathnames except for
    // - API routes
    // - files in public folder
    // - files with file extensions
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|css|fonts|js|images).*)'
  ]
};
