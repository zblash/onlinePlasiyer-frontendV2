import React from 'react';

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

function useWindowEvent<T extends keyof WindowEventMap>(event: T, callback: (e: WindowEventMap[T]) => void) {
  React.useEffect(() => {
    window.addEventListener(event, callback);

    return () => window.removeEventListener(event, callback);
  }, [event, callback]);
}

export { useStateFromProp, usePrevious, useKeepValue, useStateWithCallback, useWindowEvent };
