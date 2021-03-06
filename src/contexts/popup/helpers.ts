import { CategoryPopupUpdateCategoryValues } from '~/components/popups/category-create-or-update';
import { ProductPopupValues } from '~/components/popups/product-create-or-update';
import { CategoryDeletePopupParams } from '~/components/popups/category-delete';
import { ProductDeletePopupParams } from '~/components/popups/product-delete';
import { ProductSpecifyDeletePopupParams } from '~/components/popups/product-specify-delete';
import { UpdateOrderPopupParams } from '~/components/popups/update-order-popup';
import { AddBarcodePopupParams } from '~/components/popups/add-barcode-popup';
import { RemoveBarcodePopupParams } from '~/components/popups/remove-barcode-popup';
import { RemoveAnnouncementPopupParams } from '~/components/popups/remove-announcement-popup';
import { RemoveNotificationPopupParams } from '~/components/popups/remove-notification-popup';
import { EditCreditPopupParams } from '~/components/popups/edit-credit-popup';
import { EditObligationPopupParams } from '~/components/popups/edit-obligation-popup';
import { SetCommissionPopupParams } from '~/components/popups/set-commission-popup';

export interface Popup<O = undefined> {
  isShown: boolean;
  show: O extends undefined ? (options?: O) => void : (options: O) => void;
  hide: () => void;
  params: O;
}

export interface PopupContextType {
  createCategory: Popup;
  updateCategory: Popup<CategoryPopupUpdateCategoryValues>;
  deleteCategory: Popup<CategoryDeletePopupParams>;
  createProduct: Popup<ProductPopupValues>;
  updateProduct: Popup<ProductPopupValues>;
  deleteProduct: Popup<ProductDeletePopupParams>;
  addActiveState: Popup;
  deleteProductSpecify: Popup<ProductSpecifyDeletePopupParams>;
  updateOrder: Popup<UpdateOrderPopupParams>;
  addBarcode: Popup<AddBarcodePopupParams>;
  removeBarcode: Popup<RemoveBarcodePopupParams>;
  removeAnnouncement: Popup<RemoveAnnouncementPopupParams>;
  removeNotification: Popup<RemoveNotificationPopupParams>;
  editCredit: Popup<EditCreditPopupParams>;
  editObligation: Popup<EditObligationPopupParams>;
  setCommission: Popup<SetCommissionPopupParams>;
}
