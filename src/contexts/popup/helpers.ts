import { CategoryPopupUpdateCategoryValues } from '~/components/popups/category-create-or-update';
import { ProductPopupValues } from '~/components/popups/product-create-or-update';
import { CategoryDeletePopupParams } from '~/components/popups/category-delete';

export interface Popup<T = undefined> {
  isShown: boolean;
  show: T extends undefined ? (options?: T) => void : (options: T) => void;
  hide: () => void;
  options: T;
}

export interface PopupContextType {
  createCategory: Popup;
  updateCategory: Popup<CategoryPopupUpdateCategoryValues>;
  createProduct: Popup<ProductPopupValues>;
  deleteCategory: Popup<CategoryDeletePopupParams>;
}
