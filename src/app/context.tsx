import * as React from 'react';
import { ApplicationContextValues, applicationContextInitialValue, Popup } from './helpers';

const ApplicationContext = React.createContext<ApplicationContextValues>(applicationContextInitialValue);
function useApplicationContext() {
  return React.useContext(ApplicationContext);
}

function usePopup<T = undefined>(): Popup<T> {
  const [isShown, setIsShown] = React.useState(false);
  const [options, setOptions] = React.useState(null);

  return {
    isShown,
    options,
    show: _options => {
      setOptions(_options);
      setIsShown(true);
    },
    hide: () => {
      setIsShown(false);
    },
  };
}

export { ApplicationContext, usePopup, useApplicationContext };
