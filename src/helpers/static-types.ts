type DZJMQIGMSQACXNK='common.login';type WDGISEBZIZGNNVQ='common.create';type ADHJVPIOBPHUQOE='common.update';type FXVVUFCKWGPCASR='common.next';type RVOZWSKNKCHVCPQ='common.add';type MNLJGSABWPBBSIK='product-popup.category-input-placeholder';type GHPFWQQSXHRRXQT='not-connect-page.message';type TFOGQEFSCWFZHRS='popups.delete-category.are-you-sure-question';type HAAKLHFMEOHJPEB='popups.delete-category.cancel';type TBLKKZEJXUJWQUJ='popups.delete-category.delete';type EMOURDQHHXXVMZK='popups.remove-product.are-you-sure-question';
export type UseTranslationAllKeys=DZJMQIGMSQACXNK|WDGISEBZIZGNNVQ|ADHJVPIOBPHUQOE|FXVVUFCKWGPCASR|RVOZWSKNKCHVCPQ|MNLJGSABWPBBSIK|GHPFWQQSXHRRXQT|TFOGQEFSCWFZHRS|HAAKLHFMEOHJPEB|TBLKKZEJXUJWQUJ|EMOURDQHHXXVMZK;

export type UseTranslationFunction=<T extends UseTranslationAllKeys>(str:T,
 variables?:T extends DZJMQIGMSQACXNK?never:T extends WDGISEBZIZGNNVQ?never:T extends ADHJVPIOBPHUQOE?never:T extends FXVVUFCKWGPCASR?never:T extends RVOZWSKNKCHVCPQ?never:T extends MNLJGSABWPBBSIK?never:T extends GHPFWQQSXHRRXQT?never:T extends TFOGQEFSCWFZHRS?{categoryName:string}:T extends HAAKLHFMEOHJPEB?never:T extends TBLKKZEJXUJWQUJ?never:{productName:string})=>string
  

export type TransComponentKeys='product-card.show-price'|'product-card.hide-price';
export interface StaticColorType {
  white: string;
  whiteSolid: string;
  primaryDark: string;
  primary: string;
  gray: string;
  darkGray: string;
  lightGray: string;
  danger: string;
  dangerDark: string;
}