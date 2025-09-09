import createMiddleware from 'next-intl/middleware';
import { SUPPORTED_LANGUAGE, DEFAULT_LANGUAGE } from '@/utils/constants';
import type { LocalePrefix } from "next-intl/dist/types/routing/types";

export default createMiddleware({
  locales: SUPPORTED_LANGUAGE,
  defaultLocale: DEFAULT_LANGUAGE,
  localePrefix: 'as-needed' as LocalePrefix
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
