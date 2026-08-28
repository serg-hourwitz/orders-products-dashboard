'use client';

import { useTranslation } from 'react-i18next';

import {
  LANGUAGE_STORAGE_KEY,
} from '@/i18n/config';

import './LanguageSwitcher.scss';

type Language = 'en' | 'uk';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (
    language: Language,
  ) => {
    void i18n.changeLanguage(language);

    window.localStorage.setItem(
      LANGUAGE_STORAGE_KEY,
      language,
    );

    document.documentElement.lang = language;
  };

  const currentLanguage =
    i18n.resolvedLanguage === 'uk' ? 'uk' : 'en';

  return (
    <div
      className="language-switcher"
      aria-label="Language selection"
    >
      <button
        type="button"
        className={`language-switcher__button ${
          currentLanguage === 'en'
            ? 'language-switcher__button--active'
            : ''
        }`}
        onClick={() => handleLanguageChange('en')}
      >
        EN
      </button>

      <button
        type="button"
        className={`language-switcher__button ${
          currentLanguage === 'uk'
            ? 'language-switcher__button--active'
            : ''
        }`}
        onClick={() => handleLanguageChange('uk')}
      >
        UK
      </button>
    </div>
  );
};
