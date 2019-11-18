import * as React from 'react';
import { Popup, PopupContextType } from './helpers';

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

const emptyPopup: Popup = {
  isShown: false,
  options: undefined,
  show: () => {},
  hide: () => {},
};

const initialValue: PopupContextType = {
  createCategory: emptyPopup,
  updateCategory: emptyPopup,
  createProduct: emptyPopup,
};
const PopupContext = React.createContext<PopupContextType>(initialValue);

function usePopupContext() {
  return React.useContext(PopupContext);
}

export { usePopup, usePopupContext, PopupContext };
