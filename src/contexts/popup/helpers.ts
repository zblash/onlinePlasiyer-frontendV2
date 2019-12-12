import { CategoryPopupUpdateCategoryValues } from '~/components/popups/category-create-or-update';
import { ProductPopupValues } from '~/components/popups/product-create-or-update';
import { CategoryDeletePopupParams } from '~/components/popups/category-delete';
import { ProductDeletePopupParams } from '~/components/popups/product-delete';
import { ProductSpecifyDeletePopupParams } from '~/components/popups/product-specify-delete';
import { UpdateOrderPopupParams } from '~/components/popups/update-order-popup';
import { AddBarcodePopupParams } from '~/components/popups/add-barcode-popup';

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
}
