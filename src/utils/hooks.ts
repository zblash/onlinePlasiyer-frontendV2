import React from 'react';
import { ApplicationContext } from '~/context/application';

function useStateFromProp(initialValue) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => setValue(initialValue), [initialValue]);

  return [value, setValue];
}

function useApplicationContext() {
  return React.useContext(ApplicationContext);
}

function usePrevious(value: any) {
  const ref = React.useRef();

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

function useLocalStorage<T>(key: string, initialValue: T | null = null): [T | null, (newVal: T) => void, () => void] {
  const item = JSON.parse(window.localStorage.getItem(key));
  const [storedValue, setStoredValue] = React.useState(item || initialValue);

  React.useEffect(() => {
    setStoredValue(item);
  }, [item]);

  const setValue = value => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };
  const removeItem = () => {
    localStorage.removeItem(key);
    setStoredValue(null);
  };

  return [storedValue, setValue, removeItem];
}

export { useStateFromProp, useApplicationContext, usePrevious, useKeepValue, useLocalStorage };