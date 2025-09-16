import createMiddleware from 'next-intl/middleware';
import { SUPPORTED_LOCALE_PATH, DEFAULT_LOCALE_PATH } from '@/utils/constants';
import type { LocalePrefix } from "next-intl/routing";

export default createMiddleware({
  locales: SUPPORTED_LOCALE_PATH,
  defaultLocale: DEFAULT_LOCALE_PATH,
  localePrefix: 'as-needed' as LocalePrefix
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
