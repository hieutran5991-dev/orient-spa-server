import type { Locale } from './constants';

/**
 * Dynamically load page-specific translations
 * This allows for code-splitting and only loading necessary translations
 */
export async function loadPageTranslations(locale: Locale, page: string) {
    try {
        const messages = await import(`../locales/${locale}/${page}.json`);
        return messages.default;
    } catch (error) {
        console.warn(`Failed to load translations for ${page} in ${locale}:`, error);
        return {};
    }
}

/**
 * Load multiple page translations at once
 */
export async function loadMultiplePageTranslations(locale: Locale, pages: string[]) {
    try {
        const translationPromises = pages.map(page => loadPageTranslations(locale, page));
        const results = await Promise.all(translationPromises);

        // Merge all translations into one object
        return results.reduce((acc, messages) => ({ ...acc, ...messages }), {});
    } catch (error) {
        console.warn(`Failed to load multiple page translations for ${locale}:`, error);
        return {};
    }
}

/**
 * Predefined page translation loaders for common use cases
 */
export const pageTranslationLoaders = {
    home: (locale: Locale) => loadPageTranslations(locale, 'home'),
    booking: (locale: Locale) => loadPageTranslations(locale, 'booking'),
    services: (locale: Locale) => loadPageTranslations(locale, 'services'),
    promotions: (locale: Locale) => loadPageTranslations(locale, 'promotions'),
    contact: (locale: Locale) => loadPageTranslations(locale, 'contact'),
    confirm: (locale: Locale) => loadPageTranslations(locale, 'confirm'),
} as const;
