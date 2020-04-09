import React from 'react';
import { PopupContextType } from './helpers';
import { Popup } from '~/components/ui/popup';
import { CategoryPopup } from '~/components/popups/category-create-or-update';
import { ProductPopup } from '~/components/popups/product-create-or-update';
import { CategoryDeletePopup } from '~/components/popups/category-delete';
import { ProductDeletePopup } from '~/components/popups/product-delete';
import { AddActiveState } from '~/components/popups/add-active-state-popup';
import { ProductSpecifyDeletePopup } from '~/components/popups/product-specify-delete';
import { UpdateOrderPopup } from '~/components/popups/update-order-popup';
import { AddBarcodePopup } from '~/components/popups/add-barcode-popup';
import { RemoveBarcodePopup } from '~/components/popups/remove-barcode-popup';
import { RemoveAnnouncementPopup } from '~/components/popups/remove-announcement-popup';
import { RemoveNotificationPopup } from '~/components/popups/remove-notification-popup';
import { EditCreditPopup } from '~/components/popups/edit-credit-popup';
import { EditObligationPopup } from '~/components/popups/edit-obligation-popup';
import { SetCommissionPopup } from '~/components/popups/set-commission-popup';

type PopupsWrapperProps = PopupContextType;

function PopupsWrapper(props: PopupsWrapperProps) {
  const popupMapArray = [
    { ...props.createCategory, comp: <CategoryPopup type="create" /> },
    { ...props.updateCategory, comp: <CategoryPopup type="update" params={props.updateCategory.params} /> },
    { ...props.createProduct, comp: <ProductPopup params={props.createProduct.params} type="create" /> },
    {
      ...props.deleteCategory,
      comp: <CategoryDeletePopup params={props.deleteCategory.params} />,
    },
    { ...props.deleteProduct, comp: <ProductDeletePopup params={props.deleteProduct.params} /> },
    { ...props.updateProduct, comp: <ProductPopup params={props.updateProduct.params} type="update" /> },
    { ...props.addActiveState, comp: <AddActiveState /> },
    { ...props.deleteProductSpecify, comp: <ProductSpecifyDeletePopup params={props.deleteProductSpecify.params} /> },
    { ...props.updateOrder, comp: <UpdateOrderPopup params={props.updateOrder.params} /> },
    { ...props.addBarcode, comp: <AddBarcodePopup params={props.addBarcode.params} /> },
    { ...props.removeBarcode, comp: <RemoveBarcodePopup params={props.removeBarcode.params} /> },
    { ...props.removeAnnouncement, comp: <RemoveAnnouncementPopup params={props.removeAnnouncement.params} /> },
    { ...props.removeNotification, comp: <RemoveNotificationPopup params={props.removeNotification.params} /> },
    { ...props.editCredit, comp: <EditCreditPopup params={props.editCredit.params} /> },
    { ...props.editObligation, comp: <EditObligationPopup params={props.editObligation.params} /> },
    { ...props.setCommission, comp: <SetCommissionPopup params={props.setCommission.params} /> },
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
