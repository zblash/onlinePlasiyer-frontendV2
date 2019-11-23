type TranlationWord0='common.login';type TranlationWord1='common.create';type TranlationWord2='common.update';type TranlationWord3='common.next';type TranlationWord4='common.add';type TranlationWord7='product-popup.category-input-placeholder';type TranlationWord8='not-connect-page.message';type TranlationWord9='popups.delete-category.are-you-sure-question';type TranlationWord10='popups.delete-category.cancel';type TranlationWord11='popups.delete-category.delete';type TranlationWord12='popups.remove-product.are-you-sure-question';
export type UseTranslationAllKeys=TranlationWord0|TranlationWord1|TranlationWord2|TranlationWord3|TranlationWord4|TranlationWord7|TranlationWord8|TranlationWord9|TranlationWord10|TranlationWord11|TranlationWord12;

export type UseTranslationFunction=<T extends UseTranslationAllKeys>(str:T,
 variables?:T extends TranlationWord0?never:T extends TranlationWord1?never:T extends TranlationWord2?never:T extends TranlationWord3?never:T extends TranlationWord4?never:T extends TranlationWord7?never:T extends TranlationWord8?never:T extends TranlationWord9?{categoryName:string}:T extends TranlationWord10?never:T extends TranlationWord11?never:{productName:string})=>string
  

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