// client/src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Adjust the paths if needed based on your project structure:
import translationEN from '../../public/locales/en/translation.json';
import translationES from '../../public/locales/es/translation.json';

// Get the saved language from local storage (or fallback to English)
const savedLanguage = localStorage.getItem('lang') || 'en';

const resources = {
  en: { translation: translationEN },
  es: { translation: translationES }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage, // Use the saved language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
