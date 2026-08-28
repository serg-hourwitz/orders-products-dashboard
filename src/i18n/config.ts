import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { resources } from './resources';

export const DEFAULT_LANGUAGE = 'en';

export const LANGUAGE_STORAGE_KEY =
  'orders-products-language';

void i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: DEFAULT_LANGUAGE,
    fallbackLng: DEFAULT_LANGUAGE,

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
