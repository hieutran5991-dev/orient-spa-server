import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';

export const SUPPORTED_LANGUAGE = ['en', 'vi', 'ja'] as const;
export const DEFAULT_LANGUAGE = 'en' as const;
export type Locale = typeof SUPPORTED_LANGUAGE[number];

export default getRequestConfig(async ({requestLocale}) => {
    const requested = await requestLocale;
    const locale = hasLocale(SUPPORTED_LANGUAGE, requested)
        ? requested
        : DEFAULT_LANGUAGE

  return {
    locale,
    messages: (await import(`../locales/${locale}/common.json`)).default
  };
});
