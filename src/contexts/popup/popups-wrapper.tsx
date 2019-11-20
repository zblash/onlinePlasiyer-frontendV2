import React from 'react';
import { PopupContextType } from './helpers';
import { Popup } from '~/components/ui/popup';
import { CategoryPopup } from '~/components/popups/category-create-or-update';
import { ProductPopup } from '~/components/popups/product-create-or-update';
import { CategoryDeletePopup } from '~/components/popups/category-delete';

interface PopupsWrapperProps extends PopupContextType {}

function PopupsWrapper(props: PopupsWrapperProps) {
  return (
    <>
      <Popup onClose={props.createCategory.hide} isShown={props.createCategory.isShown}>
        <CategoryPopup type="create" />
      </Popup>
      <Popup onClose={props.updateCategory.hide} isShown={props.updateCategory.isShown}>
        <CategoryPopup type="update" params={props.updateCategory.options} />
      </Popup>
      <Popup onClose={props.createProduct.hide} isShown={props.createProduct.isShown}>
        <ProductPopup params={props.createProduct.options} />
      </Popup>
      <Popup onClose={props.deleteCategory.hide} isShown={props.deleteCategory.isShown}>
        <CategoryDeletePopup params={props.deleteCategory.options} />
      </Popup>
    </>
  );
}

export { PopupsWrapper };
