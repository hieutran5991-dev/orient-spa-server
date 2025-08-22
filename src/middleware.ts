import createMiddleware from 'next-intl/middleware';
import { SUPPORTED_LANGUAGE, DEFAULT_LANGUAGE } from '@/utils/constants';

export default createMiddleware({
  locales: SUPPORTED_LANGUAGE,
  defaultLocale: DEFAULT_LANGUAGE,
  localePrefix: 'always'
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
