import * as React from 'react';
import { PopupContext, usePopup } from './context';
import { PopupsWrapper } from './popups-wrapper';

/* PopupContextProvider Helpers */
interface PopupContextProviderProps {}

function PopupContextProvider(props: React.PropsWithChildren<PopupContextProviderProps>) {
  const createCategory = usePopup();
  const updateCategory = usePopup();
  const createProduct = usePopup();

  return (
    <PopupContext.Provider
      value={{
        createCategory,
        updateCategory,
        createProduct,
      }}
    >
      {props.children}
      <PopupsWrapper createCategory={createCategory} updateCategory={updateCategory} createProduct={createProduct} />
    </PopupContext.Provider>
  );
}

const _PopupContextProvider = PopupContextProvider;

export { _PopupContextProvider as PopupContextProvider };
