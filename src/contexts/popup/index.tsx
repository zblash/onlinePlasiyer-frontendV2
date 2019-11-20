import * as React from 'react';
import { PopupContext, usePopup } from './context';
import { PopupsWrapper } from './popups-wrapper';
import { PopupContextType } from './helpers';

/* PopupContextProvider Helpers */
interface PopupContextProviderProps {}

function PopupContextProvider(props: React.PropsWithChildren<PopupContextProviderProps>) {
  const value: PopupContextType = {
    createCategory: usePopup(),
    updateCategory: usePopup(),
    createProduct: usePopup(),
    deleteCategory: usePopup(),
  };

  return (
    <PopupContext.Provider value={value}>
      {props.children}
      <PopupsWrapper {...value} />
    </PopupContext.Provider>
  );
}

const _PopupContextProvider = PopupContextProvider;

export { _PopupContextProvider as PopupContextProvider };
