import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { DEFAULT_LANGUAGE } from '../config';
import translationsEN from './translations/en.json';

const resources = {
  en: {
    translation: translationsEN
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: DEFAULT_LANGUAGE,
  keySeparator: false,
  interpolation: {
    escapeValue: true
  }
});

export default i18n;
