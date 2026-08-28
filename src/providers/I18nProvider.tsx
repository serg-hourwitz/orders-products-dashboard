'use client';

import { useEffect, type ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';

import i18n, {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
} from '@/i18n/config';

interface I18nProviderProps {
  children: ReactNode;
}

const supportedLanguages = ['en', 'uk'];

export const I18nProvider = ({
  children,
}: I18nProviderProps) => {
  useEffect(() => {
    const storedLanguage = window.localStorage.getItem(
      LANGUAGE_STORAGE_KEY,
    );

    const language =
      storedLanguage &&
      supportedLanguages.includes(storedLanguage)
        ? storedLanguage
        : DEFAULT_LANGUAGE;

    void i18n.changeLanguage(language);

    document.documentElement.lang = language;
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
};
