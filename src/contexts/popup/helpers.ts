import { CategoryPopupUpdateCategoryValues } from '~/components/common/popups/category';
import { ProductPopupValues } from '~/components/common/popups/product';

export interface Popup<T = undefined> {
  isShown: boolean;
  show: (options?: T) => void;
  hide: () => void;
  options: T;
}

export interface PopupContextType {
  createCategory: Popup;
  updateCategory: Popup<CategoryPopupUpdateCategoryValues>;
  createProduct: Popup<ProductPopupValues>;
}
