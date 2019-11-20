import { CategoryPopupUpdateCategoryValues } from '~/components/popups/category-create-or-update';
import { ProductPopupValues } from '~/components/popups/product-create-or-update';
import { CategoryDeletePopupParams } from '~/components/popups/category-delete';
import { ProductDeletePopupParams } from '~/components/popups/product-delete';

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
  deleteProduct: Popup<ProductDeletePopupParams>;
}
