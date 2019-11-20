type TAQQGDAUPKEXXEP='common.login';type PUDDSOANABYASXC='common.create';type JDMNOCYQNFPJZFT='common.update';type ELPWQZIZXQMCLKW='common.next';type ZBGOCNFOSNDBLVP='common.add';type FCFUMJGVHLCBKRW='product-popup.category-input-placeholder';type RSKXZXBMUONXGZH='not-connect-page.message';type GGEYARUOBEQBPBE='popups.delete-category.are-you-sure-question';type CXDKQYBIQSJHFCP='popups.delete-category.cancel';type CHABZIFLIIYGRYJ='popups.delete-category.delete';type GTAECLYCLEBMDNP='popups.remove-product.are-you-sure-question';
export type UseTranslationAllKeys=TAQQGDAUPKEXXEP|PUDDSOANABYASXC|JDMNOCYQNFPJZFT|ELPWQZIZXQMCLKW|ZBGOCNFOSNDBLVP|FCFUMJGVHLCBKRW|RSKXZXBMUONXGZH|GGEYARUOBEQBPBE|CXDKQYBIQSJHFCP|CHABZIFLIIYGRYJ|GTAECLYCLEBMDNP;

export type UseTranslationFunction=<T extends UseTranslationAllKeys>(str:T,
 variables?:T extends TAQQGDAUPKEXXEP?never:T extends PUDDSOANABYASXC?never:T extends JDMNOCYQNFPJZFT?never:T extends ELPWQZIZXQMCLKW?never:T extends ZBGOCNFOSNDBLVP?never:T extends FCFUMJGVHLCBKRW?never:T extends RSKXZXBMUONXGZH?never:T extends GGEYARUOBEQBPBE?{categoryName:string}:T extends CXDKQYBIQSJHFCP?never:T extends CHABZIFLIIYGRYJ?never:{productName:string})=>string
  

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