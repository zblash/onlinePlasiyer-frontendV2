import React from 'react';
import { PopupContextType, Popup as ContextPopupHelper } from './helpers';
import { CategoryPopup } from '~/components/common/popups/category';
import { Popup } from '~/components/ui/popup';
import { ProductPopup } from '~/components/common/popups/product';

interface PopupsWrapperProps extends Record<keyof PopupContextType, ContextPopupHelper> {}

function PopupsWrapper(props: PopupsWrapperProps) {
  return (
    <>
      <Popup onClose={props.createCategory.hide} isShown={props.createCategory.isShown}>
        <CategoryPopup type="create" />
      </Popup>
      <Popup onClose={props.updateCategory.hide} isShown={props.updateCategory.isShown}>
        <CategoryPopup type="update" initialState={props.updateCategory.options} />
      </Popup>
      <Popup onClose={props.createProduct.hide} isShown={props.createProduct.isShown}>
        <ProductPopup />
      </Popup>
    </>
  );
}

export { PopupsWrapper };
