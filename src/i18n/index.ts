import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// eslint-disable-next-line global-require,@typescript-eslint/no-var-requires
const translation = require('../../statics/translation.json');

const i18nResource = {};

Object.keys(translation).forEach(key => {
  i18nResource[key] = {
    translation: translation[key],
  };
});

i18n.use(initReactI18next).init({
  resources: {
    ...i18nResource,
  },
  lng: 'tr',
  fallbackLng: 'tr',
  interpolation: {
    escapeValue: false,
  },
});
