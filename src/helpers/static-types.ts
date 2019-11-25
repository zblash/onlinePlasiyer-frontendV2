type TranlationWord0='common.login';type TranlationWord1='common.create';type TranlationWord2='common.update';type TranlationWord3='common.next';type TranlationWord4='common.add';type TranlationWord5='obligations.title';type TranlationWord6='obligations.totalDebts';type TranlationWord7='obligations.totalReceivables';type TranlationWord8='obligations.details';type TranlationWord11='product-popup.category-input-placeholder';type TranlationWord12='not-connect-page.message';type TranlationWord13='popups.delete-category.are-you-sure-question';type TranlationWord14='popups.delete-category.cancel';type TranlationWord15='popups.delete-category.delete';type TranlationWord16='popups.remove-product.are-you-sure-question';
export type UseTranslationAllKeys=TranlationWord0|TranlationWord1|TranlationWord2|TranlationWord3|TranlationWord4|TranlationWord5|TranlationWord6|TranlationWord7|TranlationWord8|TranlationWord11|TranlationWord12|TranlationWord13|TranlationWord14|TranlationWord15|TranlationWord16;

export type UseTranslationFunction=<T extends UseTranslationAllKeys>(str:T,
 variables?:T extends TranlationWord0?never:T extends TranlationWord1?never:T extends TranlationWord2?never:T extends TranlationWord3?never:T extends TranlationWord4?never:T extends TranlationWord5?never:T extends TranlationWord6?never:T extends TranlationWord7?never:T extends TranlationWord8?never:T extends TranlationWord11?never:T extends TranlationWord12?never:T extends TranlationWord13?{categoryName:string}:T extends TranlationWord14?never:T extends TranlationWord15?never:{productName:string})=>string
  

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
  paginate: StaticColorPaginate;
};
interface StaticColorPaginate {
  blue: string;
  darkBlue: string;
  gray: string;
}