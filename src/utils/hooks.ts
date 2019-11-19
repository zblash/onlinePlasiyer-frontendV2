import React from 'react';
import {
  useTranslation as i18nUseTranslation,
  UseTranslationResponse as i18nUseTranslationResponse,
} from 'react-i18next';
import { TranslationKeys } from '~/helpers/static-types';

type UseTranslationResponse = Omit<i18nUseTranslationResponse, 't'> & { t: (str: TranslationKeys) => string };

function useStateFromProp<T>(initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => setValue(initialValue), [initialValue]);

  return [value, setValue];
}

function usePrevious<T>(value: T): T {
  const ref = React.useRef<T>();

  React.useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

function useKeepValue<T>(value: T | undefined, wantedValue: T): T {
  const constantWantedValue = React.useRef(wantedValue).current;
  const ref = React.useRef(value);

  if (ref.current !== constantWantedValue && value !== ref.current) {
    ref.current = value;
  }

  return ref.current;
}

function useStateWithCallback<T>(
  initialState: T,
  callback: (s: T) => void,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = React.useState(initialState);

  React.useEffect(() => callback(state), [state, callback]);

  return [state, setState];
}

function useTranslation(): UseTranslationResponse {
  const i18nTranlation = i18nUseTranslation();

  return {
    ...i18nTranlation,
    t: str => i18nTranlation.t(str as string),
  };
}

export { useStateFromProp, usePrevious, useKeepValue, useStateWithCallback, useTranslation };
