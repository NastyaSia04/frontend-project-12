import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import ruTranslation from './locales/ru/translation.json'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ru: { translation: ruTranslation },
    },
    lng: 'ru', // дефолтная локаль
    fallbackLng: 'ru',   // запасная локаль
    interpolation: {
      escapeValue: false, // для React не нужно экранирование
    },
    react: {
      useSuspense: false, // у нас встроенные ресурсы — можно отключить suspense
    },
  })

  export default i18n
  