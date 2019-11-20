type WEOWPUIEBONYYOQ='common.login';type GBERMAXLXVDFKST='common.create';type ZOOWJCGAAFWYLMO='common.update';type QBKADAYPKUXGREF='common.next';type GECCHADIZXWDKZY='common.add';type CIVQIBTYKFROSPE='product-popup.category-input-placeholder';type PXVSHVFYLCVDAKA='not-connect-page.message';type JFYODCUTPUCHRTU='popups.delete-category.are-you-sure-question';type ZMPYYEMCYQIDGDQ='popups.delete-category.cancel';type QUVMZTNLWBJYGHG='popups.delete-category.delete';type HECKLITVSPFLPDN='popups.remove-product.are-you-sure-question';
export type UseTranslationAllKeys=WEOWPUIEBONYYOQ|GBERMAXLXVDFKST|ZOOWJCGAAFWYLMO|QBKADAYPKUXGREF|GECCHADIZXWDKZY|CIVQIBTYKFROSPE|PXVSHVFYLCVDAKA|JFYODCUTPUCHRTU|ZMPYYEMCYQIDGDQ|QUVMZTNLWBJYGHG|HECKLITVSPFLPDN;

export type UseTranslationFunction=<T extends UseTranslationAllKeys>(str:T,
 variables?:T extends WEOWPUIEBONYYOQ?never:T extends GBERMAXLXVDFKST?never:T extends ZOOWJCGAAFWYLMO?never:T extends QBKADAYPKUXGREF?never:T extends GECCHADIZXWDKZY?never:T extends CIVQIBTYKFROSPE?never:T extends PXVSHVFYLCVDAKA?never:T extends JFYODCUTPUCHRTU?{categoryName:string}:T extends ZMPYYEMCYQIDGDQ?never:T extends QUVMZTNLWBJYGHG?never:{productName:string})=>string
  

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