import * as React from 'react';
import i18n from 'i18next';

import { TranslationKeys } from '~/helpers/static-types';

import {
  initReactI18next,
  useTranslation as i18nUseTranslation,
  UseTranslationResponse as i18nUseTranslationResponse,
  Trans as I18nTransComponent,
  TransProps as i18nTransProps,
} from 'react-i18next';

type UseTranslationResponse = Omit<i18nUseTranslationResponse, 't'> & {
  t: (str: TranslationKeys, options?: any) => string;
};
function useTranslation(): UseTranslationResponse {
  const i18nTranlation = i18nUseTranslation();

  return {
    ...i18nTranlation,
    t: (...args) => i18nTranlation.t(...args),
  };
}

interface TransProps extends Omit<i18nTransProps, 'i18nKey'> {
  i18nKey: TranslationKeys;
}

const Trans: React.SFC<TransProps> = props => <I18nTransComponent {...props} />;

function main() {
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
}

export { main, useTranslation, Trans };
