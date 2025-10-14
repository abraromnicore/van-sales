import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { convertToEasternArabic } from '../utils/utils';
import en from './langs/en.json';
import ar from './langs/ar.json';

const resources = {
  en: { translation: en },
  ar: { translation: ar },
};
i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'ar'],
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    react: {
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
    },
  });

const compareObjects = (
  enObj: {
    [x: string]: any;
  },
  arObj: {
    [x: string]: any;
  },
  path = '',
) => {
  for (const key of Object.keys(enObj)) {
    if (!(key in arObj)) {
      console.log(`${path}${key}: ${enObj[key]}`);
      continue;
    }

    if (typeof enObj[key] === 'object') {
      //eslint-disable-next-line
      compareObjects(enObj[key], arObj[key], `${path}${key}.`);
    }
  }
};

if (i18n && i18n.services && i18n.services.formatter) {
  i18n.services.formatter.add(
    'arabicToEasternArabic',
    (value, lng, options) => {
      console.log(lng);
      return value.replace(
        options.numbers || options.count || 0,
        convertToEasternArabic(options.numbers || options.count || 0),
      );
    },
  );
}
export default i18n;