import React from 'react';
import { PopupContextType } from './helpers';
import { Popup } from '~/components/ui/popup';
import { CategoryPopup } from '~/components/popups/category-create-or-update';
import { ProductPopup } from '~/components/popups/product-create-or-update';
import { CategoryDeletePopup } from '~/components/popups/category-delete';
import { ProductDeletePopup } from '~/components/popups/product-delete';

interface PopupsWrapperProps extends PopupContextType {}

function PopupsWrapper(props: PopupsWrapperProps) {
  const popupMapArray = [
    { ...props.createCategory, comp: <CategoryPopup type="create" /> },
    { ...props.updateCategory, comp: <CategoryPopup type="update" params={props.updateCategory.params} /> },
    { ...props.createProduct, comp: <ProductPopup params={props.createProduct.params} /> },
    {
      ...props.deleteCategory,
      comp: <CategoryDeletePopup params={props.deleteCategory.params} />,
    },
    { ...props.deleteProduct, comp: <ProductDeletePopup params={props.deleteProduct.params} /> },
  ];
  return (
    <>
      {popupMapArray.map((item, index) => (
        <Popup onClose={item.hide} isShown={item.isShown} key={`popup${index}`}>
          {item.comp}
        </Popup>
      ))}
    </>
  );
}

export { PopupsWrapper };
