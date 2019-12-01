type TranlationWord0 = 'common.login';
type TranlationWord1 = 'common.create';
type TranlationWord2 = 'common.update';
type TranlationWord3 = 'common.next';
type TranlationWord4 = 'common.add';
type TranlationWord5 = 'common.merchant';
type TranlationWord6 = 'common.price';
type TranlationWord7 = 'common.barcode';
type TranlationWord8 = 'common.total-price';
type TranlationWord9 = 'common.customer';
type TranlationWord10 = 'common.product-name';
type TranlationWord11 = 'common.unit-type';
type TranlationWord12 = 'common.unit-price';
type TranlationWord13 = 'common.quantity';
type TranlationWord14 = 'common.contents';
type TranlationWord15 = 'product-specify.active-states';
type TranlationWord16 = 'cart.orders-completed';
type TranlationWord17 = 'cart.show-order-detail';
type TranlationWord18 = 'cart.recommended-sales-price';
type TranlationWord19 = 'order.code';
type TranlationWord20 = 'order.quantity';
type TranlationWord21 = 'order.status-text';
type TranlationWord22 = 'order.order-date';
type TranlationWord23 = 'order.status.new';
type TranlationWord24 = 'order.status.finished';
type TranlationWord25 = 'order.status.cancelled';
type TranlationWord26 = 'order.status.paid';
type TranlationWord27 = 'invoice.code';
type TranlationWord28 = 'invoice.paid-price';
type TranlationWord29 = 'invoice.un-paid-price';
type TranlationWord30 = 'obligations.title';
type TranlationWord31 = 'obligations.totalDebts';
type TranlationWord32 = 'obligations.totalReceivables';
type TranlationWord33 = 'obligations.details';
type TranlationWord36 = 'product-popup.category-input-placeholder';
type TranlationWord37 = 'not-connect-page.message';
type TranlationWord38 = 'all-products-page.table.name';
type TranlationWord39 = 'all-products-page.table.category-name';
type TranlationWord40 = 'all-products-page.table.barcode';
type TranlationWord41 = 'all-products-page.table.active-status';
type TranlationWord42 = 'all-products-page.table.active';
type TranlationWord43 = 'all-products-page.table.passive';
type TranlationWord44 = 'popups.delete-category.are-you-sure-question';
type TranlationWord45 = 'popups.delete-category.cancel';
type TranlationWord46 = 'popups.delete-category.delete';
type TranlationWord47 = 'popups.remove-product.are-you-sure-question';
type TranlationWord48 = 'popups.remove-product.failed-message';
type TranlationWord49 = 'popups.remove-product-specify.are-you-sure-question';
export type UseTranslationAllKeys =
  | TranlationWord0
  | TranlationWord1
  | TranlationWord2
  | TranlationWord3
  | TranlationWord4
  | TranlationWord5
  | TranlationWord6
  | TranlationWord7
  | TranlationWord8
  | TranlationWord9
  | TranlationWord10
  | TranlationWord11
  | TranlationWord12
  | TranlationWord13
  | TranlationWord14
  | TranlationWord15
  | TranlationWord16
  | TranlationWord17
  | TranlationWord18
  | TranlationWord19
  | TranlationWord20
  | TranlationWord21
  | TranlationWord22
  | TranlationWord23
  | TranlationWord24
  | TranlationWord25
  | TranlationWord26
  | TranlationWord27
  | TranlationWord28
  | TranlationWord29
  | TranlationWord30
  | TranlationWord31
  | TranlationWord32
  | TranlationWord33
  | TranlationWord36
  | TranlationWord37
  | TranlationWord38
  | TranlationWord39
  | TranlationWord40
  | TranlationWord41
  | TranlationWord42
  | TranlationWord43
  | TranlationWord44
  | TranlationWord45
  | TranlationWord46
  | TranlationWord47
  | TranlationWord48
  | TranlationWord49;

export type UseTranslationFunction = <T extends UseTranslationAllKeys>(
  str: T,
  variables?: T extends TranlationWord0
    ? never
    : T extends TranlationWord1
    ? never
    : T extends TranlationWord2
    ? never
    : T extends TranlationWord3
    ? never
    : T extends TranlationWord4
    ? never
    : T extends TranlationWord5
    ? never
    : T extends TranlationWord6
    ? never
    : T extends TranlationWord7
    ? never
    : T extends TranlationWord8
    ? never
    : T extends TranlationWord9
    ? never
    : T extends TranlationWord10
    ? never
    : T extends TranlationWord11
    ? never
    : T extends TranlationWord12
    ? never
    : T extends TranlationWord13
    ? never
    : T extends TranlationWord14
    ? never
    : T extends TranlationWord15
    ? never
    : T extends TranlationWord16
    ? never
    : T extends TranlationWord17
    ? never
    : T extends TranlationWord18
    ? never
    : T extends TranlationWord19
    ? never
    : T extends TranlationWord20
    ? never
    : T extends TranlationWord21
    ? never
    : T extends TranlationWord22
    ? never
    : T extends TranlationWord23
    ? never
    : T extends TranlationWord24
    ? never
    : T extends TranlationWord25
    ? never
    : T extends TranlationWord26
    ? never
    : T extends TranlationWord27
    ? never
    : T extends TranlationWord28
    ? never
    : T extends TranlationWord29
    ? never
    : T extends TranlationWord30
    ? never
    : T extends TranlationWord31
    ? never
    : T extends TranlationWord32
    ? never
    : T extends TranlationWord33
    ? never
    : T extends TranlationWord36
    ? never
    : T extends TranlationWord37
    ? never
    : T extends TranlationWord38
    ? never
    : T extends TranlationWord39
    ? never
    : T extends TranlationWord40
    ? never
    : T extends TranlationWord41
    ? never
    : T extends TranlationWord42
    ? never
    : T extends TranlationWord43
    ? never
    : T extends TranlationWord44
    ? { categoryName: string }
    : T extends TranlationWord45
    ? never
    : T extends TranlationWord46
    ? never
    : T extends TranlationWord47
    ? { productName: string }
    : T extends TranlationWord48
    ? never
    : never,
) => string;

export type TransComponentKeys = 'product-card.show-price' | 'product-card.hide-price';
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
}
interface StaticColorPaginate {
  blue: string;
  darkBlue: string;
  gray: string;
}
