type VIIOZVOZBHGMBCW='common.login';type GBZWAMJVUCCGXOX='common.create';type ANLVCWUAYRLZWTD='common.update';type KSPAZQKCYQUUEGN='common.next';type MODCDWQMFDZEBPY='common.add';type JGUHXACIULEBHNR='product-popup.category-input-placeholder';type SGKISQZKPHWJCQY='not-connect-page.message';type XVCUANFBWIPSBIL='popups.delete-category.are-you-sure-question';type JMXXCIFWKFMTZCU='popups.delete-category.cancel';type TPDXMCLPADLBONH='popups.delete-category.delete';type SIKXFJCWHHDFYUY='popups.remove-product.are-you-sure-question';
export type UseTranslationAllKeys=VIIOZVOZBHGMBCW|GBZWAMJVUCCGXOX|ANLVCWUAYRLZWTD|KSPAZQKCYQUUEGN|MODCDWQMFDZEBPY|JGUHXACIULEBHNR|SGKISQZKPHWJCQY|XVCUANFBWIPSBIL|JMXXCIFWKFMTZCU|TPDXMCLPADLBONH|SIKXFJCWHHDFYUY;

export type UseTranslationFunction=<T extends UseTranslationAllKeys>(str:T,
 variables?:T extends VIIOZVOZBHGMBCW?never:T extends GBZWAMJVUCCGXOX?never:T extends ANLVCWUAYRLZWTD?never:T extends KSPAZQKCYQUUEGN?never:T extends MODCDWQMFDZEBPY?never:T extends JGUHXACIULEBHNR?never:T extends SGKISQZKPHWJCQY?never:T extends XVCUANFBWIPSBIL?{categoryName:string}:T extends JMXXCIFWKFMTZCU?never:T extends TPDXMCLPADLBONH?never:{productName:string})=>string
  

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