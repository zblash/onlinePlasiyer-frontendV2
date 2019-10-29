import React from 'react';
import { ApplicationContext } from '~/app/context';
import { ServicesContext } from '~/services/context';

function useStateFromProp<T>(initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => setValue(initialValue), [initialValue]);

  return [value, setValue];
}

function useApplicationContext() {
  return React.useContext(ApplicationContext);
}

function useServicesContext() {
  return React.useContext(ServicesContext);
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

export { useStateFromProp, useApplicationContext, usePrevious, useKeepValue, useStateWithCallback, useServicesContext };
