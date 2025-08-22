'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import type { Locale } from '@/utils/constants';
import { loadPageTranslations } from '@/utils/translations';

/**
 * Hook for dynamically loading page-specific translations
 * This provides better performance by only loading necessary translations
 */
export function usePageTranslations(page: string) {
    const locale = useLocale() as Locale;
    const [translations, setTranslations] = useState<Record<string, any>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const loadTranslations = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const pageTranslations = await loadPageTranslations(locale, page);

                if (isMounted) {
                    setTranslations(pageTranslations);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err instanceof Error ? err.message : 'Failed to load translations');
                    console.error(`Error loading translations for ${page}:`, err);
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        loadTranslations();

        return () => {
            isMounted = false;
        };
    }, [locale, page]);

    return {
        translations,
        isLoading,
        error,
        locale
    };
}

/**
 * Hook for loading multiple page translations at once
 */
export function useMultiplePageTranslations(pages: string[]) {
    const locale = useLocale() as Locale;
    const [translations, setTranslations] = useState<Record<string, any>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const loadTranslations = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const translationPromises = pages.map(page => loadPageTranslations(locale, page));
                const results = await Promise.all(translationPromises);

                if (isMounted) {
                    // Merge all translations into one object
                    const mergedTranslations = results.reduce((acc, pageTranslations) => ({
                        ...acc,
                        ...pageTranslations
                    }), {});

                    setTranslations(mergedTranslations);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err instanceof Error ? err.message : 'Failed to load translations');
                    console.error(`Error loading multiple page translations:`, err);
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        loadTranslations();

        return () => {
            isMounted = false;
        };
    }, [locale, pages.join(',')]);

    return {
        translations,
        isLoading,
        error,
        locale
    };
}
