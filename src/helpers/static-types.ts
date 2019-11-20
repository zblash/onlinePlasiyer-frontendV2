export type TranslationKeys =
  | 'common.login'
  | 'common.create'
  | 'common.update'
  | 'common.next'
  | 'common.add'
  | 'product-popup.category-input-placeholder'
  | 'not-connect-page.message'
  | 'popups.delete-category.are-you-sure-question'
  | 'popups.delete-category.cancel'
  | 'popups.delete-category.delete';
export interface StaticColorType {
  white: string;
  whiteSolid: string;
  primaryDark: string;
  primary: string;
  gray: string;
  lightGray: string;
  danger: string;
  deletePopup: StaticColorDeletePopup;
}
interface StaticColorDeletePopup {
  danger: string;
}
